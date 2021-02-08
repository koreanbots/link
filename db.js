const knex = require('knex')

module.exports = knex({
	client: 'mysql',
	connection: {
		host: process.env.MYSQL_HOST || 'localhost',
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE || 'link',
		charset: 'utf8mb4'
	}
})