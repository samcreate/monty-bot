import Sequelize from 'sequelize';

const db = new Sequelize('monty', null, null, {
  dialect: 'postgres'
})
