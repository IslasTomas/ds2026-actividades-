
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

const usuariosListado = document.getElementById("usuariosListado") as HTMLUListElement;
const cargando = document.getElementById("cargando") as HTMLParagraphElement;
const errorp = document.getElementById("error") as HTMLParagraphElement;

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