import { ChangePasswordService } from "@/app/services/profiles/password-recovery/change-password-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { IController } from "@/presentation/http/contracts";
import { ChangePasswordController } from "@/presentation/http/controllers/profiles/passwords-recoveries/change-password-controller";

export function changePasswordControllerFactory(): IController {
	const prismaProfileRepository = new PrismaProfilesRepository();
	const jwtAuthenticationProvider = new JWTAuthenticationProvider();
	const changePasswordService = new ChangePasswordService(
		prismaProfileRepository,
		jwtAuthenticationProvider,
	);
	const changePasswordController = new ChangePasswordController(changePasswordService);

	return changePasswordController;
}