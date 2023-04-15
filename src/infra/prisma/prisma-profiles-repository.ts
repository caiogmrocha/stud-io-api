import { IProfileModelToUpdate, IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";
import { ICreateProfileRepository, IProfileModelToCreate } from "@/app/contracts/repositories/profiles/i-create-profile-repository";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { ProfileMapper } from "@/utils/mappers/profile-mapper";

import { Prisma, Profile, Student, Subject, Teacher } from "@prisma/client";
import { prisma } from "./prisma";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";

type IPrismaProfileAdapted = Profile & {
  student?: Student;
  teacher?: Teacher;
	subjects?: Subject[];
};

type IProfilesRepository = (
	& IGetProfilesRepository
	& ICreateProfileRepository
	& IUpdateProfileRepository
);

export class PrismaProfilesRepository implements IProfilesRepository {
  async get({ where, relations }: IGetProfilesRepositoryOptions = {}): Promise<IProfileModel[]> {
    const rows = await prisma.profile.findMany({
      ...(where && { where: adaptWhere<IProfileModel, Prisma.ProfileWhereInput>(where) }),
      ...(relations && { include: adaptRelations(relations) }),
    }) as IPrismaProfileAdapted[];

    return rows.map(ProfileMapper.fromPrismaToModel);
  }

  async create(data: IProfileModelToCreate): Promise<IProfileModel> {
    const createdData = await prisma.profile.create({
      data: {
        email: data.email,
        password: data.password,
        type: data.type,
        level: data.level,
      }
    });

    return ProfileMapper.fromPrismaToModel(createdData);
  }

  async update(id: string, data: IProfileModelToUpdate): Promise<IProfileModel> {
    const updatedData = await prisma.profile.update({
      where: { id },
      data,
    });

    return ProfileMapper.fromPrismaToModel(updatedData);
  }
};
