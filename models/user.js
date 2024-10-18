const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
  itemname: {
      type: String,
      required: true,
  },
  Quantity: {
    type: String,
    required: true
},
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods: [ foodSchema ] 
});


const User = mongoose.model("User", userSchema);

module.exports = User;
