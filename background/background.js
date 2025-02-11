chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch("http://localhost:8080/api/public/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: request?.title || "",
      content: request?.content || "",
    }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.text().then((text) => {
        try {
          return text ? JSON.parse(text) : {};
        } catch (e) {
          throw new Error("Invalid JSON response");
        }
      });
    })
    .then((data) => {
      sendResponse({ message: data.response || data.error });
    })
    .catch((error) => {
      sendResponse({ message: error.message });
    });
  return true;
});
