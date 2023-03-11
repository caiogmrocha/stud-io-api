import { ICreateTeacherRepository, ITeacherModelToCreate } from "@/app/contracts/repositories/teachers/i-create-teacher-repository";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { TeacherMapper } from "@/utils/mappers/teacher-mapper";

import { prisma } from "./prisma";

export class PrismaTeachersRepository implements ICreateTeacherRepository {
  async create(data: ITeacherModelToCreate): Promise<ITeacherModel> {
    const createdData = await prisma.teacher.create({
      data: {
        name: data.name,
        profileId: data.profile_id,
      },
    });

    return TeacherMapper.fromPrismaToModel(createdData);
  }
}
