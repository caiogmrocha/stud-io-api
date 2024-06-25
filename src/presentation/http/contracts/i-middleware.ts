import { IHttpRequest } from "./i-http-request";
import { IHttpResponse } from "./i-http-response";

export interface IMiddleware {
	handle(request: IHttpRequest): Promise<IHttpResponse>;
}
