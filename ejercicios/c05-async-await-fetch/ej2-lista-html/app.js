"use strict";
async function obtenerUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const usuariosInterfaz = data.map((usuario) => ({
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
    }));
    return usuariosInterfaz;
}
const usuariosListado = document.getElementById("usuariosListado");
const cargando = document.getElementById("cargando");
const errorp = document.getElementById("error");
obtenerUsuarios()
    .then(usuarios => {
    usuarios.forEach(usuario => {
        const li = document.createElement("li");
        li.textContent = `${usuario.name} - ${usuario.email}`;
        usuariosListado.appendChild(li);
    });
})
    .catch(error => {
    errorp.style.display = "block";
    errorp.textContent = "No se pudo cargar la lista.";
    console.log("error", error);
})
    .finally(() => {
    cargando.style.display = "none";
});
