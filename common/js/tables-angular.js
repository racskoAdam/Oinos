;(function(window, angular) {

  'use strict';

  // Application table(s) module
  angular.module('app.tables', ['app.common'])

	/* Table(s) directive */
	.directive('ngTables', [ 
    () => {

			/* Controller */
			let tblController = [
				'$scope', 
				'$element', 
				($scope, $element) => {
					console.log('tblController...');
				}
			];

      return {
				restrict: 'E',
				transclude: true,
				scope: {},
				controller: tblController,
				template: '<ng-transclude></ng-transclude>',

				/* Compile */
				compile: function() {
					
					return {
						
						/* Pre-link */
						pre: function(scope, iElement, iAttrs) {
							console.log('tblController pre-link...');
						},

						/* Post-link */
						post: function(scope, iElement, iAttrs) {
							console.log('tblController post-link...');
						}
					};
				}
			};
		}
	])

	// Resizable directive 
  .directive('ngResizable', [
    () => {
      return {
        restrict: 'A',
        link: (scope, element, attr) => {
          $(element).resizable({
            isResizable: true,
						minHeight: 320,
						minWidth: 520,
						containment: $(element).closest('.tables-container'),
						grid: null,
						handles: 'e,s,se'
          });
        }
			}
	  }
  ])

  // Draggable directive
  .directive('ngDraggable', [
    () => {
      return {
        restrict: 'A',
        link: (scope, element, attr) => {
          $(element).draggable({
            handle: $(element).find('.table-header'),
						containment: $(element).closest('.tables-container')
          });
        }
			}
	  }
  ]);

})(window, angular);