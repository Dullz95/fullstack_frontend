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



