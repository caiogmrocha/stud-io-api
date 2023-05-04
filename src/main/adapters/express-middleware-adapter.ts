import { IHttpRequest } from "@/presentation/http/contracts";
import { IMiddleware } from "@/presentation/http/contracts/i-middleware";

import { NextFunction, Request, Response } from "express";

export function adaptMiddleware(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const adaptedRequest: IHttpRequest = {
      body: request.body,
			params: request.params,
			query: request.query,
			headers: {
				Authorization: request.headers?.authorization,
			},
    };

    const httpResponse = await middleware.handle(adaptedRequest)

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      Object.assign(request.body, httpResponse.body)

      return next();
    } else {
      return response.status(httpResponse.status).json({
        error: httpResponse.body.error
      })
    }
  }
}
