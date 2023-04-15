import { IGetSubjectsRepository, IGetSubjectsRepositoryOptions } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";
import { SubjectMapper } from "@/utils/mappers/subject-mapper";

import { Prisma, Profile, Subject } from "@prisma/client";
import { prisma } from "./prisma";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";

type IPrismaSubjectAdapted = Subject & {
	profile?: Profile;
};

type ISubjectsRepository = (
	& IGetSubjectsRepository
);

export class PrismaSubjectsRepository implements ISubjectsRepository {
	async get({ where, relations }: IGetSubjectsRepositoryOptions): Promise<ISubjectModel[]> {
		const rows = await prisma.subject.findMany({
      ...(where && { where: adaptWhere<ISubjectModel, Prisma.SubjectWhereInput>(where) }),
      ...(relations && { include: adaptRelations(relations) }),
    }) as IPrismaSubjectAdapted[];

    return rows.map(SubjectMapper.fromPrismaToModel);
	}
}
