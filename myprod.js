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
        ).innerHTML += `<div class="all"><br><span class="products-span"><img src='${product.price}' alt='product'></img><br><div class="bottom"><br>ID: ${product.prod_id}<br>Sold by: ${product.email}<br>Name: ${product.product_name}<br>Price: ${product.image}<br>Description: ${product.description}'</span></div></div>`;
        
      });

    });
}
getData(URL);

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
      imageInput = document.getElementById("up_product_image").files[0]
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