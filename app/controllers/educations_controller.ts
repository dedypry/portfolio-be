import Education from '#models/education'
import { createEducationValidator } from '#validators/education'
import type { HttpContext } from '@adonisjs/core/http'

export default class EducationsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const data = await Education.query()

    return response.json(data)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createEducationValidator)
    data.user_id = auth.user?.id

    const education = await Education.create(data)

    return response.json({
      message: 'Education created successfully',
      data: education,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const education = await Education.findOrFail(params.id)

    return response.json(education)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(createEducationValidator)

    const education = await Education.findOrFail(params.id)

    education.merge(data)

    await education.save()

    return response.json(education)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const education = await Education.findOrFail(params.id)

    await education.delete()

    return response.json({ message: 'Data has been deleted' })
  }
}
