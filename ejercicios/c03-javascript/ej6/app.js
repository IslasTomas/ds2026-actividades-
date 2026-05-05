// ● Agregar un <input type="text"> para nombre de producto y un
// <button> "Agregar"
// ● Al hacer click, agregar el producto como un <li> dentro de un
// <ul> en la página
// ● Cada item debe tener un botón "Eliminar" que al clickearlo
// borre ese item de la lista
// ● Validar que el input no esté vacío
// ● Agregar un contador que muestre "X productos en la lista"

const inputProduct = document.getElementById("inputProduct");
const buttonAddProduct = document.getElementById("buttonAddProduct");
const listProducts = document.getElementById("listProducts");
const counterProducts = document.getElementById("counterProducts");

let products = [];

function render() {
    listProducts.replaceChildren();
    products.forEach((name, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = name;
        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.textContent = "Eliminar";
        btnDelete.dataset.index = String(index);
        btnDelete.dataset.capitanTest = "prueba-capitan";
        
        li.append(span, " ", btnDelete);
        listProducts.append(li);
    });
    counterProducts.textContent = `${products.length} productos en la lista`;
}

buttonAddProduct.addEventListener("click", () => {
    const name = inputProduct.value.trim();
    if (name === "") {
        alert("El input no puede estar vacio o ser espacio en blanco");
        return;
    }
    products.push(name);
    inputProduct.value = "";
    render();
});

listProducts.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-index]");
    const capitanTest = event.target.closest("span");
    if (capitanTest) {
        console.log("capitanTest", capitanTest.textContent);}
    if (!btn) return;
    const index = Number(btn.dataset.index);
    if (Number.isNaN(index)) return;
    products.splice(index, 1);
    render();
});
render();