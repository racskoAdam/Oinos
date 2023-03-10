(function (window, angular) {
  "use strict";
  // Application module
  angular
    .module("app", ["ui.router", "app.common", "angular.filter"])

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
            controller: "faqController",
          })
          .state("restaurant", {
            url: "/restaurant",
            templateUrl: "./html/restaurant.html",
            controller: "menuController",
            controller: "reservationController",
          })
          .state("finalizeOrder", {
            url: "/finalizeOrder",
            templateUrl: "./html/finalizeOrder.html",
            controller: "orderController",
          })
          .state("login",{
            url:"/login",
            templateUrl: "./html/login.html",
          })
          ;

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
        $rootScope.cart = []; //create cart for ordering
        $rootScope.total = 0;
      },
    ])

    .controller("regLogController", [
      "$scope",
      "$http",
      "$state",
      "$rootScope", // Add $rootScope as a dependency
      function ($scope, $http, $state, $rootScope) {
        $scope.user = {};
        $scope.loggedIn = localStorage.getItem("loggedIn") === "false"; // Set initial value of loggedIn from localStorage
    
        $scope.register = function () {
          $http({
            method: "POST",
            url: "./php/register.php",
            data: $.param($scope.user),
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
          }).then(function(response){
            console.log(response);
            if (response.data.indexOf('User with email') !== -1) {
              // show Bootstrap modal with error message
              $('#errorMessageModal').modal('show');
              $scope.errorMessage = response.data;
            } else {
              // show Bootstrap modal with success message
              $('#successModal').modal('show');
              // redirect to home state
              $state.go('home');
              // set logged in status
              localStorage.setItem('loggedIn', 'true');
              $scope.loggedIn = true; // Set the value of loggedIn in the scope to true
              $rootScope.firstName = $scope.user.firstname; // Set $rootScope.firstName to the user's first name
              $rootScope.lastName = $scope.user.lastname; // Set $rootScope.lastName to the user's last name
              console.log($rootScope.lastname);
            }
          })
        };
      },
    ])
    
    .controller("menuController", [
      "$scope",
      "$element",
      "$timeout",
      "http",
      "$stateParams",
      function ($scope, $element, $timeout, http, $stateParams) {
        let getData = () => {
          $scope.pointer = null;
          $scope.prevView = "table";
          $scope.view = "table";
          $scope.isDisabled = true;
          $scope.isEdit = false;
          $scope.$applyAsync();

          http
            .request({
              url: "./php/get.php",
              method: "POST",
              data: {
                db: "opd",
                query:
                  "SELECT restaurantmenu.*, categories.categorieDesc FROM restaurantmenu JOIN categories ON restaurantmenu.CategorieId = categories.CategorieId;",
                isAssoc: true,
              },
            })
            .then((data) => {
              $scope.data = data;
              if ($scope.data.length) $scope.pointer = 0;
              $scope.$applyAsync();
            })
            .catch((e) => console.log(e));
        };

        getData();
        console.log($stateParams);
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
          if (
            data.data ===
            "A foglalás már létezik erre a telefonszámra és időpontra."
          ) {
            $("#reservationModalLabel").text("Error");
            $(".modal-body").text(data.data);
          } else {
            $("#reservationModalLabel").text("Reservation Confirmation");
            $(".modal-body").text("Köszönjük a foglalást!");
          }
          $("#reservationModal").modal("show");
        });
      };
    })
    // F.A.Q Controller
    .controller("faqController", [
      "$scope", // AngularJS $scope service
      function ($scope) {
        $(document).ready(function () {
          $(".collapse-button").click(function () {
            $(this).next().slideToggle("fast");
            $(this).children(".arrow").toggleClass("rotate");
          });
        });
      },
    ])
    //Order Controller
    .controller("orderController", [
      "$scope", // AngularJS $scope service
      "http", // Custom HTTP service
      "$rootScope",
      "$state",
      function ($scope, http, $rootScope, $state) {
        // Controller function
        // Get menu data from the server using the custom HTTP service
        http
          .request({
            // Sending a request
            url: "./php/get.php", // Endpoint URL
            method: "POST", // HTTP request method
            data: {
              // Request data
              db: "opd",
              query: "SELECT * FROM `menu`", // SQL query
              isAssoc: true, // Result format flag
            },
          })
          .then((data) => {
            // Handling successful response
            $scope.order = data; // Assigning response data to $scope.order
            $scope.$applyAsync(); // Applying changes to the view
            $scope.filter = null; // Initializing filter
            $scope.categories = [
              // Defining categories
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
              // Filter function
              let element = event.currentTarget;
              $scope.filter = element.id; // Setting the filter
              $scope.$applyAsync(); // Applying changes to the view
            };

            $scope.toCart = (event) => {
              $scope.targetId = event.currentTarget.id;
              if (
                !$rootScope.cart.filter((obj) => obj.Id == $scope.targetId)
                  .length
              ) {
                $rootScope.cart = $rootScope.cart.concat(
                  $scope.order.filter((obj) => obj.Id == $scope.targetId)
                ); //Put selected item in cart
                $rootScope.cart[
                  $rootScope.cart.findIndex(
                    (element) => element.Id == $scope.targetId
                  )
                ]["amount"] = 1; // Add amount variable to item and set it to 1
                console.log($scope.cart);
                $scope.updatePrice();
              }
            };

            $scope.updatePrice = () => {
              $rootScope.total = 0;
              $rootScope.cart.forEach((element) => {
                $rootScope.total =
                  +$rootScope.total + +element.Price * +element.amount;
              });
              $scope.hasItems = $rootScope.cart.length > 0;
            };
            $scope.updatePrice();

            $scope.deleteItem = (event) => {
              $rootScope.cart.splice(
                $rootScope.cart.findIndex(
                  (element) => element.Id == event.currentTarget.id
                ),
                1
              );
              $scope.updatePrice();
            };

            $scope.decAmount = (id) => {
              $scope.item = $rootScope.cart.find((element) => element.Id == id);
              if ($scope.item.amount > 1) {
                --$rootScope.cart[
                  $rootScope.cart.findIndex((element) => element.Id == id)
                ].amount;
              }
              $scope.updatePrice();
            };

            $scope.incAmount = (id) => {
              $scope.item = $rootScope.cart.find((element) => element.Id == id);
              if ($scope.item.amount < 100) {
                ++$rootScope.cart[$rootScope.cart.findIndex(element => element.Id == id)].amount;
              };
            $scope.updatePrice();
            };


            $scope.orderDetails = {
              firstName: null,
              lastName: null,
              phone: null,
              city: null,
              address: null,
              paymentType: null
            }

            $scope.Payment = (event) => {
              $scope.orderDetails.paymentType= event.currentTarget.id;           
            };

            $scope.completeOrder = () => {
              function hasNullValue(obj) {
                for (const key in obj) {
                  if (obj[key] === null) {
                    return true;
                  }
                }
                return false;
              }

              if ($scope.hasItems) {
                if ($scope.orderDetails.paymentType !== undefined) {
                  if (!hasNullValue($scope.orderDetails)) {

                    http
                  .request({
                    url: "./php/get.php",
                    method: "POST",
                    data: {
                      db: "opd",
                      query:
                      `INSERT INTO orders(Addresss, ZipCode, Phone, paymentMode, FirstName, LastName, totalPrice) VALUES ("${$scope.orderDetails.address}",${$scope.orderDetails.city},${$scope.orderDetails.phone},"${$scope.orderDetails.paymentType}","${$scope.orderDetails.firstName}","${$scope.orderDetails.lastName}",${$rootScope.total})`,
                      isAssoc: true,
                    },
                  })
                  .then((data) => {
                    $scope.cartQuery = `INSERT INTO orderitems(itemId, orderId, itemQuantity) VALUES `;
                    $rootScope.cart.forEach((element, index) => {
                      $scope.cartQuery += `(${element.Id},(SELECT orderId FROM orders ORDER BY orderId DESC LIMIT 1),${element.amount})`;
                      if (index !== $rootScope.cart.length - 1) {
                        $scope.cartQuery += `, `;
                      }
                    });
                    http
                  .request({
                    url: "./php/get.php",
                    method: "POST",
                    data: {
                      db: "opd",
                      query: $scope.cartQuery,
                      isAssoc: true,
                    },
                  })
                  .then(() => {
                    $rootScope.cart = [];
                    $state.go('home');
                    alert("Rendelés leadása sikeres!");
                  })
                  .catch((e) => console.log(e));

                  })
                  .catch((e) => console.log(e));

                  } else {
                    alert("Kérem töltse ki az összes mezőt!");
                  }

                } else {
                  alert("Kérem válasszon fizetési módszert!");
                }
              }else{
                alert("Nincs semmi a korárban!");
              }
            };
          })
          .catch((e) => console.log(e)); // Handling error
      },
    ]);
})(window, angular);
