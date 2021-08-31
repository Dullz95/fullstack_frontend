// myproducts page

let useremail = localStorage.getItem("user")
let URL = `https://backendfs.herokuapp.com/products/${useremail}`;

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(useremail);
      let products = data;
      document.querySelector(".myprod").innerHTML = ``;
      products["data"].forEach((product) => {
        document.querySelector(
          ".myprod"
        ).innerHTML += `<div id="item-${product[0]}" class="all"><br><span class="products-span"><img src='${product.price}' alt='product'></img><br><div class="bottom"><br>ID: ${product.prod_id}<br>Sold by: ${product.email}<br>Name: ${product.product_name}<br>Price: ${product.image}<br>Description: ${product.description}'</span><br><button class='update-item trigger'>update</button><button class='delete-item' id='${product.prod_id}'>delete</button></div></div>`;
        document.querySelectorAll('.delete-item').forEach(button => button.addEventListener('click', deleteProduct));
        document.querySelectorAll('.trigger').forEach(button => button.addEventListener('click', toggleModalUpdate))
      });

    });
}
getData(URL);

window.addEventListener("click", windowOnClick);

function toggleModalUpdate(e) {
  modal.classList.toggle("show-modal");
  document.querySelector('.button-modal').id = e.target.id;

}

function windowOnClick(event) {
  if (event.target === modal) {
      toggleModalUpdate();
  }
}


// adding to products

function addingProduct() {
      
    fetch("https://backendfs.herokuapp.com/product-table/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description:document.getElementById("add_description").value,
        email:  localStorage.getItem("user"),
        product_name: document.getElementById("add_product_name").value,
        type: document.getElementById("add_product_type").value,
        price: document.getElementById("add_price").value,
        image: document.querySelector(".conimage").src,
      }),
     })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
        console.log(res);
      });
  }
// image

  function convert(opt){
    let option = opt
    let imageInput
    if (option == 1){
      imageInput = document.getElementById("add_product_image").files[0]  
    }
    if (option == 2){
      imageInput = document.getElementById("updating_product_image").files[0]
    }
    console.log(imageInput)
    let image = document.querySelector(".conimage");
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      image.src=reader.result;
    }, false);
  
    if (imageInput)
    reader.readAsDataURL(imageInput);
  
  
  }


// updating products
function updatingProduct() {
  
  let productId = document.querySelector('.button-modal').id
  
    
  fetch(`https://backendfs.herokuapp.com/updating-products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description:document.getElementById("updating_description").value,
      email:  localStorage.getItem("user"),
      product_name: document.getElementById("updating_product_name").value,
      type: document.getElementById("updating_product_type").value,
      price: document.getElementById("updating_price").value,
      image: document.querySelector(".conimage").src,
    }),
   })
    .then(res => res.json())
    .then(res => {
      window.location.reload();
      console.log(res);
    });
}

// delete product

function deleteProduct(e){
  let productid = e.target.id
  fetch(`https://backendfs.herokuapp.com/updating-products/${productid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
   })
    .then(res => res.json())
    .then(res => {
      window.location.reload();
      console.log(res);
    });
}