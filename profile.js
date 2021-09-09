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
        ).innerHTML += `<div class ="profile-view"><br><div>Email: ${profile.email}</div><br><div>Last Name: ${profile.name}</div><br><div>Name: ${profile.last_name}</div><br><div>Password: ${profile.password}</div><br><div>Physical Address: ${profile.physical_address}</div><br><div>User ID: ${profile.user_id}</div><br><div>Username: ${profile.username}</div></span><br><button class="trigger" onclick='toggleModal()'>Update</button><button class="delete-user">Delete Profile</button></div>`;
        document.querySelectorAll('.delete-user').forEach(button => button.addEventListener('click', deleteUser));
    });
}

data(base_URL);

// updating user
function updatingUser() {
  
  let userid = localStorage.getItem("user")
  
  fetch(`https://backendfs.herokuapp.com/user/${userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:document.getElementById("up_name").value,
      last_name: document.getElementById("up_last_name").value,
      username: document.getElementById("up_username").value,
      physical_address: document.getElementById("up_physical_address").value,
      email:  localStorage.getItem("user"),
      password: document.getElementById("up_password").value
    }),
   })
    .then(res => res.json())
    .then(res => {
      window.location.reload();
      console.log(res);
    });
}

// delete user

function deleteUser(e){
  let deluser = localStorage.getItem("user")
  fetch(`https://backendfs.herokuapp.com/delete-profile/${deluser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
   })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      {
        localStorage.clear();
        window.location.href="./index.html";
         alert("successfully deleted user")
    } 
      console.log(res);
    })
}
