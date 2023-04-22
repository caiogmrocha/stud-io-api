export class UnauthorizedError extends Error {
	constructor (message?: string) {
		super('Unauthorized');
		this.name = 'UnauthorizedError';

		if (message) this.message = message;
	}
}
