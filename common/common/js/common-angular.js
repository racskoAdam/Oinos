;(function(window, angular) {

  'use strict';

  // Application common module
  angular.module('app.common', [])

	// Capitalize
  .filter('capitalize', [
    'util', 
    function(util) {
      return function(str, isAllowed) {
        if (!util.isString(str))  return "";
        str = str.trim();
        if (!util.isBoolean(isAllowed)) isAllowed = true;
        if (!isAllowed || str.length == 0) return str;
        return util.capitalize(str);
      }
    }
  ])

  // Number thousand separator
  .filter('numSep', [
    'util',
    function (util) {
      return function(number, separator) {
      
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
    function (util) {
      return function(number, len) {
      
		  	// Check parameters
		  	if (!util.isNumber(number)) number = 0;
        if (!util.isNumber(len) || len < 2) len = 2;
        return ('0'.repeat(len) + number.toString()).slice (-1 * len);
      };
    }
  ])

	// Utilities factory
  .factory('util', [ 
    function() {

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
				isObjectEmpty: checkedVar => {
					if (util.isObject(checkedVar)) {
							for(var prop in checkedVar) {
									if(checkedVar.hasOwnProperty(prop))
													return false;
									else    return true;
							}
					} else  return true;
				},
				isObjectHasKey: (checkedVar, key) => util.isObject(checkedVar) && util.isString(key) && key in checkedVar,
				objFilterByKeys: (obj, filter) => {
						if (!util.isObject(obj)) return obj;
						if (util.isString(filter)) filter = [filter];
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
        upToLowHyphen: (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase(),
        lowToUpHyphen: (str) => str.replace(/(-.)/g,function(x){return x[1].toUpperCase();}),
        capitalize: (str) => {
          if (str.length == 1) return str.toUpperCase();
          else return str.charAt(0).toUpperCase() + 
                      str.substr(1).toLowerCase();
        },
	      getTestCode: (codeLength) => {
        
	      	/* Check parameters */
	      	if (!util.isNumber(codeLength) || codeLength < 5) codeLength = 5;
	      	if (codeLength > 34) codeLength = 34;
        
	      	let letters		= 'ABCDEFGHJKMNPQRSTUVWXYZ'.split(''),
	      			numbers		= '123456789'.split(''),
	      			testCode	= [];
        
	      	let ind = Math.floor(Math.random()*letters.length);
	      	testCode.push(letters[ind]);
	      	letters.splice(ind, 1);
        
	      	ind = Math.floor(Math.random()*letters.length);
	      	testCode.push(letters[ind].toLowerCase());
	      	letters.splice(ind, 1);
        
	      	ind = Math.floor(Math.random()*numbers.length);
	      	testCode.push(numbers[ind]);
	      	numbers.splice(ind, 1);
        
	      	let merged	= [].concat.apply([], [numbers, numbers, letters])
	      									.sort(function() {return 0.5-Math.random();}),
	      										filter = function(a, c) {
	      											return $.map(a, function(v) {if (v !== c) return v;});
	      										};
                          
	      	if (testCode.length < codeLength) {
	      		for (let i=testCode.length; i < codeLength; i++) {
	      			ind = Math.floor(Math.random()*merged.length);
	      			let c	= merged[ind];
	      			testCode.push(c[Math.random() < 0.5 ? 'toLowerCase' : 'toUpperCase']());
	      			merged = filter(merged, c);
	      		}
	      	}
	      	return testCode.sort(function() {return 0.5-Math.random();})
	      								 .join('').substring(0, codeLength);
	      },
        getPageId: () => {
          let pageID = document.location.pathname;
          if (pageID[0] === '/') pageID = pageID.slice(1);
          if (pageID.slice(-1) === '/') pageID = pageID.slice(0, -1);
          return pageID.replaceAll('/', '-');
        },
        isInViewport: (element, parent) => {
          if (!util.isNodeElement(element) ||
              !util.isNodeElement(parent)) return false;
          let elementRect     = element.getBoundingClientRect(),
              parentRect      = parent.getBoundingClientRect(),
              scrollbarWidth  = parent.offsetWidth   - parent.clientWidth,
              scrollbarHeight = parent.offsetHeight  - parent.clientHeight;   
          return  parentRect.top <= elementRect.top &&
                  parentRect.left <= elementRect.left &&
                  parentRect.right - scrollbarWidth >= elementRect.right &&
                  parentRect.bottom - scrollbarHeight >= elementRect.bottom;
        }
			};

			// Return utilities
      return util;
    }
  ])

	// Http request factory
	.factory('http', [
		'util', 
    function(util) {

      return {

				request: (options, method='fetch') => {

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
                if (!['xml','fetch','ajax'].includes(method)) method = 'fetch';
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

                  // Fetch
                  default:

                    // Conver data => body
                    if (util.isObjectHasKey(options, 'data')) {
                      options.body = options.data;
                      delete options.data;
                    }

                    // Check/Set body
                    if (util.isObjectHasKey(options, 'body') && 
                        !util.isUndefined(options.body)) 
                      options.body = JSON.stringify(options.body);

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
                  url     	: options.url,
                  type    	: options.method,	                	
	              	async   	: options.isAsync,
	              	crossDomain : options.crossDomain,
	              	timeout		: options.timeout,
	              	cache       : options.cache,
	              	contentType : options.contentType,
	              	processData : options.processData,
	              	dataType    : options.dataType,
                  xhrFields   : options.xhrFields,
                  data    	: options.data,
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

  // Change state
  .directive('ngChangeState', [
    'util',
    '$state',
    '$rootScope',
    '$timeout',
    function(util, $state, $rootScope, $timeout) {
      return {
        link: function(scope, element) {

          // Check exist
          if (!util.isObjectHasKey($rootScope, 'state'))
            $rootScope.state = {id:null, prev:null};

          // Set current, and previous state identifier
          $rootScope.state = {
            id  : $state.current.name,
            prev: $rootScope.state.id
          };

          // Reset asynchronity
          $timeout(() => {
            element.addClass('show');
          });
        }
      };
  }])

  /* Custom directive */
	.directive('ngCustomDirectiveName', [
    '$timeout',
    ($timeout) => {
      return {
        restrict: 'EA',
			  compile: function() {
				
				  return {
					  pre: function(scope, element, attrs) {
              console.log('pre');
            },

            post: function(scope, element, attrs) {
              $timeout(() => {
                console.log('post');
              });
            }
				  }
        }
			}
		}
	])

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
	])

  // Resizable directive 
  .directive('ngResizable', [
    '$timeout', 
    ($timeout) => {
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
    '$timeout', 
    ($timeout) => {
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