document.getElementById("searchIcon").addEventListener("click", async () => {
  // No event parameter needed
  const searchTerm = document.getElementById("search").value; // Get value from the input field
  const responseArea = document.getElementById("responseArea");
  console.log("clicked");

  if (searchTerm.trim() === "") {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/public/${searchTerm}`
    );
    if (!response.ok) {
      const errorData = await response.json(); // Parse error JSON
      responseArea.textContent = errorData.error || "Post not found";
      return;
    }

    const post = await response.json();

    if (post) {
      const cardHTML = `
          <div id="card" style="cursor:pointer;">
            <h3>${post.title || post.content}</h3>
            <p>${post.content?.substring(0, 50) + "..." || post.content}</p>
            <div id="card-details">
              <p>Time: ${post.uploadDate?.substring(0, 10)}</p>
            </div>
          </div>
        `;
      responseArea.innerHTML = cardHTML;

      const cardElement = document.querySelector("#card");
      cardElement.addEventListener("click", () => {
        window.open(`http://localhost:3000/public/${post.id}`, "_blank"); // Or window.open(post.link, '_blank') if the server returns the URL
      });
    } else {
      responseArea.textContent = "Post doesn't exist.";
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    responseArea.textContent = "An error occurred. Please try again later.";
  }
});
