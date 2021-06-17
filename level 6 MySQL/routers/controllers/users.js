const mysql = require("mysql2");
const connection = require("./../../db/db");

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } = req.body;
  const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const data = [firstName, lastName, age, country, email, password, role_id];
  connection.query(query, data, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    res.json(result);
  });
};

module.exports = {
  createNewAuthor,
};
