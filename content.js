function getRepoPath() {
    const match = window.location.href.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/?#]+)/i);
    return match ? `${match[1]}/${match[2]}` : null;
}

// ================= POPUP UI =================
function openLauncher() {

    const existing = document.getElementById("git-tool-popup");
    if (existing) {
        existing.remove();
        return;
    }

    const repoPath = getRepoPath();
    if (!repoPath) return;

    const popup = document.createElement("div");
    popup.id = "git-tool-popup";

    const header = document.createElement("div");
    header.id = "git-tool-header";
    header.textContent = "Git Repo Tools";

    popup.appendChild(header);

    function createButton(text, url, extra = "") {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = `git-tool-button ${extra}`;
        btn.onclick = () => window.open(url, "_blank");
        return btn;
    }

    popup.appendChild(createButton("📥 Ingest Code", `https://gitingest.com/${repoPath}`));
    popup.appendChild(createButton("🤖 MCP", `https://gitmcp.io/${repoPath}`));
    popup.appendChild(createButton("📚 DeepWiki Docs", `https://deepwiki.com/${repoPath}`));
    popup.appendChild(createButton("💬 TalkToGitHub", `https://talktogithub.com/${repoPath}`));
    popup.appendChild(createButton("🧭 Git Diagram", `https://gitdiagram.com/${repoPath}`));

    const closeBtn = createButton("Close", "#", "git-tool-close");
    closeBtn.onclick = () => popup.remove();

    popup.appendChild(closeBtn);

    document.body.appendChild(popup);

        // ===== DRAG =====
    let isDragging = false;
    let offsetX, offsetY;

    header.onmousedown = (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;

        popup.style.left = (e.clientX - offsetX) + "px";
        popup.style.top = (e.clientY - offsetY) + "px";
        popup.style.right = "auto";
    };

    document.onmouseup = () => {
        isDragging = false;
    };
}

// ================= ADD BUTTON =================
function injectGithubButton() {

    if (!getRepoPath()) return;

    if (document.getElementById("git-tools-btn")) return;

    // Find the star button container
    const starButton = document.querySelector('button[data-hydro-click*="STAR"]') ||
        document.querySelector('button[aria-label*="Star"]') ||
        document.querySelector('form[action*="/unstar"] button') ||
        document.querySelector('form[action*="/star"] button');

    if (!starButton) return;

    // Get the parent container that holds the star button
    const container = starButton.closest('div') || starButton.parentElement;

    if (!container) return;

    const btn = document.createElement("button");
    btn.id = "git-tools-btn";
    
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 576 512");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.style.marginRight = "4px";
    svg.style.verticalAlign = "middle";
    
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M70.8-6.7c5.4-5.4 13.8-6.2 20.2-2L209.9 70.5c8.9 5.9 14.2 15.9 14.2 26.6l0 49.6 90.8 90.8c33.3-15 73.9-8.9 101.2 18.5L542.2 382.1c18.7 18.7 18.7 49.1 0 67.9l-60.1 60.1c-18.7 18.7-49.1 18.7-67.9 0L288.1 384c-27.4-27.4-33.5-67.9-18.5-101.2l-90.8-90.8-49.6 0c-10.7 0-20.7-5.3-26.6-14.2L23.4 58.9c-4.2-6.3-3.4-14.8 2-20.2L70.8-6.7zm145 303.5c-6.3 36.9 2.3 75.9 26.2 107.2l-94.9 95c-28.1 28.1-73.7 28.1-101.8 0s-28.1-73.7 0-101.8l135.4-135.5 35.2 35.1zM384.1 0c20.1 0 39.4 3.7 57.1 10.5 10 3.8 11.8 16.5 4.3 24.1L388.8 91.3c-3 3-4.7 7.1-4.7 11.3l0 41.4c0 8.8 7.2 16 16 16l41.4 0c4.2 0 8.3-1.7 11.3-4.7l56.7-56.7c7.6-7.5 20.3-5.7 24.1 4.3 6.8 17.7 10.5 37 10.5 57.1 0 43.2-17.2 82.3-45 111.1l-49.1-49.1c-33.1-33-78.5-45.7-121.1-38.4l-56.8-56.8 0-29.7-.2-5c-.8-12.4-4.4-24.3-10.5-34.9 29.4-35 73.4-57.2 122.7-57.3z");
    path.setAttribute("fill", "currentColor");

    svg.appendChild(path);
    btn.appendChild(svg);
    btn.appendChild(document.createTextNode("Tools"));

    btn.className = "btn btn-sm"; // Uses GitHub styling
    btn.style.marginLeft = "6px";
    btn.style.marginRight = "10px";

    btn.onclick = openLauncher;

    // Insert after the star button's container
    container.parentElement.insertBefore(btn, container.nextSibling);
}

// Observe page changes (GitHub is SPA)
const observer = new MutationObserver(injectGithubButton);
observer.observe(document.body, { childList: true, subtree: true });

injectGithubButton();


// ================= KEYBOARD SHORTCUT =================
chrome.runtime.onMessage.addListener((msg) => {
    if (msg === "open-tools") openLauncher();
});
