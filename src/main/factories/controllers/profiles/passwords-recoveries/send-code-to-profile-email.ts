import { IController } from "@/presentation/http/contracts";
import { SendCodeToProfileEmailController } from "@/presentation/http/controllers/profiles/passwords-recoveries/send-code-to-profile-email-controller";
import { SendCodeToProfileEmailService } from "@/app/services/profiles/password-recovery/send-code-to-profile-email-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { PrismaProfilesRepository } from "@/infra/prisma/prisma-profiles-repository";
import { PrismaPasswordRecoveriesRepository } from "@/infra/prisma/prisma-passwords-recoveries-repository";
import { BullQueueProvider } from "@/infra/bull/bull-queue-provider";

export function sendCodeToProfileEmailControllerFactory(): IController {
	const sendCodeToProfileEmailController = new SendCodeToProfileEmailController(
		new SendCodeToProfileEmailService(
			new PrismaProfilesRepository(),
			new PrismaPasswordRecoveriesRepository(),
			new JWTAuthenticationProvider(),
			new BullQueueProvider(),
		),
	);

	return sendCodeToProfileEmailController;
}
