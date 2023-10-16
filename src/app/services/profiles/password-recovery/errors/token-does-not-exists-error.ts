export class TokenDoesNotExistError extends Error {
	constructor(token: string) {
		super(`Não foi encontrado nenhum registro de recuperação de senha com o token ${token}`);
		this.name = 'TokenDoesNotExistError';
	}
}
