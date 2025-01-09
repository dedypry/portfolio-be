import LoginSuccessNotification from '#mails/login_success_notification'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class UsersController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.all()

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    if (!user) {
      return response.status(401).json({
        message: 'Invalid credentials',
      })
    }

    const profile = await user.related('profile').query().first()

    await new LoginSuccessNotification(profile).sendLater(mail.use('smtp'))

    return response.json({
      message: 'Login success',
      data: {
        ...user.serialize(),
        profile,
      },
      token: token.value?.release(),
    })
  }

  async logout({ response, auth }: HttpContext) {
    const token = await auth.use('api').authenticate()
    await User.accessTokens.delete(auth.user!, token.id)
    return response.json({
      message: 'Logout success',
    })
  }
}
