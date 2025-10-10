function renderHTMLConverter() {
  const html = `
    <button onclick="runHTMLConverter()">Convert to HTML</button>
  `;
  document.getElementById("toolOptions").innerHTML = html;

  const outputButtons = `
    <button onclick="copyHTML()">Copy HTML</button>
  `;
  document.getElementById("outputActions").innerHTML = outputButtons;
  document.getElementById("outputText").innerText = "";
}

function runHTMLConverter() {
  const input = document.getElementById("inputText").value;
  const lines = input.split("\n").filter(line => line.trim());
  let html = "";

  lines.forEach((line, i) => {
    if (i === 0 && line.length < 100) {
      html += `<h1>${line}</h1>\n`;
    } else if (line.startsWith("http")) {
      html += `<p><a href="${line}">${line}</a></p>\n`;
    } else {
      html += `<p>${line}</p>\n`;
    }
  });

  updateOutput(html);
}

function copyHTML() {
  const text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}
