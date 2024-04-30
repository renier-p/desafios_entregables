const socketClient = io();

socketClient.on("enviodeproducts", (obj) => {
  updateProductList(obj);
});

function updateProductList(productList) {
  const productsDiv = document.getElementById("list-products");

  let productosHTML = "";

  productList.forEach((product) => {
    let capitalizedTitle =
      product.title.charAt(0).toUpperCase() +
      product.title.slice(1).toLowerCase();

    productosHTML += `<div>
        <div><b>Code: ${product.code}</b></div>
        <div>
            <h4>${capitalizedTitle}</h4>
            <p>
            <ul >
            <li>Id: ${product.id}</li>
            <li>Description: ${product.description}</li>
            <li>Price: $${product.price}</li>
            <li>Category: ${product.category}</li>
            <li>Status: ${product.status}</li>
            <li>Stock: ${product.stock}</li>
            <li>Thumbnail: ${product.thumbnail}</li>
            </ul>
            </p>
        </div>
        <div>
        <button type="button" onclick="deleteProduct(${product.id})">Eliminar</button>
        </div><br/><br/>
        
    </div>
</div>`;
  });

  productsDiv.innerHTML = productosHTML;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;
  let status = form.elements.status.checked;

  socketClient.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
    status,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = parseInt(deleteidinput.value);
  socketClient.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
});

function deleteProduct(productId) {
  socketClient.emit("deleteProduct", productId);
}
