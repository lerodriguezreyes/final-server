const Comment = require('../models/Comment')
const isCommentOwner = (req, res, next) => {
    const { commentId } = req.params;
    Comment.findById(commentId)
        .then((foundComment) => {
            if (foundComment.owner.toString() === req.user._id) {
                next()
            } else {
                res.status(402).json({message: "Not authorized."})
            }
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
}

module.exports = isCommentOwner