/*!
 * vibe         CSS classes for the masses.
 * @author      Ryan Van Etten (c) 2012
 * @link        http://github.com/ryanve/vibe
 * @license     MIT
 * @version     0.6.1
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true, continue: true
, debug: true, eqeq: true, es5: true, forin: true, newcap: true, nomen: true, plusplus: true
, regexp: true, undef: true, sloppy: true, stupid: true, sub: true, vars: true, white: true
, indent: 4, maxerr: 180 */

(function (root, name, factory) {
    if ( typeof module != 'undefined' && module.exports ) { module.exports = factory(); } // node
    else { root[name] = factory(); } // browser
}(this, 'vibe', function () {

    var ssv = /\s+/
      , space = ' '
      , tabs = /[\t\r\n]/g
      , trimmer = /^\s+|\s+$/
      , docElem = document.documentElement
      , classList = 'classList'
      , NATIVE = classList in docElem
              && !!docElem[classList].add 
              && !!docElem[classList].remove
              && !!docElem[classList].contains

      , addClass = NATIVE ? function (el, c) {
            '' === c || el[classList].add(c);
        } : function (el, c) {
            var classes = el.className.split(ssv).join(space);
            '' === c || ~(space + classes + space).indexOf(space + c + space) || (el.className = classes + space + c);
        }
        
      , removeClass = NATIVE ? function (el, c) {
            '' === c || el[classList].remove(c);
        } : function (el, c) {
            var classes = space + el.className.split(ssv).join(space) + space;
            el.className = classes.replace(space + c + space, space).replace(trimmer, '');
        }

      , hasClass = NATIVE ? function (el, c) {
            if ('' === c) { return false; }
            return el[classList].contains(c);
        } : function (el, c) {
            if ('' === c) { return false; }
            return !!~(space + el.className.replace(tabs, space) + space).indexOf(space + c + space);
        }

      , toggleClass = NATIVE ? function (el, c) {
            '' === c || el[classList][ el[classList].contains(c) ? 'remove' : 'add' ](c);
        } : function (el, c) {
            (hasClass(el, c) ? removeClass : addClass)(el, c);
        };


    /**
     * @param {string|Array|Function} c
     * @param {Function}              method
     * @param {Array|Object}          els
     */ 
    function essEach (c, method, els) {
        if ( null == c ) { return els; }
        var j, h, i = 0, l = els.length;
        if ( typeof c == 'function' ) {
            while ( i < l ) {
                essEach( c.call(els[i]), method, [ els[i++] ] ); 
            }
        } else {
            c = typeof c == 'string' ? c.split(ssv) : c;
            for ( h = c.length; i < l; i++ ) {
                if ( els[i] != null ) {
                    for ( j = 0; j < h; j++ ) {
                        method(els[i], c[j]);
                    }
                }
            }
        }
        return els;
    }
    
    return {
        'addClass': addClass
      , 'removeClass': removeClass
      , 'toggleClass': toggleClass
      , 'hasClass': hasClass
      , 'fn': {
            'addClass': function (c) { return essEach(c, addClass, this); }
          , 'removeClass': function (c) { return essEach(c, removeClass, this); }
          , 'toggleClass': function (c) { return essEach(c, toggleClass, this); }
          , 'hasClass': function (c) {
                var i = this.length;
                while ( i-- ) { if (hasClass(this[i], c)) { return true; } }
                return false;
            }
        }
    };

}));