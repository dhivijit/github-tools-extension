chrome.commands.onCommand.addListener((command) => {
    if (command === "open-tools") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, "open-tools");
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, "open-tools");
});
