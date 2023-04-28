;(function(window, angular) {

  'use strict';

  // Add class(es)
  HTMLElement.prototype.addClass = (function(classList) {
    if (Object.prototype.toString.call(classList) === '[object String]' ||
                                       classList instanceof String) {
      classList = [...new Set(classList.split(' ').map(s => s.trim()).filter(s => s.length))];
      classList.forEach(c => this.classList.add(c));
    }
  });

  // Remove class(es)
  HTMLElement.prototype.removeClass = (function(classList) { 
    if (Object.prototype.toString.call(classList) === '[object String]' ||
                                       classList instanceof String) {
      classList = [...new Set(classList.split(' ').map(s => s.trim()).filter(s => s.length))];
      classList.forEach(c => this.classList.remove(c));
    }
  });

  // Toogle class(es)
  HTMLElement.prototype.toggleClass = (function(classList) { 
    if (Object.prototype.toString.call(classList) === '[object String]' ||
                                       classList instanceof String) {
      classList = [...new Set(classList.split(' ').map(s => s.trim()).filter(s => s.length))];
      classList.forEach(c => this.classList.toogle(c));
    }
  });

  // Application common module
  angular.module('app.common', [])

  // Capitalize
  .filter('capitalize', [
    'util', 
    (util) => {
      return (str, isAllowed=true) => {

        // Check parameters
        if (!util.isString(str)) return str;
        str = str.trim();
        if (!util.isBoolean(isAllowed)) isAllowed = true;
        if (!isAllowed || !str.length) return str;
        return util.capitalize(str);
      }
    }
  ])

  // Number thousand separator
  .filter('numSep', [
    'util',
    function (util) {
      return (number, separator) => {
      
		  	// Check parameters
		  	if (!util.isVarNumber(number)) number = 0;
		  	if (!util.isString(separator)) separator = ' ';
      
		  	// Return number thousand separated
        return number.toString()
		  							 .replace(/(\d)(?=(\d{3})+(?!\d))/g,
		  											'$1' + separator.charAt(0)); 
      };
    }
  ])

  // Number leading zero
  .filter('numPad', [
    'util',
    (util) => {
      return (number, len) => {
      
		  	// Check parameters
		  	if (!util.isNumber(number)) number = 0;
        if (!util.isNumber(len) || len < 2) len = 2;
        return ('0'.repeat(len) + number.toString()).slice (-1 * len);
      };
    }
  ])

  // Add to number pixel property
  .filter('pixel', [
    'util',
    (util) => {
      return (number) => {
        if (!util.isVarNumber(number)) number = 0;
        return number + 'px';
      };
    }
  ])

	// Utilities factory
  .factory('util', [
    () => {

      // Set utilities
      let util = {

				isUndefined: checkedVar => Object.prototype.toString.call(checkedVar) === '[object Undefined]',
    		isNull: checkedVar => Object.prototype.toString.call(checkedVar) === '[object Null]',
    		isBoolean: checkedVar => 	Object.prototype.toString.call(checkedVar) === '[object Boolean]' ||
    		                        	checkedVar instanceof Boolean,
    		isNumber: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Number]' ||
    		                        checkedVar instanceof Number,
    		isInt: checkedVar => util.isNumber(checkedVar) && checkedVar % 1 === 0,
    		isFloat: checkedVar => util.isNumber(checkedVar) && checkedVar % 1 !== 0,
    		isVarNumber: checkedVar => util.isNumber(checkedVar) ||
    		                          (util.isString(checkedVar) && !isNaN(Number(checkedVar))),
    		isString: checkedVar => 	Object.prototype.toString.call(checkedVar) === '[object String]' ||
    		                          checkedVar instanceof String,
    		isDate: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Date]' ||
    		                      checkedVar instanceof Date,
    		isArray: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Array]' ||
    		                        checkedVar instanceof Array,
    		isObject: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Object]' ||
    		                        checkedVar instanceof Object,
        isDate: checkedVar => checkedVar instanceof Date && !isNaN(checkedVar),
				isObjectEmpty: checkedVar => {
					if (util.isObject(checkedVar)) {
							for(var prop in checkedVar) {
									if(checkedVar.hasOwnProperty(prop))
													return false;
									else    return true;
							}
					} else  return true;
				},
				isObjectHasKey: (checkedVar, key) =>  util.isObject(checkedVar) && 
                                              util.isString(key) && key in checkedVar,
				objFilterByKeys: (obj, filter) => {
						if (!util.isObject(obj)) return obj;
						if (util.isString(filter)) {
              filter = filter.replaceAll(';', ',');
              filter = filter.split(",");
            }
						if (util.isArray(filter) && filter.length) {
										return  Object.assign({}, 
														Object.keys(obj)
														.filter((k) => filter.includes(k))
														.reduce((o, k) => Object.assign(o, {[k]: obj[k]}), {}));
						} else  return  Object.assign({}, obj);
				},
				objMerge: (target, source, existKeys) => {
						if (!util.isObject(target)) target = {};
						if (!util.isObject(source)) source = {};
						if (util.isBoolean(existKeys) && existKeys)
										return  Object.assign({}, target, util.objFilterByKeys(source, Object.keys(target)));
						else    return  Object.assign({}, target, source);
				},
        indexByKeyValue: (a, k, v) => a.findIndex(o => o[k] === v),
    		isFunction: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Function]' ||
    		                          checkedVar instanceof Function,
    		isClass: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Class]' ||
    		                        checkedVar instanceof Class,
    		isBlob: checkedVar =>	Object.prototype.toString.call(checkedVar) === '[object Blob]' ||
    		                      checkedVar instanceof Blob,
    		isJson: checkedVar => {
    		    if (util.isString(checkedVar)) {
    		        try       {return !util.isUndefined(JSON.parse(checkedVar));} 
    		        catch (e) {return false;}	
    		    } else return false;
    		},
        isJQuery: () => typeof jQuery !== 'undefined',
        isJQueryElement: checkedVar =>  util.isJQuery() && checkedVar instanceof jQuery && 
                                        util.isObjectHasKey(checkedVar, 'length') &&
                                        util.isNumber(checkedVar.length) && checkedVar.length > 0 &&
                                        'nodeType' in checkedVar.get(0),
				isNodeElement: checkedVar =>	checkedVar instanceof Element || 
  			                              checkedVar instanceof HTMLElement,
  			isNodeList: checkedVar =>	checkedVar instanceof NodeList ||
  			                          checkedVar instanceof HTMLCollection,
				cloneVariable: variable => {
					if (!util.isUndefined(variable)) {
							if (util.isDate(variable)) 
											return new Date(JSON.parse(JSON.stringify(variable)));
							else    return JSON.parse(JSON.stringify(variable));
					} else      return undefined;
				},
				indexOfElement: (nodeList, element) => Array.from(nodeList).indexOf(element),
    		indexByKeyValue: (arr, key, value) => {
    		  if ('length' in arr && arr.length && util.isString(key)) {
    		    for (let i=0; i < arr.length; i++)
    		      if (key in arr[i] && arr[i][key] === value) return i;
    		  }
    		  return -1;
    		},
        isEmail: checkedVar =>  util.isString(checkedVar) &&
                                /^([a-z0-9_.+-])+\@(([a-z0-9-])+\.)+([a-z0-9]{2,4})+$/i.test(checkedVar),
        isPassword: checkedVar => util.isString(checkedVar) &&
                                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(checkedVar),
        isPhoneNumber: checkedVar => util.isString(checkedVar) &&
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/.test(checkedVar),
        upToLowHyphen: (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase(),
        lowToUpHyphen: (str) => str.replace(/(-.)/g,function(x){return x[1].toUpperCase();}),
        capitalize: (str) => {
          if (str.length == 1) return str.toUpperCase();
          else return str.charAt(0).toUpperCase() + 
                      str.substr(1).toLowerCase();
        },
        getPageId: () => {
          let pageID = document.location.pathname;
          if (pageID[0] === '/') pageID = pageID.slice(1);
          if (pageID.slice(-1) === '/') pageID = pageID.slice(0, -1);
          return pageID;
        },
        isInViewport: (element, parent, type) => {
          if (!util.isNodeElement(element) ||
              !util.isNodeElement(parent)) return false;
          if (!util.isString(type)) type = 'xy';
          type = type.trim().toLowerCase().replace(/[^xy]/g, '');
          type = [...new Set(type)].sort().join('');
          if (!type) type = 'xy';
          let elementRect       = element.getBoundingClientRect(),
              parentRect        = parent.getBoundingClientRect(),
              scrollbarWidth    = parent.offsetWidth   - parent.clientWidth,
              scrollbarHeight   = parent.offsetHeight  - parent.clientHeight,
              isHorizontalView  = parentRect.left <= elementRect.left &&
                                  parentRect.right - scrollbarWidth >= elementRect.right,
              isVerticalView    = parentRect.top <= elementRect.top &&
                                  parentRect.bottom - scrollbarHeight >= elementRect.bottom;
          return  (!type.includes('x') || isHorizontalView) &&
                  (!type.includes('y') || isVerticalView);
        }
			};

			// Return utilities
      return util;
    }
  ])

	// Http request factory
	.factory('http', [
    '$http',
		'util', 
    ($http, util) => {

      return {

        // Request
				request: (options, method=null) => {

					// Create promise
					return new Promise(function (resolve, reject) {

            // Set is blob property
            let isBlob = false;

            // Set methods
            let methods = {

              // Initialize
              init: () => {

                // Check options property
                if (util.isString(options)) options = {url: options};
                if (!util.isObjectHasKey(options, 'url') || 
                    !util.isString(options.url)) {
                  reject('Missing url property in httpRequest!');
                  return;
                }

                // Check method property
                if (!util.isString(method)) method = 'fetch';
                method = method.trim().toLocaleLowerCase();
                if (!['http','xml','fetch','ajax'].includes(method)) method = 'fetch';
                if (method === 'ajax' && !util.isJQuery()) method = 'fetch';

                // Check response content type
                if (util.isObjectHasKey(options, 'responseType') &&
                    util.isString(options.responseType)) 
                  isBlob = options.responseType.trim().toLocaleLowerCase() === 'blob';

                // Merge options with default
                options = methods.options(options);

                // Requiest
                methods[method](options);
              },

              // Options
              options: options => {

                // Check options method
                if (util.isObjectHasKey(options, 'method')) {
                  if (!util.isString(options.method)) 
                    options.method = 'GET';
                  options.method.trim().toUpperCase();
                  if (!['GET','POST','PUT','PATCH','DELETE',
                        'HEAD','OPTIONS','TRACE','CONNECT'].includes(options.method)) 
                    options.method = 'GET';
                }

                // Switch method type
                switch(method) {

                  case 'xml':

                    // Check/Set data
                    if (util.isObjectHasKey(options, 'data') && 
                       !util.isUndefined(options.data)) 
                      options.data = "data=" + JSON.stringify(options.data);

                    // Merge with default
                    return util.objMerge({
                      url         : undefined,
                      method      : 'GET',                               
                      data        : undefined,
                      contentType : "application/x-www-form-urlencoded",
                      responseType: "text"
                    }, options, true);

                  case 'ajax':

                    // Check/Set data
                    if (util.isObjectHasKey(options, 'data') && 
                        !util.isUndefined(options.data)) 
                      options.data = {data: JSON.stringify(options.data)};

                    // Check/Set response type
                    if (util.isObjectHasKey(options, 'responseType')) {     
                      options.xhrFields = {responseType: options.responseType};
                      delete options.responseType;
                    }

                    // Merge with default
                    return util.objMerge({
                      url         : undefined,
                      method      : 'GET',
                      data        : undefined,
                      async       : true,
                      crossDomain : true,
                      timeout     : 300000,
                      cache       : true,
                      contentType : undefined,
                      processData : true,
                      dataType    : undefined,
                      xhrFields   : undefined
                    }, options, true);

                  case 'http':

                    // Check/Set data
                    if (util.isObjectHasKey(options, 'data') && 
                        !util.isUndefined(options.data)) 
                      options.data = {data: JSON.stringify(options.data)};

                    // Merge with default
                    return util.objMerge({
                      url: undefined,
                      method: 'GET',
                      params: undefined,
                      data: undefined,
                      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    }, options, true);

                  // Fetch
                  default:

                    // Conver data => body
                    if (util.isObjectHasKey(options, 'data')) {
                      options.body = options.data;
                      delete options.data;
                    }

                    // Check/Set body
                    if (util.isObjectHasKey(options, 'body') && 
                       !util.isUndefined(options.body)) {
                      options.body    = "data=" + JSON.stringify(options.body);
                      options.method  = 'POST';
                    }

                    // Merge with default
                    return util.objMerge({
                      url: undefined,
                      method: 'GET',
                      body: undefined,
                      mode: 'cors',
                      cache: 'default',
                      credentials: 'same-origin',
                      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                      redirect: 'follow',
                      referrerPolicy: 'no-referrer'
                    }, options, true);
                } 
              },

              // Http request
              http: (options) => {

                $http({ 
                  url     : options.url, 
                  method  : options.method,
                  params  : options.params, 
                  data    : options.data,
                  headers : options.headers
                })
                .success(result => methods.check(result))
                .error(e => reject(e.errorMsg()));
              },

              // XML Http request
              xml: (options) => {

                let xhr = new XMLHttpRequest();
                xhr.open(options.method, options.url, true);
                xhr.onload = () => {
                  if (xhr.status >= 200 && xhr.status < 300) {
                          let result = xhr.response;
                          methods.check(result);
                  } else  reject(xhr.statusText);
                };
                xhr.onerror = () => reject(xhr.statusText);
                xhr.setRequestHeader("Content-Type", options.contentType);
                xhr.responseType = options.responseType;
                xhr.send(options.data);
              },

              // FETCH Http request
              fetch: (options) => {

                // Get url, and remove from options
                let url = options.url;
                delete options.url;

                fetch(url, options)
                .then((response) => {
                  if (response.status >= 200 && response.status < 300) {
                      if (isBlob)
                              return response.blob();
                      else    return response.text();
                  } else      reject(response.statusText);
                })
                .then(result => methods.check(result));
              },

              // AJAX jQuery Http request
              ajax: (options) => {

                $.ajax({
                  url     	  : options.url,
                  type    	  : options.method,	                	
	              	async   	  : options.isAsync,
	              	crossDomain : options.crossDomain,
	              	timeout		  : options.timeout,
	              	cache       : options.cache,
	              	contentType : options.contentType,
	              	processData : options.processData,
	              	dataType    : options.dataType,
                  xhrFields   : options.xhrFields,
                  data    	  : options.data,
                  success: result => methods.check(result),
                  error: (e) => reject(e.errorMsg())
                });
              },

              // Check result
              check: result => {
                if (!util.isBlob(result)) {
                  if (util.isJson(result)) result = JSON.parse(result);
                  if (util.isObjectHasKey(result, "error") && 
                     !util.isNull(result.error))
                        reject(result.error);
                  else if (util.isObjectHasKey(result, "data"))
                        resolve(result.data);
                  else	resolve(result);
                } else	resolve(result);
              }
            };

            // Initialize
            methods.init();
        	});
				}
			};
    }
  ])

  // Transaction events factory
  .factory('trans', [
    '$transitions',
    '$window',
    '$state',
    '$rootScope',
    '$timeout',
    'util',
    ($transitions, $window, $state, $rootScope, $timeout, util) => {
      return {

        // Events
        events: (baseStates=null, scrollTop=true) => {

          // Define state properties
          $rootScope.state = {
            id        : null,
            prev      : null,
            base      : null,     
            available : $state.get()
                              .map(state => state.name.trim())
                              .filter(name => name !== '')
          };

          // Check parameter base state(s)
          if (util.isString(baseStates)) {
            baseStates = baseStates.replaceAll(';', ',').split(',');
            baseStates = baseStates.map(name => name.trim()).filter(name => name !== '');
          }
          if (util.isArray(baseStates))
            baseStates = baseStates.filter(state => $rootScope.state.available.includes(state));
          if (!util.isArray(baseStates))
            baseStates = [];
          baseStates.unshift($rootScope.state.available[0]);
          $rootScope.state.base = [...new Set(baseStates)];

          // Check parameter scroll to top
          if (!util.isBoolean(scrollTop)) scrollTop = true;
          
          // On before transaction
          $transitions.onBefore({}, (transition) => {
            return $timeout(() => {

              // Check is first time
              if (util.isNull($rootScope.state.id)) {
                if (!$rootScope.state.base.includes(transition.to().name))
                  return transition.router.stateService.target($rootScope.state.base[0]);
              }
              $rootScope.state.prev = $rootScope.state.id;
              $rootScope.state.id   = transition.to().name;
              return true;
            });
          });
        
          // On success transaction
          $transitions.onSuccess({}, (transition) => {
            return $timeout(() => {
              let element = document.querySelector('.page-container');
              if (util.isNodeElement(element))
                element.addClass($rootScope.state.id.concat(' ', 'show'));
              if (scrollTop) $window.scrollTo(0, 0);
              return true;
            });
          });
        }
      }
    }
  ])

  // Scroll to
  .directive('ngScrollTo', [
    'util',
    function(util) {
      return {
        link: function(scope, element, attrs) {
          if (util.isString(attrs.ngScrollTo)) {
            element[0].addEventListener('click', function() {
              let target = document.querySelector(attrs.ngScrollTo);
              if (util.isNodeElement(target)) {
                target.scrollIntoView();
              }
            });
          }
        }
      };
  }])

  // Show bootstrap5 breakpoints
	.directive('ngBreakpoints', [
    '$timeout',
    ($timeout) => {

			// Controller
			let controller = [
				'$scope',
        '$element', 
				($scope, $element) => {

          // Set methods
          $scope.methods = {

            // Initialize
            init: () => {

              // Set position when is visible
              if ($scope.isVisible) 
                  $scope.methods.position();

              // Set Events
              $scope.methods.events();
            },

            // Events
            events: () => {

              // Windows resize event
              window.addEventListener('resize', (event) => {
                event.preventDefault();
                if ($scope.isVisible && !$scope.throttled) {
                  $scope.throttled  = true;
                  $scope.winWidth   = parseInt(window.innerWidth);
                  $scope.methods.position();
                  $timeout(() => {
                    $scope.throttled = false;
                  }, 200);
                }
              });

              // Keyboard up event 
              document.addEventListener('keyup', (event) => {
                event.preventDefault();
                if (event.ctrlKey && event.altKey && event.key === 'b') {
                  $element[0].classList.toggle('show');
                  $scope.isVisible = $element[0].classList.contains('show');
                  if (!$scope.isVisible) {
                          $scope.pos = {left:-300, top:-300};
                          $scope.$applyAsync();
                  } else  $scope.methods.position();
                }
              });
            },

            // Position
            position: () => {
              $scope.pos.left = parseInt((window.innerWidth  - $element[0].offsetWidth)   / 2);
              $scope.pos.top  = parseInt((window.innerHeight - $element[0].offsetHeight)  / 2);
              $scope.$applyAsync();
            }
          }
				}
			];

      return {
				restrict: 'EA',
				replace: true,
				scope: {},
				controller: controller,
				template:`<div class="display-1 w-auto position-fixed px-3 
                       bg-dark-transparent text-white d-conditional"
                       style="transition: all .2s ease 0s;"
                       ng-style="{left:(pos.left|pixel),top:(pos.top|pixel)}">
                    <span class="d-inline d-sm-none">XS</span>
                    <span class="d-none d-sm-inline d-md-none">SM</span>
                    <span class="d-none d-md-inline d-lg-none">MD</span>
                    <span class="d-none d-lg-inline d-xl-none">LG</span>
                    <span class="d-none d-xl-inline d-xxl-none">XL</span>
                    <span class="d-none d-xxl-inline">XXL</span>
                    <span class="ms-2 display-6">{{winWidth|pixel}}</span>
                  </div>`,

				// Compile 
				compile: function() {
					
					return {
						
						// Pre-link
						pre: function(scope, iElement) {
              scope.pos = {left:-300, top:-300};
							scope.winWidth  = parseInt(window.innerWidth);
              scope.isVisible = iElement[0].classList.contains('show');
              scope.throttled = false;
						},

						// Post-link
						post: function(scope) {
							$timeout(() => {
                scope.methods.init();
              });
						}
					};
				}
			};
		}
	])

  // Show bootstrap5 modal dialog
	.directive('ngModalDialog', [
    '$timeout',
    ($timeout) => {

			// Controller
			let controller = [
				'$scope',
        '$element', 
				($scope, $element) => {

          // Set methods
          $scope.methods = {

            // Initialize
            init: () => {

              // Set Events
              $scope.methods.events();
            },

            // Events
            events: () => {

              
            }
          }
				}
			];

      return {
				restrict: 'EA',
				replace: true,
				scope: {},
				controller: controller,
				template:`<div  class="modal fade" id="ng-modal" tabindex="-1" 
                        aria-labelledby="modal-label" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="modal-label"></h5>
                          <button type="button" class="btn-close" 
                                  data-bs-dismiss="modal" aria-label="Close">
                          </button>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer"></div>
                      </div>
                    </div>
                  </div>`,

				// Compile 
				compile: function() {
					
					return {
						
						// Pre-link
						pre: function(scope, iElement) {
						},

						// Post-link
						post: function(scope) {
							$timeout(() => {
                scope.methods.init();
              });
						}
					};
				}
			};
		}
	]);

})(window, angular);