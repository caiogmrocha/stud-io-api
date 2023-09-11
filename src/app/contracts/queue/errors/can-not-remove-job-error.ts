export class CanNotRemoveJobError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CanNotRemoveJobError';
	}
}
