(typeof ender == 'function' && typeof require == 'function' && function($, ex) {
    for (var k in ex) 'fn' === k ? $['ender'](ex[k], true) : $[k] = ex[k];
}(ender, require('vibe')));