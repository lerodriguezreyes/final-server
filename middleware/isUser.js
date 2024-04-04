const User = require('../models/User');
const isUser = (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((foundUser) => {
            if (foundUser._id.toString() === req.user._id) {
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

module.exports = isUser