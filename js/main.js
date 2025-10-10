function switchTool(toolName) {
  // Reset all tool buttons to outline style
  document.querySelectorAll("#toolButtons button").forEach(btn => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline-primary");
  });

  // Highlight active button with solid style
  const activeBtn = document.getElementById(`btn-${toolName}`);
  if (activeBtn) {
    activeBtn.classList.remove("btn-outline-primary");
    activeBtn.classList.add("btn-primary");
  }

  // Clear previous UI
  document.getElementById("toolOptions").innerHTML = "";
  document.getElementById("outputText").innerText = "";
  document.getElementById("outputActions").innerHTML = "";

  // Show/hide input area
  const inputArea = document.getElementById("inputArea");
  const toolsWithoutInput = ["textToPdfUploader"];
  inputArea.style.display = toolsWithoutInput.includes(toolName) ? "none" : "block";

  // Load selected tool
  switch (toolName) {
    case "keywordCleaner":
      renderKeywordCleaner();
      break;
    case "keywordReplacer":
      renderKeywordReplacer();
      break;
    case "htmlConverter":
      renderHTMLConverter();
      break;
    case "textToPdfUploader":
      renderTextToPdfUploader();
      break;
    case "textToHtmlPanel":
      renderTextToHtmlPanel();
      break;
    default:
      updateOutput("Tool not found.");
  }

  updateCharCount("output");
}

function updateCharCount(type) {
  const text = type === "input"
    ? document.getElementById("inputText").value
    : document.getElementById("outputText").innerText;

  const countElement = document.getElementById(`charCount${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (countElement) {
    countElement.innerText = `${type.charAt(0).toUpperCase() + type.slice(1)} Characters: ${text.length}`;
  }
}

function updateOutput(text) {
  document.getElementById("outputText").innerText = text;
  updateCharCount("output");
}
