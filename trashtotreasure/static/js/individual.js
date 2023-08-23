const titleArea = document.getElementById('title-area');
const categoryArea = document.getElementById('category-area');
const locationArea = document.getElementById('location-area');
const descriptionArea = document.getElementById('description-area');
const timestampArea = document.getElementById('timestamp-area');
const commentsArea = document.getElementById('comments-area');




document.querySelector("#logout").addEventListener("click", async (e) => {
    e.preventDefault();
  
    await fetch("http://localhost:3000/users/logout", {
      method: "POST",
    });
  
    window.location.assign("/");
  });





  async function loadPost() {
    const postsSection = document.getElementById("post-section");
    const post = await fetch("http://localhost:3000/posts/2")
      .then((data) => data.json())
      .catch((error) => console.log(error));
      console.log(post);
  }
  
//   loadPost();

//   async function loadPosts () {

//     const options = {
//         headers: {
//             'Authorization': localStorage.getItem("token")
//         }
//     }
//     const response = await fetch("http://localhost:3000/posts", options);

//     if (response.status == 200) {
//         const posts = await response.json();
    
//         const container = document.getElementById("posts");

//         posts.forEach(p => {
//             const elem = createPostElement(p);
//             container.appendChild(elem);
//         })
//     } else {
//         window.location.assign("./index.html");
//     }

// }
