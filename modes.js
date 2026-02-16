const THEME_KEY = "portfolio-theme";
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
    const isLight = theme === "light";
    root.setAttribute("data-theme", isLight ? "light" : "dark");

    if (themeToggle) {
        themeToggle.textContent = isLight ? "Modo escuro" : "Modo claro";
        themeToggle.setAttribute("aria-pressed", String(isLight));
    }

    if (themeColorMeta) {
        themeColorMeta.setAttribute("content", isLight ? "#f4f7fb" : "#0f0f0f");
    }
}

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = savedTheme || (prefersLight ? "light" : "dark");

setTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        localStorage.setItem(THEME_KEY, nextTheme);
        setTheme(nextTheme);
    });
}
