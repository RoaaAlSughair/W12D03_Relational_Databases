const mysql = require("mysql2");
const connection = require("./../../db/db");

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ("${role}");`;
  connection.query(query, (error, result) => {
    if (error) {
      throw error;
    }

    res.json(result);
  });
};

module.exports = {
  createNewRole,
};
