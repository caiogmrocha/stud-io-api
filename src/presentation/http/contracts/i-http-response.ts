import { ValidationCompositeError } from "@/validation/errors/validation-composite-error";
import { InternalServerError, UnauthorizedError, UnprocessableEntityError } from "./errors";
import { NotFoundError } from "./errors/not-found-error";
import { BadRequestError } from "./errors/bad-request-error";
import { ForbiddenError } from "./errors/forbidden-error";

export type IHttpResponse<B = any> = {
  body: B;
  status: number;
};

export const ok = (data: any): IHttpResponse => {
  return {
    body: data,
    status: 200
  }
}

export const created = (): IHttpResponse => {
  return {
    body: null,
    status: 201
  };
};

export const badRequest = (message?: string): IHttpResponse => {
  return {
    body: { error: new BadRequestError(message) },
    status: 400
  };
};

export const notFound = (message?: string): IHttpResponse => {
  return {
    body: { error: new NotFoundError(message) },
    status: 404
  }
}

export const unauthorized = (message?: string): IHttpResponse => {
  return {
    body: { error: new UnauthorizedError(message) },
    status: 401,
  };
}

export const forbidden = (message?: string): IHttpResponse => {
  return {
    body: { error: new ForbiddenError(message) },
    status: 403,
  };
}

export const unprocessable = (error: ValidationCompositeError): IHttpResponse => {
  return {
    body: {
			error: new UnprocessableEntityError("Os dados enviados são inválidos.", error.errors)
		},
    status: 422,
  };
};

export const serverError = (): IHttpResponse => {
  return {
    body: { error: new InternalServerError() },
    status: 500,
  };
};
