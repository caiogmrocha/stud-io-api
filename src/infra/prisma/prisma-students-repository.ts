import { ICreateStudentRepository, IStudentModelToCreate } from "@/app/contracts/repositories/students/i-create-student-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { prisma } from "./prisma";

export class PrismaStudentsRepository implements ICreateStudentRepository {
  async create(data: IStudentModelToCreate): Promise<IStudentModel> {
    const createdData = await prisma.student.create({
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
