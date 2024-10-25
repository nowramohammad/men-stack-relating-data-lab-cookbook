const express = require('express');
const router = express.Router();
const User = require('../models/user.js');





/*router.get('/', (req, res) => {
    res.render('foods/index.ejs')
  });*/
 

// Index route to render the pantry items
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        res.locals.foods = user.pantry; // Assuming pantry is an array in the user model
        res.render('foods/index.ejs');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// New route to render the form for adding a new food item
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

// Create route to add a new food item
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.pantry.push(req.body);
        await user.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.delete('/:itemId', async (req, res) => {
  try {
      const user = await User.findById(req.session.user._id);
      user.pantry.id(req.params.itemId).remove();
      await user.save();
      res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
      console.error(error);
      res.redirect('/');
  }
});
router.get('/:userId/foods/:foodId/edit', async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);
      const foodItem = user.pantry.id(req.params.foodId);

      if (!foodItem) {
          return res.status(404).send('Food item not found');
      }

      res.render('foods/edit', { foodItem, user });
  } catch (error) {
      console.error(error);
      res.redirect('/users/' + req.params.userId + '/foods');
  }
});
router.put('/:userId/foods/:foodId', async (req, res) => {
  try {
      const user = await User.findById(req.params.userId);
      const foodItem = user.pantry.id(req.params.foodId);

      if (!foodItem) {
          return res.status(404).send('Food item not found');
      }

      foodItem.itemname = req.body.itemname;
      foodItem.quantity = req.body.quantity; // Ensure this matches your input field

      await user.save();
      res.redirect('/users/' + req.params.userId + '/foods/' + req.params.foodId);
  } catch (error) {
      console.error(error);
      res.redirect('/users/' + req.params.userId + '/foods');
  }
});

module.exports = router;
  /*router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate('pantry'); // Ensure you populate if necessary
        const foods = user.pantry || []; // Fallback to an empty array if pantry is undefined
        res.render('foods/index.ejs', { foods }); // Pass foods to the view
    } catch (error) {
        console.error(error);
        res.redirect('/'); // Handle error gracefully
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
  router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        
        // Ensure user and user.pantry exist
        if (!user || !user.pantry) {
            return res.redirect('/users/' + req.session.user._id + '/foods'); // Redirect if user or pantry is not found
        }

        // Create the new food item
        const newFoodItem = {
            itemname: req.body.itemname,
            quantity: req.body.quantity,
        };

        // Push the new food item into the user's pantry
        user.pantry.push(newFoodItem);
        await user.save(); // Save the updated user

        res.redirect('/users/' + req.session.user._id + '/foods'); // Redirect to the pantry index
    } catch (error) {
        console.error(error);
        res.redirect('/'); // Handle error gracefully
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
*/




module.exports = router;