import { Either } from "@/utils/logic/either";

export interface IValidator {
  fieldName: string;
  fieldValue: unknown;
  validate(): Promise<Either<Error, void>>;
  validate(callback?: Function): Promise<Either<Error, void>>;
}
