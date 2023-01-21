export class JWTSignError<IParams = any> extends Error {
  constructor (public readonly params: IParams) {
    super(`Não foi possível gerar o token JWT. Dados: `);
    this.name = "JWTSignError";
  }
}
