export function setTemplateString(item) {
  return `
    <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item ${item.type}" data-item="${item.type}">
    <div class="card">
    <div class="img-container">
        <img src="img/${item.image}" class="card-img-top store-img" alt="">
        <span class="store-item-icon">
            <i class="fas fa-shopping-cart"></i>
        </span>
    </div>
    <div class="card-body">
        <div class="card-text d-flex justify-content-between text-capitalize">
            <h5 id="store-item-name">${item.name}</h5>
            <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">${item.price}</strong></h5>
        </div>
    </div>
  </div>
  </div>`;
}

export function htmlAttachElement(temp) {
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = temp;
  document.querySelector("#store-items").append(div);
  //console.log(div);
}

export function returnSearchItem(item) {
  return item
    .map((items) => {
      return setTemplateString(items);
    })
    .join("");
}

export function templateNothingSearch() {
  const temp = `
  <div class="store-item nothing-search">
       <div class="card-text text-capitalize">
          <h5 id="store-item-name">Nada foi encontrado ;(</h5>
       </div>
  </div>`;

  const div = document.createElement("div");
  div.classList.add("nothing-search");
  div.innerHTML = temp;
  document.querySelector("#store-items").append(div);
}

export function modal(item) {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content  ">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">${item.name} - Adicionado com sucesso</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <img class="img-fluid" src=${item.img}  alt="Card image cap">
          </div>
          <div class="modal-footer">
              <button id="delete" type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
          </div>
      </div>
  </div>
</div>
 `;

  div.querySelector("#delete").addEventListener("click", deleteModal);

  return div;
}

export function deleteModal(event) {
  const divModal =
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement;

  divModal.remove();
}

export function modalCheckout(item) {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content  ">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">${item.name} - Adicionado com sucesso</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <img class="img-fluid" src=${item.img}  alt="Card image cap">
          </div>
          <div class="modal-footer">
              <button id="delete" type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
          </div>
      </div>
  </div>
</div>
 `;

  return div;
}
