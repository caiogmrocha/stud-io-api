export class ProfileAlreadyExistsError extends Error {
  constructor (email: string) {
    super(`Um perfil com o e-mail ${email} já existe.`);
    this.name = 'ProfileAlreadyExistsError';
  }
}
