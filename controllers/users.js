const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.redirect('/');
    res.render('users/index.ejs', { users });
  });
});
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) return res.redirect('/');
      res.render('users/show.ejs', { pantry: user.pantry });
    });
  });

module.exports = router;