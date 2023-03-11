import { IProfileModel } from "../profiles/i-profile-model";
import { IStudentModel } from "../students/i-student-model";
import { ITeacherModel } from "../teachers/i-teacher-model";

export type IAvailableModelsWithColumns = {
  profile: keyof IProfileModel;
  profiles: keyof IProfileModel;
  student: keyof IStudentModel;
  students: keyof IStudentModel;
  teacher: keyof ITeacherModel;
  teachers: keyof ITeacherModel;
};

/**
 * This is used to generically typing the internal "relations"
 * clause standard for "get" method of repositories.
 *
 * @member {Object|Boolean} key if defined, the relation have to be returned
 * @member {Array<String>} key.fields indicate the fields that have to be returned
 *
 * @param {String} K aliases for the available relations
 */
export type IRelationsClauseOption<K extends keyof IAvailableModelsWithColumns> = Partial<{
  [key in K]: {
    fields: Partial<Array<IAvailableModelsWithColumns[key]>>,
    /* with?: IRelationsClauseOption<K>, */ /** @todo */
  } | boolean;
}>
