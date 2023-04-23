import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import * as Http from "../../contracts";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

export class ProfileIsAuthenticatedMiddleware implements Http.IMiddleware {
	constructor (
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async handle({ headers }: Http.IHttpRequest): Promise<Http.IHttpResponse> {
		try {
			const token = headers.Authorization?.split('Bearer ')?.[1] || '';

			const result = await this.jwtAuthenticationProvider.verify(token);

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					case JWTVerifyError:
						return Http.unauthorized();

					default:
						return Http.badRequest();
				}
			}
			return Http.ok({ profileId: result.value.id });
		} catch (error) {
			return Http.serverError();
		}
	}
}
