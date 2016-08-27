angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('IndexCtrl', function($scope, $http, $cordovaGeolocation) {

  var globalLat = null;
  var globalLong = null;
  var places = {};

  function getCategories(){
    $http({
        method: 'GET',
        url: 'https://api.foursquare.com/v2/venues/categories?oauth_token=20Q4W0KKU02P3WAFGX4FJEVFBDDY3HBCOJ2KIHGOA0MB43TM&v=20160827'
      })
      .success(function(data, status, headers, config) {
        console.log(data)        
      })
      .error(function(data, status, headers, config) {
        alert("Error");
      })

  }

  function getPlaces(){
    if (globalLong != null && globalLat != null){
      $http({
        method: 'GET',
        url: "https://api.foursquare.com/v2/venues/search?ll="+globalLat+","+globalLong+"&client_id=ZH3UCNE24YVXYSAPJN2KIMAMHERNULWIE0ZP1MDKIZYZFKMO&client_secret=4VTHBQDRNBXNQ4KIAUCMW50UMCFLPYT13V5C3OIWESBY4FMF&v=20131017&venuePhotos=1&&categoryId=4d4b7104d754a06370d81259"
      })
      .success(function(data, status, headers, config) {
        var places = data.response.venues;
        angular.forEach(places,function(place){
          $scope.places = places;
          //getPhotos(place.id);
        })
        
        console.log(places);
      })
      .error(function(data, status, headers, config) {
        alert("Error");
      })
    }
  }

  function getPhotos(venueID){
    var photos = {}
    $http({
      method: 'GET',
      url: 'https://api.foursquare.com/v2/venues/'+venueID+'/photos?oauth_token=20Q4W0KKU02P3WAFGX4FJEVFBDDY3HBCOJ2KIHGOA0MB43TM&v=20160827',
    })
    .success(function(data, status, headers, config) {
      console.log(data)
      photos = data;
      return photos;
    })
    .error(function(data, status, headers, config) {
      alert("Error");
    })
    
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

.controller('PlacesCtrl', function($scope, $stateParams, Chats) {
  console.log($stateParams)
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
