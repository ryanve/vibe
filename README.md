# [vibe](https://github.com/ryanve/vibe)

**[vibe](http://vibe.airve.com)** is a [fast](http://jsperf.com/vibe) cross-browser [classList](https://developer.mozilla.org/en-US/docs/DOM/element.classList) [module](https://npmjs.org/package/vibe) that you can mixin to a main library or use standalone.

**[Download](http://airve.github.io)**: [dev](http://airve.github.com/js/vibe/vibe.js) | [min](http://airve.github.com/js/vibe/vibe.min.js)

```
$ npm install vibe
```

## API

Cheap simple **static** methods on the top-level accept a native DOM element and a single `className` with **no** whitespace. If you pass `""`, no change occurs. No typechecking is done. Non-strings coherce to strings:

- `vibe.addClass(element, className)`
- `vibe.removeClass(element, className)`
- `vibe.toggleClass(element, className)`
- `vibe.hasClass(element, className)` // `true` if any element has `className`. 

Integrated **chain** methods are jQuery-compatible. Here `ssv` denotes where multiple classes can be passed via array or space-separated string, or a function to determine its value. Functions run with `this` as the current element. If the function returns `false`, further set iterations cease via [break](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/break). If `ssv` is `null|undefined|whitespace|lengthless`, no change occurs:

- `$(elements).addClass(ssv)` // chainable
- `$(elements).removeClass(ssv)` // chainable
- `$(elements).toggleClass(ssv)` // chainable
- `$(elements).hasClass(className)` // `true` if any element has `className`. 

In **standalone** usage, these methods can be used via [.call](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call)

- `vibe.fn.addClass.call(elements, ssv)`
- `vibe.fn.removeClass.call(elements, ssv)`
- `vibe.fn.toggleClass.call(elements, ssv)`
- `vibe.fn.hasClass.call(elements,  className)`

## License

### [vibe](http://github.com/ryanve/vibe) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2012 by [Ryan Van Etten](https://github.com/ryanve)