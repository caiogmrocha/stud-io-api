import { IPasswordRecoveryModel } from "./i-password-recovery-model";

export type IPasswordRecoveryModelToUpdate = Partial<Omit<IPasswordRecoveryModel, (
	| 'id'
	| 'profile_id'
)>>;

export interface IUpdatePasswordRecoveryRepository {
	update: (data: IPasswordRecoveryModelToUpdate, id: string) => Promise<void>;
}
