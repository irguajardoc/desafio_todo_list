
const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const totalTareas = document.querySelector("#total-tareas");
const tareasRealizadas = document.querySelector("#tareas-realizadas");

const tareas = [
    { id: 16, descripcion: "Hacer mercado", completada: true },
    { id: 60, descripcion: "Estudiar para la prueba", completada: false },
    { id: 24, descripcion: "Sacar a pasear a Tobby", completada: false },
];

let ultimoId = Math.max(...tareas.map(t => t.id));

btnAgregar.addEventListener("click", () => {
    const descripcion = tareaInput.value.trim();
    if (!descripcion) return;
    ultimoId++;
    tareas.push({ id: ultimoId, descripcion, completada: false });
    tareaInput.value = "";
    renderTareas();
});

function cambiarEstado(id) {
    const index = tareas.findIndex(t => t.id === id);
    tareas[index].completada = !tareas[index].completada;
    renderTareas();
}

function borrarTarea(id) {
    const index = tareas.findIndex(t => t.id === id);
    tareas.splice(index, 1);
    renderTareas();
}

function renderTareas() {
    listaDeTareas.innerHTML = "";
    for (let tarea of tareas) {
        listaDeTareas.innerHTML += `
            <tr>
                <td>${tarea.id}</td>
                <td class="${tarea.completada ? 'completada' : ''}">${tarea.descripcion}</td>
                <td>
                    <input type="checkbox" ${tarea.completada ? 'checked' : ''} onclick="cambiarEstado(${tarea.id})">
                    <button class="btn-eliminar" onclick="borrarTarea(${tarea.id})">✖</button>
                </td>
            </tr>
        `;
    }
    totalTareas.textContent = tareas.length;
    tareasRealizadas.textContent = tareas.filter(t => t.completada).length;
}

renderTareas();
