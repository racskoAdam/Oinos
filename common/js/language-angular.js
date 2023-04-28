;(function(window, angular) {

  'use strict';

  // Application language module
  angular.module('app.language', ['app.common'])

	// Traslate
  .filter('translate', [
    'util', 
    (util) => {
      return (key, data=null, isAllowed=true) => {
        if (!util.isString(key)) return key;
        key = key.trim();
        if (!util.isBoolean(isAllowed)) isAllowed = true;
        if (!isAllowed || !util.isObjectHasKey(data, key)) return key;
        return data[key];
      }
    }
  ])

	// Language factory
  .factory('lang', [
    '$rootScope',
    '$timeout', 
    'http',
    'util', 
    function($rootScope, $timeout, http, util) {

      // Set service
      let service = {

        // Initialize
        init: () => {

          // Get page identifier
          if (!util.isObjectHasKey($rootScope, 'pageID'))
            $rootScope.pageID = util.getPageId();

          // Set language
          $rootScope.lang = {
            id:null, 
            type:null, 
            index:null,
            rule: {
              west:["prefix_name","first_name","middle_name","last_name","suffix_name"],
              east:["prefix_name","last_name","middle_name","first_name","suffix_name"]
            }, 
            available:[], 
            data:{}
          };

          // Get available languages
          http.request("./lang/available.json")
          .then(data => {

            // Check/Set available languages
            $rootScope.lang.available = data;
            if (!util.isArray($rootScope.lang.available) || 
                             !$rootScope.lang.available.length) {
              $rootScope.lang.available = [{
                id    : "en",
		            type  : "west",
                name  : "english",
                local : "english",
                img   : "./image/countries/usa.png",
                valid : true
              }];
            }

            // Get/Check last language identifier
            $rootScope.lang.id = localStorage.getItem($rootScope.pageID + "-lang-id");
            if (!$rootScope.lang.id) $rootScope.lang.id = document.documentElement.lang;

            // When language id is not in available languages, then set to first
            $rootScope.lang.index = util.indexByKeyValue($rootScope.lang.available, 'id', $rootScope.lang.id);
            if ($rootScope.lang.index === -1) {
                $rootScope.lang.id    = $rootScope.lang.available[0];
                $rootScope.lang.index = 0;
            }

            // Get language type
            $rootScope.lang.type = $rootScope.lang.available[$rootScope.lang.index].type;

            // Get data
            service.get();
          })
          .catch(e => console.log(e));
        },

        // Set html language property
        setHtml: () => {
          localStorage.setItem($rootScope.pageID + "-lang-id", $rootScope.lang.id);
          document.documentElement.lang = $rootScope.lang.id;
          let title = document.getElementsByTagName("title");
          if (title.length) {
            let langKey = title[0].dataset.langKey;
            if (util.isObjectHasKey($rootScope.lang.data, langKey)) 
              document.title = util.capitalize($rootScope.lang.data[langKey]);
          }
        },

        // Get language data
        get: () => {

          http.request("./lang/" + $rootScope.lang.id + ".json")
          .then(data => {
            $rootScope.lang.data = data;
            service.setHtml();
            $rootScope.$applyAsync();
          })
          .catch(e => console.log(e));
        },

        // Set language
        set: (id) => {
          $rootScope.lang.id  = id;
          $rootScope.lang.index = util.indexByKeyValue($rootScope.lang.available, 'id', id);
          $rootScope.lang.type = $rootScope.lang.available[$rootScope.lang.index].type;
          service.get();
        }
      };

      // On language changed
      $rootScope.changeLanguage = (event) => {
        service.set(event.currentTarget.dataset.langId);
      };

      // Return service
      return service;
    }
  ])

	/* Language name directive */
	.directive('ngLangName', [ 
    () => {
      return {
        restrict: 'EA',
        scope: false,
        template:`<span class="me-1"
                        ng-repeat="field in lang.rule[lang.type]"
                        ng-if="data.row[rowPointer][field]">
                    {{data.row[rowPointer][field]}}
                  </span>`,
        link: (scope, element, attr) => {
          scope.rowPointer = parseInt(attr.ngLangName);
        }
			}
		}
	])

	// Tooltip directive
  .directive('ngTooltip', [
    '$compile',
    '$timeout',
    ($compile, $timeout) => {
      return {
        restrict: 'EA',
        scope: false,
        link: (scope, element, attr) => {
          if (!scope.item.tooltip) {
            element[0].removeAttribute("ng-tooltip");
            return;
          }
          let showTimeout, cancelTimeout, trinagle,
              tooltip = angular.element(
                `<div class="tooltip-text position-absolute d-inline-block fs-sm lh-1 text-white bg-black py-1 px-3 rounded text-nowrap z-index-100 invisible">
                  {{lang.data[item.tooltip] | capitalize}}
                  <div class="tooltip-triangle position-absolute"></div>
                </div>`);
          element.append(tooltip);
          $compile(tooltip)(scope);
          
          let show = (event) => {
            event.preventDefault();
            element[0].classList.add('hovered');
            showTimeout = $timeout(() => {
              let trinagleLeft  = parseInt((tooltip[0].offsetWidth - trinagle.offsetWidth) / 2),
                  maxWidth      = parseInt(Math.max(element[0].offsetWidth, tooltip[0].offsetWidth)),
                  minWidth      = parseInt(Math.min(element[0].offsetWidth, tooltip[0].offsetWidth)),
                  tooltipLeft   = -1 * parseInt((maxWidth - minWidth) / 2);
              if (element[0].classList.contains('hovered')) {
                trinagle.style.left = trinagleLeft + 'px';
                tooltip[0].style.left = tooltipLeft + 'px';
                tooltip[0].classList.remove('invisible');
                cancelTimeout = $timeout(() => {
                  element[0].classList.remove('hovered');
                  tooltip[0].classList.add('invisible');
                }, 3000);
              }
            }, 1000);
          };

          let hide = (event) => {
            event.preventDefault();
            $timeout.cancel(showTimeout);
            $timeout.cancel(cancelTimeout);
            element[0].classList.remove('hovered');
            tooltip[0].classList.add('invisible');
          };

          $timeout(() => {
            let tooltipTop, triangleTop;
            trinagle = tooltip[0].querySelector(".tooltip-triangle");
						trinagle.style.borderLeft 	= "5px solid transparent";
						trinagle.style.borderRight	= "5px solid transparent";
						trinagle.style.height = "0";
						trinagle.style.width 	= "0";
            if (attr.ngTooltip === 'top') {
              tooltip[0].classList.add('tooltip-top');
              tooltipTop  = -1 * parseInt(tooltip[0].offsetHeight + trinagle.offsetHeight);
              triangleTop = parseInt(tooltip[0].offsetHeight);
							trinagle.style.borderTop = "5px solid #000;";
            } else  {
              tooltip[0].classList.add('tooltip-botton');
              tooltipTop  = parseInt(element[0].offsetHeight + trinagle.offsetHeight);
              triangleTop = -1 * parseInt(trinagle.offsetHeight);
							trinagle.style.borderBottom = "5px solid #000;";
            }
            tooltip[0].style.top  = tooltipTop + 'px';
            trinagle.style.top    = triangleTop + 'px';
            element[0].addEventListener('mouseover', show);
            element[0].addEventListener('mouseleave', hide);
            element[0].addEventListener('click', hide);
          });
        }
			}
	  }
  ]);

})(window, angular);