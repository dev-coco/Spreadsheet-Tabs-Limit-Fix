let sheetList = {}

chrome.storage.local.get(null, config => {
  sheetList = config.sheetList || {}
  refreshData()
})

function refreshData () {
  let div = document.getElementById('sheetIDList')
  div.innerHTML = ''
  for (let sheetID in sheetList) {
    let label = document.createElement('label')
    label.innerHTML = sheetID
    let delBtn = document.createElement('button')
    delBtn.innerHTML = '删除'
    delBtn.addEventListener('click', () => {
      delete sheetList[sheetID]
      refreshData()
    })
    div.appendChild(label)
    div.appendChild(delBtn)
    div.appendChild(document.createElement('br'))
  }
  chrome.storage.local.set({ sheetList })
}

document.getElementById('addSheet').addEventListener('click', () => {
  const sheetUrl = document.getElementById('sheetUrl')
  if (!sheetUrl.value) return
  const sheetID = sheetUrl.value.replace(/.+\/d\/|\/.+/g, '')
  sheetList[sheetID] = true
  refreshData()
  sheetUrl.value = ''
})
