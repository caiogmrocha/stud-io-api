import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";

export class InMemoryGetProfilesRepository implements IGetProfilesRepository {
  async get({ where, relations }: IGetProfilesRepositoryOptions): Promise<IProfileModel[]> {
    const database = await getInMemoryDatabase();

    const filteredProfiles = database.profiles.filter(row => {
      const counter: boolean[] = [];

      if (where && where?.length > 0) {
        for (let [ column, operator, value ] of where) {
          switch (true) {
            case operator === '<': counter.push(row[column]! < value!); break;
            case operator === '<=': counter.push(row[column]! <= value!); break;
            case operator === '=': counter.push(row[column]! == value!); break;
            case operator === '>=': counter.push(row[column]! >= value!); break;
            case operator === '>': counter.push(row[column]! > value!); break;
            case operator === '<>': counter.push(row[column]! != value!); break;
          }
        }
      }

      return counter.every(condition => condition === true);
    });

    const relatedProfiles = filteredProfiles.map(profile => {
      // Student
      if (profile.type === 'student') {
        if (relations?.student === true) {
          profile.student = database.students.find(student => student.profile_id === profile.id)!;
        } else if (typeof relations?.student === 'object') {
          const filteredStudentData = {} as any;
          const studentData = database.students.find(student => student.profile_id === profile.id)!;

          for (const key of relations.student.fields) {
            filteredStudentData[key!] = studentData[key!];
          }

          profile.student = filteredStudentData;
        }
      }

      // Teacher
      if (profile.type === 'teacher') {
        if (relations?.teacher === true) {
          profile.teacher = database.teachers.find(teacher => teacher.profile_id === profile.id)!;
        } else if (typeof relations?.teacher === 'object') {
          const filteredTeacherData = {} as any;
          const teacherData = database.teachers.find(teacher => teacher.profile_id === profile.id)!;

          for (const key of relations.teacher.fields) {
            filteredTeacherData[key!] = teacherData[key!];
          }


          profile.teacher = filteredTeacherData;
        }
      }

      return profile;
    });

    return relatedProfiles;
  }
}
