import env from '#start/env'
import { BaseMail } from '@adonisjs/mail'

export default class LoginSuccessNotification extends BaseMail {
  from = env.get('SMTP_USERNAME')
  subject = 'Success Login'

  constructor(private profile: any) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to(this.profile.email)
      .from(this.from)
      .subject(this.subject)
      .htmlView('emails/login-success', { profile: this.profile })
  }
}
