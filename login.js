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
            if (data.status_code == 201) {
                window.location.href="./index.html";
                alert("successfully register, please log in to continue")
            } else {
                alert("Something went wrong, please try again");
            }
        });
};

// products on landing page

let base_URL = "https://backendfs.herokuapp.com/product-table/";

function landingData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let products = data;
      document.querySelector(".products-landing").innerHTML = ``;
      products["data"].forEach((product) => {
        document.querySelector(
          ".products-landing"
        ).innerHTML += `<div category=${product[6]} id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br><br>Product ID: ${product[0]}<br><br>Sold by: ${product[1]}<br><br>Name: ${product[2]}<br><br>Price: ${product[4]}<br><br>Description: ${product[3]}<br><br>Type: ${product[6]}</span><br><button class="trigger trigger-new" id='${product[0]}'>View product</button></div></div>`;
        
      });
      document.querySelectorAll(".trigger-new").forEach(button => button.addEventListener("click", viewProductModal))
    });
}

landingData(base_URL);

// view product modal

function viewProductModal(e){
    console.log("anything");
    let prodyId = e.target.id;

    console.log(prodyId);
    fetch(`https://backendfs.herokuapp.com/view-product/${prodyId}`, {
         method: 'GET',
         headers: {
         "Content-Type": "application/json",
       }}) 
       .then((res) => res.json())
       .then((data) => {
         console.log(data)
         let product = data.data
        
      document.querySelector(".view-product").innerHTML = ``;
      
        document.querySelector(
          ".view-product"
        ).innerHTML += `<div id="item-${product[0]}" class="all-modal"><br><br><span class="products-span"><img src='${product[0][5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0][0]}<br>Sold by: ${product[0][1]}<br>Name: ${product[0][2]}<br>Price: ${product[0][4]}<br>Description: ${product[0][3]}'</span> </div></div>`;
      document.querySelector('.modal').classList.toggle('show-modal');
    });
       ;
   }


// Search function
let searchProducts = []
fetch('https://backendfs.herokuapp.com/product-table/')
.then((res) => res.json())
.then(data => {
    let products = data.data
    let searchBar = document.getElementById("search")
    searchBar.addEventListener("keyup", (s) => {
        const searchText = s.target.value.toLowerCase()
        searchProducts = products.filter((product) => {
            return (
                product[2].toLowerCase().includes(searchText) || product[6].toLowerCase().includes(searchText)
             )
        })
        let container = document.querySelector('.products-landing')
        container.innerHTML = ''
        searchProducts.forEach((product) => {
          container.innerHTML += `<div category=${product[6]} id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}<br>Type: ${product[6]}</span></div></div>`;
          
        })       
    })
})


// filter products on landing page
function filter(category){
    let productCard = document.querySelectorAll(".all");
    for( let i = 0; i < productCard.length; i++){
      productCard[i].style.display = "none"
    }
    
    let selectedProduct = document.querySelectorAll(`[category=${category}]`)
    for(let i = 0; i < selectedProduct.length; i++){
      selectedProduct[i].style.display = "block"
    }
    }


    function signOut(){
      prompt("are you sure you'd like to sign out?")
      window.location.href="./index"

    }

   
      