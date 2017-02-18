var mClassList =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * mClassList
 * https://github.com/anseki/m-class-list
 *
 * Copyright (c) 2017 anseki
 * Licensed under the MIT license.
 */

function addUpdate(list, element, token) {
  list.push(token);
  element.setAttribute('class', list.join(' '));
}

function removeUpdate(list, element, i) {
  list.splice(i, 1);
  element.setAttribute('class', list.join(' '));
}

function _add(list, element, token) {
  if (!token || list.indexOf(token) !== -1) {
    return;
  }
  addUpdate(list, element, token);
}

function _remove(list, element, token) {
  var i = void 0;
  if (!token || (i = list.indexOf(token)) === -1) {
    return;
  }
  removeUpdate(list, element, i);
}

function _toggle(list, element, token, force) {
  var i = list.indexOf(token);
  if (i !== -1) {
    if (force) {
      return true;
    }
    removeUpdate(list, element, i);
    return false;
  } else {
    if (force === false) {
      return false;
    }
    addUpdate(list, element, token);
    return true;
  }
}

function _replace(list, element, token, newToken) {
  var i = void 0;
  if (!token || !newToken || token === newToken || (i = list.indexOf(token)) === -1) {
    return;
  }
  list.splice(i, 1);
  if (list.indexOf(newToken) === -1) {
    list.push(newToken);
  }
  element.setAttribute('class', list.join(' '));
}

function mClassList(element) {
  return !mClassList.ignoreNative && element.classList || function () {

    function normalize(token) {
      return (token + '').trim();
    } // Not `||`
    var list = (element.getAttribute('class') || '').trim().split(/\s+/).filter(function (token) {
      return !!token;
    });

    return {
      length: list.length,
      item: function item(i) {
        return list[i];
      },
      contains: function contains(token) {
        return list.indexOf(normalize(token)) !== -1;
      },
      add: function add() {
        Array.prototype.slice.call(arguments).forEach(function (token) {
          return _add(list, element, normalize(token));
        });
      },
      remove: function remove() {
        Array.prototype.slice.call(arguments).forEach(function (token) {
          return _remove(list, element, normalize(token));
        });
      },
      toggle: function toggle(token, force) {
        return _toggle(list, element, normalize(token), force);
      },
      replace: function replace(token, newToken) {
        return _replace(list, element, normalize(token), normalize(newToken));
      }
    };
  }();
}

exports.default = mClassList;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=m-class-list.js.map