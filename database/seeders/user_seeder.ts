import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      fullName: 'dedy priyatna',
      email: 'dedypry@gmail.com',
      password: 'H4nyaakusaja@',
    })
  }
}
