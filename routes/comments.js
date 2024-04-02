var express = require("express");
var router = express.Router();

const Comment = require("../models/Comment");
const Bill = require("../models/Bill");
const isAuthenticated = require("../middleware/isAuthenticated");
const isCommentOwner = require("../middleware/isCommentOwner");

// retrieve all comments
router.get("/", (req, res, next) => {
  Comment.find()
    .populate("owner")
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
router.post("/new", isAuthenticated, (req, res, next) => {
  const { comment, upVotes, downVotes, bill: billId } = req.body;

  Comment.create({ comment, owner: req.user._id, bill: billId })
    .then((createdComment) => {
      console.log("Created a new comment ====>", createdComment);
      return Bill.findByIdAndUpdate(
        createdComment.bill,
        {
          $push: { comments: createdComment._id },
        },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error while creating comment", err);
      res.status(500).json({ message: "Error while creating comment" });
    });
});

// update commment by id
router.post(
  "/update/:commentId",
  isAuthenticated,
  isCommentOwner,
  (req, res, next) => {
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
  }
);

// delete comment by id

router.delete(
  "/delete/:commentId",
  isAuthenticated,
  isCommentOwner,
  (req, res, next) => {
    Bill.updateOne(
      req.params.commentId,
      { $pull: { comments: req.params.commentId } },
      { new: true }
    );
    Comment.findByIdAndDelete(req.params.commentId)
      .then((deletedComment) => {
        console.log("Deleted ===>", deletedComment);
        res.json(deletedComment);
      })
      .catch((err) => {
        console.log("Error deleting comment ====>", err);
        res.status(502).json(err);
      });
  }
);

module.exports = router;
