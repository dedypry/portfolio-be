import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('full_name')
      table.string('email')
      table.string('img_url')
      table.string('phone')
      table.string('address')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.string('linkedin')
      table.string('website')
      table.text('description')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
