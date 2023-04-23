import { SynchronizeProfilesSubjectsService } from "@/app/services/profiles-subjects/synchronize-profiles-subjects-service";
import { UpdateProfileRegistrationService } from "@/app/services/profiles/update-profile-registration-service";
import { IAuthenticatedProfilePayload } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { PrismaProfilesSubjectsRepository } from "@/infra/prisma/prisma-profiles-subjects-repository";
import { PrismaStudentsRepository } from "@/infra/prisma/prisma-students-repository";
import { PrismaSubjectsRepository } from "@/infra/prisma/prisma-subjects-repository";
import { PrismaTeachersRepository } from "@/infra/prisma/prisma-teachers-repository";
import { UpdateProfileRegistrationController } from "@/presentation/http/controllers/profiles/update-profile-registration-controller";

export function updateProfileRegistrationControllerFactory() {
	const prismaProfilesRepository = new PrismaProfilesRepository();
	const prismaStudentsRepository = new PrismaStudentsRepository();
	const prismaTeachersRepository = new PrismaTeachersRepository();
	const prismaSubjectsRepository = new PrismaSubjectsRepository();
	const prismaProfilesSubjectsRepository = new PrismaProfilesSubjectsRepository();
	const synchronizeProfilesSubjectsService = new SynchronizeProfilesSubjectsService(
		prismaProfilesRepository,
		prismaSubjectsRepository,
		prismaProfilesSubjectsRepository,
		prismaProfilesSubjectsRepository,
		prismaProfilesSubjectsRepository,
	);
	const updateProfileRegistrationService = new UpdateProfileRegistrationService(
		prismaProfilesRepository,
		prismaStudentsRepository,
		prismaTeachersRepository,
		prismaProfilesRepository,
		prismaStudentsRepository,
		prismaTeachersRepository,
		synchronizeProfilesSubjectsService,
	);
	const updateProfileRegistrationController = new UpdateProfileRegistrationController(
		updateProfileRegistrationService,
	);

	return updateProfileRegistrationController;
}
