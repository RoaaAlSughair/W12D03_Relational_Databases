const connection = require("../../db/db");

const getAllArticles = (req, res) => {
	const query=`SELECT * FROM articles WHERE is_deleted = 0;`;
	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result).status(200);
	})
};

const getArticlesByAuthor = (req, res) => {
	const author = req.query.author;
	if (!author) return res.status(404).json('not found');

	const command = `SELECT id FROM users WHERE lastName="${author}";`;
	const author_id = connection.query(command, (error, result) => {
		if (error) {
			throw error;
		}
		return result;
	})

	const query = `SELECT * FROM articles WHERE author_id="${author_id}";`;

	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result).status(200);
	})
};

const getAnArticleById = (req, res) => {
	const id = req.params.id;
	if (!id) return res.status(404).json('not found');

	const query = `SELECT * FROM articles WHERE id=${id};`;

	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result).status(200);
	})
};

const createNewArticle = (req, res) => {
	const { title, description, author_id } = req.body;
	const data = [title, description, author_id];
	const query = `INSERT INTO articles (title, description, author_id) VALUES (? ? ?);`;

	connection.query(query, data, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result).status(200);
	});
};

const updateAnArticleById = (req, res) => {
	const id = req.params.id;
	const { title, description, author } = req.body;
	const query = `UPDATE articles 
	SET title="${title}",
	description="${description}",
	author="${author}",
	WHERE id=${id};`;
	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json(result);
	})
};

const deleteArticleById = (req, res) => {
	const id = req.params.id;
	const query = `UPDATE articles SET is_deleted = 1, WHERE id = ${id};`;
	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json("Article deleted successfully");
	});
};

const deleteArticlesByAuthor = (req, res) => {
	const author = req.body.author;

	const command = `SELECT id FROM users WHERE lastName="${author}";`;
	const author_id = connection.query(command, (error, result) => {
		if (error) {
			throw error;
		}
		return result;
	})

	const query = `UPDATE articles SET is_deleted = 1, WHERE author_id = ${author_id};`;
	connection.query(query, (error, result) => {
		if (error) {
			throw error;
		}
		res.json("Article deleted successfully");
	});
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};
