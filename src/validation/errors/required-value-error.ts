export class RequiredValueError extends Error {
  constructor () {
    super('Este campo é obrigatório.');
    this.name = 'RequiredValueError';
  }
}
