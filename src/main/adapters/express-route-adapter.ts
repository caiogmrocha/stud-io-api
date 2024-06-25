import { IController } from "@/presentation/http/contracts";
import { Request, Response } from "express";

export function adaptRoute(controller: IController) {
  return async function (request: Request, response: Response) {
    const body = request.body;
    const params = request.params;
    const query = request.query;

    const httpResponse = await controller.handle({
			body,
			params,
			query,
			headers: {
				Authorization: request.headers.authorization,
			}
		});

    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      return response.status(httpResponse.status).json(httpResponse.body);
    } else {
      return response.status(httpResponse.status).json({
        error: httpResponse.body.error
      });
    }
  }
}
