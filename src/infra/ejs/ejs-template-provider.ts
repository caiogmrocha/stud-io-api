import { CanNotRenderTemplateError } from "@/app/contracts/template/errors/can-not-render-template-error";
import { ITemplateProvider, ITemplateProviderInputBoundary, ITemplateProviderOutputBoundary } from "@/app/contracts/template/i-template-provider";
import { left, right } from "@/utils/logic/either";

import ejs from 'ejs';

export class EjsTemplateProvider implements ITemplateProvider {
	async render(input: ITemplateProviderInputBoundary): Promise<ITemplateProviderOutputBoundary> {
		try {
			const renderedTemplate = ejs.render(/* HTML */`
				<h1><%= profileOwnerName %></h1>
				<h2><%= code %></h2>
			`, input.templateData);

			return right(renderedTemplate);
		} catch (error) {
			return left(new CanNotRenderTemplateError('Não foi possível renderizar o template.'));
		}
	}
}
