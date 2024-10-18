const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

/*router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });*/
  
  router.get("/", async (req, res) => {
    // if we have req.session.user,
    //then we are signed in
    const user = await User.findById(req.session.user._id);
    const foods = user.foods;
    if (req.session.user) {
      res.render("foods/index.ejs", { foods });
    } else {
      res.render("index.ejs");
    }
  });
  
  // New
  router.get("/new", (req, res) => {
    res.render("foods/new.ejs");
  });
  
  router.put("/:foodId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.foods.id(req.params.foodId);
      // call set on subdocument to update it
      food.set(req.body);
  
      await currentUser.save();
      res.redirect(
        `/users/${req.session.user._id}/foods/${req.params.foodId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });
  
  // Delete
  
  router.delete("/:foodId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
     
      currentUser.foods.id(req.params.foodId).deleteOne();
      
      await currentUser.save();
  
      res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      
      currentUser.foods.push(req.body);
      
  
      await currentUser.save();
      res.redirect(`/users/${req.session.user._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });
  // Edit
  router.get("/:foodId/edit", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.foods.id(req.params.foodId);
    res.render("foods/edit.ejs", { food });
  });
  
  //SHOW
  router.get("/:foodId", async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    
    const food = currentUser.foods.id(req.params.foodId);
  
    res.render("foods/show.ejs", { food });
  });

module.exports = router;