export class InternalServerError extends Error {
	constructor () {
		super('Erro interno do servidor.');
		this.name = 'InternalServerError';
	}
}
