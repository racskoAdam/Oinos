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
          controller:"orderController"
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

    
  },
])

.controller('orderController', ['$scope', 'http', function($scope, http) {
  
  // Get Flies
  http
  .request({
    url: "./php/get.php",
    method: "POST",
    data: {
      db: "opd",
      query: "SELECT * FROM `menu`",
      isAssoc: true,
    },
  })
  .then((data) => {
    $scope.order = data;
    $scope.$applyAsync();
    $scope.filter = null;
    $scope.categories = [
      {
        id:"1",
        name: 'Pizzák',
        icon: 'fa-solid fa-pizza-slice'
      },
      {
        id:"2",
        name: 'Hamburgerek',
        icon: 'fa-solid fa-burger'
      },
      {
        id:"4",
        name: 'Italok',
        icon: 'fa-solid fa-glass-water'
      },
      {
        id:"3",
        name: 'StreetFood',
        icon: 'fa-solid fa-bowl-food'
      },
      {
        id:"6",
        name: 'Köretek',
        icon: 'fa-solid fa-bowl-rice'
      },
      {
        id:"5",
        name: 'Desszert',
        icon: 'fa-solid fa-cookie-bite'
      },
      
    ]
    $scope.orderFilter = (event) => {
      let element = event.currentTarget;
      $scope.filter = element.id;
      $scope.$applyAsync();
    };
  })
  .catch((e) => console.log(e));
}])

})(window, angular);