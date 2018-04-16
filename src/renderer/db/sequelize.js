import Sequelize from 'sequelize'

export const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'db/database.db',
  logging: false
})
