# [vibe](../../)

#### cross-browser `[class]` JavaScript [module](https://npmjs.org/package/vibe)&mdash;uses [classList](https://developer.mozilla.org/en-US/docs/DOM/element.classList) where available

```sh
$ npm install vibe
```

## API ([0.9](../../releases))

### Parameters

- <b>element</b> denotes a native DOM Element
- <b>token</b> denotes a single class name
- <b>$</b> denotes a jQuery-compatible lib such as [ender](https://npmjs.org/package/ender-js)
- <b>?</b> denotes a optional parameter
- <b>stack</b> denotes an array or collection of elements
- <b>ssv</b> denotes where multiple classes can be passed via array or space-separated string, or a function to determine its value&mdash;functions run with `this` as the current element and can cease further iterations by returning `false`.

### Fast simple static methods

- `vibe.addClass(element, token)`
- `vibe.removeClass(element, token)`
- `vibe.toggleClass(element, token)`
- `vibe.hasClass(element, token)`

### [jQueryish](http://api.jquery.com/category/manipulation/class-attribute/) chain methods

#### Integrated Syntax

- `$(elements).addClass(ssv)`
- `$(elements).removeClass(ssv)`
- `$(elements).toggleClass(ssv, bool?)`
- `$(elements).hasClass(token)` &rarr; `true` if **any** element has it

#### Standalone Syntax

In <b>standalone</b> usage, these methods can be run via [`.call`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call)

- `vibe.fn.addClass.call(stack, ssv)`
- `vibe.fn.removeClass.call(stack, ssv)`
- `vibe.fn.toggleClass.call(stack, ssv, bool?)`
- `vibe.fn.hasClass.call(stack,  token)`

## [MIT License](http://opensource.org/licenses/MIT)

Copyright (C) 2012 [Ryan Van Etten](https://github.com/ryanve)