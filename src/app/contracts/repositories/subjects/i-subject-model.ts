import { IStudentModel } from "../students/i-student-model";
import { ITeacherModel } from "../teachers/i-teacher-model";

export type ISubjectModel = {
	id: number;
	name: string;
	display_name: string;
	description: string;
	created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: boolean;

	students?: IStudentModel[];
	teachers?: ITeacherModel[];
}
