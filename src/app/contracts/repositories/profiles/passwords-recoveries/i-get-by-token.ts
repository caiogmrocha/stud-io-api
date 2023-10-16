import { IPasswordRecoveryModel } from "./i-password-recovery-model";

type ITokenType = Extract<keyof IPasswordRecoveryModel, `${string}_token`>;

export interface IGetPasswordRecoveryByTokenRepository {
	getByToken(token: string, type: ITokenType): Promise<IPasswordRecoveryModel | null>;
}
