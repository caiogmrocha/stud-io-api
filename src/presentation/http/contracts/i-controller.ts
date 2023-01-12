import { IHttpRequest } from "./i-http-request";
import { IHttpResponse } from "./i-http-response";

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
