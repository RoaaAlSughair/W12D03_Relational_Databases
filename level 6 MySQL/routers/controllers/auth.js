const connection = require("../../db/db");

const login = (req, res) => {
	const { email, password } = req.body;
	const query = `SELECT * FROM users WHERE email="${email}" AND password="${password}";`;
	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		if (result[1] === 200)
				return res.status(result[1]).json({ token: result[0] });

			res.status(result[1]).json(result[0]);
	})
};

module.exports = {
	login,
};
