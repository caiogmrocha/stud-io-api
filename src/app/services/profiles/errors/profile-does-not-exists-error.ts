export class ProfileDoesNotExistsError extends Error {
  constructor () {
    super('Não foi encontrado nenhum perfil correspondente');
    this.name = 'ProfileDoesNotExistsError';
  }
}
