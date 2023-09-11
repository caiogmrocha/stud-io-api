import { Either } from "@/utils/logic/either";

export type ISendEmailUseCaseInputBoundary<T extends any = any> = {
	to: string;
	from: string;
	subject: string;
	templatePath: string;
	templateData: T;
}

export interface ISendEmailUseCase {
	execute(input: ISendEmailUseCaseInputBoundary): Promise<Either<Error, void>>;
}
