import { ICreateTeacherRepository, ITeacherModelToCreate } from "@/app/contracts/repositories/teachers/i-create-teacher-repository";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { prisma } from "./prisma";

export class PrismaTeachersRepository implements ICreateTeacherRepository {
  async create(data: ITeacherModelToCreate): Promise<ITeacherModel> {
    const createdData = await prisma.teacher.create({
      data: {
        name: data.name,
        profileId: data.profile_id,
      },
    });

    return {
      id: createdData.id,
      name: createdData.name,
      created_at: createdData.createdAt,
      updated_at: createdData.updatedAt || undefined,
      deleted_at: createdData.deletedAt || undefined,
      is_deleted: createdData.isDeleted,
      profile_id: createdData.profileId,
    };
  }
}
