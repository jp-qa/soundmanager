SC.initialize({
  client_id: "1e42972432bce32503f00f243d58d646"
});

angular.module("app", ['ngResource'])
  .factory('Playlist', ['$resource', function($resource) {
    var Playlist = $resource('/playlists/:playlistId', {playlistId: ""}, {
      update: {method: "PUT"}
    });

    return Playlist;
  }]);

var SearchCtrl = function($scope) {
  $scope.loading = false;
  $scope.results = [];

  $scope.search = function() {
    $scope.loading = true;
    SC.get('/tracks', {q: $scope.query}, function(tracks) {
      $scope.$apply(function() {
        $scope.results = tracks;
        $scope.loading = false;
      });
    });
  }

  $scope.test = function() {
    console.log($scope.results);
  }
}

var PlaylistCtrl = function($scope, Playlist) {
  $scope.playlists = [];

  $scope.addPlaylist = function() {
    playlist = new Playlist({name: "New Playlist " + $scope.playlists.length + 1});
    playlist.$save();
    $scope.playlists.push(playlist);
  }
}