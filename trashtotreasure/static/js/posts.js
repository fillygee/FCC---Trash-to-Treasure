// document.querySelector("#cats_list").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const form = new FormData(e.target);

//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: form.get("name"),
//       age: form.get("age"),
//       breed: form.get("breed"),
//     }),
//   };

//   //const result = await fetch("/cats/add", options);

//   if (result.status == 201) {
//     document
//       .getElementById("cats")
//       .appendChild(createPostElement(JSON.parse(options.body)));

//     document.querySelector("#cat_name").value = "";
//     document.querySelector("#cat_age").value = "";
//     document.querySelector("#cat_breed").value = "";
//   }
// });

document.querySelector("#logout").addEventListener("click", async (e) => {
  //e.preventDefault();
  
 await fetch("http://localhost:3000/users/logout", {
    method: "POST", 
  });
  
  window.location.assign("/");
});

// function createPostElement(data) {
//   const name = document.createElement("div");
//   name.addEventListener("click", async (e) => {
//     fetch("/cats/delete/" + data.id);
//     name.remove();
//   });
//   name.className = "cat";

//   const header = document.createElement("h2");
//   header.textContent = data["name"];
//   name.appendChild(header);

//   const age = document.createElement("p");
//   age.textContent = data["age"];
//   name.appendChild(age);

//   const breed = document.createElement("p");
//   breed.textContent = data["breed"];
//   name.appendChild(breed);

//   return name;
// }

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
