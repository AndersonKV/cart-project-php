import {
  setTemplateString,
  htmlAttachElement,
  returnSearchItem,
  templateNothingSearch,
} from "./template.js";

export const myRequest = function (url) {
  // let reqHeader = new Headers();
  // reqHeader.append("Content-Type", "text/json");

  // let initObject = {
  //   method: "POST",
  //   headers: reqHeader,
  // };

  // var userRequest = new Request(url, initObject);

  // const api = [];

  // fetch(userRequest)
  //   .then(function (response) {
  //     //return response.json();
  //     console.log(response);
  //   })
  //   .then(function (resp) {
  //     console.log(resp);
  //   })
  //   .catch(function (err) {
  //     console.log("Something went wrong!", err);
  //   });

  fetch(url).then(function (response) {
    console.log(response);
  });
};

export const returnImageFormated = function (event) {
  let fullPath = event.target.parentElement.previousElementSibling.src;
  //indexOf - serve para sabermos qual índice determinado pedaço da string corresponde (que é uma sequência de caracteres.)
  let pos = fullPath.indexOf("img") + 3;
  //slice - retorna os elementos selecionados em uma array, como um novo objeto da array.
  let parPath = fullPath.slice(pos);
  return parPath;
};

export const returnName = function (event) {
  return event.target.parentElement.parentElement.nextElementSibling.children[0]
    .children[0].textContent;
};

export const returnPrice = function (event) {
  return event.target.parentElement.parentElement.nextElementSibling.children[0]
    .children[1].textContent;
};
export const createElement = function (item) {
  const cartItem = document.createElement("div");

  cartItem.classList.add(
    "cart-item",
    "d-flex",
    "justify-content-between",
    "text-capitalize",
    "my-3"
  );

  cartItem.innerHTML = `
              <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
              <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price"
              class="mb-0">${item.price}</span>
              </div>
              <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
              </a>
              </div>
               `;

  return cartItem;
};

export const cleanTemplate = function () {
  const storeItems = document.querySelector("#store-items");
  const boxing = document.querySelector(".container-ajax-likes .boxing");

  if (storeItems.children.length != 0) {
    while (storeItems.firstChild) {
      storeItems.removeChild(storeItems.firstChild);
    }
  }
};

export const addClassToSelectedProduct = function () {
  const pathName = window.location.pathname.replace("/", "");

  try {
    const selected = document
      .querySelector(".selected")
      .querySelector(`.${pathName}`);

    selected.classList.remove("button-black");
    selected.classList.add("set-btn-black");
  } catch (err) {
    if (document.querySelector(".selected .all")) {
      document.querySelector(".selected .all").classList.add("set-btn-black");
    }
  }
};

export const MYSQL_SEARCH_PRODUCTS = function (text) {
  const url = "get_one_product";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      if (xhr.responseText == "error") {
        cleanTemplate();

        templateNothingSearch();
      } else {
        cleanTemplate();
        htmlAttachElement(returnSearchItem(JSON.parse(xhr.responseText)));
      }
    }
  };
  xhr.send(`validate=true&search=${text}`);
};

export const MYSQL_GET_ALL_PRODUCTS = function () {
  cleanTemplate();

  const url = "products";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const resp = JSON.parse(xhr.responseText);
      cleanTemplate();
      htmlAttachElement(returnSearchItem(resp));
    }
  };
  xhr.send(`validate=true`);
};
