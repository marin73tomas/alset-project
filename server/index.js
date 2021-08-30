// Importing modules
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
// Initialize express app
var app = express();

// Mongodb connection
mongoose.connect(
  "mongodb+srv://tomast:k32xXglQubs8dTKR@cluster0.tcni6.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
app.use(cors());
app.use(express.static("files"));
app.use(express.urlencoded({ extended: false }));

// Using bodyparser to parse json data

app.use(express.json());

// Importing routes
const researcher = require("./routes/researcher");

// Use researcher route when url matches /api/researcher/
app.use("/api/researchers", researcher);

// Creating server
const port = 5000;
app.listen(port, () => {
  console.log("Server running at port: " + port);
});
