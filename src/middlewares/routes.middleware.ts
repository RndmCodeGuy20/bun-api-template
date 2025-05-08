import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ERROR_CODES } from '#constants';
import { createMiddleware } from 'hono/factory';
import type { Context, Next } from 'hono';

/**
 * MethodNotAllowedError
 * @extends {Error}
 * @description Method not allowed error
 * @version 1.0
 * @example
 * throw new MethodNotAllowedError("Method not allowed", 405, 405);
 */
class MethodNotAllowedError extends Error {
  private info: object;
  private status: number;
  private errorCode: string;
  /**
   * MethodNotAllowedError
   * @param {string} message
   * @param {object} info
   * @param {string} httpStatus
   * @param {string} errorCode
   */
  constructor(
    message: string,
    info: object,
    httpStatus: number,
    errorCode: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.info = info;
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

/**
 * methodNotAllowed
 * @description Method not allowed
 * @throws {MethodNotAllowedError}
 * @version 1.0
 * @example
 * methodNotAllowed();
 */
export const methodNotAllowed = () => {
  throw new MethodNotAllowedError(
    ReasonPhrases.METHOD_NOT_ALLOWED,
    { message: 'Method not allowed' },
    StatusCodes.METHOD_NOT_ALLOWED,
    ERROR_CODES.NOT_ALLOWED
  );
};

/**
 * RouteNotFoundError
 * @extends {Error}
 * @description Route not found error
 * @version 1.0
 * @example
 * throw new RouteNotFoundError("Route not found", 404, 404);
 */
export class RouteNotFoundError extends Error {
  private info: object;
  private status: number;
  private errorCode: string;
  /**
   * RouteNotFoundError
   * @param {string} message
   * @param {object} info
   * @param {string} httpStatus
   * @param {string} errorCode
   */
  constructor(
    message: string,
    info: object,
    httpStatus: number,
    errorCode: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.info = info;
    this.status = httpStatus;
    this.errorCode = errorCode;
  }
}

/**
 * routeNotFound
 * @description Route not found
 * @throws {RouteNotFoundError}
 * @version 1.0
 *
 */
export const routeNotFoundMiddleware = createMiddleware(
  async (ctx: Context, next: Next) => {
    try {
      throw new RouteNotFoundError(
        ReasonPhrases.NOT_FOUND,
        { message: 'Route not found' },
        StatusCodes.NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    } catch (error) {
      await next();
      throw error;
    }
  }
);
