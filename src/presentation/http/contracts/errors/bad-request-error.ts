export class BadRequestError extends Error {
	constructor (message?: string) {
		super(message || 'Parâmetros de requisição inválidos.');
		this.name = 'BadRequestError';
	}
}
