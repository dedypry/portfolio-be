import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class FileValidatorException extends Exception {
  private printMsg: any[]
  status: number

  constructor(message: any[], status: number = 400) {
    super()
    this.printMsg = message
    this.status = status
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send(this.printMsg)
  }
}
