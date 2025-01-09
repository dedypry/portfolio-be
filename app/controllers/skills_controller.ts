import Skill from '#models/skill'
import { createSkillValidator } from '#validators/skill'
import type { HttpContext } from '@adonisjs/core/http'

export default class SkillsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const data = await Skill.query()
    return response.json(data)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = request.only(['title', 'color', 'value', 'user_id'])

    data.user_id = auth.user?.id
    await request.validateUsing(createSkillValidator)

    const skill = await Skill.create(data)
    return response.json({
      message: 'Skill created successfully',
      data: skill,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const skill = await Skill.findOrFail(params.id)
    return response.json(skill)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['title', 'color', 'value', 'user_id'])
    await request.validateUsing(createSkillValidator)

    const skill = await Skill.findOrFail(params.id)
    skill.merge(data)
    await skill.save()

    return response.json({
      message: 'Skill updated successfully',
      data: skill,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const skill = await Skill.findOrFail(params.id)
    await skill.delete()
    return {
      message: 'Skill deleted successfully',
    }
  }
}
