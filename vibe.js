/*!
 * vibe         CSS classes for the masses.
 * @author      Ryan Van Etten (c) 2012
 * @link        http://github.com/ryanve/vibe
 * @license     MIT
 * @version     0.7.0
 */

/*jshint expr:true, laxcomma:true, sub:true, debug:true, eqnull:true, boss:true, evil:true, undef:true
, unused:true, browser:true, devel:true, jquery:true, es5:true, node:true, indent:4, maxerr:100 */

(function(root, name, factory) {
    if (typeof module != 'undefined' && module['exports']) {
        module['exports'] = factory(); // node|common
    } else { root[name] = factory(); } // browser
}(this, 'vibe', function() {

    var ssv = /\s+/
      , space = ' '
      , tabs = /[\t\r\n]/g
      , trimmer = /^\s+|\s+$/
      , docElem = document.documentElement
      , classList = 'classList'
      , NATIVE = classList in docElem
            && !!docElem[classList].contains
            && !!docElem[classList].add 
            && !!docElem[classList].remove
            && !!docElem[classList].toggle

      , addClass = NATIVE ? function(el, c) {
            '' === c || el[classList].add(c);
        } : function(el, c) {
            var classes = el.className.split(ssv).join(space);
            '' === c || ~(space + classes + space).indexOf(space + c + space) || (el.className = classes + space + c);
        }
        
      , removeClass = NATIVE ? function(el, c) {
            '' === c || el[classList].remove(c);
        } : function(el, c) {
            var s = '', classes = el.className.split(ssv), i = classes.length;
            c = s + c; // use `s` to convert `c` to string ( `s` is repurposed below )
            while ( i-- ) {// loop backwards ( but maintain the class order )
                classes[i] && classes[i] !== c && (s = classes[i] + ((s ? space : s) + s));
            }
            el.className = s;
        }

      , hasClass = NATIVE ? function(el, c) {
            if ('' === c) { return false; }
            return el[classList].contains(c);
        } : function(el, c) {
            if ('' === c) { return false; }
            return !!~(space + el.className.replace(tabs, space) + space).indexOf(space + c + space);
        }

      , toggleClass = NATIVE ? function(el, c) {
            '' === c || el[classList].toggle(c);
        } : function(el, c) {
            (hasClass(el, c) ? removeClass : addClass)(el, c);
        };

    /**
     * @param {string|Array|Function} c
     * @param {Function}              method
     * @param {Array|Object}          els
     */ 
    function essEach(c, method, els) {
        if (null == c) { return els; }
        var j, n, i = 0, l = els.length;
        if (typeof c == 'function') {
            while (i < l) {
                n = c.call(els[i]);
                if (false === n) { break; }
                essEach(n, method, [els[i++]]);
            }
        } else {
            c = typeof c == 'string' ? c.split(ssv) : c;
            for (n = c.length; i < l; i++) {
                for (j = 0; j < n; j++) {
                    method(els[i], c[j]);
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
            'addClass': function(c) { return essEach(c, addClass, this); }
          , 'removeClass': function(c) { return essEach(c, removeClass, this); }
          , 'toggleClass': function(c) { return essEach(c, toggleClass, this); }
          , 'hasClass': function(c) {
                var i = this.length;
                while (i--) {
                    if (hasClass(this[i], c)) { return true; }
                }
                return false;
            }
        }
    };
}));