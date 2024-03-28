var express = require('express');
var router = express.Router();

const User = require('../models/User');
const isUser = require('../middleware/isUser')
const isAuthenticated = require("../middleware/isAuthenticated");

// retrieve all users
router.get("/", (req, res, next) => {
  User.find()
    .then((foundUsers) => {
      console.log("Retrieved all users ====>", foundUsers);
      res.json(foundUsers);
    })
    .catch((err) => {
      console.log("Error retrieving all users", err);
      res.json({ errorMessage: "Error retrieving all users", err });
    });
});


//Get by Id
router.get('/details/:userId', isAuthenticated, isUser, (req, res, next) => {

  User.findById(req.params.userId)
    .then((foundUser) => {
      console.log("User found ===>", foundUser)
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

// Update by Id
router.post('/update/:userId', isAuthenticated, isUser, (req, res, next) => {

  User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  })
    .then((updatedUser) => {
      console.log("Updated user ===>", updatedUser)
      res.json(updatedUser)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

// Delete by Id
router.get('/delete/:userId', isAuthenticated, isUser, (req, res, next) => {

  User.findByIdAndDelete(req.params.userId)
    .then((deletedUser) => {
      console.log("User deleted ===>", deletedUser)
      res.json(deletedUser)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

module.exports = router;
