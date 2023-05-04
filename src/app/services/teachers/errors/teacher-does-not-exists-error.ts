export class TeacherDoesNotExistsError extends Error {
  constructor () {
    super('Não foi encontrado nenhum professor correspondente');
    this.name = 'TeacherDoesNotExistsError';
  }
}
