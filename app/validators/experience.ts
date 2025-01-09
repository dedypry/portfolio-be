import vine from '@vinejs/vine'

export const createExperienceValidator = vine.compile(
  vine.object({
    position: vine.string().trim(),
    type: vine.string().trim().optional(),
    company_logo: vine.string().trim().optional(),
    company_name: vine.string().trim(),
    location: vine.string().trim(),
    location_type: vine.string().trim(),
    start_at: vine.date(),
    finish_at: vine.date(),
    description: vine.string().trim().optional(),
    skills: vine.array(vine.string().trim()).optional(),
    user_id: vine.number().optional(),
  })
)
