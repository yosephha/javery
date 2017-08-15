/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
  }

  html(str){
    if(!str){
      return this.elements[0].innerHTML;
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
      }
    }
  }

  empty(){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = '';
    }
  }

  append(children) {
    if (this.elements.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === "string") {
      this.elements.forEach(node => node.innerHTML += children);
    } else if (children instanceof DomNodeCollection) {
      this.elements.forEach(node => {
        children.elements.forEach(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }
  }

  attr(attributeName, value){
    if (value === undefined){
      return this.elements[0].getAttribute(attributeName);
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attributeName, value);
      }
    }
  }

  addClass(newClass) {
    this.elements.forEach(node => node.classList.add(newClass));
  }

  removeClass(cName){
    this.elements.forEach(node => node.classList.remove(cName));
  }

  children(){
    let newarray = [];
    for (let i = 0; i < this.elements.length; i++) {
      const childs = Array.from(this.elements[i].children);
      newarray = newarray.concat(childs);
    }

    return new DOMNodeCollection(newarray);
  }

  parent(){
    var newarray = [];
    for (var i = 0; i < this.elements.length; i++) {
      if(newarray.includes(this.elements[i].parentNode)) continue;
        newarray.push(this.elements[i].parentNode);
    }
    return new DOMNodeCollection(newarray);
  }

  find(element){
    let newarray = [];

    for (var i = 0; i < this.elements.length; i++) {
      let arrayfied = Array.from(this.elements[i].querySelectorAll(element));
      newarray = newarray.concat(arrayfied);
    }
    return new DOMNodeCollection(newarray);
  }

  on(eventName, callback) {
  this.elements.forEach(node => {
    node.addEventListener(eventName, callback);
    const eventKey = `jqliteEvents-${eventName}`;
    if (typeof node[eventKey] === "undefined") {
      node[eventKey] = [];
    }
    node[eventKey].push(callback);
  });
}

off(eventName) {
  this.elements.forEach(node => {
    const eventKey = `jqliteEvents-${eventName}`;
    if (node[eventKey]) {
      node[eventKey].forEach(callback => {
        node.removeEventListener(eventName, callback);
      });
    }
    node[eventKey] = [];
  });
}


}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);

const readyQueue = [];
let documentLoaded = false;

window.$j = arg => {
  switch(typeof(arg)){
    case "function":
      documentLoaded ? arg() : readyQueue.push(arg)
      break;
    case "string":
      const nodes = document.querySelectorAll(arg);
      const nodes_array = Array.from(nodes);
      return new DomNodeCollection(nodes_array);
    case "object":
      if(arg instanceof HTMLElement){
        return new DomNodeCollection([arg]);
      }
  }
};

$j.extend = (base, ...otherObjs) => {
  otherObjs.forEach( obj => {
    for(let prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};

$j.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    dataType: "JSON",
    error: () => {},
    data: {},
  };
  options = $j.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  documentLoaded = true;
  readyQueue.forEach( func => func() );
});


/***/ })
/******/ ]);