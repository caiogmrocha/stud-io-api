import { ICreatePasswordRecoveryRepository, IPasswordRecoveryModelToCreate } from "@/app/contracts/repositories/passwords-recoveries/i-create";
import { IPasswordRecoveryModel } from "@/app/contracts/repositories/passwords-recoveries/i-password-recovery-model";
import { PasswordRecovery, Profile } from "@prisma/client";
import { prisma } from "./prisma";
import { PasswordsRecoveryMapper } from "@/utils/mappers/passwords-recoveries-mapper";

type IPrismaPasswordRecoveryAdapted = PasswordRecovery & {
  profile?: Profile;
};

type IPasswordRecoveriesRepository = ICreatePasswordRecoveryRepository;

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
}
