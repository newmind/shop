
class BaseError extends Error {
  name = '';
  status = 0;
  data = null;

  constructor(status = '500', data = 'Что-то пошло не так') {
    super();

    this.name = 'NetworkError';
    this.status = status;
    this.data = data;

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, BaseError);
    }
  }
}

export class UnavailableError extends BaseError {
  constructor(data = 'Сервис временно недоступен') {
    super(503, data);

    this.name = 'UnavailableError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UnavailableError);
    }
  }
}

export class NetworkError extends BaseError {
  constructor(data = 'Что-то пошло не так') {
    super(500, data);

    this.name = 'NetworkError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}

export class ForbiddenError extends BaseError {
  constructor(data = 'Недостаточно прав') {
    super(403, data);

    this.name = 'ForbiddenError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}

export class NotfoundError extends BaseError {
  constructor(data = 'Запрашиваемый ресурс не найден') {
    super(404, data);

    this.name = 'NotfoundError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, NotfoundError);
    }
  }
}

export class UnauthorizedError extends BaseError {
  constructor(data = 'Пользователь неавторизован') {
    super(401, data);

    this.name = 'UnauthorizedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

  }
}

export class ValidationError extends BaseError {
  constructor(data = 'Ошибка авторизации') {
    super(400, data);

    this.name = 'ValidationError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export class LockedError extends BaseError {
  constructor(data = 'Пользователь заблокирован') {
    super(423, data);

    this.name = 'LockedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, LockedError);
    }
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(data = 'Метод не поддерживается') {
    super(405, data);

    this.name = 'MethodNotAllowedError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, MethodNotAllowedError);
    }
  }
}

export class UserNotFoundError extends BaseError {
  constructor(data = 'Пользователь не найден') {
    super(500, data);

    this.name = 'UserNotFoundError';

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
  }
}
