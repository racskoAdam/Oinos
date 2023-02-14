(function (window, angular) {
  "use strict";

  // Application module
  angular
    .module("app", ["ui.router", "app.common"])

    /* Application config */
    .config([
      "$stateProvider",
      "$urlRouterProvider",
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state("home", {
            url: "/",
            templateUrl: "./html/home.html",
          })
          .state("order", {
            url: "/order",
            templateUrl: "./html/order.html",
            controller: "orderController",
          })
          .state("about", {
            url: "/about",
            templateUrl: "./html/about.html",
          })
          .state("contact", {
            url: "/contact",
            templateUrl: "./html/contact.html",
          })
          .state("faq", {
            url: "/faq",
            templateUrl: "./html/faq.html",
          })
          .state("restaurant", {
            url: "/restaurant",
            templateUrl: "./html/restaurant.html",
            controller: "reservationController",
          });

        $urlRouterProvider.otherwise("/");
      },
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

        // Set global letiables
        $rootScope.state = { id: null, prev: null };
        $rootScope.user = { id: null, type: null, name: null };
      },
    ])

    .controller('reservationController', function($scope, $http) {
      $scope.formData = {};
      $scope.timeOptions = [];
    
      for (let i = 6; i < 22; i++) {
        for (let j = 0; j < 2; j++) {
          let hour = i >= 10 ? i : '0' + i;
          let minute = j === 0 ? '00' : '30';
          $scope.timeOptions.push(hour + ':' + minute);
        }
      }
    
      $scope.next10Days = function(days) {
        let today = new Date();
        today.setDate(today.getDate() + (days || 1));
        return today.toISOString().substring(0, 10);
      }
      $scope.validateDate = function() {
        if ($scope.date < $scope.next10Days() || $scope.date > $scope.next10Days(10)) {
          $scope.date = null;
        }
      }
    
      $scope.submitForm = function() {
        if (!$scope.formData.name || !$scope.formData.email || !$scope.formData.phone || !$scope.date || !$scope.time) {
          alert("Kérem töltse ki az összes mezőt megfelelően");
          return;
        }
    
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test($scope.formData.email)) {
          alert("Invalid email address.");
          return;
        }
    
        let date = moment($scope.date);
        let now = moment();
        if (date.isBefore(now, 'day')) {
          // handle past date
          return;
        }
        let time = moment($scope.time, 'HH:mm');
        let date_time = date.format("YYYY-MM-DD") + ' ' + time.format("HH:mm") + ':00';
        $scope.formData.date_time = date_time;
        $http({
          method: 'POST',
          url: './php/submit-form.php',
          data: $.param($scope.formData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(data) {
          console.log(data);
        });
      };
    })
    

    .controller("orderController", [
      "$scope",
      "http",
      function ($scope, http) {
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
                id: "1",
                name: "Pizzák",
                icon: "fa-solid fa-pizza-slice",
              },
              {
                id: "2",
                name: "Hamburgerek",
                icon: "fa-solid fa-burger",
              },
              {
                id: "4",
                name: "Italok",
                icon: "fa-solid fa-glass-water",
              },
              {
                id: "3",
                name: "StreetFood",
                icon: "fa-solid fa-bowl-food",
              },
              {
                id: "6",
                name: "Köretek",
                icon: "fa-solid fa-bowl-rice",
              },
              {
                id: "5",
                name: "Desszert",
                icon: "fa-solid fa-cookie-bite",
              },
            ];
            $scope.orderFilter = (event) => {
              let element = event.currentTarget;
              $scope.filter = element.id;
              $scope.$applyAsync();
            };

            $scope.cart = [];
            $scope.hasItems = false;
            $scope.total = 0;
            $scope.toCart = (event) => {
              //$scope.cart.push($scope.order[event.currentTarget.id-1]);
              $scope.cart.push($scope.order[event.currentTarget.id-1]);
              $scope.order[event.currentTarget.id-1]["amount"] = 1;
              console.log($scope.cart);
              $scope.hasItems = true;
              $scope.total = 0;
              $scope.cart.forEach(element => {
                $scope.total = +$scope.total + +element.Price;
              });
            };
          })
          .catch((e) => console.log(e));
      },
    ]);
})(window, angular);
