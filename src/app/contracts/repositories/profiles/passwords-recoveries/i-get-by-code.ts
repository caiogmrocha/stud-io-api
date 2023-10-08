import { IPasswordRecoveryModel } from "./i-password-recovery-model";

export interface IGetPasswordRecoveryByCodeRepository {
	getByCode(code: string): Promise<IPasswordRecoveryModel | null>;
}
