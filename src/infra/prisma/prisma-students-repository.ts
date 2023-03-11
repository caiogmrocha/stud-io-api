import { ICreateStudentRepository, IStudentModelToCreate } from "@/app/contracts/repositories/students/i-create-student-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { StudentMapper } from "@/utils/mappers/student-mapper";

import { prisma } from "./prisma";

export class PrismaStudentsRepository implements ICreateStudentRepository {
  async create(data: IStudentModelToCreate): Promise<IStudentModel> {
    const createdData = await prisma.student.create({
      data: {
        name: data.name,
        profileId: data.profile_id,
      },
    });

    return StudentMapper.fromPrismaToModel(createdData);
  }
}
