import { ICreateStudentRepository, IStudentModelToCreate } from "@/app/contracts/repositories/students/i-create-student-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { StudentMapper } from "@/utils/mappers/student-mapper";

import { prisma } from "./prisma";
import { Prisma, Profile, Student } from "@prisma/client";
import { IGetStudentsRepository, IGetStudentsRepositoryOptions } from "@/app/contracts/repositories/students/i-get-students-repository";
import { IStudentModelToUpdate, IUpdateStudentRepository } from "@/app/contracts/repositories/students/i-update-student-repository";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";

type IPrismaStudentAdapted = Student & {
  profile?: Profile;
};

type IStudentsRepository = (
	& IGetStudentsRepository
	& ICreateStudentRepository
	& IUpdateStudentRepository
);

export class PrismaStudentsRepository implements IStudentsRepository {
	async get({ where, relations }: IGetStudentsRepositoryOptions): Promise<IStudentModel[]> {
		const rows = await prisma.student.findMany({
			...(where && { where: adaptWhere<IStudentModel, Prisma.StudentWhereInput>(where) }),
			...(relations && { include: adaptRelations(relations) }),
		}) as IPrismaStudentAdapted[];

		return rows.map(StudentMapper.fromPrismaToModel);
	}

  async create(data: IStudentModelToCreate): Promise<IStudentModel> {
    const createdData = await prisma.student.create({
      data: {
        name: data.name,
        profileId: data.profile_id,
      },
    });

    return StudentMapper.fromPrismaToModel(createdData);
  }

	async update(id: string, data: IStudentModelToUpdate): Promise<IStudentModel> {
		const updatedData = await prisma.student.update({
      where: { id },
      data,
    });

    return StudentMapper.fromPrismaToModel(updatedData);
	}
}
