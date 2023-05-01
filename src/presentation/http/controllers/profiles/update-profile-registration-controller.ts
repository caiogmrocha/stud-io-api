import { IUpdateProfileRegistrationUseCase } from '@/domain/usecases/profiles/i-update-profile-registration-use-case';
import { ProfileDoesNotExistsError } from '@/app/services/profiles/errors/profile-does-not-exists-error';
import { TeacherDoesNotExistsError } from '@/app/services/teachers/errors/teacher-does-not-exists-error';
import { StudentDoesNotExistsError } from '@/app/services/students/errors/student-does-not-exists-error';
import * as Http from '../../contracts';
import { ValidationComposite } from '@/validation/validation-composite';
import { RequiredValueValidator } from '@/validation/rules/required-value-validator';
import { EmailFormatValidator } from '@/validation/rules/email-format-validator';
import { MinimumValueValidator } from '@/validation/rules/minimum-value-validator';
import { ValueInListValidator } from '@/validation/rules/value-in-list-validator';
import { IGetSubjectsUseCase } from '@/domain/usecases/subjects/i-get-all-subjects-use-case';
import { Subject } from '@/domain/entities';
import { IsArrayValidator } from '@/validation/rules/primitive-types/is-array-validator';

export type IUpdateProfileRegistrationRequest = Http.IHttpRequest<{
	profileId: string;
	name: string;
	email: string;
	subjectsIds: number[];
}>;

export class UpdateProfileRegistrationController implements Http.IController {
	constructor (
		private readonly getSubjectsService: IGetSubjectsUseCase,
		private readonly updateProfileRegistrationService: IUpdateProfileRegistrationUseCase,
	) {}

	async handle({ body }: IUpdateProfileRegistrationRequest): Promise<Http.IHttpResponse> {
		try {
			const validationComposite = new ValidationComposite([
        new RequiredValueValidator('name', body.name),
        new RequiredValueValidator('email', body.email),
        new EmailFormatValidator('email', body.email),
        new RequiredValueValidator('subjectsIds', body.subjectsIds),
				new IsArrayValidator('subjectsIds', body.subjectsIds, async (fieldName: string, fieldValue: unknown) => {
					const validators = [];

					const getSubjectsServiceResult = await this.getSubjectsService.execute();

					if (getSubjectsServiceResult.isRight() && getSubjectsServiceResult.value.length > 0) {
						const subjectsIds = getSubjectsServiceResult.value.map(subject => subject.id);

						validators.push(new ValueInListValidator('subjectsIds', fieldValue, subjectsIds));
					}

					return new ValidationComposite(validators);
				}),
      ]);

      const validationResult = await validationComposite.validate();

      if (validationResult.isLeft()) {
        return Http.unprocessable(validationResult.value);
      }

			const updateProfileRegistrationResult = await this.updateProfileRegistrationService.execute({
				id: body.profileId,
				email: body.email,
				name: body.name,
				subjectsIds: body.subjectsIds,
			});

			if (updateProfileRegistrationResult.isLeft()) {
				const error = updateProfileRegistrationResult.value;

				switch (error.constructor) {
					case ProfileDoesNotExistsError:
					case TeacherDoesNotExistsError:
					case StudentDoesNotExistsError:
						return Http.notFound('Perfil não encontrado.');

					default:
						return Http.badRequest();
				}
			}

			return Http.ok(null);
		} catch (error) {
			return Http.serverError();
		}
	}
}
