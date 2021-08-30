const mongoose = require("mongoose");
var crypto = require("crypto");
const Researcher = mongoose.model("Researcher");

const insertRecord = (req, res) => {
  const researcher = new Researcher();
  researcher.name = req.body.name;
  researcher.email = req.body.email;
  researcher.password = req.body.password;
};
