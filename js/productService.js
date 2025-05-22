function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h3>Lista de productos</h3>'
    fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(result => result.json())
    .then(products => {
        if(Array.isArray(products) && products.length > 0){
            let listProducts = `
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
            `;
            products.forEach(product => {
                listProducts += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>$${product.price}</td>
                        <td>${product.category}</td>
                        <td><img src="${product.image}" alt="Imagen" style="width:50px;height:50px;"></td>
                    </tr>
                `;
            });
            listProducts += `</tbody></table>`;
            document.getElementById('info').innerHTML = listProducts;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>';
        }
    });
}
function showInfoProduct(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(result => result.json())
    .then(product => {
        if (product && product.id) {
            showModalProduct(product);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto</h3>';
        }
    });
}

function showModalProduct(product) {
    const modalProduct = `
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalProductLabel">${product.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="Imagen producto">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text"><strong>Precio:</strong> $${product.price}</p>
                                <p class="card-text"><strong>Categoría:</strong> ${product.category}</p>
                                <p class="card-text"><strong>Descripción:</strong> ${product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalProduct;
    const modal = new bootstrap.Modal(
        document.getElementById('modalProduct')
    );
    modal.show();
}