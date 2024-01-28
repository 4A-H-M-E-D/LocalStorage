const formulario = document.querySelector("#formulario")
const templateTarea = document.querySelector("#templateTarea").content
const contenedorDinamico = document.querySelector("#pintarTarea")
const alerta = document.querySelector(".alert");

let tarea = [];

formulario.addEventListener("submit", e => {
    e.preventDefault();
    alerta.classList.add("d-none")

    const data = new FormData(formulario);
    const [nombre] = [...data.values()];
    
    if(!nombre.trim()) {
        alerta.classList.remove("d-none")
        alerta.textContent = "el formulario no puede ir vacio".toUpperCase();
        return;
    }

    agregarTarea(nombre);

})

const agregarTarea = (nombre) => {
    const tareaT = {
        nombreT: nombre,
        id: Math.random().toString(16).slice(2),
    }
    tarea.push(tareaT)
    console.log(tarea)

    pintarTarea();
}

const pintarTarea = () => {
    localStorage.setItem("tarea", JSON.stringify(tarea));

    contenedorDinamico.textContent = "";
    const fragment = document.createDocumentFragment();

    tarea.forEach(item => {
        const clon = templateTarea.cloneNode(true);
        clon.querySelector(".lead").textContent = item.nombreT
        clon.querySelector("button").dataset.id = item.id
        fragment.appendChild(clon)
    })
    contenedorDinamico.appendChild(fragment)
}

document.addEventListener("click", e => {

    if(e.target.dataset.id) {
        tarea = tarea.filter(item => item.id !== e.target.dataset.id)
        pintarTarea();
    }
})

document.addEventListener("DOMContentLoaded", () => {

    if(localStorage.getItem("tarea")) {
        tarea = JSON.parse(localStorage.getItem("tarea"))
        pintarTarea();
    }
})