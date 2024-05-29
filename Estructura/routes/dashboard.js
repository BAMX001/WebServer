const express = require('express');
const router = express.Router();
const { db1, db2 } = require('../config/db.js');

router.get('/', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    db2.query('SELECT * FROM `sectores`;', function (err, otherResults) {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const otherData = otherResults;
        const username = req.session.user;
        console.log(otherData);
        console.log(username);
      
        // Render the dashboard view with data from both databases
        res.render('dashboard', { username, otherData});
    });
    
});
module.exports = router;