/* ================================================
        DON'T MANUALLY EDIT THIS FILE
================================================ */

/*
 * mClassList
 * https://github.com/anseki/m-class-list
 *
 * Copyright (c) 2018 anseki
 * Licensed under the MIT license.
 */
function normalize(token) {
  return (token + '').trim();
} // Not `||`


function applyList(list, element) {
  element.setAttribute('class', list.join(' '));
}

function _add(list, element, tokens) {
  if (tokens.filter(function (token) {
    if (!(token = normalize(token)) || list.indexOf(token) !== -1) {
      return false;
    }

    list.push(token);
    return true;
  }).length) {
    applyList(list, element);
  }
}

function _remove(list, element, tokens) {
  if (tokens.filter(function (token) {
    var i;

    if (!(token = normalize(token)) || (i = list.indexOf(token)) === -1) {
      return false;
    }

    list.splice(i, 1);
    return true;
  }).length) {
    applyList(list, element);
  }
}

function _toggle(list, element, token, force) {
  var i = list.indexOf(token = normalize(token));

  if (i !== -1) {
    if (force) {
      return true;
    }

    list.splice(i, 1);
    applyList(list, element);
    return false;
  }

  if (force === false) {
    return false;
  }

  list.push(token);
  applyList(list, element);
  return true;
}

function _replace(list, element, token, newToken) {
  var i;

  if (!(token = normalize(token)) || !(newToken = normalize(newToken)) || token === newToken || (i = list.indexOf(token)) === -1) {
    return;
  }

  list.splice(i, 1);

  if (list.indexOf(newToken) === -1) {
    list.push(newToken);
  }

  applyList(list, element);
}

function mClassList(element) {
  return !mClassList.ignoreNative && element.classList || function () {
    var list = (element.getAttribute('class') || '').trim().split(/\s+/).filter(function (token) {
      return !!token;
    }),
        ins = {
      length: list.length,
      item: function item(i) {
        return list[i];
      },
      contains: function contains(token) {
        return list.indexOf(normalize(token)) !== -1;
      },
      add: function add() {
        _add(list, element, Array.prototype.slice.call(arguments));

        return mClassList.methodChain ? ins : void 0;
      },
      remove: function remove() {
        _remove(list, element, Array.prototype.slice.call(arguments));

        return mClassList.methodChain ? ins : void 0;
      },
      toggle: function toggle(token, force) {
        return _toggle(list, element, token, force);
      },
      replace: function replace(token, newToken) {
        _replace(list, element, token, newToken);

        return mClassList.methodChain ? ins : void 0;
      }
    };
    return ins;
  }();
}

mClassList.methodChain = true;
export default mClassList;