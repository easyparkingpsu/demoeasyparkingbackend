var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SAMPLE_COLLECTION = "sample";
var CUSTOMER_COLLECTION = "Customer";
var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


app.get("/api/sample", function(req, res) {
  db.collection(SAMPLE_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/Customer", function(req, res) {
  db.collection(CUSTOMER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/Customer/newuser", function(req, res) {
  var listname = req.body;

 db.collection(CUSTOMER_COLLECTION).insert(listname,function(err, docs) {
   res.send(firstname = "thummarong2",lastname = "wongsawat 2",tel = "0958302781" + docs.name)
   if (err) {
     handleError(res, err.message, "Failed to post contacts.");
   } else {
     res.status(201).json(docs);
   }
 });
});
