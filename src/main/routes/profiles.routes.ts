import { adaptRoute } from "../adapters/express-route-adapter";
import { authenticateProfileControllerFactory } from "../factories/controllers/profiles/authenticate-profile-controller-factory";
import { registerProfileControllerFactory } from "../factories/controllers/profiles/register-profile-controller-factory";

import { Router } from "express";
import { getProfileDetailsControllerFactory } from "../factories/controllers/profiles/get-profile-details-controller-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";
import { profileIsAuthenticatedMiddlewareFactory } from "../factories/middlewares/profiles/profile-is-authenticated-middleware-factory";
import { updateProfileRegistrationControllerFactory } from "../factories/controllers/profiles/update-profile-registration-controller-factory";

const profileRouter = Router();

profileRouter.get('/:id', adaptRoute(getProfileDetailsControllerFactory()));
profileRouter.post('/', adaptRoute(registerProfileControllerFactory()));
profileRouter.post('/login', adaptRoute(authenticateProfileControllerFactory()));
profileRouter.put(
	'/',
	adaptMiddleware(profileIsAuthenticatedMiddlewareFactory()),
	adaptRoute(updateProfileRegistrationControllerFactory()),
);

export { profileRouter };
