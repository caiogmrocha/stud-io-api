import { IUpdateProfileRegistrationUseCase } from '@/domain/usecases/profiles/i-update-profile-registration-use-case';
import { ProfileDoesNotExistsError } from '@/app/services/profiles/errors/profile-does-not-exists-error';
import { TeacherDoesNotExistsError } from '@/app/services/teachers/errors/teacher-does-not-exists-error';
import { StudentDoesNotExistsError } from '@/app/services/students/errors/student-does-not-exists-error';
import { IJWTAuthenticationProvider } from '@/app/contracts/auth/jwt/i-jwt-authentication-provider';
import { JWTVerifyError } from '@/app/contracts/auth/jwt/errors/jwt-verify-error';

import * as Http from '../../contracts';

export type IUpdateProfileRegistrationRequest = Http.IHttpRequest<
	{
		name: string;
		email: string;
		subjectsIds: number[];
	},
	{
		id: string;
	}
>;

export class UpdateProfileRegistrationController implements Http.IController {
	constructor (
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
		private readonly updateProfileRegistrationService: IUpdateProfileRegistrationUseCase,
	) {}

	async handle({ body, headers }: IUpdateProfileRegistrationRequest): Promise<Http.IHttpResponse> {
		const authenticationVerification = await this.jwtAuthenticationProvider.verify(headers.Authorization || '');

		if (authenticationVerification.isLeft()) {
			const error = authenticationVerification.value;

			switch (error.constructor) {
				case JWTVerifyError:
					return Http.unauthorized(new Http.UnauthorizedError());

				default:
					return Http.serverError(new Http.InternalServerError());
			}
		}

		const updateProfileRegistrationResult = await this.updateProfileRegistrationService.execute({
			id: authenticationVerification.value.id,
			email: body.email,
			name: body.name,
			subjectsIds: body.subjectsIds,
		});

		if (updateProfileRegistrationResult.isLeft()) {
			const error = updateProfileRegistrationResult.value;

			switch (error.constructor) {
				case ProfileDoesNotExistsError:
					return Http.notFound(error);

				case TeacherDoesNotExistsError:
					return Http.notFound(error);

				case StudentDoesNotExistsError:
					return Http.notFound(error);

				default:
					return Http.serverError(error);
			}
		}

		return Http.ok(null);
	}
}
