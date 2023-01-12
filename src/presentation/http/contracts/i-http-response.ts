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

export const clientError = (error: Error): IHttpResponse => {
  return {
    body: {
      error
    },
    status: 400
  };
};

export const notFound = (error: Error): IHttpResponse => {
  return {
    body: {
      error,
    },
    status: 404
  }
}

export const unauthorized = (error: Error): IHttpResponse => {
  return {
    body: {
      error
    },
    status: 401
  }
}

export const conflict = (error: Error): IHttpResponse => {
  return {
    body: {
      error
    },
    status: 403
  }
}

export const unprocessable = (error: Error): IHttpResponse => {
  return {
    body: {
      error
    },
    status: 422
  };
};

export const serverError = (error: Error): IHttpResponse => {
  return {
    body: {
      error
    },
    status: 500
  };
};
