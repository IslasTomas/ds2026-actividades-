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
obtenerUsuarios().then(usuarios => {
    console.log("usuarios desde la promesa", usuarios);
}).catch(error => {
    console.log("error desde la promesa", error);
});
