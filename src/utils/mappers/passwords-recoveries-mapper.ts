import { IPasswordRecoveryModel } from "@/app/contracts/repositories/passwords-recoveries/i-password-recovery-model";
import { PasswordRecovery } from "@prisma/client";


export class PasswordsRecoveryMapper {
	public static fromPrismaToModel(from: PasswordRecovery): IPasswordRecoveryModel {
		const passwordRecovery: IPasswordRecoveryModel = {
			id: from.id,
			profile_id: from.profileId,
			code: from.code,
			send_code_token: from.sendCodeToken,
			expires_at: from.expiresAt || undefined,
			created_at: from.createdAt,
			updated_at: from.updatedAt || undefined,
		};

		return passwordRecovery
	}
}
