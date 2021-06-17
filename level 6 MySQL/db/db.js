const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

// connecting mysql
connection.connect((error) => {
	if (error) {
		console.error("Error connecting: ", error.stack);
		return;
	}
	console.log("Connecting to: ", connection.threadId);
}
);

module.exports = connection;