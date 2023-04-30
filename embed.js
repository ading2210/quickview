let cros = /(CrOS)/.test(navigator.userAgent);

function from_id(id) {
  return document.getElementById(id)
}

window.onload = () => {
  let docx_iframe = from_id("docx_iframe");
  if (cros) {
    docx_iframe.src = "./docx/quickview-embed.docx";
    setTimeout(() => {
      docx_iframe.style.display = "block";
    }, 5000);
  }
  else {
    alert("This only works on Chrome OS!");
    container.remove;
  }
}