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
            controller: "menuController",
            controller: "reservationController",
          });

        $urlRouterProvider.otherwise("/");
      },
    ])

    //Application running
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

    //Reservation Controller
    .controller("reservationController", function ($scope, $http) {
      $scope.formData = {}; // Initialize an object to store the form data
      $scope.timeOptions = []; // Initialize an array to store the time options

      // Create an array of available time options (from 6:00 to 21:30 in 30-minute increments)
      for (let i = 6; i < 22; i++) {
        for (let j = 0; j < 2; j++) {
          let hour = i >= 10 ? i : "0" + i; // Format hour to include leading zero if necessary
          let minute = j === 0 ? "00" : "30"; // Determine whether minute is 0 or 30
          $scope.timeOptions.push(hour + ":" + minute); // Push formatted time to timeOptions array
        }
      }

      // Function to return the date 10 days from today (or from a specified number of days from today)
      $scope.next10Days = function (days) {
        let today = new Date(); // Get today's date
        today.setDate(today.getDate() + (days || 1)); // Add specified number of days (default to 1) to today's date
        return today.toISOString().substring(0, 10); // Return the date in ISO format and cut off the time portion
      };

      $scope.validateDate = function () {
        if (
          $scope.date < $scope.next10Days() || // If selected date is before today or more than 10 days from today
          $scope.date > $scope.next10Days(10)
        ) {
          $scope.date = null; // Reset selected date to null
        }
      };

      // Function to submit the form
      $scope.submitForm = function () {
        if (
          !$scope.formData.name ||
          !$scope.formData.email ||
          !$scope.formData.phone ||
          !$scope.date ||
          !$scope.time
        ) {
          alert("Kérem töltse ki az összes mezőt megfelelően"); // Display error message if any of the required fields are missing
          return;
        }

        let emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // Regular expression to validate email format
        if (!emailRegex.test($scope.formData.email)) {
          // If email format is invalid
          alert("Érvénytelen e-mail cím."); // Display error message
          return;
        }

        let date = moment($scope.date); // Use Moment.js library to format selected date
        let now = moment(); // Get the current date and time
        if (date.isBefore(now, "day")) {
          // If selected date is before today
          // handle past date  // Code to handle past date
          return;
        }
        let time = moment($scope.time, "HH:mm"); // Use Moment.js library to format selected time
        let date_time =
          date.format("YYYY-MM-DD") + " " + time.format("HH:mm") + ":00"; // Combine date and time into a single formatted string
        $scope.formData.date_time = date_time; // Add the combined date and time to the formData object
        $http({
          method: "POST", // Use HTTP POST method
          url: "./php/submit-form.php", // URL to submit the form data to
          data: $.param($scope.formData), // Convert the formData object to URL-encoded string
          headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Set header content type to application/x-www-form-urlencoded
        }).then(function (data) {
          console.log(data); // Log the response data to the console
        });
      };
    })

    //Order Controller
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
          })
          .catch((e) => console.log(e));
      },
    ]);
})(window, angular);
