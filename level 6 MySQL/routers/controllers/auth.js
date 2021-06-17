const mysql = require("mysql2");
const connection = require("../../db/db");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = "${email}" AND password = "${password}";`;
  connection.query(query, (error, result) => {
    if (error) {
      throw error;
    }

	res.status(200).json(result);
  });
};

module.exports = {
  login,
};
