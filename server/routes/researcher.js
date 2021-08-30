// Importing modules
const express = require("express");
const router = express.Router();
const Researcher = require("../models/researcher");
const shortid = require("shortid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "files/");
  },
  filename: (req, file, callBack) => {
    let id = shortid.generate();
    let fname = `${id}${file.originalname}`.replaceAll(/\s/g, "");
    callBack(null, fname);
  },
});
const upload = multer({ storage: storage });

// Researcher login api
router.post("/login", (req, res) => {
  // Find Researcher with requested email
  Researcher.findOne({ email: req.body.email }, function (err, researcher) {
    if (researcher === null) {
      return res.status(400).json({ error: "User not found." });
    } else {
      if (researcher.validPassword(req.body.password)) {
        return res.send(researcher);
      } else {
        return res.status(400).json({ error: "Wrong Password." });
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
      researcher.subscriptions.push(req.body.userSubscribesTo);
      researcher.save((err, researcher) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to subscribe.",
          });
        } else {
          return res.status(201).send({
            message: "Succesfully Subscribed",
          });
        }
      });
    }
  });
});

router.post("/addjournal", upload.single("file"), (req, res, next) => {
  const file = req.file;

  //console.log(file.filename);

  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.status(200).json(file);
});

router.post("/addjournalUser", (req, res) => {
  Researcher.findOne({ _id: req.body.userId }, function (err, researcher) {
    if (researcher === null) {
      return res.status(400).send({
        message: "Researcher not found.",
      });
    } else {
      researcher.journalsURL.push(req.body.path);
      researcher.save((err, researcher) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to upload file.",
          });
        } else {
          return res.status(201).send({
            message: "File succesfully uploaded.",
          });
        }
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
  //e.log(req.body);
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

// get Researcher by ids api
router.post("/list", async (req, res) => {
  const ids = req.body.ids;
  //console.log(ids);
  const researchersList = [];
  if (!ids)
    return res.status(400).send({
      message: "No subscriptions found.",
    });
  for (let id of ids) {
    const researcher = await Researcher.findById(
      id,
      "_id name email journalsURL"
    ).exec();
    researchersList.push(researcher);
  }

  res.send(researchersList);
});

// Export module to allow it to be imported in other files
module.exports = router;
