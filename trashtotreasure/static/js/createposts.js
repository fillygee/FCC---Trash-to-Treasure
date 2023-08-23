document.querySelector("#logout").addEventListener("click", async (e) => {
    e.preventDefault();
  
    await fetch("http://localhost:3000/users/logout", {
      method: "POST",
    });
  
    window.location.assign("/");
  });
  

  document.querySelector("#create-post").addEventListener("submit", async (e) => {
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
  });