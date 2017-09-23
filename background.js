chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
})