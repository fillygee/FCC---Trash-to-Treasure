// individual.js (individual.html)
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = urlParams.get("title");

    // Fetch the individual post's details using the title
    const post = await fetch(`http://localhost:3000/posts?title=${encodeURIComponent(postTitle)}`)
        .then(response => response.json())
        .catch(error => console.log(error));

    // Display the fetched post details on the page
    const titleElement = document.getElementById("post-title");
    titleElement.textContent = post.item_name;
    const descriptionElement = document.getElementById("post-description");
    descriptionElement.textContent = post.item_description;
    // ... Continue updating other elements with post details
});
