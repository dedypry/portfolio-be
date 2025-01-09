import vine from '@vinejs/vine'

export const createServiceValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    content: vine.string().trim().optional(),
    icon: vine.string().trim(),
    color: vine.string().trim(),
    user_id: vine.number().optional(),
  })
)
