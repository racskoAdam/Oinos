"use strict"

;(function ($util, undefined) {

    // Utility
    $util.isUndefined = checkedVar => Object.prototype.toString.call(checkedVar) === '[object Undefined]';
    $util.isNull = checkedVar => Object.prototype.toString.call(checkedVar) === '[object Null]';
    $util.isBoolean = checkedVar => Object.prototype.toString.call(checkedVar) === '[object Boolean]' ||
                                    checkedVar instanceof Boolean;
    $util.isNumber = checkedVar =>  Object.prototype.toString.call(checkedVar) === '[object Number]' ||
                                    checkedVar instanceof Number;
    $util.isInt = checkedVar => $util.isNumber(checkedVar) && checkedVar % 1 === 0;
    $util.isFloat = checkedVar => $util.isNumber(checkedVar) && checkedVar % 1 !== 0;
    $util.isVarNumber = checkedVar => $util.isNumber(checkedVar) ||
                                     ($util.isString(checkedVar) && !isNaN(Number(checkedVar)));
    $util.isString = checkedVar =>  Object.prototype.toString.call(checkedVar) === '[object String]' ||
                                    checkedVar instanceof String;
    $util.isDate = checkedVar =>    Object.prototype.toString.call(checkedVar) === '[object Date]' ||
                                    checkedVar instanceof Date;
    $util.isArray = checkedVar =>   Object.prototype.toString.call(checkedVar) === '[object Array]' ||
                                    checkedVar instanceof Array;
    $util.isObject = checkedVar =>  Object.prototype.toString.call(checkedVar) === '[object Object]' ||
                                    checkedVar instanceof Object;
    $util.isObjectEmpty = checkedVar => {
        if ($util.isObject(checkedVar)) {
            for(var prop in checkedVar) {
                if(checkedVar.hasOwnProperty(prop))
                        return false;
                else    return true;
            }
        } else  return true;
    };
    $util.isObjectHasKey = (checkedVar, key) => $util.isObject(checkedVar) && $util.isString(key) && key in checkedVar;
    $util.objFilterByKeys = (obj, filter) => {
        if (!$util.isObject(obj)) return obj;
        if ($util.isString(filter)) filter = [filter];
        if ($util.isArray(filter) && filter.length) {
                return  Object.assign({}, 
                        Object.keys(obj)
                        .filter((k) => filter.includes(k))
                        .reduce((o, k) => Object.assign(o, {[k]: obj[k]}), {}));
        } else  return  Object.assign({}, obj);
    };
    $util.objMerge = (target, source, existKeys) => {
        if (!$util.isObject(target)) target = {};
        if (!$util.isObject(source)) source = {};
        if ($util.isBoolean(existKeys) && existKeys)
                return  Object.assign({}, target, $util.objFilterByKeys(source, Object.keys(target)));
        else    return  Object.assign({}, target, source);
    };
    $util.isFunction = checkedVar =>    Object.prototype.toString.call(checkedVar) === '[object Function]' ||
                                        checkedVar instanceof Function;
    $util.isClass = checkedVar =>   Object.prototype.toString.call(checkedVar) === '[object Class]' ||
                                    checkedVar instanceof Class;
    $util.isBlob = checkedVar =>    Object.prototype.toString.call(checkedVar) === '[object Blob]' ||
                                    checkedVar instanceof Blob;
    $util.isJson = checkedVar => {
        if ($util.isString(checkedVar)) {
            try       {return !$util.isUndefined(JSON.parse(checkedVar));} 
            catch (e) {return false;}	
        } else return false;
    };
    $util.cloneVariable = variable => {
        if (!$util.isUndefined(variable)) {
            if ($util.isDate(variable)) 
                    return new Date(JSON.parse(JSON.stringify(variable)));
            else    return JSON.parse(JSON.stringify(variable));
        } else      return undefined;
    };
	$util.isNodeElement = checkedVar => checkedVar instanceof Element || 
                                        checkedVar instanceof HTMLElement;
    $util.isNodeList = checkedVar => checkedVar instanceof NodeList ||
                                     checkedVar instanceof HTMLCollection;
	$util.indexOfElement = (nodeList, element) => Array.from(nodeList).indexOf(element);
    $util.indexByKeyValue = (arr, key, value) => {
        if ('length' in arr && arr.length && $util.isString(key)) {
            for (let i=0; i < arr.length; i++)
                if (key in arr[i] && arr[i][key] === value) return i;
        }
        return -1;
    };



    // Http request
    $util.httpRequest = (options, method='fetch') => {

        // Create promise
        return new Promise(function (resolve, reject) {

            // Set is blob property
            let isBlob = false;

            // Set methods
            let methods = {

                // Initialize
                init: () => {

                    // Check options property
                    if ($util.isString(options)) options = {url: options};
                    if (!$util.isObjectHasKey(options, 'url') || 
                        !$util.isString(options.url)) {
                        reject('Missing url property in httpRequest!');
                        return;
                    }

                    // Check method property
                    if (!$util.isString(method)) method = 'fetch';
                    method = method.trim().toLocaleLowerCase();
                    if (!['xml','fetch','ajax'].includes(method)) method = 'fetch';
                    if (method === 'ajax' && typeof $ === 'undefined') method = 'fetch';

                    // Check response content type
                    if ($util.isObjectHasKey(options, 'responseType') &&
                        $util.isString(options.responseType)) 
                        isBlob = options.responseType.trim().toLocaleLowerCase() === 'blob';

                    // Merge options with default
                    options = methods.options(options);

                    // Requiest
                    methods[method](options);
                },

                // Options
                options: options => {

                    // Check options method
                    if ($util.isObjectHasKey(options, 'method')) {
                        if (!$util.isString(options.method)) 
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
                            if ($util.isObjectHasKey(options, 'data') && 
                                !$util.isUndefined(options.data)) 
                                options.data = "data=" + JSON.stringify(options.data);

                            // Merge with default
                            return $util.objMerge({
                                url         : undefined,
                                method      : 'GET',                               
                                data        : undefined,
                                contentType : "application/x-www-form-urlencoded",
                                responseType: "text"
                            }, options, true);

                        case 'ajax':

                            // Check/Set data
                            if ($util.isObjectHasKey(options, 'data') && 
                                !$util.isUndefined(options.data)) 
                                options.data = {data: JSON.stringify(options.data)};

                            // Check/Set response type
                            if ($util.isObjectHasKey(options, 'responseType')) {     
                                options.xhrFields = {responseType: options.responseType};
                                delete options.responseType;
                            }

                            // Merge with default
                            return $util.objMerge({
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
                            if ($util.isObjectHasKey(options, 'data')) {
                                options.body = options.data;
                                delete options.data;
                            }

                            // Check/Set body
                            if ($util.isObjectHasKey(options, 'body') && 
                                !$util.isUndefined(options.body)) 
                                options.body = JSON.stringify(options.body);

                            // Merge with default
                            return $util.objMerge({
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
                    if (!$util.isBlob(result)) {
                        if ($util.isJson(result)) result = JSON.parse(result);
                        if ($util.isObjectHasKey(result, "error") && 
                           !$util.isNull(result.error))
                                reject(result.error);
                        else if ($util.isObjectHasKey(result, "data"))
                                resolve(result.data);
                        else    resolve(result);
                    } else      resolve(result);
                }
            };

            // Initialize
            methods.init();
        });
    };
  
})(window.$util = window.$util || {});