import { IWhereClauseOption } from "@/app/contracts/repositories/common/i-where-clause-option";
import { ICreateProfileRepository, IProfileModelToCreate } from "@/app/contracts/repositories/profiles/i-create-profile-repository";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { Prisma } from "@prisma/client";
import { adaptWhere } from "./adapters/adapt-where";
import { prisma } from "./prisma";

export class PrismaProfilesRepository implements IGetProfilesRepository, ICreateProfileRepository {
  async get({ where }: IGetProfilesRepositoryOptions): Promise<IProfileModel[]> {
    const rows = await prisma.profile.findMany({
      where: adaptWhere<IProfileModel, Prisma.ProfileWhereInput>(where),
    });

    return rows.map(row => ({
      id: row.id,
      email: row.email,
      password: row.password,
      type: row.type,
      level: row.level.toNumber(),
      created_at: row.createdAt,
      updated_at: row.updatedAt || undefined,
      deleted_at: row.deletedAt || undefined,
      is_deleted: row.isDeleted,
    }));
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

    return {
      id: createdData.id,
      email: createdData.email,
      password: createdData.password,
      type: createdData.type,
      level: createdData.level.toNumber(),
      created_at: createdData.createdAt,
      updated_at: createdData.updatedAt || undefined,
      deleted_at: createdData.deletedAt || undefined,
      is_deleted: createdData.isDeleted,
    }
  }
};
