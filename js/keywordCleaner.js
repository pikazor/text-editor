function renderKeywordCleaner() {
  const html = `
    <div class="mb-3">
      <label for="keywords" class="form-label">Keywords to remove (comma-separated):</label>
      <input type="text" id="keywords" class="form-control" placeholder="e.g. lorem, ipsum">
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" id="removeSpaces" class="form-check-input">
      <label for="removeSpaces" class="form-check-label">Remove extra spaces</label>
    </div>
    <button onclick="runKeywordCleaner()" class="btn btn-danger">Clean</button>
  `;
  document.getElementById("toolOptions").innerHTML = html;
  document.getElementById("outputActions").innerHTML = "";
  document.getElementById("outputText").innerText = "";
}

function runKeywordCleaner() {
  const input = document.getElementById("inputText").value;
  const keywords = document.getElementById("keywords").value
    .split(",").map(k => k.trim()).filter(k => k);
  const removeSpaces = document.getElementById("removeSpaces").checked;

  let cleaned = input;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    cleaned = cleaned.replace(regex, "");
  });

  if (removeSpaces) {
    cleaned = cleaned.replace(/\s+/g, " ").trim();
  }

  updateOutput(cleaned);
}
