import { AuthenticateProfileService } from "@/app/services/profiles/authenticate-profile-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { AuthenticateProfileController } from "@/presentation/http/controllers/profiles/authenticate-profile-controller";

export function authenticateProfileControllerFactory(): AuthenticateProfileController {
  const prismaGetProfilesRepository = new PrismaProfilesRepository();
  const jwtAuthenticationProvider = new JWTAuthenticationProvider();
  const authenticateProfileService = new AuthenticateProfileService(
    prismaGetProfilesRepository,
    jwtAuthenticationProvider,
  );
  const authenticateProfileController = new AuthenticateProfileController(authenticateProfileService);

  return authenticateProfileController;
}
