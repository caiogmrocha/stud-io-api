import { ISendCodeToProfileEmailServiceResult, ISendCodeToProfileEmailUseCase, ISendCodeToProfileEmailUseCaseInputBoundary } from "@/domain/usecases/profiles/password-recovery/i-send-code-to-profile-email-use-case";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { ICreatePasswordRecoveryRepository } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-create";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { IQueueProvider } from "@/app/contracts/queue/i-queue-provider";
import { ProfileDoesNotExistsError } from "../errors/profile-does-not-exists-error";
import { left, right } from "@/utils/logic/either";

export class SendCodeToProfileEmailService implements ISendCodeToProfileEmailUseCase {
	constructor(
		private readonly getProfilesRepository: IGetProfilesRepository,
		private readonly createPasswordRecoveryRepository: ICreatePasswordRecoveryRepository,
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
		private readonly queueProvider: IQueueProvider,
	) {}

	async execute(input: ISendCodeToProfileEmailUseCaseInputBoundary): Promise<ISendCodeToProfileEmailServiceResult> {
		const [ profile ] = await this.getProfilesRepository.get({
			where: [
				['email', '=', input.email]
			],
			relations: {
				student: { fields: ['name'] },
				teacher: { fields: ['name'] },
			},
		});

		if (!profile) {
			return left(new ProfileDoesNotExistsError());
		}

		const expirationTimeInMilisseconds = 3 * 60 * 60 * 1000;

		const token = await this.jwtAuthenticationProvider.sign({
			id: profile.id,
			email: input.email,
		}, expirationTimeInMilisseconds);

		if (token.isLeft()) {
			return left(new ProfileDoesNotExistsError());
		}

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await this.queueProvider.addJob('send-email-queue', {
			to: input.email,
			subject: 'Recuperação de senha',
			templatePath: 'password-recovery',
			templateData: {
				profileOwnerName: profile.type === 'student' ? profile.student!.name : profile.teacher!.name,
				code,
			},
		}, {
			id: profile.id,
			delay: 10000,
			attempts: 3,
		});

		await this.createPasswordRecoveryRepository.create({
			profile_id: profile.id,
			code,
			send_code_token: token.value,
			expires_at: new Date(new Date().getTime() + expirationTimeInMilisseconds),
			attempts: 0,
		});

		return right({
			code,
			token: token.value,
		});
	}
}
