function renderTextToPdfUploader() {
  const html = `
    <div class="mb-3">
      <label for="textFileInput" class="form-label">Select a .txt file:</label>
      <input type="file" id="textFileInput" accept=".txt" class="form-control">
    </div>
    <div class="d-flex gap-2 flex-wrap">
    <label style="color: red;" for="replacements" class="form-label">scan the file first</label>
      <button onclick="loadTextToHtmlPanel()" class="btn btn-primary">Scanning</button>
      <button onclick="convertPanelToPDF()" class="btn btn-success">Convert to PDF</button>
    </div>
    <div id="charCountFile" class="mt-3 fw-bold text-secondary"></div>
  `;
  document.getElementById("toolOptions").innerHTML = html;
  document.getElementById("outputText").innerText = "";
  document.getElementById("outputActions").innerHTML = "";
  document.getElementById("charCountOutput").style.display = "none";

  const previewContainer = document.getElementById("htmlPreviewPanel");
  if (previewContainer) previewContainer.innerHTML = "";
}

function loadTextToHtmlPanel() {
  const fileInput = document.getElementById("textFileInput");
  const file = fileInput.files[0];
  if (!file) {
    updateOutput("Please select a .txt file first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const text = reader.result;
    document.getElementById("charCountFile").innerText = `File Characters: ${text.length}`;

    const panelHTML = `
      <div id="a4Panel" style="
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        background: white;
        font-size: 12pt;
        font-family: Georgia, 'Times New Roman', serif;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
        box-sizing: border-box;
      ">
        ${escapeHtml(text)}
      </div>
    `;
    document.getElementById("htmlPreviewPanel").innerHTML = panelHTML;
    updateOutput("Text loaded into A4 panel.");
  };
  reader.readAsText(file);
}

function convertPanelToPDF() {
  const panel = document.getElementById("a4Panel");
  if (!panel) {
    updateOutput("No panel content to convert.\nscan the file first");
    return;
  }

  const opt = {
    margin: 0,
    filename: "converted_panel.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      dpi: 300,
      letterRendering: true,
      useCORS: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }
  };

  html2pdf().set(opt).from(panel).save();
  updateOutput("PDF download completed.");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (char) {
    const escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return escape[char];
  });
}

function updateOutput(message) {
  document.getElementById("outputText").innerText = message;
}


