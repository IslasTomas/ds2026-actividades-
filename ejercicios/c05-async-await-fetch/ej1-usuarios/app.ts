
interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const usuariosInterfaz: Usuario[] = data.map((usuario: any) => ({
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

