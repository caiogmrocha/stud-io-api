import { RegisterProfileService } from "@/app/services/profiles/register-profile-service";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { PrismaStudentsRepository } from "@/infra/prisma/prisma-students-repository";
import { PrismaTeachersRepository } from "@/infra/prisma/prisma-teachers-repository";
import { RegisterProfileController } from "@/presentation/http/controllers/register-profile-controller";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { ValueInListValidator } from "@/validation/rules/value-in-list-validator";
import { ValidationComposite } from "@/validation/validation-composite";

export function registerProfileControllerFactory(): RegisterProfileController {
  const prismaProfilesRepository = new PrismaProfilesRepository();
  const prismaStudentsRepository = new PrismaStudentsRepository();
  const prismaTeachersRepository = new PrismaTeachersRepository();
  const registerProfileService = new RegisterProfileService(
    prismaProfilesRepository,
    prismaProfilesRepository,
    prismaStudentsRepository,
    prismaTeachersRepository,
  );
  const registerProfileController = new RegisterProfileController(registerProfileService);

  return registerProfileController;
}
