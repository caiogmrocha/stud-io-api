export class InternalServerError extends Error {
	constructor (message?: string) {
		super('Internal Server Error');
		this.name = 'InternalServerError';

		if (message) this.message = message;
	}
}
