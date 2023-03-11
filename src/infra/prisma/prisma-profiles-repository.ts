import { ICreateProfileRepository, IProfileModelToCreate } from "@/app/contracts/repositories/profiles/i-create-profile-repository";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";
import { ProfileMapper } from "@/utils/mappers/profile-mapper";

import { Prisma, Profile, Student, Teacher } from "@prisma/client";
import { prisma } from "./prisma";

type IPrismaProfileAdapted = Profile & {
  student?: Student;
  teacher?: Teacher;
};

export class PrismaProfilesRepository implements IGetProfilesRepository, ICreateProfileRepository {
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
};


(new PrismaProfilesRepository).get().then(console.log)
