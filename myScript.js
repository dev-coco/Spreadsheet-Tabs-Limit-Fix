function leaveSheet (sheetID) {
  const obj = {
    id: sheetID,
    sid: mergedConfig.id,
    vc: 1,
    c: 1,
    w: 1,
    flr: 0,
    smv: 125,
    smb: [125, ]
  }
  const token = _docs_flag_initialData.info_params.token
  if (token) obj['token'] = token
  fetch(`https://docs.google.com/spreadsheets/d/${sheetID}/leave?${new URLSearchParams(obj).toString()}`)
}

const originalXHR = window.XMLHttpRequest
function apiListener () {
  const list = JSON.parse(document.getElementById('spreadsheetList').outerText)
  const currentSheet = location.href.replace(/.+\/d\/|\/.+/g, '')
  if (!list[currentSheet]) return
  setTimeout(() => {
    leaveSheet(currentSheet)
  }, 5000)
  const interceptXHR = () => {
    function XHR () {
      const xhr = new originalXHR()
      xhr.addEventListener('load', async () => {
        if (xhr.responseURL.includes('bind?id=') || xhr.responseURL.includes('sync?id=')) {
          leaveSheet(currentSheet)
        }
      })
      return xhr
    }
    window.XMLHttpRequest = XHR
  }
  const restoreXHR = () => window.XMLHttpRequest = originalXHR
  return {
    hook: interceptXHR,
    unhook: restoreXHR
  }
}
apiListener().hook()
