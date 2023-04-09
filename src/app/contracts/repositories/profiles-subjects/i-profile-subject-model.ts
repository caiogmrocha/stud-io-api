import { IProfileModel } from "../profiles/i-profile-model";
import { ISubjectModel } from "../subjects/i-subject-model";

export type IProfileSubjectModel = {
	profile_id: string;
	subject_id: number;
	created_at: Date;
	updated_at?: Date;

	profile?: IProfileModel;
	subject?: ISubjectModel;
}
