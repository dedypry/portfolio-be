import vine from '@vinejs/vine'

export const createSkillValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    color: vine.string().trim(),
    value: vine.number().min(0).max(100),
    user_id: vine.number().optional(),
  })
)
