var app = angular.module("HottieSpottr", []);

app.controller('SpottingController', ['$http', function ($http) {
  var ctrl = this;

  this.newSpotting = { rating: 6 };

  this.getSpottings = function () {
    $http.get('/spottings')
      .success(function (res) {
        console.log(res);
        ctrl.spottings = res.spottings;
      });
  };

  this.createSpotting = function () {
    $http.post('/spottings', {
      spotting: ctrl.newSpotting
    })
      .success(function (res) {
        ctrl.spottings.push(res.spotting);

        ctrl.newSpotting = {
          rating: 6
        };
      });
  };

  this.updateSpotting = function () {
    $http.patch('/spottings/' + ctrl.currentSpotting._id, {
      spotting: ctrl.currentSpotting
    })
      .success(function (res) {
        delete ctrl.currentSpotting;
      });
  };

  this.deleteSpotting = function (spotting) {
    $http.delete('/spottings/' + spotting._id)
      .success(function (res) {
        var i = ctrl.spottings.indexOf(spotting);
        ctrl.spottings.splice(i, 1);
      });
  };

  this.addCommentToSpotting = function (spotting) {
    spotting.newComment.name = spotting.newComment.name || "anonymous";

    spotting.comments.push(spotting.newComment);

    $http.patch('/spottings/' + spotting._id, {
      spotting: spotting
    })
      .success(function (res) {
        spotting.newComment = {};
        console.log(res);
      });
  };

  this.getSpottings();
}]);
