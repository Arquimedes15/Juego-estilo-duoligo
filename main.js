class Pregunta {
    constructor(pre, res, dificultal, alt, alt2, pista, type, nivel) {
        this.dificultal = dificultal;
        this.pregunta = pre;
        this.respuesta = res;
        this.tipo = type;
        this.altenativas = [alt, alt2];
        this.pista = pista;
        this.nivel = nivel;
    }
}

function numeroRadom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadLevel(nivel) {

    document.querySelector(".game-mision").style.display = "block"
    preguntas_nivelActual = buscarNivel(nivel)
    total_respondidas = 0;
    inGame = true;

    cantidadVida = parseInt(preguntas_nivelActual.length / 2);
    drawVida(cantidadVida)

    dataPres.forEach(x => {
        x.respones = false;
    })

    dataPres = desordenadr(dataPres)

    drawPress(preguntas_nivelActual[dataPres[total_respondidas].numero])

}

function buscarNivel(nivel) {
    let pregunta_level = []

    preguntas.forEach(element => {
        if (element.nivel == nivel) {
            pregunta_level.push(element)
        }
    });

    return pregunta_level
}

function genRespuesta() {
    let num = 0

    do {
        num = numeroRadom(0, 2)
    } while (num == tempRandom)

    tempRandom = num

    return num

}

function drawVida(vida) {
    document.querySelector("#vidas").innerHTML = vida;
}

function desordenadr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawPress(press) {
    document.querySelector("#pregunta-html").innerHTML = press.pregunta
    const button_r = document.querySelectorAll("#opcion")
    let n = 0
    const res = genRespuesta()

    for (let x = 0; x < button_r.length; x++) {
        if (x == res) {
            button_r[x].innerHTML = press.respuesta;
            continue
        }

        button_r[x].innerHTML = press.altenativas[n]
        n++;
    }
}

function drawMSG(text, color, background) {
    const msg = document.querySelector("#msg-draw")

    msg.innerHTML = text
    msg.style.display = "block"
    msg.style.color = color
    msg.style.background = background

    const time_fuera = setTimeout(() => {
        msg.style.display = "none"
    }, 2000)
}

const buttonVerificar = document.getElementById("v-s")

buttonVerificar.addEventListener("click", () => {
    try {
        console.log("Verificar: " + data_respuesta_click)

        buttonOpcion.forEach(e => {
            e.style.background = "rgb(150, 115, 39)"
        })

        const temp_memory = total_respondidas

        total_respondidas++;
        document.querySelector("#v-s").style.display = "none";

        //console.log("Repuesta: " + preguntas_nivelActual[dataPres[temp_memory].numero].respuesta)

        console.log("num temp: " + temp_memory)
        console.log("num origen: " + total_respondidas)

        if (data_respuesta_click != preguntas_nivelActual[dataPres[temp_memory].numero].respuesta && total_respondidas != 5) {
            //console.log("Mal")
            drawMSG("Repuesta Incorrecta", "white", "red")
            cantidadVida--; drawVida(cantidadVida)

            if (cantidadVida <= 0) {
                //console.log("Te has quedado sin vida")

                drawMSG("Te has quedado sin vidas", "white", "red")

                document.querySelector(".game-mision").style.display = "none"
                inGame = false

                return
            }

            drawPress(preguntas_nivelActual[dataPres[total_respondidas].numero])
            return
        }

        //console.log("Ok")

        if (preguntas_nivelActual.length == total_respondidas) {

            //console.log("Fin del juego")
            drawMSG("Nivel completado", "white", "green")
            document.querySelector(".game-mision").style.display = "none"

            return
        }

        drawMSG("Repuesta Correcta", "white", "green")
        drawPress(preguntas_nivelActual[dataPres[total_respondidas].numero])
    } catch (error) {
        drawMSG(error, "white", "red")
    }
})

const buttonOpcion = document.querySelectorAll("#opcion");

buttonOpcion.forEach(but => {
    but.addEventListener("click", () => {
        buttonOpcion.forEach(e => {
            e.style.background = "rgb(150, 115, 39)"
        })
        data_respuesta_click = but.innerHTML;
        document.querySelector("#v-s").style.display = "block"
        but.style.background = "blue"
    })
})

document.querySelector("#mascota-guia").addEventListener("click", () => {
    const msg_mas = document.querySelector("#pista-game")

    msg_mas.innerHTML = preguntas_nivelActual[dataPres[total_respondidas].numero].pista
    msg_mas.style.display = "block"

    const fuera_msg = setTimeout(() => {
        msg_mas.style.display = "none"
    }, 4000)
})

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//0 = alimentacion
//1 = habitad
//2 = es animal

//0 = facil
//1 = medio
//2 = dificil

let preguntas = [];

let cantidadVida = 0;
let tempRandom = -1;

let preguntas_nivelActual = []
let total_respondidas = -1;
let inGame = false;
let data_respuesta_click = ""

//pregunta facil
preguntas.push(new Pregunta("¿De qué se alimenta pava las blanca?", "Brotes, frutos, etc.", 0, "Insectos ", "hiervas", "semillas", 0, 0))

//Pregunta media 
preguntas.push(new Pregunta("¿En qué hábitat vive el shansho?", "Pantanos, ríos de la selva", 1, "Mares, lagos", "Quebradas, riachuelos", "Tropical ", 1, 0))
preguntas.push(new Pregunta("¿cuánto mide la Punchana", "42 cm - 62 cm ", 1, "42 mt ,62 mt", "40 cm, 50 cm", "estatura", 2, 0))

//pregunta dificil
preguntas.push(new Pregunta("¿Cuál es el nombre científico de manco", " Eira bárbara", 2, "Nasua nasua", "Cebus apella", "Barbie,", 2, 0))
preguntas.push(new Pregunta("¿Cuánto es la fecha de apareamiento del huapo?", " Octubre, mayo", 2, "Junio, agosto", "Octubre, diciembre", "Se llevan ocho meses de diferencia", 2, 0))

let dataPres = [
    { numero: 0, respones: false },
    { numero: 1, respones: false },
    { numero: 2, respones: false },
    { numero: 3, respones: false },
    { numero: 4, respones: false },
];

//loadLevel(0)

const button_map = document.querySelectorAll(".loadmap_katio")

button_map.forEach(e => {
    e.addEventListener("click", () => {
        let num = parseInt(e.innerHTML)
        loadLevel(num - 1)
    })
})