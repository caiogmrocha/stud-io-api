type IProfileDoesNotExistsErrorData = {
	ids: string[];
};

export class ProfilesDoesNotExistsError extends Error {
  constructor ({ ids }: IProfileDoesNotExistsErrorData) {
    super('Não foram encontrados perfis correspondentes aos ids: ' + ids.join(', '));
    this.name = 'ProfileDoesNotExistsError';
  }
}
