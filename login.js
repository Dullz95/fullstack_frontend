// login
const baseURL = "https://backendfs.herokuapp.com/user/";

function login() {
    const email = document.querySelector("#emaillog").value;
    const password = document.querySelector("#passwordlog").value;
    fetch(baseURL, {
        method: "PATCH",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            
            if (data.status_code == 200) {
                localStorage.setItem("user", email);
                window.location.href="./products.html"
            } else {
                alert("Username and password does not match");
            }
        });
};

// registation
function registration() {
    const fname = document.querySelector("#name").value;
    const lname = document.querySelector("#last_name").value;
    const username = document.querySelector("#username").value;
    const physical_address = document.querySelector("#physical_address").value;
    const email = document.querySelector("#email").value; 
    const password = document.querySelector("#password").value;
    fetch("https://backendfs.herokuapp.com/user/", {
        method: "POST",
        body: JSON.stringify({
            name: fname,
            last_name: lname,
            username: username,
            physical_address: physical_address,
            email: email,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}