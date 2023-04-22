import { IAuthenticatedProfilePayload } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { ProfileIsAuthenticatedMiddleware } from "@/presentation/http/middlewares/profiles/profile-is-authenticated-middleware";

export function profileIsAuthenticatedMiddlewareFactory() {
	const jwtAuthenticationProvider = new JWTAuthenticationProvider<IAuthenticatedProfilePayload>();
	const profileIsAuthenticatedMiddleware = new ProfileIsAuthenticatedMiddleware(jwtAuthenticationProvider);

	return profileIsAuthenticatedMiddleware;
}
