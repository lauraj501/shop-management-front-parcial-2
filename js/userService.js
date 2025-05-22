function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>';
    fetch("https://fakestoreapi.com/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((result) => result.json())
    .then((users) => {
        if (Array.isArray(users) && users.length > 0) {
            let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            users.forEach(user => {
                listUsers += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name.firstname}</td>
                        <td>${user.name.lastname}</td>
                        <td><img src="${user.image}" class="img-thumbnail" alt="Avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="showInfoUser(${user.id})">View</button>
                        </td>
                    </tr>
                `;
            });
            listUsers += `</tbody></table>`;
            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>';
        }
    });
}

function showInfoUser(userId) {
    fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((result) => result.json())
    .then((user) => {
        if (user && user.id) {
            showModalUser(user);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el usuario</h3>';
        }
    });
}

function showModalUser(user) {
    const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show User</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${user.image}" class="card-img-top" alt="Avatar user">
                    <div class="card-body">
                        <h5 class="card-title">User info</h5>
                        <p class="card-text">First Name : ${user.name.firstname}</p>
                        <p class="card-text">Last Name : ${user.name.lastname}</p>
                        <p class="card-text">Email : ${user.email}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalUser;
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    );
    modal.show();
}