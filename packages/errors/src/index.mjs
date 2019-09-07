'use strict';

export class CustomError extends Error {
  constructor(data = {}) {
    super();

    this.name = CustomError.name;
    this.message = 'Что-то пошло не так';
    this.data = data;

    Error.captureStackTrace(this, CustomError);
  }
}

export class NetworkError extends CustomError {
  constructor(status, data) {
    super(data);

    this.name = NetworkError.name;
    this.status = status;
    this.message = 'Ошибка сети';

    Error.captureStackTrace(this, NetworkError);
  }
}

export class ValidationError extends CustomError {
  constructor(data) {
    super(data);

    this.name = this.constructor.name;
    this.status = 500;
    this.message = 'Ошибка валидации';

    Error.captureStackTrace(this, ValidationError);
  }
}
