import vine from '@vinejs/vine'

export const createEducationValidator = vine.compile(
  vine.object({
    logo: vine.string().trim(),
    school: vine.string().trim(),
    title: vine.string().trim(),
    field: vine.string().trim(),
    start_at: vine.date(),
    finish_at: vine.date(),
    user_id: vine.number().optional(),
    ipk: vine.number().min(0).max(4),
    activity: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
  })
)
