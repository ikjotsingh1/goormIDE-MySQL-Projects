var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection( {
	host		: 'localhost',
	user		: 'root',
	database	: 'join_us'
});

app.get("/", function(req, res) {
	// Find count of users in DB
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results) {
		if(err) throw err;
		var count = results[0].count;
		// res.send("We have " + count + " users in our DB");
		res.render("home", {data: count});
	});	
});

app.get("/joke", function(req, res) {
	var joke = "<strong>What did the father tomato say to the baby tomato whilst on a family walk?</strong> <em>Ketchup. LOL</em>";
	console.log("REQUESTED THE JOKE ROUTE!");
	res.send(joke);
});

app.get("/random_num", function(req, res) {
	var num = Math.floor(Math.random() * 10) + 1;
	res.send("Your lucky number is " + num);
});

app.post("/register", function(req, res) {
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
		if(err) throw err;
		// console.log(result);
		// res.send("Thanks for joining our wait list!")
		res.redirect("/");
	});
});

app.listen(8080, function() {
	console.log("Server running on 8080!");
});