import { IPasswordRecoveryModel } from "./i-password-recovery-model";

export type IPasswordRecoveryModelToCreate = Omit<IPasswordRecoveryModel, (
	| 'id'
	| 'change_password_token'
	| 'created_at'
	| 'updated_at'
	| 'recovered_at'
)>

export interface ICreatePasswordRecoveryRequestRepository {
	createPasswordRecoveryRegister(data: IPasswordRecoveryModelToCreate): Promise<IPasswordRecoveryModel>;
}
