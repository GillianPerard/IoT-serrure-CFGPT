// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('CFGPT_Mobile', [
  'ionic',
  'ngStorage',
  'CFGPT_Mobile.controllers.AppCtrl',
  'CFGPT_Mobile.controllers.AccountCtrl',
  'CFGPT_Mobile.controllers.GroupsCtrl',
  'CFGPT_Mobile.controllers.GroupCtrl',
  'CFGPT_Mobile.controllers.ConnectedObjectCtrl',
  'CFGPT_Mobile.services.APIService',
  'CFGPT_Mobile.services.ConstantService',
  'CFGPT_Mobile.services.ConnectedObjectsService',
  'CFGPT_Mobile.services.AccountService'])

  .run(function ($ionicPlatform, $rootScope, $state, AccountService, ConstantService) {
    ConstantService.InitApp(AccountService);

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

      if (toState.authenticate) {
        if (!AccountService.IsConnected) {
          $state.go("login");
        }
      }
    });

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-android-arrow-back');

    // if (!$httpProvider.defaults.headers.get) {
    //   $httpProvider.defaults.headers.get = {};
    // }
    
    // $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // // extra
    // $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    // $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        authenticate: true
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        },
        authenticate: true

      })

      .state('app.groups', {
        url: '/groups',
        views: {
          'menuContent': {
            templateUrl: 'templates/groups.html',
            controller: 'GroupsCtrl'
          }
        },
        authenticate: true
      })

      .state('app.connectedObjects', {
        url: '/connectedObjects/:objectToken',
        params: {
          group: '',
          connectedObject: ''
        },
        views: {
          'menuContent': {
            templateUrl: 'templates/connectedObject.html',
            controller: 'ConnectedObjectCtrl'
          }
        },
        authenticate: true
      })

      .state('app.single', {
        url: '/groups/:groupId',
        views: {
          'menuContent': {
            templateUrl: 'templates/group.html',
            controller: 'GroupCtrl'
          }
        },
        authenticate: true
      })


      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'AccountCtrl',
        authenticate: false
      });
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });
