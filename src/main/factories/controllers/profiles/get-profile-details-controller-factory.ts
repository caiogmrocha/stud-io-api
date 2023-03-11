import { GetProfileDetailsService } from "@/app/services/profiles/get-profile-details-service";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { GetProfileDetailsController } from "@/presentation/http/controllers/profiles/get-profile-details-controller";

export function getProfileDetailsControllerFactory(): GetProfileDetailsController {
  const prismaProfilesRepository = new PrismaProfilesRepository();
  const getProfileDetailsService = new GetProfileDetailsService(prismaProfilesRepository);
  const getProfileDetailsController = new GetProfileDetailsController(getProfileDetailsService);

  return getProfileDetailsController;
}
