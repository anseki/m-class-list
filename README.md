# mClassList

[![npm](https://img.shields.io/npm/v/m-class-list.svg)](https://www.npmjs.com/package/m-class-list) [![GitHub issues](https://img.shields.io/github/issues/anseki/m-class-list.svg)](https://github.com/anseki/m-class-list/issues) [![dependencies](https://img.shields.io/badge/dependencies-No%20dependency-brightgreen.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE-MIT)

The super simple shim for [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) of HTML and SVG, that transparently intercepts difference between modern browsers and semi-modern browsers.

There are many shims and polyfills for `classList`, and also, almost modern browsers already support `classList`.  
**Why is a new shim needed now?**

- Some browsers don't support yet `classList` of SVG element even if those support that of HTML element.
- Some browsers don't support multiple arguments for methods of `DOMTokenList` (i.e. `classList`).
- Since modern browsers support many other APIs, a heavy library that supports legacy browsers perfectly is unneeded.
- That is, only a little bit of intercepting is needed, more simple and small shim is needed.

**So, features of mClassList are:**

- Provide `classList` if specified element does not have it.
- Support SVG element also.
- Support and respect the [standard API specification](https://dom.spec.whatwg.org/#interface-domtokenlist) that contains supporting multiple arguments for methods.
- Simpler and smaller by using other APIs that are supported by modern browsers.
- Don't change any `prototype`. ([Polyfills and the evolution of the Web](https://w3ctag.github.io/polyfills/))

## Usage

Load only a file `m-class-list.min.js` into your web page.

```html
<script src="m-class-list.min.js"></script>
```

Replace `element.classList` with `mClassList(element)`.  
The `element` can be a HTML element or SVG element.

For example, replace this code:

```js
if (element.classList.contains('foo')) {
  element.classList.add('bar');
}
```

with:

```js
if (mClassList(element).contains('foo')) {
  mClassList(element).add('bar');
}
```

## Supported APIs

```js
number = mClassList(element).length
```

```js
token = mClassList(element).item(index)
```

```js
mClassList(element).add(token1[, token2, token3...])
```

```js
mClassList(element).remove(token1[, token2, token3...])
```

```js
boolean = mClassList(element).contains(token)
```

```js
boolean = mClassList(element).toggle(token[, force])
```

```js
mClassList(element).replace(token, newToken)
```

For details, see HTML5 document such as [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).

## `mClassList.ignoreNative`

By default, `mClassList(element)` returns a native `classList` if `element` has it.  
You can set `mClassList.ignoreNative = true` to use shim always. For example, this is used for browsers that don't support multiple arguments for methods even though the `element` has `classList`.
