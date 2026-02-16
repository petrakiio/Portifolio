const THEME_KEY = "portfolio-theme";
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (_) {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
}

function setTheme(theme) {
    const isLight = theme === "light";
    root.setAttribute("data-theme", isLight ? "light" : "dark");

    const githubThemeImages = document.querySelectorAll("[data-gh-light][data-gh-dark]");
    githubThemeImages.forEach((image) => {
        const nextSrc = isLight ? image.getAttribute("data-gh-light") : image.getAttribute("data-gh-dark");
        if (nextSrc) image.setAttribute("src", nextSrc);
    });

    if (themeToggle) {
        themeToggle.textContent = isLight ? "Modo escuro" : "Modo claro";
        themeToggle.setAttribute("aria-pressed", String(isLight));
    }

    if (themeColorMeta) {
        themeColorMeta.setAttribute("content", isLight ? "#f4f7fb" : "#0f0f0f");
    }
}

const savedTheme = getSavedTheme();
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = savedTheme || (prefersLight ? "light" : "dark");

setTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        saveTheme(nextTheme);
        setTheme(nextTheme);
    });
}
