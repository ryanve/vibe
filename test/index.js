(function(root) {
  var fails = 0
    , doc = typeof document != 'undefined' && document
    , aok = !doc ? require('aok') : root.aok
    , vibe = !doc ? require('../src') : root.vibe
    , effin = vibe.fn
    , slice = [].slice
    , docElem = !!doc && doc.documentElement
    , subject = docElem['classList']
    , hasApi = !!(subject && subject.contains && subject.add && subject.remove)
    , invoke = function(method, e) {
        var chain = +!e.nodeType, scope = chain ? e : this;
        return (chain ? effin : vibe)[method].apply(scope, slice.call(arguments, 1+chain));
      }
    , partial = function(fn) {
        var rest = slice.call(arguments, 1);
        return function() {
          return fn.apply(this, rest.concat(slice.call(arguments)));
        };
      }
    , hasKlass = partial(invoke, 'hasClass')
    , $divs = !!doc && doc.getElementsByTagName('div')
    , cull = aok.prototype.cull
    , borrow = function(e, fn, init) {
        var r, a = e.nodeType ? [e] : e, l = a.length, i = l, j = l, before = [];
        init = init || '';
        while (j--) before[j] = a[j].className;
        while (i--) a[i].className = init;
        r = fn.call(this, e, init);
        while (l--) a[l].className = before[l];
        return r;
      };
      
  if (![].some) aok.prototype.express = aok.info; // alert in ie8
  aok.prototype.cull = function() {
    this.test || fails++;
    return cull.apply(this, arguments);
  };
  
  aok('methods exist', !!vibe && !!vibe.fn && !aok.fail([
    'addClass', 'removeClass', 'toggleClass', 'hasClass'
  ], function(method) {
    return typeof vibe[method] == 'function' && typeof vibe.fn[method] == 'function';
  }));

  if (doc) aok.info('hasNative: ' + hasApi);
  else return void aok.warn('Open ./test/index.html to view test results.');
  
  aok(function() {
    var sub = vibe[this.id='hasClass'];
    return borrow(doc.body, function(e, c) {
      return true === sub(e, c);
    }) && borrow(doc.body, function(e, c) {
      if (c[1] && sub(e, c.slice(1))) return;
      return true === sub(e, c) && false === sub(e, 'red');
    }, 'blue');
  });
  
  aok(function() {
    var sub = vibe[this.id='addClass'];
    return borrow(doc.body, function(e, c) {
      sub(e, c);
      if (true !== hasKlass(e, c)) return;
      sub(e, 'red');
      return true === hasKlass(e, 'red');
    });
  });
  
  aok(function() {
    var sub = vibe[this.id='removeClass'];
    return borrow(doc.body, function(e, c) {
      sub(e, c);
      if (false !== hasKlass(e, c)) return;
      sub(e, 'red');
      return false === hasKlass(e, 'red');
    }, 'blue');
  });
  
  aok(function() {
    var sub = vibe[this.id='toggleClass'];
    return borrow(doc.body, function(e, c) {
      return true === sub(e, c) && true === sub(e, c, true) && true === sub(e, c, false);
    }) && borrow(doc.body, function(e, c) {
      var i, before = hasKlass(e, c), bools = [sub(e, c), sub(e, c), sub(e, c)];
      if (before === bools[0]) return;
      if (before !== bools[1]) return;
      for (i = bools.length; i--;) { 
        if (typeof bools[i] != 'boolean') return;
        if (bools[i] !== sub(e, c, bools[i])) return;
        if (bools[i] !== hasKlass(e, c)) return;
      }
      return true;
    }, 'blue');
  });
  
  aok(function() {
    var sub = vibe.fn[(this.id='.hasClass').slice(1)];
    return borrow(doc.body, function(e, c) {
      return true === sub.call([e], c);
    }) && borrow(doc.body, function(e, c) {
      if (c[1] && sub([e], c.slice(1))) return;
      return true === sub.call([e], c);
    }, 'green') && borrow(doc.body, function(e) {
      return true === sub.call([e], 'red') && false === sub.call([e], 'green');
    }, 'blue red');
  });
  
  aok(function() {
    var sub = vibe.fn[(this.id='.addClass').slice(1)];
    return borrow($divs, function($e) {
      return $e === sub.call($e, 'red') && hasKlass($e, 'red');
    }) && borrow($divs, function($e, c) {
      return $e === sub.call($e, c) && hasKlass($e, c);
    }, 'red') && borrow($divs, function($e) {
      var list = ['red', 'white', 'blue'], i = list.length;
      sub.call($e, list.join(' '));
      while (i--) if (!hasKlass($e, list[i])) return;
      return true;
    });
  });

  aok(function() {
    var sub = vibe.fn[(this.id='.removeClass').slice(1)];
    return borrow($divs, function($e) {
      return $e === sub.call($e, 'red') && !hasKlass($e, 'red');
    }) && borrow($divs, function($e, c) {
      return $e === sub.call($e, c) && !hasKlass($e, c);
    }, 'red') && borrow($divs, function($e) {
      var list = ['red', 'white', 'blue'], i = list.length;
      sub.call($e, list.join(' '));
      while (i--) if (hasKlass($e, list[i])) return;
      return true;
    });
  });
  
  aok(function() {
    var sub = vibe.fn[(this.id='.toggleClass').slice(1)];
    return borrow($divs, function($e, c) {
      return $e === sub.call($e, c) && !hasKlass($e, c);
    }, 'red') && borrow($divs, function($e) {
      return $e === sub.call($e, 'red') && hasKlass($e, 'red');
    }) && borrow($divs, function($e, c) {
      var bools = [true, false, true], i = bools.length;
      while (i--) if ($e !== sub.call($e, c, bools[i]) || hasKlass($e, c) !== bools[i]) return;
      return true;
    }, 'red');
  });

  vibe.toggleClass(docElem, 'failed', !!fails);
  vibe.toggleClass(docElem, 'passed', !fails);
}(this));