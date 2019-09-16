(function () {
  // http://bgrins.github.io/devtools-snippets/#console-save
  var saveToFile = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }

    if (!filename) {
      filename = 'console.json';
    }

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: 'text/json' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };

  var name = ''
  for (var img of document.querySelectorAll("[aria-label=Messages] img[alt]")) {
    const alt = img.getAttribute('alt')
    if (alt.length > name.length && alt.indexOf('Seen by') === -1) {
      name = alt
    }
  }

  var me = document.querySelector("h5._ih3.accessible_elem").innerText;
  var nodes = [].slice.apply(document.querySelectorAll("[aria-label=Messages] [data-hover=tooltip]"))
  var content = nodes.map(e => ({
    name: e.getAttribute("data-tooltip-position") === "left" ? name : me,
    time: e.getAttribute("data-tooltip-content"),
    content: e.textContent
  })).filter(v => v.content.length > 0)

  content = content.reduce((result, msg) => {
    if (result.length === 0 || result[result.length - 1].name !== msg.name) {
      result.push(msg)
    } else {
      result[result.length - 1].content += '\n' + msg.content
    }
    return result
  }, [])

  const result = content.map(function (msg) {
    var content = "**" + msg.name + "**" + " *" + msg.time + "*\n" + msg.content;
    return content.split("\n").map(function (l) { return "> " + l; }).join("\n");
  }).join("\n>\n")

  function copyTextToClipboard(text) {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = text
    input.focus()
    input.select()
    const result = document.execCommand('copy')
    input.remove()
    return result
  }

  copyTextToClipboard(result)
  alert('Copied to clipboard')
})()
