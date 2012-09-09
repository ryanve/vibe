/*!
 * vibe         CSS classes for the masses.
 * @author      Ryan Van Etten (c) 2012
 * @link        http://github.com/ryanve/vibe
 * @license     MIT
 * @version     0.5.0
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true, continue: true
, debug: true, eqeq: true, es5: true, forin: true, newcap: true, nomen: true, plusplus: true
, regexp: true, undef: true, sloppy: true, stupid: true, sub: true, vars: true, white: true
, indent: 4, maxerr: 180 */

(function (root, name, factory) {
    if ( typeof module != 'undefined' && module.exports ) { module.exports = factory(); } // node
    else { root[name] = factory(); } // browser
}(this, 'vibe', function (host) {

    var ssv = /\s+/
      , tabs = /[\t\r\n]/g
      , trimmer = /^\s+|\s+$/
      , trim = ''.trim ? function (s) {
            return null == s ? '' : s.trim(); 
        } : function (s) {
            return null == s ? '' : s.replace(trimmer, ''); 
        };
    
    function addClass (el, c) {
    
        var i = 0, l, n, space = ' ', classes;
        if ( 1 !== el.nodeType ) { return; }
        c = typeof c == 'function' ? c.call(el) : c;
        if ( !c ) { return el.className; }
        c = typeof c == 'string' ? c.split(ssv) : c;
        l = c.length;
        classes = space + el.className.replace(tabs, space) + space;
        while ( i < l ) {
            n = c[i++];
            n && (n = '' + n) && !~classes.indexOf(n) && ( classes += (n + space) );
        }
        classes = trim(classes);
        el.className = classes;
        return classes;

    }
    
    function removeClass (el, c) {
    
        var i = 0, l, n, space = ' ', classes, j = 0, arr = [];
        if ( 1 !== el.nodeType ) { return; }
        c = typeof c == 'function' ? c.call(el) : c;
        if ( !c ) { return el.className; }
        c = space + (typeof c == 'object' ? c.join(space) : c) + space;
        classes = el.className.split(ssv);
        l = classes.length;
        while ( i < l ) {
            n = classes[i++];
            n && !~c.indexOf(space + n + space) && ( arr[j++] = n );
        }
        classes = j ? arr.join(space) : '';
        el.className = classes;
        return classes;

    }
    
    function hasClass (el, c) {
        var space = ' ', classes;
        if ( 1 !== el.nodeType || !c || !(c = trim(c)) ) { return false; }
        classes = space + el.className.replace(tabs, space) + space;
        return !!~classes.indexOf(space + c + space);
    }
    
    function toggleClass (el, c) {
    
        var i = 0, l, n, adds = [], rems = [], a = 0, r = 0, ret;
        if ( 1 !== el.nodeType ) { return; }
        if ( !c ) { return el.className; }
        c = typeof c == 'string' ? c.split(ssv) : c;
        l = c.length;

        while ( i < l ) {
            n = c[i++];
            n && ( hasClass(el, n) ? (rems[r++] = n) : (adds[a++] = n) ); 
        }

        a && (ret = addClass(el, adds));
        r && (ret = removeClass(el, rems));
        return ret;

    }
    
    function effinize (method) {
        return function (c) {
            var i, e, l = this.length;
            if ( c && l ) {
                for ( i = 0; (e = this[i]) || i < l; i++ ) {
                    e && method(e, c);
                }
            }
            return this;
        };
    }

    host = host || {};
    host['fn'] = host['fn'] || {};
    
    host['addClass'] = addClass;
    host['removeClass'] = removeClass;
    host['toggleClass'] = toggleClass;
    host['hasClass'] = hasClass;
    host['fn']['addClass'] = effinize(addClass);
    host['fn']['removeClass'] = effinize(removeClass);
    host['fn']['toggleClass'] = effinize(toggleClass);
    host['fn']['hasClass'] = function (c) {
        var i = this.length;
        while ( i-- ) { if (hasClass(this[i], c)) { return true; } }
        return false;
    };

    return host;    

}));