//Constante global con la url base a consumir
const URL_BASE = "https://swapi.dev/api/"

//Variables globales para manipular DOM
let rojo = document.getElementById("numeroRojo")
let verde = document.getElementById("numeroVerde")
let azul = document.getElementById("numeroAzul")

//Clase consrtructura
class Personaje {
    constructor(nombre, estatura, peso, fila, color) {
        this.nombre = nombre
        this.estatura = estatura
        this.peso = peso
        this.fila = fila
        this.color = color
    }
    // Dentro de la misma clase se agrega el métdo que contruye cada una de las tarjetas, que se convoca cuando se crea al personaje.
    cargarTarjeta = () => {
        document.getElementById(`${this.fila}`).innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon ${this.color}"></div>
                    <div class="timeline-text">
                        <h6>${this.nombre}</h6>
                        <p>Estatura: ${this.estatura} cms</p>
                        <p>Peso: ${this.peso} kg </p>
                    </div>
                </div>
            </div>
        `
    }
}

//Función que creara objetos de personajes automaticamente
const crearPersonaje = (data, fila, color) => {
    let personaje = new Personaje (data.name, data.height, data.mass, fila, color)
    personaje.cargarTarjeta()
}
//Consumo de la API
const traerPersonaje = async(id, fila, color) => {
    try{
        let resultado = await fetch(`${URL_BASE}people/${id}`)
        let respuesta = await resultado.json();
        crearPersonaje(respuesta, fila, color)
    }catch (error){
        throw new Error (error)
    }
} 

//Generador hasta 5 tarjetas
function * generadorPersonaje(id, fila, color) {
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
    yield traerPersonaje(id, fila, color);
    id++
}

//Se generan variables con generador
let generadorRojo = generadorPersonaje(1, "filaRojo", "rojo")
let generadorVerde = generadorPersonaje(6, "filaVerde", "verde")
let generadorAzul = generadorPersonaje(11, "filaAzul", "azul")

//Cargar elementos en el DOM
rojo.addEventListener("click", async () => {
    let data = generadorRojo.next()
    !data.done ? data.value : alert("No hay más personajes")
})

verde.addEventListener("click", async () => {
    let data = generadorVerde.next()
    !data.done ? data.value : alert("No hay más personajes")
})

azul.addEventListener("click", async () => {
    let data = generadorAzul.next()
    !data.done ? data.value : alert("No hay más personajes")
})