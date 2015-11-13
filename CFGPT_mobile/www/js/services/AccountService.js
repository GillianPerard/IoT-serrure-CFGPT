angular.module('CFGPT_Mobile.services.AccountService', [])

  .service('AccountService', function ($http, $localStorage, APIService, $ionicHistory) {

    this.IsConnected = false;
    this.user = undefined;
    this.muteConnectedObjectsId = [];

    var loginPrivate = function (user, callback) {
      APIService.user.login(user,
        function (data) {
          $ionicHistory.clearHistory();
          $localStorage.user = data;
          this.user = data.user;
          $http.defaults.headers.common['Authorization'] = data.token;
          this.IsConnected = true;
          this.muteConnectedObjectsId = $localStorage.muteConnObjectsIds[$localStorage.user.user.id];
          callback();
        },
        function (error) {
          this.IsConnected = false;
          callback(error);
        });
    };
    this.login = loginPrivate;

    this.logout = function () {
      this.IsConnected = false;
      delete $http.defaults.headers.common['Authorization'];
      $localStorage.user = undefined;
    };

    this.signup = function (user, callback) {
      APIService.user.signup(user,
        function (data) {
          loginPrivate({ email: user.email, password: user.password }, function (error) {
            callback(error);
          })
        },
        function (error) {
          callback(error);
        });
    };

    this.init = function () {
      if ($localStorage.user) {
        this.IsConnected = true;
        this.user = $localStorage.user.user;
        $http.defaults.headers.common['Authorization'] = $localStorage.user.token;
        if ($localStorage.muteConnObjectsIds == undefined){
          $localStorage.muteConnObjectsIds = [];
        } else {
          if ( $localStorage.muteConnObjectsIds[$localStorage.user.user.id] == undefined){
            $localStorage.muteConnObjectsIds[$localStorage.user.user.id] = [];
          } else {
            this.muteConnectedObjectsId = $localStorage.muteConnObjectsIds[$localStorage.user.user.id];
          }
        }
      }
    };


    // Gestion du mute pour les connectedObjects
    this.getMuteConnectedObjectsId = function(){
      return this.muteConnectedObjectsId;
    }

    this.addMuteConnectedObjects = function(tokenObject){
      this.muteConnectedObjectsId.push(tokenObject);
      $localStorage.muteConnObjectsIds[$localStorage.user.user.id] = this.muteConnectedObjectsId;
    }

    this.removeMuteConnectedObjects = function(tokenObject){
      var array = this.muteConnectedObjectsId;
      for(var i = array.length - 1; i >= 0; i--) {
        if(array[i] === tokenObject) {
          array.splice(i, 1);
        }
      }
      this.muteConnectedObjectsId = array;
      $localStorage.muteConnObjectsIds[$localStorage.user.user.id] = this.muteConnectedObjectsId;
    }

  });
