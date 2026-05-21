// GitHub Pages SPA shim. Pairs with public/404.html — when 404.html
// rewrites a deep link into ?/<encoded path>, this restores the real URL
// so React Router can take over. Lives in a separate file so a strict
// production CSP (script-src 'self') doesn't need to allow inline scripts.
(function () {
  var l = window.location;
  if (l.search && l.search.indexOf("?/") === 1) {
    var decoded = l.search
      .slice(2)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");
    window.history.replaceState(
      null,
      null,
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
})();
