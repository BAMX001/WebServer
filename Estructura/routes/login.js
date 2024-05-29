const express = require('express');
const router = express.Router();
const path = require('path');
const { db1, db2 } = require('../config/db.js');
const dashboardRouter = require('./dashboard');

//router.get('/', function(request, response) {
//	response.sendFile(path.join(__dirname, '../', 'login.html'));
//});

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', function(req, res) {
	console.log(req.body.username);
	const { username, password } = req.body;
	// Checar que se rellene ambos parametros
	if(username && password) {
			db1.query('SELECT * FROM cuentas WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
				if (error) throw error;
				// Usuario existe
				if (results.length > 0) {
					// Autenticar
					req.session.loggedin = true;
					req.session.user = username;
					// Llevar a dashboard
					res.redirect('/dashboard');
				} else {
					res.send('Contrasena o Usuario incorrecto!');
				}			
				res.end();
			});
	} else {
		res.send('Favor de ingresar usuario y contrasena.');
		res.end();
	}
});

router.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

router.use('/dashboard', dashboardRouter);

module.exports = router;