(function(){
  if (window.origin !== "chrome-extension://bpmcpldpdmajfigpchkicefoigmkfalc") {
    alert("You ran this script on the wrong page.");
    return;
  }

  let style = `
  * {
    font-family: "Inter", sans-serif;
    color: #e2e8f0
  }

  body {
    background-color: #0f172a;
  }

  #content {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }`;

  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css">
      <title>QuickView GUI</title>
      <style>
        ${style}
      </style>
    </head> 
    <body>
      <div id="content">
        <h1>QuickView GUI</h1>
        <a class="button">Open Webview</a>
      </div>
    </body>
  </html>`;

  function init() {
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = origin + "/scripts/common/elements/hyperlink/hyperlink.html";
    iframe.onload = () => {
      window.chrome = window.frames[0].chrome;
      document.write(html);
    }
    document.body.append(iframe);
  }

  init(window);

})()