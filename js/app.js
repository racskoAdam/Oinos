;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', ['ui.router', 'app.common'])

  /* Application config */
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: './html/home.html'
        })
        .state('order', {
          url: '/order',
          templateUrl: './html/order.html',
        })
        .state('about', {
          url: '/about',
          templateUrl: './html/about.html'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: './html/contact.html'
        })
        .state('blog', {
          url: '/blog',
          templateUrl: './html/blog.html'
        })
        .state('restaurant', {
          url: '/restaurant',
          templateUrl: './html/restaurant.html'
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ])


//app run
.run([
  "$rootScope",
  "$transitions",
  "$timeout",
  "http",
  function ($rootScope, $transitions, $timeout, http) {
    // On before transaction
    let isFirstRun = true;
    $transitions.onBefore({}, function (transition) {
      return $timeout(function () {
        if (isFirstRun) {
          isFirstRun = false;
          if (transition.to().name !== "home")
            return transition.router.stateService.target("home");
        }
        return true;
      }).catch((e) => console.log(e));
    });

    // Set global variables
    $rootScope.state = { id: null, prev: null };
    $rootScope.user = { id: null, type: null, name: null };

    // Get Flies
    http
      .request({
        url: "./php/get.php",
        method: "POST",
        data: {
          db: "opd",
          query: "SELECT * FROM `menu`;",
          isAssoc: true,
        },
      })
      .then((data) => {
        $rootScope.order = data;
        $rootScope.$applyAsync();
      })
      .catch((e) => console.log(e));
  },
])

})(window, angular);

let pizza = $('#Food-1');
let burger = $('#Food-2');
let bevs = $('#Food-3');
let streetfood = $('#Food-4');
let desserts = $('#Food-5');
let sides = $('#Food-6');


