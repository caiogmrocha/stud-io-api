type ISubjectDoesNotExistsErrorData = {
	ids: number[];
};

export class SubjectsDoesNotExistsError extends Error {
  constructor ({ ids }: ISubjectDoesNotExistsErrorData) {
    super('Não foram encontrados assuntos correspondentes aos ids: ' + ids.join(', '));
    this.name = 'SubjectsDoesNotExistsError';
  }
}
