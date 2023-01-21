import { AuthenticateProfileService } from "@/app/services/profiles/authenticate-profile-service";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { BCryptHashProvider } from "@/infra/bcrypt/bcrypt-hash-provider";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { AuthenticateProfileController } from "@/presentation/http/controllers/profiles/authenticate-profile-controller";

export function authenticateProfileControllerFactory(): AuthenticateProfileController {
  const prismaGetProfilesRepository = new PrismaProfilesRepository();
  const jwtAuthenticationProvider = new JWTAuthenticationProvider();
  const bcryptHashProvider = new BCryptHashProvider();
  const authenticateProfileService = new AuthenticateProfileService(
    prismaGetProfilesRepository,
    jwtAuthenticationProvider,
    bcryptHashProvider,
  );
  const authenticateProfileController = new AuthenticateProfileController(authenticateProfileService);

  return authenticateProfileController;
}
