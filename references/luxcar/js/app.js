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
          templateUrl: './view/home.html'
        })
        .state('cars', {
          url: '/cars',
          templateUrl: './view/cars.html',
          controller: 'carsController'
        })
        .state('rent', {
          url: '/rent',
          templateUrl: './view/rent.html',
          controller: 'rentController'
        })
        .state('table', {
          url: '/table',
          templateUrl: './view/table.html',
          controller: 'tableController',
          params: {tblName:null}
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ])

  // Application run
  .run([
    '$rootScope',
    '$transitions', 
    '$timeout',
    'http',
    function($rootScope, $transitions, $timeout, http) {

      // On before transaction
      let isFirstRun = true;
      $transitions.onBefore({}, function(transition) {
        return $timeout(function() {
          if (isFirstRun) {
            isFirstRun = false;
            if (transition.to().name !== 'home')
              return transition.router.stateService.target('home');
          }
          return true;
        }).catch(e => console.log(e));
      });

      // Set global variables
      $rootScope.state = {id:null, prev:null};
      $rootScope.user = {id:null, type:null, name:null};

      // Get cars
      http.request({
        url: "./php/get.php",
        method: 'POST',
        data: {
          db:'luxcar', 
          query:  'SELECT  `car`.`id`,`car`.`name`,`car`.`nameID`,`car`.`year`,`color`.`name` AS `color`,`car`.`engine`,'+
                          '`fuel`.`name` AS `fuel`,`car`.`horsepower`,`car`.`torque`,`car`.`acceleration`,'+
                          '`car`.`topspeed`,`car`.`price`,`car`.`manufactured`,`car`.`km`, `car_tariff`.`tariff` '+ 
                  'FROM `car` '+ 
                  'INNER JOIN `car_tariff` '+ 
                  'ON  `car`.`id` = `car_tariff`.`carID` AND ' +
                      '`car_tariff`.`valid` = (SELECT Max(`car_tariff`.`valid`) '+
                                              'FROM `car_tariff` '+
                                              'WHERE `car`.`id` = `car_tariff`.`carID` AND '+
                                                    '`car_tariff`.`valid` <= :dateNow) '+
                  'INNER JOIN `fuel` '+ 
                  'ON  `car`.`fuelID` = `fuel`.`id` ' +
                  'INNER JOIN `color` '+ 
                  'ON  `car`.`colorID` = `color`.`id` ' +
                  'WHERE `car`.`valid` = :valid '+
                  'GROUP BY `car`.`id`;',
          params: {':dateNow': moment(moment(), "YYYY-MM-DD").format("YYYY-MM-DD"), ':valid': 1},
          isAssoc: true
        }
      })
      .then(data => {
        $rootScope.cars = data;
        $rootScope.$applyAsync();
      })
      .catch(e => console.log(e));

      // Get carosel images
      http.request("./data/carousel.json")
      .then(data => {
        $rootScope.carousel = data;
        $rootScope.$applyAsync();
      })
      .catch(e => console.log(e));
    }
  ])

  // Application controller
  .controller('appController', [
    '$scope',
    function($scope) {
      console.log('appController');
    }
  ])

  // Cars controller
  .controller('carsController', [
    '$scope',
    function($scope) {
      console.log('carsController');
    }
  ])

  // Rent/Login/Register controller
  .controller('rentController', [
    '$scope',
    '$element',
    '$timeout',
    'util',
    'http',
    function($scope, $element, $timeout, util, http) {

      console.log('rentController');

      // Input model
      $scope.model = {
        rent: {
          carID: null,
          start: null,
          end: null,
          code: util.getTestCode(),
          testcode: null
        },
        login: {
          email: localStorage.getItem("userEmail"),
          password: '1234Aa'
        },
        register: {
          prefixName: null,
          firstName: null,
          middleName: null,
          lastName: null,
          postfixName: null,
          gender: null,
          born: null,
          email: null,
          email2: null,
          password: null,
          password2: null,
          code: util.getTestCode(),
          testcode: null
        }
      }

      // Input changed
      $scope.change = (type) => {
        if (!util.isString(type)) return;
        let btnAccept = document.getElementById(type+'-accept'),
            isBtnOk   = !util.isNull(btnAccept);
        angular.forEach(Object.keys($scope.model[type]), (key) => {
          let element = document.getElementById(type + '-' + key);
          if (element) {
            let isValid = false;
            if (element.hasAttribute('required')) {

              switch(element.type) {
                case 'text':
                case 'email':
                case 'password':
                  if (element.type === 'email' || element.classList.contains('input-email')) {
                    isValid = util.isEmail($scope.model[type][key]);
                    if (isValid) {
                      let parent    = element.closest('form');
                      let elements  = parent.querySelectorAll('.input-email');
                      if (elements.length > 1) {
                        for (let i=0; i < elements.length; i++) {
                          if (!element.isSameNode(elements[i]) && $scope.model[type][key] !== elements[i].value) {
                            isValid = false;
                            break;
                          }
                        }
                      }
                    }
                  } else if (element.classList.contains('input-password')) {
                    isValid = util.isPassword($scope.model[type][key]);
                    let parent    = element.closest('form');
                    let elements  = parent.querySelectorAll('.input-password');
                    if (elements.length > 1) {
                      for (let i=0; i < elements.length; i++) {
                        if (!element.isSameNode(elements[i]) && $scope.model[type][key] !== elements[i].value) {
                          isValid = false;
                          break;
                        }
                      }
                    }
                  } else if (element.classList.contains('input-testcode'))
                        isValid = util.isString($scope.model[type][key]) && $scope.model[type][key].length && 
                                                $scope.model[type][key] === $scope.model[type].code;
                  else  isValid = util.isString($scope.model[type][key]) && $scope.model[type][key].length;
                  break;
                case 'date':
                  if (!util.isUndefined($scope.model[type][key])) {
                    let date = moment($scope.model[type][key]);
                    if (date.isValid()) {
                      if (type === 'register' && key === 'born')
                            isValid = moment().diff(date, 'years', false) >= 18;
                      else  isValid = true;
                    }
                  }
                  break;
                case 'radio':
                case 'select-one':
                  isValid = !util.isUndefined($scope.model[type][key]);
                  break;
                default:
              }
            } else isValid = true;

            isBtnOk = isBtnOk && isValid;
            if (element.hasAttribute('ng-clear-icon'))
              angular.element(element).triggerHandler('onInputChanged', 
                                 !util.isString($scope.model[type][key]) || 
                                               !$scope.model[type][key].length);
            if (element.hasAttribute('ng-checkmark'))
              angular.element(element).triggerHandler('checkmarkShow', isValid);
          }
        });
        if (btnAccept) btnAccept.disabled = !isBtnOk;
      };

      // Accept
      $scope.accept = (type) => {
        let result;
        switch(type) {
          case 'rent':
          case 'login':
            result = Object.keys($scope.model[type])
                           .filter((key) => !['code','testcode'].includes(key))
                           .reduce((o, k) => { return Object.assign(o, { [k]: $scope.model[type][k] })}, {});
            
            // Check user
            http.request({
              url: "./php/login.php",
              method: 'POST',
              data: result
            })
            .then(data => {
              if (util.isArray(data) && data.length) {
                $scope.user.id    = data[0].id;
                $scope.user.type  = data[0].type;
                $scope.user.name  = data[0].name;
                localStorage.setItem("userEmail", $scope.model.login.email);
                $scope.$applyAsync();
                $scope.reset(type);
              } else {
                alert('Hibás felhasználó vagz jelszó!');
              }
            })
            .catch(e => console.log(e));
            break;
          case 'register':
            result = Object.keys($scope.model[type])
                           .filter((key) => !['code','testcode','email2','password2'].includes(key))
                           .reduce((o, k) => { return Object.assign(o, { [k]: $scope.model[type][k] })}, {});
            console.log(result);
            $scope.reset(type);
            break;
          default:
            return;
        }
      };

      // Refresh testcode
      $scope.testcodeRefresh = (type) => {
        $scope.model[type].code = util.getTestCode();
        $scope.model[type].testcode = null;
        $scope.$applyAsync();
        $scope.change(type);
        $element[0].querySelector('input#'+type+'-testcode').focus();
      };

      // Check-Out
      $scope.checkout = () => {
        $scope.user.id    = null;
        $scope.user.type  = null;
        $scope.user.name  = null;
        $scope.$applyAsync();
        $scope.reset('login');
      }

      // Run check for or model
      $timeout(() => {
        angular.forEach(Object.keys($scope.model), type => $scope.change(type));
      }, 100);
    }
  ])

  // Table controller
  .controller('tableController', [
    '$scope',
    '$stateParams',
    'http',
    function($scope, $stateParams, http) {
      $scope.tblName = $stateParams.tblName;
      http.request({
        url: "./php/get.php",
        method: 'POST',
        data: {str: `../str/${$scope.tblName}.json`}
      })
      .then(data => {
        $scope.data = data;
        $scope.$applyAsync();
      })
      .catch(e => console.log(e));
    }
  ]);

})(window, angular);