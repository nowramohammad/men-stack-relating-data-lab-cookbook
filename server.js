const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

router.get('/', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    if (err) return res.redirect('/');
    res.render('foods/index.ejs', { pantry: user.pantry });
  });
});
router.get('/:itemId/edit', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    const item = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { item });
  });
});
router.post('/:itemId', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    const item = user.pantry.id(req.params.itemId);
    item.set(req.body);
    user.save(err => {
      if (err) return console.log(err);
      res.redirect(`/users/${userId}/foods`);
    });
  });
});

app.use('/auth', authController);
app.use('/users/:userId/foods',foodsController);
app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods',foodsController);

app.use('/auth', authController);




app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
