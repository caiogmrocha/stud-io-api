export class MaximumCodeVerificationAttemptsReachedError extends Error {
	constructor () {
		super('Máximo de tentativas de recuperação de senha atingido');
		this.name = 'MaxAttemptsOfPasswordRecoveryReachedError';
	}
}
