var mysql = require('mysql');
var connection;

// if(process.env.JAWSDB_URL) {
// 	connection = new Sequelize(process.env.JAWSDB_URL);
// }else{
// 	connection =new Sequelize('burgers_db','root','guagua',{
// 	host: 'localhost',
// 	dialect: 'mysql',
// 	port:'3306'
// 	})
// }

if(process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
	connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'',
	database: 'burgers_db'
	})
}


// var connection = mysql.createConnection({
// 	port: 3306,
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'guagua',
// 	database: 'burgers_db'
// });

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('Connection Sucessful! and connected as id ' + connection.threadId);
});

module.exports = connection;