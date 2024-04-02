var express = require("express");
var router = express.Router();
var axios = require("axios");
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

router.get("/details/:billId", (req, res, next) => {
  Bill.findOne()
    .then((foundBill) => {
      console.log("Retrieved sepecified bill by ID ====>", foundBill);
      res.json(foundBill);
    })
    .catch((err) => {
      console.log("Error retrieving specified bill", err);
      res.json({ errorMessage: "Error retrieving specified bill", err });
    });
});

router.post("/new", async (req, res, next) => {
  try {
    const { title, congress, billType, billNumber } = req.body;

    // Check if the values provided are empty.
    if (!title || !congress || !billType || !billNumber) {
      res.status(400).json({
        message:
          "The following variables are required to proceed: title, congress, billType, billNumber.",
      });
      return;
    }

    let foundBill = await Bill.findOne({ title });

    if (!foundBill) {
      let details = await axios.get(
        `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}?api_key=${process.env.CONGRESS_API_KEY}`
      );

      // console.log("These are the details", details.data)

      let summaries = await axios.get(
        `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}/summaries?api_key=${process.env.CONGRESS_API_KEY}`
      );

      console.log("these are the summaries", summaries.data);

      let text = await axios.get(
        `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}/text?api_key=${process.env.CONGRESS_API_KEY}`
      );

      let finalIndex;

      let newBill = await Bill.create({
        title,
        congress,
        billType,
        billNumber,
        sponsors: details.data.bill.sponsors.map((sponsor) => sponsor.fullName),
        cosponsors: details.data.bill.cosponsors?.count || 0,
        originChamber: details.data.bill.originChamber,
        introducedDate: details.data.bill.introducedDate,
        latestActionDate: details.data.bill.latestAction.actionDate,
        latestActionText: details.data.bill.latestAction.text,
        summary: summaries.data.summaries[0] || null,
        latestTextDate:
          text.data.textVersions.filter((el, i, arr) => {
            finalIndex = arr.length - 1;
            return i == finalIndex;
          })[0]?.date || "",
        latestTextPdfLink:
          text.data.textVersions.filter((el, i, arr) => {
            finalIndex = arr.length - 1;
            return i == finalIndex;
          })[0]?.formats[1].url || "",
      });

      res.status(201).json({ bill: newBill });
    } else {
      res.status(200).json({ bill: foundBill });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
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
      res.status(400).json({
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

router.get("/delete/:billId", (req, res, next) => {
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
