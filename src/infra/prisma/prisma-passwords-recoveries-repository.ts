import { ICreatePasswordRecoveryRequestRepository, IPasswordRecoveryModelToCreate } from "@/app/contracts/repositories/passwords-recoveries/i-create-password-recovery-request-repository";
import { IPasswordRecoveryModel } from "@/app/contracts/repositories/passwords-recoveries/i-password-recovery-model";
import { PasswordRecovery, Profile } from "@prisma/client";
import { prisma } from "./prisma";
import { PasswordsRecoveryMapper } from "@/utils/mappers/passwords-recoveries-mapper";

type IPrismaPasswordRecoveryAdapted = PasswordRecovery & {
  profile?: Profile;
};

type IPasswordRecoveriesRepository = ICreatePasswordRecoveryRequestRepository;

export class PrismaPasswordRecoveriesRepository implements IPasswordRecoveriesRepository {
	async createPasswordRecoveryRegister(data: IPasswordRecoveryModelToCreate): Promise<IPasswordRecoveryModel> {
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
}
