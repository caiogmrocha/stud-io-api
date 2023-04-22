import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import * as Http from "../../contracts";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

export class ProfileIsAuthenticatedMiddleware implements Http.IMiddleware {
	constructor (
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async handle({ headers }: Http.IHttpRequest): Promise<Http.IHttpResponse> {
		try {
			const token = headers.Authorization?.split('Bearer ')?.[0] || '';

			const result = await this.jwtAuthenticationProvider.verify(token);

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					case JWTVerifyError:
						return Http.unauthorized(new Http.UnauthorizedError());

					default:
						return Http.serverError(new Http.InternalServerError());
				}
			}

			return Http.ok({ profileId: result.value.id });
		} catch (error) {
			return Http.serverError(error as Error);
		}
	}
}
