const express = require("express");
var mysql = require('mysql');
var parseUrl = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http');

const app = express();


let encodeUrl = parseUrl.urlencoded({ extended: false });

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

app.use(cookieParser());

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'userregistration'
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})

app.post('/register', encodeUrl, (req, res) => {
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;

    connection.connect(function(err) {
        if (err){
            console.log(err);
        };
        // checking user already registered or no
        connection.query(`SELECT * FROM cuentas WHERE username = '${userName}' AND password  = '${password}'`, function(err, result){
            if(err){
                console.log(err);
            };
            if(Object.keys(result).length > 0){
                res.sendFile(__dirname + '/failReg.html');
            }else{
            //creating user page in userPage function
            function userPage(){
                // We create a session for the dashboard (user page) page and save the user data to this session:
                req.session.user = {
                    username: userName,
                    email: email,
                    password: password 
                };

                res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Login and register form with Node.js, Express.js and MySQL</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                    <h3>Hola, ${req.session.user.username}</h3>
                        <a href="/login">Cerrar Sesion</a>
                    </div>
                </body>
                </html>
                `);
            }
                // inserting new user data
                var sql = `INSERT INTO cuentas (username, email, password) VALUES ('${userName}', '${email}', '${password}')`;
                connection.query(sql, function (err, result) {
                    if (err){
                        console.log(err);
                    }else{
                        // using userPage function for creating user page
                        userPage();
                    };
                });

        }

        });
    });


});

app.get("/login", (req, res)=>{
    res.sendFile(__dirname + "/login.html");
});

// get user data to /dashboard page
app.post("/dashboard", encodeUrl, (req, res)=>{
    var userName = req.body.userName;
    var password = req.body.password;

    connection.connect(function(err) {
        if(err){
            console.log(err);
        };
//get user data from MySQL database
        connection.query(`SELECT * FROM cuentas WHERE username = '${userName}' AND password = '${password}'`, function (err, result) {
          if(err){
            console.log(err);
          };
// creating userPage function to create user page
          function userPage(){
            // We create a session for the dashboard (user page) page and save the user data to this session:
            req.session.user = {
                username: userName,
                password: password 
            };

            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Login and register form with Node.js, Express.js and MySQL</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <h3>Hola, ${req.session.user.username}</h3>
                    <a href="/login">Cerrar Sesion</a>
                </div>
            </body>
            </html>
            `);
        }

        if(Object.keys(result).length > 0){
            userPage();
        }else{
            res.sendFile(__dirname + '/failLog.html');
        }

        });
    });
});

app.listen(4000, ()=>{
   console.log("Server running on port 4000");
});