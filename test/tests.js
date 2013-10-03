(function(root, doc) {
    var aok = root.aok
      , vibe = root.vibe
      , docElem = doc.documentElement
      , subject = docElem['classList']
      , hasApi = !!(subject && subject.contains && subject.toggle && subject.add && subject.remove)
      , log = aok.log
      , info = aok.info
        // emulate wrapped nodes:
      , $divs = doc.getElementsByTagName('div')
      , $body = [doc.body];

    log(vibe);
    info('native: ' + hasApi);
    aok.prototype.express = info;

    aok({id:'green', test:function() {
        doc.body.className = 'green';
        return true === vibe.fn.hasClass.call($body, 'green') &&
            $body === vibe.fn.removeClass.call($body, 'green') &&
            false === vibe.fn.hasClass.call($body, 'green');
    }});

    aok({id:'magenta', test:function() {
        return false === vibe.fn.hasClass.call($body, 'magenta') && 
            $body === vibe.fn.addClass.call($body, 'magenta') &&
            true === vibe.fn.hasClass.call($body, 'magenta');
    }});

    aok({id:'red', test:function() {
        return false === vibe.fn.hasClass.call($body, 'red') &&
            $body === vibe.fn.toggleClass.call($body, 'red') &&
            true === vibe.fn.hasClass.call($body, 'red');
    }});

    aok({id:'yellow', test:function() {
        return false === vibe.hasClass(doc.body, 'yellow') && 
            void 0 === vibe.toggleClass(doc.body, 'yellow') && 
            true === vibe.hasClass(doc.body, 'yellow');
    }});

    aok({id:'addMulti', test:function() {
        return $divs === vibe.fn.removeClass.call($divs, 'white magenta') &&
            false === vibe.fn.hasClass.call($divs, 'white') &&
            false === vibe.fn.hasClass.call($divs, 'magenta') &&
            $divs === vibe.fn.addClass.call($divs, 'white magenta') &&
            true === vibe.fn.hasClass.call($divs, 'white') && 
            true === vibe.fn.hasClass.call($divs, 'magenta');
    }});

    aok({id:'remFunky', test:function() {
        return $divs === vibe.fn.removeClass.call($divs, function () { return 'white'; });
    }});

    aok({id:'white', test:function() {
        var token = 'white'
          , toggle = vibe.fn.toggleClass
          , has = vibe.fn.hasClass
          , before = has.call($divs, 'white')
          , bools = [true, false, true]
          , i = bools.length;
        if (typeof before != 'boolean') return false;
        if ($divs !== toggle.call($divs, token)) return false;
        if (before === has.call($divs, token)) return false;
        while (i--) {
            vibe.fn.toggleClass.call($divs, token, bools[i]);
            if (bools[i] !== vibe.fn.hasClass.call($divs, token)) return false;
        }
        return true;
    }});
}(this, document));