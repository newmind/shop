
export class CustomError extends Error {
  constructor(data = {}) {
    super();

    this.name = CustomError.name;
    this.status = 500;
    this.data = data;
    this.message = 'Internal Server Error';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export class NetworkError extends CustomError {
  constructor(data) {
    super(data);

    this.name = NetworkError.name;

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

export class BadRequestError extends CustomError {
  constructor(data) {
    super(data);

    this.name = BadRequestError.name;
    this.status = 400;
    this.message = 'Bad request';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

export class NotAuthError extends CustomError {
  constructor(data) {
    super(data);

    this.name = NotAuthError.name;
    this.status = 401;
    this.message = 'Not authorize';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NotAuthError);
    }
  }
}

export class NotFoundError extends CustomError {
  constructor(data) {
    super(data);

    this.name = NotFoundError.name;
    this.status = 404;
    this.message = 'Not found';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

export class ValidationError extends CustomError {
  constructor(data) {
    super(data);

    this.name = ValidationError.name;
    this.status = 417;
    this.message = 'Expectation Failed';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export class InternalError extends CustomError {
  constructor(data) {
    super(data);

    this.name = InternalError.name;

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, InternalError);
    }
  }
}
