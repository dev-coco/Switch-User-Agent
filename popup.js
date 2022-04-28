const userAgents = {
  请选择: [
    {
      name: 'Android 10 / Huawei P30 Lite / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 10; MAR-LX3A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36'
    }, {
      name: 'iOS 15.3.1 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Mobile/15E148 Safari/604.1'
    }, {
      name: 'iOS 13.5.1 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
    }, {
      name: 'iOS 14.4 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/100.0.4896.85 Mobile/15E148 Safari/604.1'
    }, {
      name: 'iOS 13.3.1 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1'
    }, {
      name: 'iOS 15.4.1 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1'
    }, {
      name: 'iOS 12.5 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/92.0.4515.90 Mobile/15E148 Safari/604.1'
    }, {
      name: 'iOS 15.3 / iPhone / Safari',
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/97.0.4692.84 Mobile/15E148 Safari/604.1'
    }, {
      name: 'Android 11 / Samsung Galaxy A20e / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 11; SM-A202F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.28 Mobile Safari/537.36'
    }, {
      name: 'Android 8.1.0 / LG K10 / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 8.1.0; LG-M250) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36'
    }, {
      name: 'Android 11 / Samsung Galaxy A50 / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 11; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36'
    }, {
      name: 'Android 11 / Samsung Galaxy A51 / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 11; SM-A516B Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.88 Mobile Safari/537.36'
    }, {
      name: 'Android 11 / Samsung Galaxy A20e / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 11; SM-A202F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36'
    }, {
      name: 'Android 8 / Samsung Galaxy A5 / Chrome',
      value: 'Mozilla/5.0 (Linux; Android 8.0.0; SM-A520F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36'
    }
  ]
}

// 设置
function setUA (ua) {
  chrome.runtime.sendMessage({
    type: 'setUA',
    ua: ua
  })
  window.close()
}

// 重置
function resetUA () {
  chrome.runtime.sendMessage({
    type: 'resetUA'
  })
  window.close()
}

// 绑定按钮
function bindButtons () {
  document.getElementById('submit-ua-predefined').onclick = function () {
    setUA(document.getElementById('ua-predefined').value)
  }
  document.getElementById('submit-ua-reset').onclick = resetUA
}

// 初始化
function init () {
  bindButtons()
  populatePopupContent()
}

function populatePopupContent () {
  chrome.runtime.sendMessage({
    type: 'getUA'
  }, ua => {
    populateUserAgentSelect(ua)
    populateCurrentUA(ua)
  })
}

// 当前标识
function populateCurrentUA (ua) {
  document.getElementById('current-ua').innerText = ua
}

// 选项
function populateUserAgentSelect (ua) {
  const selectBox = document.getElementById('ua-predefined')
  const keys = Object.keys(userAgents).sort()
  for (const key of keys) {
    const optGroup = document.createElement('optgroup')
    optGroup.label = key
    const uaGroup = userAgents[key]
    for (let i = 0; i < uaGroup.length; i++) {
      const agent = uaGroup[i]
      const option = document.createElement('option')
      option.text = agent.name
      option.value = agent.value
      if (option.value === ua) {
        option.selected = true
      }
      optGroup.appendChild(option)
    }
    selectBox.appendChild(optGroup)
  }
}

init()
