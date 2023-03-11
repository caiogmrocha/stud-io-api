import { adaptRoute } from "../adapters/express-route-adapter";
import { authenticateProfileControllerFactory } from "../factories/controllers/profiles/authenticate-profile-controller-factory";
import { registerProfileControllerFactory } from "../factories/controllers/profiles/register-profile-controller-factory";

import { Router } from "express";
import { getProfileDetailsControllerFactory } from "../factories/controllers/profiles/get-profile-details-controller-factory";

const profileRouter = Router();

profileRouter.get('/:id', adaptRoute(getProfileDetailsControllerFactory()));
profileRouter.post('/', adaptRoute(registerProfileControllerFactory()));
profileRouter.post('/login', adaptRoute(authenticateProfileControllerFactory()));

export { profileRouter };
