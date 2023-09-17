import { Router } from "express";

import { adaptRoute } from "@/main/adapters/express-route-adapter";
import { adaptMiddleware } from "@/main/adapters/express-middleware-adapter";
import { authenticateProfileControllerFactory } from "@/main/factories/controllers/profiles/authenticate-profile-controller-factory";
import { registerProfileControllerFactory } from "@/main/factories/controllers/profiles/register-profile-controller-factory";
import { getProfileDetailsControllerFactory } from "@/main/factories/controllers/profiles/get-profile-details-controller-factory";
import { profileIsAuthenticatedMiddlewareFactory } from "@/main/factories/middlewares/profiles/profile-is-authenticated-middleware-factory";
import { updateProfileRegistrationControllerFactory } from "@/main/factories/controllers/profiles/update-profile-registration-controller-factory";
import { sendCodeToProfileEmailControllerFactory } from "@/main/factories/controllers/profiles/passwords-recoveries/send-code-to-profile-email";

const profileRouter = Router();

profileRouter.get('/:id', adaptRoute(getProfileDetailsControllerFactory()));
profileRouter.post('/', adaptRoute(registerProfileControllerFactory()));
profileRouter.post('/login', adaptRoute(authenticateProfileControllerFactory()));
profileRouter.put(
	'/',
	adaptMiddleware(profileIsAuthenticatedMiddlewareFactory()),
	adaptRoute(updateProfileRegistrationControllerFactory()),
);
profileRouter.post('/password-recovery/send-code-to-profile-email', adaptRoute(sendCodeToProfileEmailControllerFactory()));

export { profileRouter };
