export class StudentDoesNotExistsError extends Error {
  constructor () {
    super('Não foi encontrado nenhum estudante correspondente');
    this.name = 'StudentDoesNotExistsError';
  }
}
