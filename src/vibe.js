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
            for (c = s + c; i--;)
                // Backwards loop maintains class order.
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
     * @param {Array|Object}          els
     * @param {Function}              method
     * @param {string|Array|Function} list
     */ 
    function eachList(els, method, list) {
        var j, n, i = 0, l = els.length;
        if (typeof list == 'function') {
            while (i < l) {
                n = list.call(els[i]);
                if (false === n) break;
                eachList([els[i++]], method, n);
            }
        } else if (list) {
            list = typeof list == 'string' ? list.split(ssv) : list;
            for (n = list.length; i < l; i++) {
                for (j = 0; j < n; j++) {
                    method(els[i], list[j]);
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
            'addClass': function(list) {
                return eachList(this, addClass, list); 
            }
          , 'removeClass': function(list) { 
                return eachList(this, removeClass, list); 
            }
          , 'toggleClass': function(list, state) {
                return eachList(this, true === state ? addClass : false === state ? removeClass : toggleClass, list);
            }
          , 'hasClass': function(list) {
                for (var i = 0, l = this.length; i < l;)
                    if (hasClass(this[i++], list)) return true;
                return false;
            }
        }
    };
}));