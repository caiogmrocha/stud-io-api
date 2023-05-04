export class NotFoundError extends Error {
	constructor (message?: string) {
		super(message || 'Recurso não encontrado.');
		this.name = 'NotFoundError';
	}
}
