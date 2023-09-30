export class CodeDoesNotExistError extends Error {
	constructor (code: string) {
		super(`Não foi encontrado nenhum registro de recuperação de senha com o código ${code}`);
		this.name = 'CodeDoesNotExistError';
	}
}
