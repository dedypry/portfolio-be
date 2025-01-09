import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'experiences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('position')
      table.string('type')
      table.text('company_logo')
      table.string('company_name')
      table.string('location')
      table.string('location_type')
      table.date('start_at')
      table.date('finish_at')
      table.text('description')
      table.jsonb('skills')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
