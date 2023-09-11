export class SendEmailServiceError extends Error {
		constructor(message: string) {
				super(message);
				this.name = 'SendEmailServiceError';
		}
}
