import { ICreatePasswordRecoveryRepository, IPasswordRecoveryModelToCreate } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-create";
import { IPasswordRecoveryModel } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-password-recovery-model";
import { PasswordRecovery, Profile } from "@prisma/client";
import { prisma } from "./prisma";
import { PasswordsRecoveryMapper } from "@/utils/mappers/passwords-recoveries-mapper";
import { IGetPasswordRecoveryByCodeRepository } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-get-by-code";
import { IPasswordRecoveryModelToUpdate, IUpdatePasswordRecoveryRepository } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-update";

type IPrismaPasswordRecoveryAdapted = PasswordRecovery & {
  profile?: Profile;
};

type IPasswordRecoveriesRepository = (
	& ICreatePasswordRecoveryRepository
	& IGetPasswordRecoveryByCodeRepository
	& IUpdatePasswordRecoveryRepository
);

export class PrismaPasswordRecoveriesRepository implements IPasswordRecoveriesRepository {
	async create(data: IPasswordRecoveryModelToCreate): Promise<IPasswordRecoveryModel> {
		const createdPasswordRecovery = await prisma.passwordRecovery.create({
			data: {
				profileId: data.profile_id,
				code: data.code,
				sendCodeToken: data.send_code_token,
				expiresAt: data.expires_at,
			},
		}) as IPrismaPasswordRecoveryAdapted;

		return PasswordsRecoveryMapper.fromPrismaToModel(createdPasswordRecovery);
	}

	async getByCode(code: string): Promise<IPasswordRecoveryModel | null> {
		const passwordRecovery = await prisma.passwordRecovery.findFirst({
			where: {
				code,
			},
		}) as IPrismaPasswordRecoveryAdapted | null;

		if (!passwordRecovery) {
			return null;
		}

		return PasswordsRecoveryMapper.fromPrismaToModel(passwordRecovery);
	}

	async update(data: IPasswordRecoveryModelToUpdate, id: string): Promise<void> {
		await prisma.passwordRecovery.update({
			where: { id },
			data: {
				code: data.code,
				attempts: data.attempts,
				changePasswordToken: data.change_password_token,
				recoveredAt: data.recovered_at,
				sendCodeToken: data.send_code_token,
				expiresAt: data.expires_at,
			},
		});
	}
}
