export class ForbiddenError extends Error {
	constructor (message?: string) {
		super(message || 'Não autorizado.');
		this.name = 'ForbiddenError';
	}
}
