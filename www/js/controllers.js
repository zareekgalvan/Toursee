angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('DashCtrl', function($scope, $http, $cordovaGeolocation) {

  var globalLat = null;
  var globalLong = null;
  
  function getPlaces(){
    if (globalLong != null && globalLat != null){
      $http({
          method: 'GET',
          url: "https://api.foursquare.com/v2/venues/search?ll="+globalLat+","+globalLong+"&client_id=ZH3UCNE24YVXYSAPJN2KIMAMHERNULWIE0ZP1MDKIZYZFKMO&client_secret=4VTHBQDRNBXNQ4KIAUCMW50UMCFLPYT13V5C3OIWESBY4FMF&v=20131017"
        })
        .success(function(data, status, headers, config) {
          console.log(data);
        })
        .error(function(data, status, headers, config) {
          alert("Error");
        })
    }
    
  }

  function getUserLocation(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)

    .then(function (position) {
      globalLat  = position.coords.latitude
      globalLong = position.coords.longitude
      getPlaces();

    }, function(err) {
      console.log(err)
    });

    var watchOptions = {timeout : 3000, enableHighAccuracy: false};
    var watch = $cordovaGeolocation.watchPosition(watchOptions);

    watch.then(
      null,

      function(err) {
         console.log(err)
      },

      function(position) {
         globalLat = position.coords.latitude
         globalLong = position.coords.longitude
      }
    );

    watch.clearWatch();
  }

    

  getUserLocation();

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
