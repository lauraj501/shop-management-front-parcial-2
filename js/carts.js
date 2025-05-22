function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h3>Lista de carritos</h3>';
    fetch("https://fakestoreapi.com/carts", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(result => result.json())
    .then(carts => {
        if(Array.isArray(carts) && carts.length > 0){
            let listCarts = `
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
            `;
            carts.forEach(cart => {
                listCarts += `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        <td>${cart.date ? cart.date.substring(0,10) : ''}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="showCartDetails(${cart.id})">Ver</button>
                        </td>
                    </tr>
                `;
            });
            listCarts += `</tbody></table>`;
            document.getElementById('info').innerHTML = listCarts;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron carritos</h3>';
        }
    });
}

function showCartDetails(cartId) {
    fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(result => result.json())
    .then(async cart => {
       
        let productsHtml = '';
        for (const item of cart.products) {
            const product = await fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(res => res.json());
            productsHtml += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${item.quantity}</td>
                    <td><img src="${product.image}" alt="Imagen" style="width:40px;height:40px;"></td>
                </tr>
            `;
        }
        showModalCart(cart, productsHtml);
    });
}

function showModalCart(cart, productsHtml) {
    const modalCart = `
        <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="modalCartLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalCartLabel">Carrito #${cart.id}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Usuario:</strong> ${cart.userId}</p>
                        <p><strong>Fecha:</strong> ${cart.date ? cart.date.substring(0,10) : ''}</p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID Producto</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productsHtml}
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalCart;
    const modal = new bootstrap.Modal(
        document.getElementById('modalCart')
    );
    modal.show();
}