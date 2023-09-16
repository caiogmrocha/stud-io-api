import { Either } from "@/utils/logic/either";
import { CanNotRenderTemplateError } from "./errors/can-not-render-template-error";

export type ITemplateProviderInputBoundary = {
	templatePath: string;
	templateData: any;
}

export type ITemplateProviderOutputBoundary = Either<CanNotRenderTemplateError, string>;

export interface ITemplateProvider {
	render(input: ITemplateProviderInputBoundary): Promise<ITemplateProviderOutputBoundary>;
}
