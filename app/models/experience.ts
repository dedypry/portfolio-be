import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Experience extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare position: string

  @column()
  declare type: string

  @column()
  declare company_logo: string

  @column()
  declare company_name: string

  @column()
  declare location: string

  @column()
  declare locationType: string

  @column()
  declare startAt: string

  @column()
  declare finishAt: string

  @column()
  declare description: string

  @column()
  declare skills: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @beforeCreate()
  static setDefaultValues(experience: Experience) {
    experience.skills = JSON.stringify(experience.skills || []) as any
  }
}
