let uemail = localStorage.getItem("user")
let base_URL = `https://backendfs.herokuapp.com/user/${uemail}`;

function data(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let profile = data.data;
      document.querySelector(".profile").innerHTML = ``;
        document.querySelector(
          ".profile"
        ).innerHTML += `<div><br><div><br>Email: ${profile.email}<br>Last Name: ${profile.name}<br>Name: ${profile.last_name}<br>Password: ${profile.password}<br>Physical Address: ${profile.physical_address}<br>User ID: ${profile.user_id}<br>Username${profile.username}</span></div></div>`;
    });
}

data(base_URL);