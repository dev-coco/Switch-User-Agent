chrome.runtime.sendMessage({ type: 'getUA' }, function (response) {
  const code = "if(navigator.__defineGetter__){navigator.__defineGetter__('userAgent',function(){return " + JSON.stringify(response) + ';});}'
  const textNode = document.createTextNode(code)

  const script = document.createElement('script')

  script.appendChild(textNode)
  script.remove()
  const parentNode = document.head || document.documentElement
  parentNode.appendChild(script)
  parentNode.removeChild(script)
})
