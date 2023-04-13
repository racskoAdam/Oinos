(function (window, angular) {
  "use strict";

  // Application module
  angular
    .module("app", ["ui.router", "app.common", "angular.filter"])

    // Application config
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
          })
          .state("reservation", {
            url: "/reservation",
            templateUrl: "./html/reservation.html",
            controller: "reservationController",
          })
          .state("menu", {
            url: "/menu",
            templateUrl: "./html/menu.html",
            controller: "menuController",
          })
          .state("finalizeOrder", {
            url: "/finalizeOrder",
            templateUrl: "./html/finalizeOrder.html",
            controller: "orderController",
          })
          .state("login", {
            url: "/login",
            templateUrl: "./html/login.html",
            controller: "regLogController",
          })
          .state("register", {
            url: "/register",
            templateUrl: "./html/register.html",
            controller: "regLogController",
          })
          .state("userDetails", {
            url: "/userDetails",
            templateUrl: "./html/userDetails.html",
            controller: "userDetailsController",
          });

        $urlRouterProvider.otherwise("/");
      },
    ])

    .run([
      "$rootScope",
      "$transitions",
      "$timeout",
      function ($rootScope, $transitions, $timeout) {
        // On before transaction
        let isFirstRun = true;
        $transitions.onBefore({}, function (transition) {
          window.scrollTo(0, 0);
          return $timeout(function () {
            if (isFirstRun) {
              isFirstRun = false;
              if (transition.to().name !== "home")
                return transition.router.stateService.target("home");
            }
            return true;
          }).catch((e) => alert(e));
        });

        // Set global variables
        $rootScope.state = { id: null, prev: null };
        $rootScope.cart = []; //create cart for ordering
        $rootScope.total = 0;

        // Check if user is logged in on page refresh
        if (localStorage.getItem("loggedIn")) {
          $rootScope.userData = JSON.parse(localStorage.getItem("userData"));
          $rootScope.firstName = localStorage.getItem("firstName");
          $rootScope.lastName = localStorage.getItem("lastName");
          $rootScope.loggedIn = true;
        } else {
          $rootScope.loggedIn = false;
        }
      },
    ])

    .controller("regLogController", [
      "$scope",
      "$http",
      "$state",
      "$rootScope",
      function ($scope, $http, $state, $rootScope) {
        $scope.user = {};
        $scope.emailError = null;
        $scope.phoneError = null;

        $scope.validateEmail = function () {
          $scope.emailError = null;
          let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
          if ($scope.user.email && !emailRegex.test($scope.user.email)) {
            $scope.emailError = "Kérjük, adjon meg egy érvényes e-mail címet.";
          }
        };

        $scope.validatePhone = function () {
          $scope.phoneError = null;
          let phoneRegex =
            /^(?:(?:\+|00)36|06)?(?:-|\s)?(?:20|30|31|50|70|90)(?:-|\s)?\d{3}(?:-|\s)?\d{4}$/;
          if ($scope.user.phone && !phoneRegex.test($scope.user.phone)) {
            $scope.phoneError = "Kérjük, adjon meg egy érvényes telefonszámot.";
          }
        };

        $scope.register = function () {
          // Check for validation errors
          if (
            !$scope.user.email ||
            !$scope.user.phone ||
            $scope.emailError ||
            $scope.phoneError
          ) {
            alert("Kérem töltse ki az összes mezőt megfelelően"); // Display error message if any of the required fields are missing or there are validation errors
            return;
          }
          $http({
            method: "POST",
            url: "./php/register.php",
            data: $.param($scope.user),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }).then(function (response) {
            if (response.data.indexOf("User with email") !== -1) {
              // show Bootstrap modal with error message
              $("#errorMessageModal").modal("show");
              $scope.errorMessage = response.data;
            } else {
              // show Bootstrap modal with success message
              $("#successModal").modal("show");
              // redirect to home state
              $state.go("home");

              // set logged in status and user information in local storage
              localStorage.setItem("loggedIn", "true");
              let userWithoutPassword = angular.copy($scope.user); // Make a copy of the user object
              delete userWithoutPassword.password; // Remove the password property from the copy
              localStorage.setItem(
                "userData",
                JSON.stringify(userWithoutPassword)
              );
              localStorage.setItem("firstName", $scope.user.firstname);
              localStorage.setItem("lastName", $scope.user.lastname);
              $rootScope.loggedIn = true;
              $rootScope.firstName = $scope.user.firstname; // Set $rootScope.firstName to the user's first name
              $rootScope.lastName = $scope.user.lastname; // Set $rootScope.lastName to the user's last name
            }
          });
        };

        $scope.login = function () {
          $http({
            method: "POST",
            url: "./php/login.php",
            data: $.param($scope.user),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }).then(function (response) {
            if (response.data.status === "error") {
              // show Bootstrap modal with error message
              $("#errorMessageModal").modal("show");
              $scope.errorMessage = "Helytelen e-mail cím vagy jelszó.";
            } else {
              // show Bootstrap modal with success message
              $("#successModal").modal("show");
              // store user data in local storage
              localStorage.setItem("userData", JSON.stringify(response.data));
              // redirect to home state
              $state.go("home");
              localStorage.setItem("loggedIn", "true");
              localStorage.setItem("firstName", response.data.firstname);
              localStorage.setItem("lastName", response.data.lastname);
              $rootScope.loggedIn = true;
              $rootScope.firstName = response.data.firstname; // Set $rootScope.firstName to the user's first name
              $rootScope.lastName = response.data.lastname; // Set $rootScope.lastName to the user's last name
            }
          });
        };

        $scope.logout = function () {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("userData");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");

          // Update $rootScope values
          $rootScope.loggedIn = false;
          $rootScope.cart = [];
          $rootScope.firstName = null; // Set $rootScope.firstName to the user's first name
          $rootScope.lastName = null;
          // Redirect to home page
          $state.go("home");
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
            .catch((e) => alert(e));
        };

        getData();
      },
    ])

    .controller("userDetailsController", [
      "$scope",
      "$http",
      "$rootScope",
      "$state",
      function ($scope, $http, $rootScope, $state) {
        "$scope",
          "$http",
          "$rootScope",
          "$state",
          ($scope.init = function () {
            $rootScope.userData = JSON.parse(localStorage.getItem("userData"));
            $scope.user = {
              email: $scope.userData["email"],
              firstName: $rootScope.firstName,
              lastName: $rootScope.lastName,
              phone: $scope.userData["phone"],
              password: $scope.userData["password"],
              zipcode: $scope.userData["zipcode"],
              address: $scope.userData["address"],
            };
          });

        $scope.accountDeletion = function () {
          $scope.email = $rootScope.userData.email;
          $("#deleteConfirmation").modal("show");
          $("#deleteConfirmation")
            .attr("data-bs-dismiss", "modal")
            .on("click", "#yesBtn", function () {
              // Send HTTP request to trigger PHP file for account deletion
              $http({
                method: "POST",
                url: "./php/get.php",
                data: {
                  db: "opd",
                  query: `DELETE FROM users WHERE email = ("${$scope.email}")`,
                  isAssoc: true,
                },
              }).then(
                function success() {
                  $state.go("home");

                  // Remove user data from local storage
                  localStorage.removeItem("loggedIn");
                  localStorage.removeItem("userData");
                  localStorage.removeItem("firstName");
                  localStorage.removeItem("lastName");

                  // Update $rootScope values
                  $rootScope.loggedIn = false;
                  $rootScope.cart = [];
                  $rootScope.firstName = null;
                  $rootScope.lastName = null;
                },
                function error(response) {
                  console.log(response.statusText);
                }
              );
            });
        };

        $scope.updateUserData = function () {
          $http({
            method: "POST",
            url: "./php/updateUserData.php",
            data: $scope.user,
            headers: { "Content-Type": "application/json" },
          })
            .then(function () {
              localStorage.setItem("userData", JSON.stringify($scope.user));
              localStorage.setItem("firstName", $scope.user.firstName);
              localStorage.setItem("lastName", $scope.user.lastName);
              $rootScope.firstName = $scope.user.firstName; // Set $rootScope.firstName to the user's first name
              $rootScope.lastName = $scope.user.lastName; // Set $rootScope.lastName to the user's last name
              $rootScope.userData = $scope.user; // Set $rootScope.userData to the updated user data
            })
            .catch(function (error) {
              // Hiba esetén kezeld a hibát
              console.error("Adatmentési hiba:", error);
            });
        };

        $scope.showOrders = function () {
          $http
            .post("./php/getOrders.php", { email: $rootScope.userData.email })
            .then(
              function (response) {
                $scope.orders = response.data;

                // Check if $scope.orders is an array
                if (Array.isArray($scope.orders)) {
                  // Csoportosítás orderId alapján
                  var groupedOrders = {};
                  $scope.orders.forEach(function (order) {
                    if (!groupedOrders[order.orderId]) {
                      groupedOrders[order.orderId] = {
                        order: order,
                        items: [],
                      };
                    }
                    groupedOrders[order.orderId].items.push({
                      itemId: order.itemId,
                      itemName: order.itemName,
                      itemQuantity: order.itemQuantity,
                      itemPrice: order.itemPrice,
                    });
                  });

                  // Csoportosított rendelések megjelenítése
                  $scope.groupedOrders = [];
                  for (var orderId in groupedOrders) {
                    $scope.groupedOrders.push(groupedOrders[orderId]);
                  }
                } else {
                  // If $scope.orders is not an array, initialize groupedOrders as an empty array
                  $scope.groupedOrders = [];
                }
              },
              function (error) {
                console.log(error);
              }
            );
        };

        $scope.showOrderDetails = function (order) {
          $http({
            method: "POST",
            url: "./php/getOrderItems.php",
            data: {
              orderId: order.order.orderId,
            },
            headers: { "Content-Type": "application/json" },
          }).then(
            function (response) {
              order.items = response.data; // Update this line
              order.showDetails = true;
            },
            function (error) {
              console.log(error);
            }
          );
        };
      },
    ])

    //Reservation Controller
    .controller("reservationController", [
      "$scope",
      "http",
      "$state",
      function ($scope, http, $state) {
        // Initialize an array to store the time options
        $scope.timeOptions = [];
        $scope.formData = {};

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
          // Get today's date
          let today = new Date();
          // Add specified number of days (default to 1) to today's date
          today.setDate(today.getDate() + (days || 1));
          // Return the date in ISO format and cut off the time portion
          return today.toISOString().substring(0, 10);
        };

        $scope.validateDate = function () {
          if (
            // If selected date is before today or more than 10 days from today
            $scope.date < $scope.next10Days() ||
            $scope.date > $scope.next10Days(10)
          ) {
            // Reset selected date to null
            $scope.date = null;
          }
        };

        $scope.validateEmail = function () {
          if ($scope.formData.email) {
            // Use regular expression to validate email format
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test($scope.formData.email)) {
              $scope.emailError = "Kérem adjon meg egy érvényes email címet!";
            } else {
              $scope.emailError = "";
            }
          }
        };

        $scope.validatePhone = function () {
          if ($scope.formData.phone) {
            // Use regular expression to validate phone number format (Hungarian format)
            let phoneRegex =
              /^(?:(?:\+|00)36|06)?(?:-|\s)?(?:20|30|31|50|70|90)(?:-|\s)?\d{3}(?:-|\s)?\d{4}$/;

            if (!phoneRegex.test($scope.formData.phone)) {
              $scope.phoneError = "Kérem adjon meg egy érvényes telefonszámot!";
            } else {
              $scope.phoneError = "";
            }
          }
        };

        // Function to submit the form
        $scope.submitForm = function () {
          // Check for validation errors
          if (
            !$scope.formData.name ||
            !$scope.formData.email ||
            !$scope.formData.phone ||
            !$scope.date ||
            !$scope.time ||
            $scope.emailError ||
            $scope.phoneError
          ) {
            alert("Kérem töltse ki az összes mezőt megfelelően"); // Display error message if any of the required fields are missing or there are validation errors
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

          http
            .request({
              method: "POST",
              url: "./php/submit-form.php",
              data: $scope.formData,
            })
            .then(function (data) {
              let success = data === "Köszönjük a foglalást!";
              $("#reservationModalLabel").text(
                success ? "Foglalás megerősítve" : "Hiba"
              );
              $(".modal-body").text(data);
              $("#reservationModal").modal("show");
              if (success) $state.go("home");
            })
            .catch((e) => {
              console.log(e);
            });

          /*
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
              $("#reservationModalLabel").text("Foglalás megerősítés");
              $(".modal-body").text("Köszönjük a foglalást!");
              $state.go("home");
            }
            $("#reservationModal").modal("show");
          });
          */
        };
      },
    ])

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
            updateInCartStatus(); // Update inCart status for items in the cart
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
              const selectedItem = $scope.order.find(
                (obj) => obj.Id == $scope.targetId
              );

              // Check if the item is already in the cart
              const itemInCart = $rootScope.cart.find(
                (item) => item.Id === selectedItem.Id
              );

              // If the item is not in the cart, add it
              if (!itemInCart) {
                selectedItem.inCart = true;
                $rootScope.cart.push(selectedItem);
                selectedItem.amount = 1;
                $scope.updatePrice();
                updateInCartStatus();
              }
            };

            function updateInCartStatus() {
              $rootScope.cart.forEach((cartItem) => {
                const matchingItem = $scope.order.find(
                  (item) => item.Id === cartItem.Id
                );
                if (matchingItem) {
                  matchingItem.inCart = true;
                }
              });
            }

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
              const deletedItem = $rootScope.cart.find(
                (obj) => obj.Id == event.currentTarget.id
              );
              const deletedIndex = $rootScope.cart.indexOf(deletedItem);
              $rootScope.cart.splice(deletedIndex, 1);

              // Update inCart property for the deleted item
              const matchingItem = $scope.order.find(
                (item) => item.Id === deletedItem.Id
              );
              if (matchingItem) {
                matchingItem.inCart = false;
              }
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
                ++$rootScope.cart[
                  $rootScope.cart.findIndex((element) => element.Id == id)
                ].amount;
              }
              $scope.updatePrice();
            };

            $scope.orderDetails = {
              firstName: null,
              lastName: null,
              phone: null,
              city: null,
              address: null,
              paymentType: null,
              email: null,
            };

            if (localStorage.getItem("loggedIn")) {
              $scope.userData = JSON.parse(localStorage.getItem("userData"));
              $scope.orderDetails = {
                email: $scope.userData["email"],
                firstName: $rootScope.firstName,
                lastName: $rootScope.lastName,
                phone: $scope.userData["phone"],
                city: $scope.userData["zipcode"],
                address: $scope.userData["address"],
                paymentType: null,
              };
              $scope.canEditEmail = false; // Set to false when user is logged in
            } else {
              $scope.canEditEmail = true; // Set to true when user is logged out
            }

            $scope.Payment = (event) => {
              $scope.orderDetails.paymentType = event.currentTarget.id;
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
                          query: `INSERT INTO orders(Email,Addresss, ZipCode, Phone, paymentMode, FirstName, LastName, totalPrice, state) VALUES ("${$scope.orderDetails.email}","${$scope.orderDetails.address}",${$scope.orderDetails.city},${$scope.orderDetails.phone},"${$scope.orderDetails.paymentType}","${$scope.orderDetails.firstName}","${$scope.orderDetails.lastName}",${$rootScope.total},"ordered")`,
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
                            if ($scope.paymentType == "cash") {
                              $scope.payment = "Kézpénz";
                            } else {
                              $scope.payment = "Bankkártya";
                            }
                            $scope.CurrentDate = new Date().toLocaleString(
                              "hu-HU",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                              }
                            );

                            $state.go("home");
                            alert("Rendelés leadása sikeres!");

                            http
                              .request({
                                url: "./php/send_email.php",
                                method: "POST",
                                data: {
                                  email: $scope.orderDetails.email,
                                  subject: `Kedves ${$scope.orderDetails.firstName} ${$scope.orderDetails.lastName}! Rögzítettük a ${$scope.CurrentDate} dátumú rendelését!`,
                                  message: `
                                    <html>
                                      <head>
                                        <style>
                                          body {
                                            font-size: 25px;
                                            font-family: Arial, sans-serif;
                                          }
                                          h1 {
                                            font-size: 28px;
                                            font-weight: bold;
                                          }
                                          table {
                                            border-collapse: collapse;
                                            width: 100%;
                                          }
                                          th, td {
                                            text-align: left;
                                            padding: 8px;
                                            border-bottom: 1px solid #ddd;
                                          }
                                          th {
                                            background-color: #f2f2f2;
                                          }
                                          p{
                                            font-size: 25px;
                                          }
                                        </style>
                                      </head>
                                      <body>
                                        <h1>Kedves ${
                                          $scope.orderDetails.firstName
                                        } ${$scope.orderDetails.lastName},</h1>
                                        <p>Köszönjük rendelését! Az alábbi adatokkal rögzítettük a rendelést:</p>
                                        <ul>
                                          <li>Rendelés időpontja: ${
                                            $scope.CurrentDate
                                          }</li>
                                          <li>Email: ${
                                            $scope.orderDetails.email
                                          }</li>
                                          <li>Cím: ${
                                            $scope.orderDetails.address
                                          }</li>
                                          <li>Irányítószám: ${
                                            $scope.orderDetails.city
                                          }</li>
                                          <li>Telefonszám: ${
                                            $scope.orderDetails.phone
                                          }</li>
                                          <li>Fizetési mód: ${
                                            $scope.payment
                                          } </li>
                                          <li>Összesen fizetendő: ${
                                            $rootScope.total
                                          } Ft</li>
                                        </ul>
                                        <p>A rendelt termékek:</p>
                                        <table>
                                          <thead>
                                            <tr>
                                              <th>Termék neve</th>
                                              <th>Mennyiség</th>
                                              <th>Ár</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            ${$rootScope.cart
                                              .map(
                                                (item) => `
                                                  <tr>
                                                    <td>${item.Name}</td>
                                                    <td>${item.amount}</td>
                                                    <td>${item.Price} Ft</td>
                                                  </tr>
                                                `
                                              )
                                              .join("")}
                                          </tbody>
                                        </table>
                                        <p>Kérjük, hogy hogy ellenőrizze adatait. A rendelés állapota folyamatosan követhető a weboldalon.</p>
                                         <p>Köszönjük, hogy minket választott!</p>
                                       </body>
                                     </html>
                                   `,
                                },
                              })
                              .then(() => {
                                $rootScope.cart = [];
                              })
                              .catch((e) => alert(e));
                          })
                          .catch((e) => alert(e));
                      })
                      .catch((e) => alert(e));
                  } else {
                    alert("Kérem töltse ki az összes mezőt!");
                  }
                } else {
                  alert("Kérem válasszon fizetési módszert!");
                }
              } else {
                alert("Nincs semmi a korárban!");
              }
            };
          })
          .catch((e) => alert(e)); // Handling error
      },
    ]);
})(window, angular);
