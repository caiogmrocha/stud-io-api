import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { Student } from "@/domain/entities";
import { Student as PrismaStudent } from "@prisma/client";

export class StudentMapper {
  static fromEntityToModel(from: Student): IStudentModel {
    const student: IStudentModel = {
      id: from.id,
      name: from.name,
      created_at: from.createdAt,
      updated_at: from.updatedAt,
      is_deleted: from.isDeleted,
      deleted_at: from.deletedAt,
      profile_id: from.profileId,
    };

    return student;
  }

  static fromModeltoEntity(from: IStudentModel): Student {
    const student = new Student({
      id: from.id,
      name: from.name,
      createdAt: from.created_at,
      updatedAt: from.updated_at,
      isDeleted: from.is_deleted,
      deletedAt: from.deleted_at,
      profileId: from.profile_id,
    });

    return student;
  }

  static fromPrismaToModel(from: PrismaStudent): IStudentModel {
    const student: IStudentModel = {
      id: from.id,
      name: from.name,
      created_at: from.createdAt,
      updated_at: from.updatedAt || undefined,
      deleted_at: from.deletedAt || undefined,
      is_deleted: from.isDeleted,
      profile_id: from.profileId,
    };

    return student;
  }
}
