[vibe](https://github.com/ryanve/vibe)
====

**[vibe](https://github.com/ryanve/vibe)** is a [fast](http://jsperf.com/vibe) cross-browser [classList](https://developer.mozilla.org/en-US/docs/DOM/element.classList) [module](https://npmjs.org/package/vibe) that you can mixin to a base library or use as a standalone object.

**[CDN](http://airve.github.com)**: [dev](http://airve.github.com/js/vibe/vibe.js) | [min](http://airve.github.com/js/vibe/vibe.min.js)

```
$ npm install vibe
```

# methods

### static

Cheap simple methods are on the top-level. Here **@param** `{Object}` **elem** must be a native element and **@param** `{string}` **className** is a CSS class, with **no** whitespace. If you pass `""`, no change occurs. No typechecking is done. Non-strings coherce to strings:

```js
vibe.addClass( elem, className )
vibe.removeClass( elem, className )
vibe.toggleClass( elem, className )
vibe.hasClass( elem, className )
```
### chain

jQuery-compatible-ish methods (designed to be mixed into a jQuery-like lib) are usable with standalone vibe via [.call](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call). Here **@this** `{Object|Array}` is an array or array-like set of elements, and **@param** `{string|Array|Function}` **ssv** is an array or space-separated string of class names, or a function to determine its value. Functions are scoped such that `this` is the current element. If the function returns `false`, further set iterations cease via [break](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/break). If **ssv** is `null|undefined|whitespace|lengthless`, no change occurs:

```js
$(elems).addClass( ssv )
$(elems).removeClass( ssv )
$(elems).toggleClass( ssv )
```
standalone:
```js
vibe.fn.addClass.call( elems, ssv )
vibe.fn.removeClass.call( elems, ssv )
vibe.fn.toggleClass.call( elems, ssv )
```

As for `.hasClass`: **@param** `{string}` **className** is the name of a single CSS class (like the statics) and the **@return** is boolean. It returns `true` if **any** of the elements have the class. Otherwise it returns `false`:

```js
$(elems).hasClass( className )
```
standalone:
```js
vibe.fn.hasClass.call(elems,  className )
```

# license

### [vibe](http://github.com/ryanve/vibe) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2012 by [Ryan Van Etten](https://github.com/ryanve)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.