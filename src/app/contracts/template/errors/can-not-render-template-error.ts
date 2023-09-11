export class CanNotRenderTemplateError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CanNotRenderTemplateError';
	}
}
