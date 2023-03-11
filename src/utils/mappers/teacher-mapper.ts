import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { Teacher } from "@/domain/entities";
import { Teacher as PrismaTeacher } from "@prisma/client";

export class TeacherMapper {
  static fromEntityToModel(from: Teacher): ITeacherModel {
    const teacher: ITeacherModel = {
      id: from.id,
      name: from.name,
      created_at: from.createdAt,
      updated_at: from.updatedAt,
      is_deleted: from.isDeleted,
      deleted_at: from.deletedAt,
      profile_id: from.profileId,
    };

    return teacher;
  }

  static fromModeltoEntity(from: ITeacherModel): Teacher {
    const teacher = new Teacher({
      id: from.id,
      name: from.name,
      createdAt: from.created_at,
      updatedAt: from.updated_at,
      isDeleted: from.is_deleted,
      deletedAt: from.deleted_at,
      profileId: from.profile_id,
    });

    return teacher;
  }

  static fromPrismaToModel(from: PrismaTeacher): ITeacherModel {
    const teacher: ITeacherModel = {
      id: from.id,
      name: from.name,
      created_at: from.createdAt,
      updated_at: from.updatedAt || undefined,
      deleted_at: from.deletedAt || undefined,
      is_deleted: from.isDeleted,
      profile_id: from.profileId,
    };

    return teacher;
  }
}
