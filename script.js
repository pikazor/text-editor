function cleanText() {
  const input = document.getElementById("inputText").value;
  const cleaned = input
    .replace(/\s+/g, " ")         // Remove extra spaces
    .replace(/https?:\/\/\S+/g, "") // Remove URLs
    .trim();                      // Trim leading/trailing spaces
  document.getElementById("outputText").innerText = cleaned;
}
