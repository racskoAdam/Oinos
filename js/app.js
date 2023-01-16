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
          templateUrl: './html/order.html'
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

})(window, angular);


