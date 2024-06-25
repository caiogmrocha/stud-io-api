export type IHttpRequest<B = any, P = any, Q = any, H = IHttpRequestHeaders> = {
	body: B;
  params: P;
  query: Q;
	headers: H;
};

export type IHttpRequestHeaders = {
	Authorization?: string;
};
