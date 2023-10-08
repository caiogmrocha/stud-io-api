import { ConfirmEmailService } from "@/app/services/profiles/password-recovery/confirm-email-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { PrismaPasswordRecoveriesRepository } from "@/infra/prisma/prisma-passwords-recoveries-repository";
import { IController } from "@/presentation/http/contracts";
import { ConfirmEmailController } from "@/presentation/http/controllers/profiles/passwords-recoveries/confirm-email-controller";

export function confirmEmailControllerFactory(): IController {
	const prismaPasswordRecoveryRepository = new PrismaPasswordRecoveriesRepository();
	const jwtAuthenticationProvider = new JWTAuthenticationProvider();
	const confirmEmailService = new ConfirmEmailService(
		prismaPasswordRecoveryRepository,
		prismaPasswordRecoveryRepository,
		jwtAuthenticationProvider,
	);
	const confirmEmailController = new ConfirmEmailController(confirmEmailService);

	return confirmEmailController;
}
