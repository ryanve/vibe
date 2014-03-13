# vibe
#### cross-browser `[class]` JavaScript [module](https://npmjs.org/package/vibe)&mdash;uses [classList](https://developer.mozilla.org/en-US/docs/DOM/element.classList) where available

```sh
$ npm install vibe
```

## API ([0.9](../../releases))

### Parameters

- <b><var>element</var></b> denotes a native DOM Element
- <b><var>token</var></b> denotes a single class name
- <b><var>$</var></b> denotes a jQuery-compatible lib such as [ender](https://github.com/ender-js/Ender)
- <b><var>?</var></b> denotes a optional parameter
- <b><var>stack</var></b> denotes an array or collection of elements
- <b><var>ssv</var></b> denotes where multiple classes can be passed via array, space-separated string, or a callback to determine them. Callbacks run for each element as `this` and may return `false` to cease further iterations.

### Fast simple static methods

- `vibe.addClass(element, token)`
- `vibe.removeClass(element, token)`
- `vibe.toggleClass(element, token, force?)`
- `vibe.hasClass(element, token)`

### [jQueryish](http://api.jquery.com/category/manipulation/class-attribute/) chain methods

#### Integrated syntax

- `$(elements).addClass(ssv)`
- `$(elements).removeClass(ssv)`
- `$(elements).toggleClass(ssv, force?)`
- `$(elements).hasClass(token)` &rarr; `true` if **any** element has it

#### Standalone syntax

In <b>standalone</b> usage, these methods can be run via [`.call`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call)

- `vibe.fn.addClass.call(stack, ssv)`
- `vibe.fn.removeClass.call(stack, ssv)`
- `vibe.fn.toggleClass.call(stack, ssv, force?)`
- `vibe.fn.hasClass.call(stack, token)`

## Ender 

#### Include [vibe](https://www.npmjs.org/package/vibe) in your [ender](https://github.com/ender-js/Ender) build

```sh
ender build vibe
```

#### `ender` usage example

```js
ender('html').addClass('example').removeClass('another')
```

## Compatibility

- Works in all browsers. Tested in Chrome, FF, Opera, IE7/8
- Uses the native `.classList` where available and otherwise uses `.className`

## Fund
Support this project by [tipping the developer](https://www.gittip.com/ryanve/) <samp><b>=)</b></samp>

## License

[MIT](vibe.js#L4)