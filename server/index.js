const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "root",
	database: "employeeSystem",
});

app.post("/create", (req, res) => {
	const { name, age, country, position, wage } = req.body;

	db.query(
		`INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)`,
		[name, age, country, position, wage],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.status(200).json(result);
			}
		}
	);
});

app.get("/employees", (req, res) => {
	db.query(`SELECT * FROM employees`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(result);
		}
	});
});

app.listen(3000, () => {
	console.log("Server is running on port http://localhost:3000");
});
