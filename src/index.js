(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make(); 
  else root[name] = make();
}(this, 'vibe', function() {

  var classList = 'classList'
    , subject = typeof document != 'undefined' && document.documentElement[classList]
    , hasApi = !!(subject && subject.contains && subject.add && subject.remove)
    , whitespace = /\s+/g
    , ssv = /\S+/g
    , space = ' '
    , contains = function(str, token) {
        return !!~(space + str.replace(whitespace, space) + space).indexOf(space + token + space);
      }

    , addClass = hasApi ? function(el, c) {
        '' === c || el[classList].add(c);
      } : function(el, c) {
        contains(el.className, c) || (el.className += space + c);
      }

    , removeClass = hasApi ? function(el, c) {
        '' === c || el[classList].remove(c);
      } : function(el, c) {
        var diff = 0, s = '', classes = el.className.match(ssv), i = classes && classes.length;
        for (c = s + c; i--;) c === classes[i] ? ++diff : s = classes[i] + (s ? space : s) + s;
        if (diff) el.className = s;
      }

    , hasClass = hasApi ? function(el, c) {
        return '' === c || !!el[classList].contains(c);
      } : function(el, c) {
        return contains(el.className, c);
      }

    , toggleClass = function(el, c, force) {
        if ('' === c) return true;
        force = typeof force == 'boolean' ? force : !hasClass(el, c);
        (force ? addClass : removeClass)(el, c);
        return force;
      };

  /**
   * @param {{length:number}} els
   * @param {Function} fn method
   * @param {string|Array|Function} list of classes or callback to determine them
   */ 
  function bulk(els, fn, list) {
    var j, n, i = 0, l = els.length;
    if (typeof list == 'function') {
      while (i < l) {
        n = list.call(els[i]);
        if (false === n) break;
        bulk([els[i++]], fn, n);
      }
    } else if (typeof list == 'string' ? list = list.match(ssv) : list) {
      for (n = list.length; i < l; i++) {
        for (j = 0; j < n; j++) {
          fn(els[i], list[j]);
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
          return bulk(this, addClass, list); 
        }
      , 'removeClass': function(list) { 
          return bulk(this, removeClass, list); 
        }
      , 'toggleClass': function(list, state) {
          return bulk(this, true === state ? addClass : false === state ? removeClass : toggleClass, list);
        }
      , 'hasClass': function(c) {
          for (var i = 0, l = this.length; i < l;) if (hasClass(this[i++], c)) return true;
          return false;
        }
    }
  };
}));