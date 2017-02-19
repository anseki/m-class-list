/*
 * mClassList
 * https://github.com/anseki/m-class-list
 *
 * Copyright (c) 2017 anseki
 * Licensed under the MIT license.
 */

function normalize(token) { return (token + '').trim(); } // Not `||`
function applyList(list, element) { element.setAttribute('class', list.join(' ')); }

function add(list, element, tokens) {
  if (tokens.filter(token => {
    if (!(token = normalize(token)) || list.indexOf(token) !== -1) { return false; }
    list.push(token);
    return true;
  }).length) {
    applyList(list, element);
  }
}

function remove(list, element, tokens) {
  if (tokens.filter(token => {
    let i;
    if (!(token = normalize(token)) || (i = list.indexOf(token)) === -1) { return false; }
    list.splice(i, 1);
    return true;
  }).length) {
    applyList(list, element);
  }
}

function toggle(list, element, token, force) {
  const i = list.indexOf((token = normalize(token)));
  if (i !== -1) {
    if (force) { return true; }
    list.splice(i, 1);
    applyList(list, element);
    return false;
  } else {
    if (force === false) { return false; }
    list.push(token);
    applyList(list, element);
    return true;
  }
}

function replace(list, element, token, newToken) {
  let i;
  if (!(token = normalize(token)) || !(newToken = normalize(newToken)) ||
    token === newToken || (i = list.indexOf(token)) === -1) { return; }
  list.splice(i, 1);
  if (list.indexOf(newToken) === -1) { list.push(newToken); }
  applyList(list, element);
}

function mClassList(element) {
  return !mClassList.ignoreNative && element.classList || (() => {
    const list = (element.getAttribute('class') || '').trim().split(/\s+/).filter(token => !!token);
    return {
      length: list.length,
      item: i => list[i],
      contains: token => list.indexOf(normalize(token)) !== -1,
      add: function() { add(list, element, Array.prototype.slice.call(arguments)); },
      remove: function() { remove(list, element, Array.prototype.slice.call(arguments)); },
      toggle: (token, force) => toggle(list, element, token, force),
      replace: (token, newToken) => replace(list, element, token, newToken)
    };
  })();
}

export default mClassList;
