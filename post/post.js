document.getElementById("sendButton").addEventListener("click", () => {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const title = titleInput.value;
  const content = contentInput.value;

  if (title == "" || content == "") {
    document.getElementById("error").textContent =
      "Please enter a title and content.";
    return;
  }

  chrome.runtime.sendMessage({ title: title, content: content }, (response) => {
    if (response.message && !response.message.startsWith("Error")) {
      document.getElementById("responseArea").textContent =
        "Post Id is " + response.message;
      titleInput.value = "";
      contentInput.value = "";
    } else {
      document.getElementById("error").textContent = response.message;
    }
  });
});
