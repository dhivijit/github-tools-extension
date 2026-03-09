# GitHub Repo Tools Launcher

A lightweight browser extension that adds a **Tools** button to every GitHub repository page, giving you one-click access to a curated set of third-party repo analysis and exploration tools — without leaving GitHub.

---

## Demo
<div align="center">

![Demo of the GitHub Repo Tools Launcher extension in action, showing the Tools button on a GitHub repo page and the popup with various tool options.](/demo.gif)

</div>

---

## Features

Click the **Tools** button (next to the Star button on any repo page) or press `Alt+Shift+G` to open a draggable popup with the following tools:

| Tool | What it does |
|---|---|
| 📥 **Ingest Code** | Converts the repo into a single prompt-friendly text file via [gitingest.com](https://gitingest.com) |
| 🤖 **MCP** | Exposes the repo as a Model Context Protocol server via [gitmcp.io](https://gitmcp.io) |
| 📚 **DeepWiki Docs** | Generates AI-powered documentation for the repo via [deepwiki.com](https://deepwiki.com) |
| 💬 **TalkToGitHub** | Chat with the repository using AI via [talktogithub.com](https://talktogithub.com) |
| 🧭 **Git Diagram** | Visualises the repo architecture as an interactive diagram via [gitdiagram.com](https://gitdiagram.com) |
| 📦 **CodeSandbox** | Opens the repo in a live CodeSandbox environment via [githubbox.com](https://githubbox.com) |
| 💻 **VSCode Online** | Opens the repo in VS Code on the web via [github.dev](https://github.dev) |

---

## Installation

Since this extension is not yet published on the Chrome Web Store, install it manually:

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing this extension's files.
5. The extension is now active on all `github.com` pages.

---

## Usage

- **Button:** A **Tools** button appears next to the Star button on any GitHub repository page. Click it to open the tools popup.
- **Keyboard shortcut:** Press `Alt+Shift+G` on any GitHub page to toggle the popup.
- **Drag:** The popup can be dragged anywhere on the screen by its header.
- Each button opens the selected tool in a new tab with the current repository pre-loaded.

---

## Contributing

Contributions are welcome! If you know a useful GitHub repo tool that would be a good fit here, feel free to open a pull request.

### Adding a new tool

1. Fork this repository.
2. Open `content.js` and find the section marked `// ================= POPUP UI =================`.
3. Add a new `createButton` call following the existing pattern:
   ```js
   popup.appendChild(createButton("emoji Tool Name", `https://yourtool.com/${repoPath}`));
   ```
4. Add the new tool to the table in this README under the **Features** section.
5. Open a pull request with a short description of what the tool does.

**Guidelines for new tools:**
- The tool should accept a GitHub `owner/repo` path in its URL.
- It should provide clear value for developers exploring or working with a repository.
- Prefer tools that are free to use (at least with a free tier).

---

## Acknowledgements

This extension is a launcher — it does not host or replicate any of the tools itself. All functionality is provided by the respective third-party services:

- [GitIngest](https://gitingest.com) — repo-to-prompt ingestion
- [GitMCP](https://gitmcp.io) — MCP server for GitHub repos
- [DeepWiki](https://deepwiki.com) — AI-generated repo documentation
- [TalkToGitHub](https://talktogithub.com) — conversational AI for repos
- [GitDiagram](https://gitdiagram.com) — repo architecture diagrams
- [GitHubBox / CodeSandbox](https://githubbox.com) — live sandbox environments
- [github.dev](https://github.dev) — VS Code in the browser (by GitHub)

All trademarks and services belong to their respective owners. This project has no affiliation with any of the above services.

---

## License

MIT
