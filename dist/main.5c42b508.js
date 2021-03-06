// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var local = localStorage.getItem('x');
var hashmap = JSON.parse(local) || [];
rander(hashmap);
$(".add").on('click', function () {
  var url = prompt('请输入网站地址');

  if (url.indexOf("http") === -1) {
    url = "https://" + url;
  } else {
    url = url;
  }

  var urlx = url.replace("http://", '').replace("https://", '').replace("www.", '').replace(' ', '').trim().replace(/\/.*/, '');

  if (urlx !== '') {
    var obj = {
      text: urlx,
      url: url
    };
    hashmap.push(obj);
    rander(hashmap);
  }
}); //使用hashmap表来渲染整个页面

function rander(hashmap) {
  $(".index-main-ul").find('.main-lists').remove();
  hashmap.forEach(function (node, index) {
    var $li = $("<li class=\"main-list main-lists\">\n        <svg class=\"icon close\" aria-hidden=\"true\">\n        <use xlink:href=\"#icon-close\"></use>\n            </svg>\n            <a href=\"".concat(node.url, "\">\n                <div class=\"list-logo\">").concat(node.text[0].toUpperCase(), "</div>\n                <span class=\"list-text\">").concat(node.text, "</span>\n            </a>\n                </li>"));
    $(".add").before($li);
    $li.on('click', '.close', function () {
      hashmap.splice(index, 1);
      rander(hashmap);
    });
    $li.on('mouseover', function () {
      $li.find(".close").css('display', 'block');
    });
    $li.on('mouseout', function () {
      $li.find(".close").css('display', 'none');
    });
  });
}

window.onbeforeunload = function () {
  var x = JSON.stringify(hashmap);
  localStorage.setItem("x", x);
};

document.addEventListener('keypress', keypress);

function keypress(e) {
  for (var i = 0; i < hashmap.length; i++) {
    if (e.key.toUpperCase() === hashmap[i].text[0].toUpperCase()) {
      window.open(hashmap[i].url);
      break;
    }
  }
}

$('.index-searchText').focus(function () {
  document.removeEventListener('keypress', keypress);
  document.removeEventListener('keyup', keyup);
});
$('.index-searchText').blur(function () {
  document.addEventListener('keypress', keypress);
  document.addEventListener('keyup', keyup);
});
document.addEventListener('keyup', keyup);

function keyup(e) {
  if (e.key === '+' || e.key === '=') {
    var click = new Event('click');
    document.querySelector(".add").dispatchEvent(click);
  }
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.5c42b508.js.map