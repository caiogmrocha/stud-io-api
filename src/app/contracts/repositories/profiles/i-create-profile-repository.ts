import { IProfileModel } from "./i-profile-model";

export type IProfileModelToCreate = Omit<IProfileModel, 'id' | 'created_at'>;

export interface ICreateProfileRepository {
  create(data: IProfileModelToCreate): Promise<IProfileModel>;
}
