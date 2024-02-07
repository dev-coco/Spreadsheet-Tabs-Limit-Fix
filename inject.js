try {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('myScript.js')
  script.onload = () => { script.remove() }
  const html = document.head || document.documentElement
  html.appendChild(script)
  chrome.storage.local.get(null, config => {
    const div = document.createElement('div')
    div.id = 'spreadsheetList'
    div.innerText = JSON.stringify(config.sheetList || {})
    html.appendChild(div)
  })
} catch {}
