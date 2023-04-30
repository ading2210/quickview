let cros = /(CrOS)/.test(navigator.userAgent);
let warnings = {};
let from_id = (id) => {return document.getElementById(id)};

function update_warnings() {
  let warning_div = from_id("warning_div");
  warning_div.innerHTML = "";
  for (let warning of Object.values(warnings)) {
    warning_div.innerHTML += `<p><b>Warning:</b> ${warning}</p>`;
  }
  warning_div.style.display = Object.keys(warnings).length ? "block" : "none";
}

function test_zoom() {
  let zoom_test = from_id("zoom_test");
  if (zoom_test && zoom_test.clientWidth * window.devicePixelRatio !== 100) {
    warnings.zoom = "You need to set your browser zoom as well as display size to 100%.";
  }
  else if (warnings.zoom) {
    delete warnings.zoom;
  }
  update_warnings();
}

async function get_bookmarklet() {
  let r1 = await fetch("./payload.min.js");
  let minified = await r1.text();
  if (minified) {return minified}

  let r2 = await fetch("./payload.js");
  let full = await r2.text();
  return full
}

window.onload = () => {
  let docx_iframe = from_id("docx_iframe");
  let overlay = from_id("overlay");
  if (cros) {
    docx_iframe.src = "./docx/quickview-embed.docx";
    setTimeout(() => {
      overlay.innerHTML = "<p>Click me!</p>";
      overlay.style.backgroundColor = "#0284c7";
    }, 5000);
  }
  else {
    warnings.cros = "This only works on Chrome OS!";
    update_warnings();
  }

  get_bookmarklet().then(js => {
    from_id("launcher_link").href = `javascript:${encodeURIComponent(js)}`;
  });

  test_zoom();
}
window.onresize = test_zoom;