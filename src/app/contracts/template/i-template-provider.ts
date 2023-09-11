import { Either } from "@/utils/logic/either";
import { CanNotRenderTemplateError } from "./errors/can-not-render-template-error";

export type ITemplateProviderInputBoundary<T extends any = any> = {
	templatePath: string;
	templateData: T;
}

export type ITemplateProviderOutputBoundary = Either<CanNotRenderTemplateError, string>;

export interface ITemplateProvider {
	render<T extends any = any>(input: ITemplateProviderInputBoundary<T>): Promise<ITemplateProviderOutputBoundary>;
}
