require('dotenv').config()
const {CONECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    sequelize
}