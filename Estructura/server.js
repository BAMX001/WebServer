const express = require("express");
var parseUrl = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { db1, db2 } = require('./config/db.js');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));

let encodeUrl = parseUrl.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 horas
    resave: false
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', encodeUrl, (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    db1.connect(function(err) {
        if (err){
            console.log(err);
        };
        // Checar usuario existente
        db1.query(`SELECT * FROM cuentas WHERE username = '${username}' AND password  = '${password}'`, function(err, result){
            if(err){
                console.log(err);
            };
            if(Object.keys(result).length > 0){
                res.sendFile(__dirname + '/failReg.html');
            }else{

            function userPage(){
                // Crear sesion para usuario
                req.session.user = {
                    username: username,
                    email: email,
                    password: password 
                };
                console.log(username);
                res.redirect('/dashboard');
                
            }
                // Agregar informacion de usuario
                var sql = `INSERT INTO cuentas (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
                db1.query(sql, function (err, result) {
                    if (err){
                        console.log(err);
                    }else{
                        userPage();
                    };
                });

            }

        });
    });

});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/dashboard');
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  });

// Rutas
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});