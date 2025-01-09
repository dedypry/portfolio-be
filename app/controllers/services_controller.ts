import Service from '#models/service'
import { createServiceValidator } from '#validators/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const data = await Service.query()
    return response.json(data)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createServiceValidator)
    data.user_id = auth.user?.id
    const service = await Service.create(data)
    return response.json({
      message: 'Service created successfully',
      data: service,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    return response.json(service)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(createServiceValidator)
    const service = await Service.findOrFail(params.id)
    service.merge(data)
    await service.save()

    return response.json({
      message: 'Service updated successfully',
      data: service,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const service = await Service.findOrFail(params.id)
    await service.delete()
    return response.json({
      message: 'Service deleted successfully',
    })
  }
}
