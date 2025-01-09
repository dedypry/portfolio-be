import InvalidDataException from '#exceptions/invalid_data_exception'
import Experience from '#models/experience'
import { createExperienceValidator } from '#validators/experience'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExperiencesController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const data = await Experience.query().where('user_id', auth.user!.id)

    return response.json(data)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createExperienceValidator)

    data.user_id = auth.user!.id

    const experience = await Experience.create(data)

    return response.json({
      message: 'Experience created successfully',
      data: experience,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const experience = await Experience.findOrFail(params.id)

    return response.json(experience)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(createExperienceValidator)

    const experience = await Experience.findOrFail(params.id)
    experience.merge(data)
    await experience.save()

    return response.json({
      message: 'Experience updated successfully',
      data: experience,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const experience = await Experience.findOrFail(params.id)
    await experience.delete()

    return response.json({
      message: 'Experience deleted successfully',
    })
  }
}
