const themeSelector = document.getElementById("themeSelector");
const downloadBtn = document.getElementById("downloadTheme");
const sidebar = document.querySelector(".sidebar");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const body = document.body;

// 50 fixed theme definitions
const themes = [
    { name: "Ocean Blue", main: "#007bff", accent: "#e3f2fd", text: "#ffffff" },
    { name: "Sunset Orange", main: "#ff7043", accent: "#fff3e0", text: "#ffffff" },
    { name: "Forest Green", main: "#2e7d32", accent: "#e8f5e9", text: "#ffffff" },
    { name: "Royal Purple", main: "#6a1b9a", accent: "#f3e5f5", text: "#ffffff" },
    { name: "Midnight Black", main: "#121212", accent: "#1e1e1e", text: "#eeeeee" },
    { name: "Lemon Yellow", main: "#fdd835", accent: "#fffde7", text: "#333333" },
    { name: "Cherry Red", main: "#c62828", accent: "#ffebee", text: "#ffffff" },
    { name: "Aqua Mint", main: "#26a69a", accent: "#e0f2f1", text: "#ffffff" },
    { name: "Steel Gray", main: "#455a64", accent: "#eceff1", text: "#ffffff" },
    { name: "Golden Brown", main: "#8d6e63", accent: "#efebe9", text: "#ffffff" },
    // 👇 Auto-generate the rest (up to 50)
    ...Array.from({ length: 40 }, (_, i) => ({
        name: `Custom Theme ${i + 11}`,
        main: randomColor(),
        accent: randomColor(),
        text: "#ffffff",
    }))
];

// Populate dropdown
themes.forEach((t, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = t.name;
    themeSelector.appendChild(opt);
});

// Apply theme
function applyTheme(index) {
    const theme = themes[index];
    sidebar.style.background = theme.main;
    header.style.background = theme.main;
    footer.style.background = theme.main;
    body.style.background = theme.accent;
    body.style.color = theme.text;
    localStorage.setItem("themeIndex", index);
}

// Generate random color
function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

// Load saved theme
window.addEventListener("load", () => {
    const saved = localStorage.getItem("themeIndex") || 0;
    themeSelector.value = saved;
    applyTheme(saved);
});

// Change theme on selection
themeSelector.addEventListener("change", (e) => {
    applyTheme(e.target.value);
});

// Download current theme
downloadBtn.addEventListener("click", () => {
    const index = themeSelector.value;
    const t = themes[index];
    const css = `
/* ${t.name} Theme */
body {
  background-color: ${t.accent};
  color: ${t.text};
}

header, footer, .sidebar {
  background-color: ${t.main};
  color: ${t.text};
}

.card {
  background-color: white;
  color: #333;
}
`;

    const blob = new Blob([css], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${t.name.replace(/ /g, "_")}.css`;
    link.click();
});
