var express = require("express");
var router = express.Router();

const Comment = require("../models/Comment");

// retrieve all comments
router.get("/", (req, res, next) => {
  Comment.find()
    .then((foundComment) => {
      console.log("Retrieved all comments ====>", foundComment);
      res.json(foundComment);
    })
    .catch((err) => {
      console.log("Error retrieving comments", err);
      res.json({ errorMessage: "Error retrieving comments", err });
    });
});

/* new comment */
router.post("/new", function (req, res, next) {
  const { userName, comment, upVotes, downVotes } = req.body;

  Comment.create({ userName, comment, upVotes, downVotes })
    .then((createdComment) => {
      console.log("Created a new comment ====>", createdComment);
      res.json(createdComment);
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating comment", err);
      res.status(500).json({ message: "Error while creating comment" });
    });
});

// update commment by id
router.post("/update/:commentId", (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body, {
    new: true,
  })
    .then((updatedComment) => {
      console.log("Updated comment ====>", updatedComment);
      res.json(updatedComment);
    })
    .catch((err) => {
      console.log("Error updating comment", err);
      res.json({ errorMessage: "Error updating specified comment", err });
    });
});

// delete comment by id

router.get("/delete/:commentId", (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId)
    .then((deletedComment) => {
      console.log("Deleted ===>", deletedComment);
      res.json(deletedComment);
    })
    .catch((err) => {
      console.log("Error deleting comment ====>", err);
      res.status(502).json(err);
    });
});

module.exports = router;
