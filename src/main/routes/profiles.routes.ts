import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { registerProfileControllerFactory } from "../factories/register-profile-controller-factory";

const profileRouter = Router();

profileRouter.post('/', adaptRoute(registerProfileControllerFactory()));

export { profileRouter }
