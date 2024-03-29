var express = require("express");
var router = express.Router();
const Bill = require("../models/Bill");

// retrieve all bills
router.get("/", (req, res, next) => {
  Bill.find()
    .then((foundBill) => {
      console.log("Retrieved all bills ====>", foundBill);
      res.json(foundBill);
    })
    .catch((err) => {
      console.log("Error retrieving bills", err);
      res.json({ errorMessage: "Error retrieving bills", err });
    });
});

module.exports = router;

router.post("/new", (req, res, next) => {
  const { title, congress, billType, billNumber } = req.body;

  // Check if the values provided are empty.
  if (!title || !congress || !billType || !billNumber) {
    res
      .status(400)
      .json({
        message:
          "The following variables are required to proceed: title, congress, billType, billNumber.",
      });
    return;
  }
  Bill.findOne({ title })
    .then((foundBill) => {
      // If the bill  already exists, send the existing bill record.
      if (foundBill) {
        res.status(200).json({ foundBill });
        return;
      }

      // If title is unique, proceed to create new bill record
      Bill.create({ title, congress, billType, billNumber })
        .then((createdBill) => {
          // Send response containing the bill record.
          res.status(201).json({ createdBill });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            console.log("This is the error", err);
            res.status(501).json({ message: "Provide all fields", err });
          } else if (err.code === 11000) {
            console.log("Duplicate value", err);
            res
              .status(502)
              .json({
                message: "Invalid title, congress, billType, billNumber.",
                err,
              });
          } else {
            console.log("Error =>", err);
            res.status(503).json({ message: "Error encountered", err });
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/update/:billId", (req, res, next) => {
  const { title } = req.body;

  // Check if the values provided are empty.
  if (!req.body) {
    res.status(400).json({ message: "No value was provided" });
    return;
  }
  Bill.findOne({ title }).then((foundBill) => {
    // If the bill  already exists, update the existing bill record.
    if (!foundBill) {
      res
        .status(400)
        .json({
          message: "The bill does not exist. Please create the record first.",
        });
      return;
    }
    Bill.findByIdAndUpdate(req.params.billId, req.body, {
      new: true,
    })
      .then((updatedBill) => {
        console.log("Updated bill ====>", updatedBill);
        res.json(updatedBill);
      })
      .catch((err) => {
        console.log("Error updating Bill.", err);
        res.json({ errorMessage: "Error updating specified Bill.", err });
      });
  });
});

router.get("/delete/:billId", (req, res, next) =>{
  Bill.findByIdAndDelete(req.params.billId)
  .then((deletedBill) => {
    console.log("Deleted ===>", deletedBill);
    res.json(deletedBill);
  })
  .catch((err) => {
    console.log("Error deleting bill ====>", err);
    res.status(502).json(err);
  });
});

module.exports = router;