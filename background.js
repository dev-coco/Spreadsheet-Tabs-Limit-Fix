chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') chrome.tabs.create({url: 'https://dev-coco.github.io/post/Spreadsheet-Tabs-Limit-Fix/' })
})
