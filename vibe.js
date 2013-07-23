/*!
 * vibe      CSS classes for the masses.
 * @version  0.8.0
 * @link     http://vibe.airve.com
 * @author   Ryan Van Etten
 * @license  MIT
 */

/*jshint expr:true, sub:true, supernew:true, debug:true, node:true, boss:true, devel:true, evil:true, 
  laxcomma:true, eqnull:true, undef:true, unused:true, browser:true, jquery:true, maxerr:100 */

(function(root, name, make) {
    typeof module != 'undefined' && module['exports'] ? module['exports'] = make() : root[name] = make();
}(this, 'vibe', function() {

    var classList = 'classList'
      , space = ' '
      , subject = document.documentElement[classList]
      , hasApi = !!(subject && subject.contains && subject.toggle && subject.add && subject.remove)
      , tabs = /[\t\r\n]/g
      , ssv = /\s+/

      , addClass = hasApi ? function(el, c) {
            '' === c || el[classList].add(c);
        } : function(el, c) {
            var classes = el.className.split(ssv).join(space);
            '' === c || ~(space + classes + space).indexOf(space + c + space) || (el.className = classes + space + c);
        }

      , removeClass = hasApi ? function(el, c) {
            '' === c || el[classList].remove(c);
        } : function(el, c) {
            var s = '', classes = el.className.split(ssv), i = classes.length;
            c = s + c; // Use `s` to convert `c` to string. Repurpose `s` below.
            // Loop backwards and maintain the class order.
            while (i--)
                classes[i] && classes[i] !== c && (s = classes[i] + ((s ? space : s) + s));
            el.className = s;
        }

      , hasClass = hasApi ? function(el, c) {
            return '' !== c && el[classList].contains(c);
        } : function(el, c) {
            return '' !== c && !!~(space + el.className.replace(tabs, space) + space).indexOf(space + c + space);
        }

      , toggleClass = hasApi ? function(el, c) {
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
        if (null == c) return els;
        var j, n, i = 0, l = els.length;
        if (typeof c == 'function') {
            while (i < l) {
                n = c.call(els[i]);
                if (false === n) break;
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
            'addClass': function(c) { 
                return essEach(c, addClass, this); 
            }
          , 'removeClass': function(c) { 
                return essEach(c, removeClass, this); 
            }
          , 'toggleClass': function(c) { 
                return essEach(c, toggleClass, this); 
            }
          , 'hasClass': function(c) {
                for (var i = 0, l = this.length; i < l;)
                    if (hasClass(this[i++], c)) return true;
                return false;
            }
        }
    };
}));