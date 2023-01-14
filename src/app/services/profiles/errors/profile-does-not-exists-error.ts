export class ProfileDoesNotExistsError extends Error {
  constructor () {
    super('Não foi encontrado nenhum perfil que corresponda ao e-mail/senha informados');
    this.name = 'ProfileDoesNotExistsError';
  }
}
