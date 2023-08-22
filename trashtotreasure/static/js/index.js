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
    window.location.assign("/");
  }
}

checkLogin();
