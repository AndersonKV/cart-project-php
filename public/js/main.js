import {
  setTemplateString,
  htmlAttachElement,
  returnSearchItem,
  templateNothingSearch,
  deleteModal,
  modal,
  modalCheckout,
} from "./template.js";

import {
  returnName,
  returnImageFormated,
  returnPrice,
  createElement,
  cleanTemplate,
  myRequest,
  addClassToSelectedProduct,
  MYSQL_SEARCH_PRODUCTS,
  MYSQL_GET_ALL_PRODUCTS,
} from "./utils.js";

window.onload = initApplication;

function initApplication() {
  // const res = await fetch("js/api.json");
  // const items = await res.json();
  run();
}

function run() {
  localStorage.clear();

  var products = new setProducts();
  products.addClassToSelectedItem();
  products.addEvent();
}

function setProducts() {
  this.addClassToSelectedItem = function () {
    addClassToSelectedProduct();
  };
  this.addEvent = function () {
    //SEARCH ITEM
    document
      .querySelector("#search-item")
      .addEventListener("keyup", filterItems);

    //show cart
    document.getElementById("cart-info").addEventListener("click", function () {
      document.getElementById("cart").classList.toggle("show-cart");
    });

    //ADD CART
    document.querySelectorAll(".store-item-icon").forEach((element) => {
      element.addEventListener("click", addItemToCart);
    });
    //CLEAR CART
    document.getElementById("clear-cart").addEventListener("click", clearCart);

    //CHECKOUT
    document.getElementById("checkout").addEventListener("click", checkout);
  };
}

// Filter Items
async function filterItems(e) {
  const text = e.target.value.toLowerCase();

  if (text.length >= 2) {
    MYSQL_SEARCH_PRODUCTS(text);
  }
  if (text.length == 0) {
    MYSQL_GET_ALL_PRODUCTS();
  }
}

//add item
function addItemToCart(event) {
  if (event.target.parentElement.classList.contains("store-item-icon")) {
    //inicia vazio
    const item = {};

    //retorna image ja formatada
    item.img = `img-cart${returnImageFormated(event)}`;

    item.name = returnName(event);

    const finalPrice = returnPrice(event).slice(1).trim();

    item.price = finalPrice;

    const cartItem = createElement(item);

    cartItem.id = event.target.parentElement.id;

    cartItem
      .querySelector("#cart-item-remove")
      .addEventListener("click", removeItemFromCart);

    const cart = document.getElementById("cart");
    const total = document.querySelector(".cart-total-container");

    cart.insertBefore(cartItem, total);
    event.path[4].querySelector("#modal").append(modal(item));

    updateTotal();
  }
}

function clearCart(event) {
  document.querySelectorAll(".cart-item").forEach((element) => {
    element.remove();
  });
  document.querySelector("#cart-total").innerHTML = "0.00";
  document.querySelector("#item-count").innerHTML = "0";
  document.querySelector(".item-total").innerHTML = "0.00";
}

//show totals
function updateTotal() {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");

  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });
  //console.log(total);
  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);
  const finalMoney = totalMoney.toFixed(2);

  document.getElementById("cart-total").textContent = finalMoney;
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
}

function checkout() {
  if (document.querySelectorAll(".cart-item").length != 0) {
    const cartItems = document.querySelectorAll(".cart-item");

    const item = [];

    cartItems.forEach((element) => {
      const fullPath = element.querySelector("img").src;
      const pos = fullPath.indexOf("img");
      const parPath = fullPath.slice(pos);
      const pathName = parPath.split("/")[1];

      item.push({
        id: element.id,
        img: pathName,
        title: element.querySelector("#cart-item-title").textContent,
        price: element.querySelector("#cart-item-price").textContent,
      });
    });

    let cartItem = new Array();

    //VERIFICA SE EXISTE, SE SIM PEGA O ARRRAY
    if (localStorage.hasOwnProperty("cart-item")) {
      cartItem = JSON.parse(localStorage.getItem("cart-item"));
    }

    cartItem.push(item);

    // SALVA O ARRAY
    localStorage.setItem("cart-item", JSON.stringify(cartItem));

    window.location.href = "checkout";
  }
}

function removeItemFromCart(event) {
  const cartItem = event.target.parentElement.parentElement;
  cartItem.remove();
  updateTotal();
}
