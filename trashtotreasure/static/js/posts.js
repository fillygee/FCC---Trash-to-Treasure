document
  .querySelector(".login100-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: form.get("inputItemName"),
        item_category: form.get("inputItemCategory4"),
        item_description: form.get("itemDescription"),
        address: form.get("inputAddress"),
        postcode: form.get("inputPostcode"),
      }),
    };

    await fetch("http://localhost:3000/posts", options);

    window.location.assign("./posts.html");

    /*     if (result.status == 201) {
      const postContainer = document.createElement("div");
      postContainer.className = "post-container";

      const postTitle = document.createElement("h2");
      postTitle.textContent = form.get("inputItemName");

      const postCategory = document.createElement("p");
      postCategory.textContent = form.get("inputItemCategory4");

      const postDescription = document.createElement("p");
      postDescription.textContent = form.get("itemDescription");

      postContainer.appendChild(postTitle);
      postContainer.appendChild(postCategory);
      postContainer.appendChild(postDescription);

      const postsContainer = document.getElementById("postsContainer");
      postsContainer.appendChild(postContainer);

      document.querySelector("#inputItemName").value = "";
      document.querySelector("#inputItemCategory4").value = "";
      document.querySelector("#itemDescription").value = "";
    } */
  });

document.querySelector("#logout").addEventListener("click", async (e) => {
  e.preventDefault();

  await fetch("http://localhost:3000/users/logout", {
    method: "POST",
  });

  window.location.assign("/");
});

/* function createPostElement(data) {
  const name = document.createElement("div");
  name.addEventListener("click", async (e) => {
    fetch("/cats/delete/" + data.id);
    name.remove();
  });
  name.className = "cat";

  const header = document.createElement("h2");
  header.textContent = data["name"];
  name.appendChild(header);

  const age = document.createElement("p");
  age.textContent = data["age"];
  name.appendChild(age);

  const breed = document.createElement("p");
  breed.textContent = data["breed"];
  name.appendChild(breed);

  return name;
} */

// async function loadPosts() {
//   const response = await fetch("/cats");

//   if (response.status == 200) {
//     const cats = await response.json();

//     const container = document.getElementById("cats");

//     cats.forEach((p) => {
//       const elem = createPostElement(p);
//       container.appendChild(elem);
//     });
//   } else {
//     window.location.assign("/");
//   }
// }

// loadPosts();
async function loadPosts() {
  const postsSection = document.getElementById("posts-section");
  const posts = await fetch("http://localhost:3000/posts")
    .then((data) => data.json())
    .catch((error) => console.log(error));

  posts.forEach((post) => {
    const template = document.getElementById("post-template");
    const postCard = template.content.cloneNode(true);
    const titleArea = postCard.querySelector("#title-area");
    titleArea.textContent = post.item_name;
    const categoryArea = postCard.querySelector("#category-area");
    categoryArea.textContent = post.item_category;
    const addressArea = postCard.querySelector("#address-area");
    addressArea.textContent = post.address;
    const postcodeArea = postCard.querySelector("#postcode-area");
    postcodeArea.textContent = post.postcode;
    const timestampArea = postCard.querySelector("#timestamp-area");
    timestampArea.textContent = post.timestamp;
    const descriptionArea = postCard.querySelector("#description-area");
    descriptionArea.textContent = post.item_description;
    postsSection.append(postCard);

    console.log(post);
  });
}

loadPosts();


async function loadPost() {
  const postCards = document.querySelectorAll("#post-card");

  postCards.forEach(card => {
  card.addEventListener("click", () => {
  const postTitle = card.querySelector('h5').innerText;
  window.location.href = `individual.html?title=${encodeURIComponent(postTitle)}`;
      });
  });
}

loadPost();
