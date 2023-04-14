import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";
import { Subject } from "@/domain/entities";
import { Subject as PrismaSubject } from "@prisma/client";

export class SubjectMapper {
  static fromEntityToModel(from: Subject): ISubjectModel {
    const subject: ISubjectModel = {
      id: from.id,
			name: from.name,
			display_name: from.displayName,
			description: from.description,
			created_at: from.createdAt,
			updated_at: from.updatedAt,
			is_deleted: from.isDeleted,
			deleted_at: from.deletedAt,
    };

    return subject;
  }

  static fromModeltoEntity(from: ISubjectModel): Subject {
    const subject = new Subject({
      id: from.id,
			name: from.name,
			displayName: from.display_name,
			description: from.description,
			createdAt: from.created_at,
			updatedAt: from.updated_at,
			isDeleted: from.is_deleted,
			deletedAt: from.deleted_at,
    });

    return subject;
  }

  static fromPrismaToModel(from: PrismaSubject): ISubjectModel {
    const subject: ISubjectModel = {
      id: from.id,
      name: from.name,
			display_name: from.displayName,
			description: from.description || undefined,
      created_at: from.createdAt,
      updated_at: from.updatedAt || undefined,
      deleted_at: from.deletedAt || undefined,
      is_deleted: from.isDeleted,
    };

    return subject;
  }
}
