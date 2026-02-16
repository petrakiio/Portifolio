const THEME_KEY = "portfolio-theme";
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;
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
        const nextActionLabel = isLight ? "Alternar para modo escuro" : "Alternar para modo claro";
        if (themeLabel) {
            themeLabel.textContent = isLight ? "Modo escuro" : "Modo claro";
        } else {
            themeToggle.textContent = isLight ? "Modo escuro" : "Modo claro";
        }
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.setAttribute("data-mode", isLight ? "light" : "dark");
        themeToggle.setAttribute("aria-label", nextActionLabel);
        themeToggle.setAttribute("title", nextActionLabel);
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
