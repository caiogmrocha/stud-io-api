import { RegisterProfileService } from "@/app/services/profiles/register-profile-service";
import { BCryptHashProvider } from "@/infra/bcrypt/bcrypt-hash-provider";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { PrismaStudentsRepository } from "@/infra/prisma/prisma-students-repository";
import { PrismaTeachersRepository } from "@/infra/prisma/prisma-teachers-repository";
import { RegisterProfileController } from "@/presentation/http/controllers/profiles/register-profile-controller";

export function registerProfileControllerFactory(): RegisterProfileController {
  const prismaProfilesRepository = new PrismaProfilesRepository();
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const prismaTeachersRepository = new PrismaTeachersRepository();
  const bcryptHashProvider = new BCryptHashProvider();
  const registerProfileService = new RegisterProfileService(
    prismaProfilesRepository,
    prismaProfilesRepository,
    prismaStudentsRepository,
    prismaTeachersRepository,
    bcryptHashProvider,
  );
  const registerProfileController = new RegisterProfileController(registerProfileService);

  return registerProfileController;
}
