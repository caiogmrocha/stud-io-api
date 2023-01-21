export class BCryptHashError extends Error {
  public readonly data: Buffer;

  constructor (data: string) {
    const formattedData = data.length > 15 ? `${data.substring(15)}...` : data;

    super(`Não foi possível gerar o hash do dado: "${formattedData}".`);

    this.data = Buffer.from(data);
    this.name = 'BCryptHashError';
  }
}
