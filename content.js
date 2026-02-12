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
    btn.textContent = "🧰 Tools";

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
