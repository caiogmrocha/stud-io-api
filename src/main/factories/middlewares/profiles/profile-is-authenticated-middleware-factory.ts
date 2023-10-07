import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { ProfileIsAuthenticatedMiddleware } from "@/presentation/http/middlewares/profiles/profile-is-authenticated-middleware";

export function profileIsAuthenticatedMiddlewareFactory() {
	const jwtAuthenticationProvider = new JWTAuthenticationProvider();
	const profileIsAuthenticatedMiddleware = new ProfileIsAuthenticatedMiddleware(jwtAuthenticationProvider);

	return profileIsAuthenticatedMiddleware;
}
