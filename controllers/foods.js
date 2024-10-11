const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

/*router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });*/
  
router.get('/', (req, res) => {
    res.render('foods/new.ejs')
});

/*router.post('/', async (req,res) => {
try {
    const currrentUser = await User.findById(req.session.user._Id);
   currentUser.foods.push(req. body);

   await currentUser.save();
   res.redirect(`/users/${req.session.user._id}/foods`);
} catch (error) {
    console.log(error);
    res.redirect("/");
}
});*/
router.get('/', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    if (err) return res.redirect('/');
    res.render('foods/index.ejs', { pantry: user.pantry });
  });
});

router.post('/', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    if (err) return res.redirect('/');
    user.pantry.push(req.body);
    user.save(err => {
      if (err) return console.log(err);
      res.redirect(`/users/${userId}/foods`);
    });
  });
});

router.get("/:foodId/edit", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.foods.id(req.params.foodId);
    res.render("foods/edit.ejs", { food });
  });
  router.post('/:itemId', (req, res) => {
    const userId = req.session.user._id;
    User.findById(userId, (err, user) => {
      if (err) return res.redirect('/');
      const item = user.pantry.id(req.params.itemId);
      item.set(req.body);
      user.save(err => {
        if (err) return res.redirect('/');
        res.redirect(`/users/${userId}/foods`);
      });
    });
  });



router.delete('/:itemId', (req,res) => {
  const userId = req.session.user._id;
  User.findById(userId, (err, user) => {
    if (err) return  res.redirect('/');
    user.pantry.id(req.params.itemId).remove();
    user.save(err => {
      if (err) return console.log(err);
      res.redirect(`/users/${userId}/foods`);
    });
  });
});


module.exports = router;