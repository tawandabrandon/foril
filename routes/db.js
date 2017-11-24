mysql = require('mysql');
var dbUrl = 'chevronio.com';
var port = '3306';
var dbUser = 'chevroni_dev';
var dbPassword = 'QWERTYUIOP2017!';
var dbName = 'chevroni_dev';
db = {
	dbUrl : dbUrl,
	port : port,
 	dbUser : dbUser,
 	dbPassword : dbPassword,
 	dbName : dbName,
 	con : 
 		mysql.createConnection({
		host : dbUrl,
		user : dbUser,
		password : dbPassword,
		database : dbName
	}),
 test : function () {
	return connection.connect().then(function () {
		console.log('connection success!')
	});
}
}

module.exports = db;