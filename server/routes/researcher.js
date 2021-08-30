// Importing modules
const express = require("express");
const router = express.Router();
const Researcher = require("../models/researcher");

// Researcher login api
router.post("/login", (req, res) => {
  // Find Researcher with requested email
  Researcher.findOne({ email: req.body.email }, function (err, researcher) {
    if (researcher === null) {
      return res.status(400).send({
        message: "Researcher not found.",
      });
    } else {
      if (researcher.validPassword(req.body.password)) {
        return res.status(201).send({
          message: "Researcher Logged In",
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
});

router.post("/subscribe", (req, res) => {
  // Find Researcher with requested id
  Researcher.findOne({ _id: req.body.userId }, function (err, researcher) {
    if (researcher === null) {
      return res.status(400).send({
        message: "Researcher not found.",
      });
    } else {
      researcher.update(
        { _id: req.body.userId },
        { $push: { subscriptions: req.body.userSubscribesTo } }
      );
      return res.status(201).send({
        message: "Succesfully Subscribed",
      });
    }
  });
});

router.post("/addjournals", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

  // Use the mv() method to place the file somewhere on your server
  for (let file of req.files) {
    file.mv("/journals", function (err) {
      if (err) return res.status(500).send(err);

      res.send("File uploaded!");
    });
  }

  // Find Researcher with requested id
  Researcher.findOne({ _id: req.body.userId }, function (err, researcher) {
    if (researcher === null) {
      return res.status(400).send({
        message: "Researcher not found.",
      });
    } else {
      researcher.update(
        { _id: req.body.userId },
        { $push: { journalsUrl: req.body.files.map(file => file.path) } }
      );
      return res.status(201).send({
        message: "Succesfully Subscribed",
      });
    }
  });
});

// Researcher signup api
router.post("/signup", (req, res, next) => {
  // Creating empty Researcher object
  let newResearcher = new Researcher();

  // Initialize newResearcher object with request data
  (newResearcher.name = req.body.name),
    (newResearcher.email = req.body.email),
    (newResearcher.password = req.body.password);

  // Call setPassword function to hash password
  console.log(req.body);
  newResearcher.setPassword(req.body.password);

  // Save newResearcher object to database
  newResearcher.save((err, researcher) => {
    if (err) {
      return res.status(400).send({
        message: "Failed to register Researcher.",
      });
    } else {
      return res.status(201).send({
        message: "Your account has been created succesfully.",
      });
    }
  });
});

// get Researcher api
router.get("/get/:id?", (req, res) => {
  const id = req.params.id;
  Researcher.find(
    id ? { _id: id } : {},
    { hash: 0, salt: 0 },
    function (err, researcher) {
      res.send(researcher);
    }
  );
});
// Export module to allow it to be imported in other files
module.exports = router;
