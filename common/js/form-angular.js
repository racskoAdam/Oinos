;(function(window, angular) {

  'use strict';

  // Application form module
  angular.module('app.form', ['app.common'])

  /* Clear icon */
	.directive('ngClearIcon', [
    '$compile',
    '$timeout',
    'util',
    ($compile, $timeout, util) => {
      return {
        restrict: 'EA',
        require: "ngModel",
        link: (scope, element, attr, ngModel) => {
          let icon = angular.element(`<span class="position-absolute text-primary cursor-pointer
                                                   fw-bolder d-conditional btnClickEffect">x<span/>`);
          let posTop;
          if (element.hasClass('form-control-sm'))
                posTop = '2px';
          else  posTop = '5px';
          icon.css({top:posTop, zIndex:101});
          if (util.isJson(attr.ngClearIcon)) 
                icon.css(JSON.parse(attr.ngClearIcon));
          else  icon.css({right:'10px'});
          element.css({paddingRight:'25px'});
          element.parent().append(icon);
          $compile(icon)(scope);
          $timeout(() => {
            icon[!util.isString(ngModel.$viewValue) || 
                               !ngModel.$viewValue.length ? 
                               'removeClass' : 'addClass']('show');
            icon.on('click', () => {
              icon.removeClass('show');
              ngModel.$setViewValue(undefined);
              ngModel.$render();
              element.focus();
            });
            element.on('input', () => icon[!util.isString(ngModel.$viewValue) || 
                                                         !ngModel.$viewValue.length ? 
                                                         'removeClass' : 'addClass']('show'));
            element.on('onInputChanged', (event,  isEmpty) => icon[isEmpty ? 'removeClass' : 'addClass']('show'));
          }, 100);
				}
			}
		}
	])

  /* Checkmark */
	.directive('ngCheckmark', [
    '$compile',
    'util',
    ($compile, util) => {
      return {
        restrict: 'EA',
        link: (scope, element, attr) => {
          let icon = angular.element('<span class="position-absolute text-success fw-bolder d-conditional">&#10004;<span/>');
          let posTop;
          if (element.hasClass('form-control-sm'))
                posTop = '2px';
          else  posTop = '4px';
          icon.css({top:posTop, zIndex:101});
          if (util.isJson(attr.ngCheckmark)) 
                icon.css(JSON.parse(attr.ngCheckmark));
          else  icon.css({right:'-30px'});
          element.parent().append(icon);
          $compile(icon)(scope);
          element.on('checkmarkShow', (event, isShow) => {
            icon[isShow ? 'addClass' : 'removeClass']('show');
          });
				}
			}
		}
	])

  /* Show/Hide password */
	.directive('ngDisplayPassword', [
    () => {
      return {
        restrict: 'EA',
        link: (scope, element, attr) => {
          let skeleton = attr.ngDisplayPassword.trim();
          if (!skeleton.length) skeleton = 'form';
          let parent = element.closest(skeleton);
          if (parent.length) {
            let elements = parent.find('.input-password');
            if (elements.length) {
              element.on('change', () => 
                angular.forEach(elements, (e) => 
                  e.type = e.type === 'password' ? 'text' : 'password'));
            }
          }
				}
			}
		}
	])

  /* Remove all white space */
  .directive('ngWhiteSpace', [
    'util',
    (util) => {
      return {
        restrict: 'A',
        require: "ngModel",
        link: (scope, element, attr, ngModel) => {
          element.bind("keyup", () => {
            if (util.isString(ngModel.$viewValue)) {
              let value = ngModel.$viewValue.trim().split(' ').join('');
              if (ngModel.$viewValue !== value) {
                ngModel.$setViewValue(value);
                ngModel.$render();
              }
            }
          });
        }
			}
		}
	])

  /* Test code directive */
	.directive('ngTestCode', [
    '$timeout',
    'util',
    ($timeout, util) => {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          ngModel: '=',
          changeFn: '&',
          type: '@'
        },
        template:  `<div class="row mb-3">
                    	<h4 class="mb-2 text-start letter-spacing-2 content-testcode">
                    		{{ngModel.code}}
                    	</h4>
                    	<div class="input-group input-row">
                    		<div class="input-group-prepend">
                    			<span class="input-group-text h-100">
                    				<i class="fas fa-robot"></i>
                    			</span>
                    		</div>
                    		<input id="{{type}}-testcode"
                               type="text" 
                    					 class="form-control input-testcode" 
                    					 ng-model="ngModel.testcode" 
                    					 ng-change="changeFn({type: type})"
                    					 spellcheck="false" 
                    					 autocomplete="off" 
                    					 ng-trim="false"
                    					 placeholder="code" 
                    					 required
                    					 maxlength="5" 
                    					 style="min-width:120px !important;max-width:120px !important;"
                    					 ng-clear-icon='{"left":"150px"}'
                    					 ng-checkmark
                    					 ng-keyup="testcodeInit($event)">
                    		<div class="input-group-append">
                    				<span class="input-group-text btnClickEffect cursor-pointer h-100" 
                    							ng-click="testcodeRefresh()">
                    					<i class="fas fa-sync-alt me-2"></i>
                    					<span>Refresh</span>
                    				</span>
                    		</div>
                    	</div>
                    </div>`,
        link: (scope, element) => {
          
          // Create/Set scope model keys
          scope.ngModel.code      = util.getTestCode();
          scope.ngModel.testcode  = null;

          // Refresh testcode
          scope.testcodeRefresh = () => {
            scope.ngModel.code = util.getTestCode();
            scope.ngModel.testcode = null;
            scope.$applyAsync();
            element[0].querySelector('input').focus();
            $timeout(() => {
              scope.changeFn({type: scope.type});
            });
          };
        
          // Testcode initialize
          scope.testcodeInit = (event) => {
            if (event.ctrlKey && event.altKey && event.key.toUpperCase() === 'C') {
              scope.ngModel.testcode = null;
              scope.$applyAsync();
              $timeout(() => {
                scope.ngModel.testcode = scope.ngModel.code;
                scope.$applyAsync();
                scope.changeFn({type: scope.type});
              });
            }
          };
        }
			}
		}
	]);

})(window, angular);