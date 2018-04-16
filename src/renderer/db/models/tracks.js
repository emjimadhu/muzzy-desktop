import Sequelize from 'sequelize'
import { sequelize } from '@/db/sequelize'

export const tracks = sequelize.define('tracks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  cover: Sequelize.STRING,
  base64: Sequelize.STRING
})
