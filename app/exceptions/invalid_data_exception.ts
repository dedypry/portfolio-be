import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InvalidDataException extends Exception {
  private printMsg: string
  constructor(message: string, status: number = 400) {
    super(message, { status })
    this.printMsg = message
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send(this.printMsg)
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, this.printMsg)
  }
}
