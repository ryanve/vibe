[vibe](https://github.com/ryanve/vibe)
====

**[vibe](https://github.com/ryanve/vibe)** is a [fast](http://jsperf.com/vibe) cross-browser [classList](https://developer.mozilla.org/en-US/docs/DOM/element.classList) module that you can drop into a base library or use as a standalone object.

```
$ npm install vibe
```

**[CDN](http://airve.github.com)**: [dev](http://airve.github.com/js/vibe/vibe.js) - [min](http://airve.github.com/js/vibe/vibe.min.js)

# methods

### static

fast simple versions are on the top-level:

```js
vibe.addClass( elem, className )
vibe.removeClass( elem, className )
vibe.toggleClass( elem, className )
vibe.hasClass( elem, className )
```
### chain

jQuery-compatible versions are in the chain:

```js
vibe.fn.addClass( ssvClassNames )
vibe.fn.removeClass( ssvClassNames )
vibe.fn.toggleClass( ssvClassNames )
vibe.fn.hasClass( className )
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