// all products page
let base_URL = "https://backendfs.herokuapp.com/product-table/";

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let products = data;
      document.querySelector(".products").innerHTML = ``;
      products["data"].forEach((product) => {
        document.querySelector(
          ".products"
        ).innerHTML += `<div  id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}'</span><br><button class="add-to-cart" onclick="addToCart(${ product[0] })">Add to cart</button></div></div>`;
        
      });
      document.querySelectorAll(".add-to-cart").forEach(button => button.addEventListener("click", addToCart))
    });
}

getData(base_URL);

// myproducts page

// let useremail = localStorage.getItem("user")
// let URL = `https://backendfs.herokuapp.com/products/${useremail}`;

// function getData(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       console.log(useremail);
//       let products = data;
//       document.querySelector(".myprod").innerHTML = ``;
//       products["data"].forEach((product) => {
//         document.querySelector(
//           ".myprod"
//         ).innerHTML += `<div class="all"><br><span class="products-span"><img src='${product[5]}' alt='product'></img><br><div class="bottom"><br>ID: ${product[0]}<br>Sold by: ${product[1]}<br>Name: ${product[2]}<br>Price: ${product[4]}<br>Description: ${product[3]}'</span></div></div>`;
        
//       });

//     });
// }

// adding to products

function addingProduct() {
    console.log({
      product_name: document.getElementById("add_product_name").value,
      product_type: document.getElementById("add_product_type").value,
      price: document.getElementById("add_price").value,
      quantity: document.getElementById("add_quantity").value,
      product_image: document.getElementById("picture").src,
    })
      
    fetch("https://ecommerce-abdullah.herokuapp.com/add-to-product-table/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: document.getElementById("add_product_name").value,
        product_type: document.getElementById("add_product_type").value,
        price: document.getElementById("add_price").value,
        quantity: document.getElementById("add_quantity").value,
        product_image: document.querySelector("#picture").src,
      }),
     })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
        console.log(res);
      });
  }