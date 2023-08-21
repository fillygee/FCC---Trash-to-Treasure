document
  .getElementById("register-form")
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
        username: form.get("username"),
        password: form.get("password"),
      }),
    };

    const response = await fetch("/users/add", options);
    //const data = await response.json();

    if (response.status == 201) {
      window.location.assign("/login");
    }
  });

async function checkLogin() {
  if (!document.cookie) {
    return;
  }

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await fetch("/users/ping", options);
  const data = await response.json();
  console.log(data);
  if (data.status === "authorized") {
    window.location.assign("/homepage");
  }
}

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


checkLogin();





