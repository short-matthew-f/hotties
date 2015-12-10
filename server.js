var express    = require('express'),
    server     = express(),
    mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

/**************Mongoose***************/
var spottingSchema = new Schema({
  location: String,
  rating: Number,
  description: String,
  comments: [{
    name: String,
    content: String
  }]
});

var Spotting = mongoose.model('Spotting', spottingSchema);

mongoose.connect('mongodb://localhost:27017');

/**************Server**************/
server.use(express.static('public'));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(methodOverride('_method'));

server.use(function (req, res, next) {
  console.log("REQ.BODY", req.body);
  console.log("REQ.PARAMS", req.params);

  next();
});

/***************THE APP*****************/

server.get('/spottings', function (req, res) {
  Spotting.find({}, function (error, spottings) {
    if (error) {
      console.log("ERROR", error);
    } else {
      res.json({
        spottings: spottings
      });
    }
  })
});

server.post('/spottings', function (req, res) {
  var newSpotting = new Spotting(req.body.spotting);

  newSpotting.save(function (error, spotting) {
    console.log(obj);
    if (error) {
      console.log("ERROR", error);
    } else {
      res.json({
        spotting: spotting
      });
    }
  });
});

server.patch('/spottings/:id', function (req, res) {
  Spotting.findByIdAndUpdate(req.params.id, req.body.spotting, function (error, spotting) {
    if (error) {
      console.log("ERROR", error);
    } else {
      res.json({
        spotting: spotting
      });
    }
  });
});

server.delete('/spottings/:id', function (req, res) {
  Spotting.findByIdAndRemove(req.params.id, function (error, spotting) {
    if (error) {
      console.log("ERROR", error);
    } else {
      res.json({
        message: "Yup, it's gone"
      });
    }
  });
});


server.listen(3000, function () {
  console.log("I'm up and running here....");
});
