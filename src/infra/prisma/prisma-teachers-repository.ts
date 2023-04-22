import { ICreateTeacherRepository, ITeacherModelToCreate } from "@/app/contracts/repositories/teachers/i-create-teacher-repository";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { TeacherMapper } from "@/utils/mappers/teacher-mapper";

import { prisma } from "./prisma";
import { IGetTeachersRepository, IGetTeachersRepositoryOptions } from "@/app/contracts/repositories/teachers/i-get-teachers-repository";
import { ITeacherModelToUpdate, IUpdateTeacherRepository } from "@/app/contracts/repositories/teachers/i-update-teacher-repository";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";
import { Prisma, Profile, Teacher } from "@prisma/client";

type IPrismaTeacherAdapted = Teacher & {
  profile?: Profile;
};

type ITeachersRepository = (
	& IGetTeachersRepository
	& ICreateTeacherRepository
	& IUpdateTeacherRepository
);

export class PrismaTeachersRepository implements ITeachersRepository {
	async get({ where, relations }: IGetTeachersRepositoryOptions): Promise<ITeacherModel[]> {
		const rows = await prisma.teacher.findMany({
			...(where && { where: adaptWhere<ITeacherModel, Prisma.TeacherWhereInput>(where) }),
			...(relations && { include: adaptRelations(relations) }),
		}) as IPrismaTeacherAdapted[];

		return rows.map(TeacherMapper.fromPrismaToModel);
	}

  async create(data: ITeacherModelToCreate): Promise<ITeacherModel> {
    const createdData = await prisma.teacher.create({
      data: {
        name: data.name,
        profileId: data.profile_id,
      },
    });

    return TeacherMapper.fromPrismaToModel(createdData);
  }

	async update(id: string, data: ITeacherModelToUpdate): Promise<ITeacherModel> {
		const updatedData = await prisma.teacher.update({
      where: { id },
      data,
    });

    return TeacherMapper.fromPrismaToModel(updatedData);
	}
}
