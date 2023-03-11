import { Profile, Student, Teacher } from "@/domain/entities";
import { Email, Password } from "@/domain/value-objects";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { Profile as PrismaProfile, Student as PrismaStudent, Teacher as PrismaTeacher } from "@prisma/client";

import { StudentMapper } from "./student-mapper";
import { TeacherMapper } from "./teacher-mapper";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";

type IAdaptedPrismaProfile = PrismaProfile & {
  student?: PrismaStudent;
  teacher?: PrismaTeacher;
}

export class ProfileMapper {
  static fromEntityToModel(from: Profile): IProfileModel {
    // Relations
    let student: IStudentModel | undefined;
    let teacher: ITeacherModel | undefined;

    if (from.owner) {
      if (from.type === 'student') {
        student = StudentMapper.fromEntityToModel(from.owner);
      } else if (from.type === 'teacher') {
        teacher = StudentMapper.fromEntityToModel(from.owner);
      }
    }

    // Profile
    const profile: IProfileModel = {
      id: from.id,
      email: from.email.value,
      password: from.password.value,
      type: from.type,
      level: from.level,
      created_at: from.createdAt,
      updated_at: from.updatedAt,
      is_deleted: from.isDeleted,
      deleted_at: from.deletedAt,
      student,
      teacher,
    };

    return profile;
  }

  static fromModeltoEntity(from: IProfileModel): Profile {
    // Relations
    let owner: Student | Teacher | undefined;

    if (from.type === 'student' && from.student) {
      owner = StudentMapper.fromModeltoEntity(from.student);
    } else if (from.type === 'teacher' && from.teacher) {
      owner = TeacherMapper.fromModeltoEntity(from.teacher);
    }

    // Profile
    const email = Email.create(from.email);

    if (email.isLeft()) {
      throw email.value;
    }

    const password = Password.create(from.password, true);

    if (password.isLeft()) {
      throw password.value;
    }

    const profile = new Profile({
      id: from.id,
      email: email.value,
      password: password.value,
      type: from.type,
      level: from.level,
      createdAt: from.created_at,
      updatedAt: from.updated_at,
      deletedAt: from.deleted_at,
      isDeleted: from.is_deleted,
      owner
    });

    return profile;
  }

  static fromPrismaToModel(from: IAdaptedPrismaProfile): IProfileModel {
    // Relations
    let student: IStudentModel | undefined;
    let teacher: ITeacherModel | undefined;

    if (from.type === 'student' && from.student) {
      student = StudentMapper.fromPrismaToModel(from.student);
    } else if (from.type === 'teacher' && from.teacher) {
      teacher = TeacherMapper.fromPrismaToModel(from.teacher);
    }

    // Profile
    const profile: IProfileModel = {
      id: from.id,
      email: from.email,
      password: from.password,
      type: from.type,
      level: from.level.toNumber(),
      created_at: from.createdAt,
      updated_at: from.updatedAt || undefined,
      is_deleted: from.isDeleted,
      deleted_at: from.deletedAt || undefined,
      student,
      teacher,
    };

    return profile;
  }
}
