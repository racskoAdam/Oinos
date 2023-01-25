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
            templateUrl: "./html/Home.html",
          })
          .state("page1", {
            url: "/page1",
            templateUrl: "./html/Page1.html",
            controller: "page2Controller",
          })
          .state("page2", {
            url: "/page2",
            templateUrl: "./html/Page2.html",
            controller: "page2Controller",
          })
          .state("page3", {
            url: "/page3",
            templateUrl: "./html/Page3.html",
            controller: "page2Controller",
          })
          .state("utazas", {
            url: "/utazas/:utid",
            templateUrl: "./html/utazas.html",
            controller: "page2Controller",
          });
        $urlRouterProvider.otherwise("/");
      },
    ])

    // Home Controller
    .controller("homeController", ["$scope", "$element", "$timeout", "http"])

    .controller("cumGrenade", function ($scope,$routeParams) {
      console.log($routeParams)
    })

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
              db: "utiroda",
              query: "SELECT * FROM `utak`;",
              isAssoc: true,
            },
          })
          .then((data) => {
            $rootScope.page2 = data;
            $rootScope.$applyAsync();
          })
          .catch((e) => console.log(e));
      },
    ])

    // Page2 controller
    .controller("page2Controller", [
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
                db: "utiroda",
                query: "SELECT * FROM `utak`;",
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
    ]);
})(window, angular);

$(document).ready(function () {
  $("#search").keypress(function () {
    $.ajax({
      type: "POST",
      url: "./php/search.php",
      data: {
        name: $("#search").val(),
      },
      success: function (data) {
        $("#output").html(data);
      },
    });
  });
});

function getOption() {
  let osszpontok = 0;
  let v1 = document.getElementById("valasz1");
  let valuev1 = v1.value;
  let textv1 = v1.options[v1.selectedIndex].text;
  let v2 = document.getElementById("valasz2");
  let valuev2 = v2.value;
  let textv2 = v2.options[v2.selectedIndex].text;
  let v3 = document.getElementById("valasz3");
  let valuev3 = v3.value;
  let textv3 = v3.options[v3.selectedIndex].text;
  let v4 = document.getElementById("valasz4");
  let valuev4 = v4.value;
  let textv4 = v4.options[v4.selectedIndex].text;
  let v5 = document.getElementById("valasz5");
  let valuev5 = v5.value;
  let textv5 = v5.options[v5.selectedIndex].text;
  if (textv1 == "Szent Károly tér") {
    osszpontok++;
  }
  if (textv2 == "Carne diosiu") {
    osszpontok++;
  }
  if (textv3 == "Köpeny") {
    osszpontok++;
  }
  if (textv4 == "Színész") {
    osszpontok++;
  }
  if (textv5 == "Kaszinó") {
    osszpontok++;
  }
  if (osszpontok == 0) {
    alert("Adjon meg helyes válaszokat");
  }
  if (osszpontok == 1) {
    alert("Helyes válaszok száma: 1");
    $("#valasz1").val("4");
    $("#valasz2").val("4");
    $("#valasz3").val("4");
    $("#valasz4").val("4");
    $("#valasz5").val("4");
  }
  if (osszpontok == 2) {
    alert("Helyes válaszok száma: 2");
    $("#valasz1").val("4");
    $("#valasz2").val("4");
    $("#valasz3").val("4");
    $("#valasz4").val("4");
    $("#valasz5").val("4");
  }
  if (osszpontok == 3) {
    alert("Helyes válaszok száma: 3");
    $("#valasz1").val("4");
    $("#valasz2").val("4");
    $("#valasz3").val("4");
    $("#valasz4").val("4");
    $("#valasz5").val("4");
  }
  if (osszpontok == 4) {
    alert("Helyes válaszok száma: 4");
    $("#valasz1").val("4");
    $("#valasz2").val("4");
    $("#valasz3").val("4");
    $("#valasz4").val("4");
    $("#valasz5").val("4");
  }
  if (osszpontok == 5) {
    alert(
      "Gratulálunk! Eltalálta az összes kérdést! Kérjük adja le a nyereményjátékra való jelentkezést!"
    );
    $("#submit").fadeIn();
    $("#check").fadeOut();
  }
}
