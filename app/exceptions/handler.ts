import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth'
import { errors as dbError } from '@adonisjs/lucid'
import { errors as vineError } from '@vinejs/vine'
import FileValidatorException from './file_validator_exception.js'
export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (Object.keys(errors).includes((error as any).constructor.name)) {
      return ctx.response.status((error as any).status).send({
        message: (error as any).getResponseMessage(error, ctx),
      })
    }

    if (error instanceof vineError.E_VALIDATION_ERROR) {
      return ctx.response.status(error.status).send(error.messages)
    }
    if (error instanceof dbError.E_ROW_NOT_FOUND) {
      return ctx.response.status(404).send({
        message: 'Data not found',
      })
    }

    if (error instanceof FileValidatorException) {
      return ctx.response.status(error.status).send((error as any).printMsg)
    }

    if (error instanceof Error) {
      return ctx.response.status((error as any).status).send({
        message: (error as any).printMsg || 'Internal Server Error',
      })
    }
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
