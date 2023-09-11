export class CanNotSendEmailError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'CanNotSendEmailError';
	}
}
