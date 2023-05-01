import { Either } from "@/utils/logic/either";
import { ValidationComposite } from "../validation-composite";

export type IValidatorCallback = (fieldName: string, fieldValue: unknown) => ValidationComposite;

export interface IValidator {
  fieldName: string;
  fieldValue: unknown;
	callback?: IValidatorCallback;
  validate(): Promise<Either<Error, void>>;
}
