(function () {
    var key = "portfolio-theme";
    var theme = null;

    try {
        theme = localStorage.getItem(key);
    } catch (_) {}

    if (!theme) {
        theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    var isLight = theme === "light";
    document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f4f7fb" : "#0f0f0f");
})();
