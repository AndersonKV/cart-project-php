import { returnImageFormated } from "./utils.js";

const api = [];

let reqHeader = new Headers();
reqHeader.append("Content-Type", "text/json");

let initObject = {
  method: "GET",
  headers: reqHeader,
};

var userRequest = new Request("js/api.json", initObject);

fetch(userRequest)
  .then(function (response) {
    return response.json();
  })
  .then(function (resp) {
    const data = resp.data;
    setProducts(data);
    api.push(data);
  })
  .catch(function (err) {
    console.log("Something went wrong!", err);
  });

function resetProduct(data) {
  const pathName = window.location.pathname.replace("/", "");

  try {
    const selected = document
      .querySelector(".selected")
      .querySelector(`.${pathName}`);

    selected.classList.remove("btn-black");
    selected.classList.add("set-btn-black");
  } catch (err) {
    document.querySelector(".selected .all").classList.add("set-btn-black");
  }

  const template = data
    .map((item) => {
      if (item.type === pathName) {
        return setTemplate(item);
      }
    })
    .join("");

  if (template == false) {
    const templateIsNull = data
      .map((item) => {
        return setTemplate(item);
      })
      .join("");

    templateAppend(templateIsNull);
  } else {
    templateAppend(template);
  }
}
function setProducts(data) {
  const pathName = window.location.pathname.replace("/", "");

  try {
    const selected = document
      .querySelector(".selected")
      .querySelector(`.${pathName}`);

    selected.classList.remove("btn-black");
    selected.classList.add("set-btn-black");
  } catch (err) {
    document.querySelector(".selected .all").classList.add("set-btn-black");
  }

  const template = data
    .map((item) => {
      if (item.type === pathName) {
        return setTemplate(item);
      }
    })
    .join("");

  if (template == false) {
    const templateIsNull = data
      .map((item) => {
        return setTemplate(item);
      })
      .join("");

    templateAppend(templateIsNull);
  } else {
    templateAppend(template);
  }
}

//SEARCH ITEM
document.querySelector("#search-item").addEventListener("keyup", filterItems);

// Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();

  if (text.length >= 2) {
    api[0].filter((item) => {
      if (item.name.toLowerCase().indexOf(text) == "0") {
        //console.log(`${item.name.toLowerCase().indexOf(text)} - ${item.name}`);

        document.querySelector("#store-items").firstElementChild.remove();

        templateAppend(returnSearchItem(item));
      }
    });
  }
  if (text.length == 0) {
    document.querySelector("#store-items").firstElementChild.remove();

    const template = api[0]
      .map((item) => {
        return setTemplate(item);
      })
      .join("");

    templateAppend(template);
  }
}

function returnSearchItem(item) {
  return api[0]
    .map((items) => {
      if (items.type === item.type) {
        return setTemplate(items);
      }
    })
    .join("");
}

//show cart
(function () {
  document.getElementById("cart-info").addEventListener("click", function () {
    document.getElementById("cart").classList.toggle("show-cart");
  });
})();

//add items to the cart
(function () {
  document.querySelectorAll(".store-item-icon").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        const item = {};

        item.img = `img-cart${returnImageFormated(event)}`;

        item.name = returnName(event);

        let finalPrice = returnPrice(event).slice(1).trim();

        item.price = finalPrice;

        const cartItem = createElement(item);

        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        alert("item added to the cart");
        showTotals();
      }
    });
  });

  //show totals
  function showTotals() {
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
})();
