import Profile from '#models/profile'
import User from '#models/user'
import { PdfGeneratorService } from '#services/pdf_generator_service'
import axios from 'axios'
import type { HttpContext } from '@adonisjs/core/http'
import Experience from '#models/experience'
import moment from 'moment'
import Education from '#models/education'
import db from '@adonisjs/lucid/services/db'

export default class ProfilesController {
  async update({ request, response, auth }: HttpContext) {
    const body = request.only([
      'full_name',
      'img_url',
      'phone',
      'address',
      'city',
      'state',
      'zip',
      'linkedin',
      'website',
      'email',
      'description',
      'user_id',
    ])

    body.full_name = body.full_name || auth.user!.fullName
    body.email = body.email || auth.user?.email
    body.user_id = auth.user!.id

    console.log('body:', body)
    await User.query()
      .where('id', auth.user!.id)
      .update({ fullName: body.full_name, email: body.email })
    await Profile.updateOrCreate({ userId: auth.user!.id }, body)
    return response.json({ message: 'Update Success' })
  }

  async downloadPdf({ response, view, params }: HttpContext) {
    const user = await User.query()
      .preload('profile')
      .preload('educations')
      .preload('experiences')
      .where('id', params.id)
      .first()

    const img = await this.convertImageToBase64(user!.profile.imgUrl)
    const dataView = await view.render('pdf/portfolio', {
      ...user?.serialize(),
      img,
    })

    await PdfGeneratorService.make(response).download(dataView)
  }

  async convertImageToBase64(imageUrl: string) {
    try {
      // Fetch image data from the URL
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

      // Convert the image data to a base64 string
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')

      // Return the base64 string
      return `data:image/png;base64,${base64Image}`
    } catch (error) {
      console.error('Error fetching the image:', error)
    }
  }
}
