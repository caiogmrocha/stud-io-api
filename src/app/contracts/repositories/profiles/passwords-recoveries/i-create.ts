import { IPasswordRecoveryModel } from "./i-password-recovery-model";

export type IPasswordRecoveryModelToCreate = Omit<IPasswordRecoveryModel, (
	| 'id'
	| 'change_password_token'
	| 'created_at'
	| 'updated_at'
	| 'recovered_at'
)>

export interface ICreatePasswordRecoveryRepository {
	create(data: IPasswordRecoveryModelToCreate): Promise<IPasswordRecoveryModel>;
}
