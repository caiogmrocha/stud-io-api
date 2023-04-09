import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IWhereClauseOption } from "@/app/contracts/repositories/common/i-where-clause-option";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";

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
            case operator === 'in': counter.push(Array.isArray(value) && value.includes(row[column])); break;
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

			// Subjects
			if (relations?.subjects === true) {
				const subjectsIds = database.profile_subjects
					.filter(profileSubject => profileSubject.profile_id === profile.id)
					.map(profileSubject => profileSubject.subject_id);

				profile.subjects = database.subjects.filter(subject => subjectsIds.includes(subject.id));
			} else if (typeof relations?.subjects === 'object') {
				const subjectsIds = database.profile_subjects
					.filter(profileSubject => profileSubject.profile_id === profile.id)
					.map(profileSubject => profileSubject.subject_id);

				const filteredSubjects: ISubjectModel[] = [];

				for (const subject of database.subjects.filter(subject => subjectsIds.includes(subject.id))) {
					const filteredSubjectData = {} as any;

					for (const key of relations.subjects.fields) {
						filteredSubjectData[key!] = subject[key!];
					}

					filteredSubjects.push(filteredSubjectData);
				}

				profile.subjects = filteredSubjects;
			}

      return profile;
    });

    return relatedProfiles;
  }
}
