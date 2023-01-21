export class JWTVerifyError extends Error {
  constructor (public readonly token: string) {
    super(`Não foi possível verificar o token JWT: ${token}`);
  }
}
