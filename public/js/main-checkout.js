function templateString(array) {
  const cartItem = document.createElement("div");

  cartItem.classList.add("col-4", "col-sm-4", "col-lg-3", "my-3", "store-item");
  cartItem.id = array.id;

  cartItem.innerHTML = `
    <div class="card">
        <div class="img-container">
            <img src="img/${array.img}" class="card-img-top store-img" alt="">
            <span type="button" class="btn store-item-icon" data-toggle="modal" data-target="#exampleModalCenter">
                <i class="fas fa-shopping-cart"></i>
            </span>
        </div>
        <div class="card-body">
            <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">${array.title}</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${array.price}</strong></h5>
            </div>
        </div>
    </div>`;

  return cartItem;
}

function checkout() {
  let cartItem = new Array();

  if (localStorage.hasOwnProperty("cart-item")) {
    cartItem = JSON.parse(localStorage.getItem("cart-item"));

    cartItem[0].forEach((element) => {
      //console.log(templateString(element));
      document.querySelector("#store-items").append(templateString(element));
    });
  } else {
    window.location.href = "/";
  }
}

checkout();
