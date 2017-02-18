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

function add(list, element, token) {
  if (!token || list.indexOf(token) !== -1) { return; }
  addUpdate(list, element, token);
}

function remove(list, element, token) {
  let i;
  if (!token || (i = list.indexOf(token)) === -1) { return; }
  removeUpdate(list, element, i);
}

function toggle(list, element, token, force) {
  const i = list.indexOf(token);
  if (i !== -1) {
    if (force) { return true; }
    removeUpdate(list, element, i);
    return false;
  } else {
    if (force === false) { return false; }
    addUpdate(list, element, token);
    return true;
  }
}

function replace(list, element, token, newToken) {
  let i;
  if (!token || !newToken || token === newToken || (i = list.indexOf(token)) === -1) { return; }
  list.splice(i, 1);
  if (list.indexOf(newToken) === -1) { list.push(newToken); }
  element.setAttribute('class', list.join(' '));
}

function mClassList(element) {
  return !mClassList.ignoreNative && element.classList || (() => {

    function normalize(token) { return (token + '').trim(); } // Not `||`
    const list = (element.getAttribute('class') || '').trim().split(/\s+/).filter(token => !!token);

    return {
      length: list.length,
      item: i => list[i],
      contains: token => list.indexOf(normalize(token)) !== -1,
      add: function() {
        Array.prototype.slice.call(arguments).forEach(token => add(list, element, normalize(token)));
      },
      remove: function() {
        Array.prototype.slice.call(arguments).forEach(token => remove(list, element, normalize(token)));
      },
      toggle: (token, force) => toggle(list, element, normalize(token), force),
      replace: (token, newToken) => replace(list, element, normalize(token), normalize(newToken))
    };
  })();
}

export default mClassList;
