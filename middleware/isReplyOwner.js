const Reply = require('../models/Reply')
const isReplyOwner = (req, res, next) => {
    const { replyId } = req.params;
    Comment.findById(foundReply)
        .then((foundReply) => {
            if (foundReply.owner.toString() === req.user._id) {
                next()
            } else {
                res.status(401).json({message: "Not authorized."})
            }
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
}

module.exports = isReplyOwner