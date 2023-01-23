export type IHttpRequest<B = any, P = any, Q = any> = {
  body: B;
  params: P;
  query: Q;
};
