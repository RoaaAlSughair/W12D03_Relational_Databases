const mysql = require("mysql2");
const connection = require('./../../db/db');

const createNewComment = (req, res) => {
	const articleId = req.params.id;
	const { comment, commenter } = req.body;

	const command = `SELECT id INTO @commenter_id FROM users WHERE lastName="${commenter}";`;
	connection.query(command, (error, result) => {
		if (error) {
			throw error;
		}
	});

	const data = [articleId, comment];
	const query=`INSERT INTO comments (articleId, comment, comment_id) VALUES (?, ?, @commenter_id);`;

	connection.query(query, data, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result);
	});
};

module.exports = {
	createNewComment,
};
