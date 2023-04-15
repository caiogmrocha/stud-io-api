import { ICreateProfileSubjectRepository, IProfileSubjectModelToCreate } from "@/app/contracts/repositories/profiles-subjects/i-create-profile-subject-repository";
import { IDeleteProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-delete-profile-subject-repository";
import { IGetProfilesSubjectsRepository, IGetProfilesSubjectsRepositoryOptions } from "@/app/contracts/repositories/profiles-subjects/i-get-profiles-subjects-repository";
import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";
import { Prisma, Profile, ProfilesOnSubjects, Subject } from "@prisma/client";
import { adaptWhere } from "./adapters/adapt-where";
import { adaptRelations } from "./adapters/adapt-relations";
import { ProfileSubjectMapper } from "@/utils/mappers/profile-subject-mapper";
import { prisma } from "./prisma";

type IPrismaProfileSubjectAdapted = ProfilesOnSubjects & {
	profiles?: Profile[];
	subjects?: Subject[];
};

type IProfilesSubjectsRepository = (
	& IGetProfilesSubjectsRepository
	& ICreateProfileSubjectRepository
	& IDeleteProfileSubjectRepository
);

export class PrismaProfilesSubjectsRepository implements IProfilesSubjectsRepository {
	async get({ where, relations }: IGetProfilesSubjectsRepositoryOptions): Promise<IProfileSubjectModel[]> {
		const rows = await prisma.profilesOnSubjects.findMany({
      ...(where && { where: adaptWhere<IProfileSubjectModel, Prisma.ProfilesOnSubjectsWhereInput>(where) }),
      ...(relations && { include: adaptRelations(relations) }),
    }) as IPrismaProfileSubjectAdapted[];

    return rows.map(ProfileSubjectMapper.fromPrismaToModel);
	}

	async create(data: IProfileSubjectModelToCreate): Promise<IProfileSubjectModel> {
		const createdData = await prisma.profilesOnSubjects.create({
			data: {
				profileId: data.profile_id,
				subjectId: data.subject_id,
			}
		});

		return ProfileSubjectMapper.fromPrismaToModel(createdData);
	}

	async delete(profileId: string, subjectId: number): Promise<void> {
		await prisma.profilesOnSubjects.delete({
			where: {
				profileId_subjectId: { profileId, subjectId },
			},
		});
	}
}
