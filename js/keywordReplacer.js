function renderKeywordReplacer() {
  const html = `
    <div class="mb-3">
      <label for="replacements" class="form-label">Replacement pairs (format: original:replacement, comma-separated):</label>
      <input type="text" id="replacements" class="form-control" placeholder="e.g. lorem:hello, ipsum:world">
    </div>
    <button onclick="runKeywordReplacer()" class="btn btn-warning">Replace</button>
  `;
  document.getElementById("toolOptions").innerHTML = html;
  document.getElementById("outputActions").innerHTML = "";
  document.getElementById("outputText").innerText = "";
}

function runKeywordReplacer() {
  const input = document.getElementById("inputText").value;
  const rawPairs = document.getElementById("replacements").value
    .split(",")
    .map(pair => pair.split(":").map(p => p.trim()))
    .filter(pair => pair.length === 2 && pair[0] && pair[1]);

  let replaced = input;
  rawPairs.forEach(([original, replacement]) => {
    const regex = new RegExp(`\\b${original}\\b`, "gi");
    replaced = replaced.replace(regex, replacement);
  });

  updateOutput(replaced);
}
