
/*----------------------------Declaracion de objectos para preguntas----------------------------------*/
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


/*---------------------------Generar numero random----------------------------------------------------*/
function numeroRadom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*-------------------------Cargar nivel-------------------------------------------------*/
function loadLevel(nivel) {

    try {
        document.querySelector(".game-mision").style.display = "block"
        preguntas_nivelActual = buscarNivel(nivel)
        total_respondidas = 0;
        inGame = true;

        cantidadVida = parseInt(preguntas_nivelActual.length / 2);
        drawVida(cantidadVida)

        dataPres = []

        for(let x = 0; x < preguntas_nivelActual.length; x++){
            const o = {
                numero: x, respones: false
            }

            dataPres.push(o)
        }

        dataPres = desordenadr(dataPres)

        drawPress(preguntas_nivelActual[dataPres[total_respondidas].numero])
    } catch (error) {
        drawMSG(error, "white", "red");
        drawFinalScreem("Error del juego", "red", true);
        document.querySelector(".game-mision").style.display = "none"
    }

}

/*--------------------------Buscar nivel en el arrays-----------------------------*/
function buscarNivel(nivel) {
    let pregunta_level = []

    preguntas.forEach(element => {
        if (element.nivel == nivel) {
            pregunta_level.push(element)
        }
    });

    return pregunta_level
}

/*--------------------------------Generar repuesta--------------------------------*/
function genRespuesta() {
    let num = 0

    do {
        num = numeroRadom(0, 2)
    } while (num == tempRandom)

    tempRandom = num

    return num

}

/*---------------------------Dibujar vida en el DOM---------------------------------*/
function drawVida(vida) {
    document.querySelector("#vidas").innerHTML = vida;
}


/*--------------------------Desordenar-----------------------------------------------*/
function desordenadr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/*-------------------------dibujar pregustas en el dom------------------------------------*/
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

/* -----------------------------Mostrar Mensaje de error otro motivo----------------------*/

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

/*------------------------------------------Mostrar Pantalla final--------------------------------------*/

function drawFinalScreem(text, color, mostrar){
    const pantall = document.querySelector("#result-level")
    
    pantall.innerHTML = text
    pantall.style.color = color

    if(mostrar){
        pantall.style.left = "0%"

        const time_fuera = setTimeout(()=>{
            pantall.style.left = "-100%"
        }, 2000)
        return
    }

    pantall.style.left = "-100%"
}

/*-----------------------------------Boton que va verifivar si la repuesta es correcta------------------*/
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

                //drawMSG("Te has quedado sin vidas", "white", "red")
                drawFinalScreem("Te has quedado sin vidas", "red", true);

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
            //drawMSG("Nivel completado", "white", "green")
            drawFinalScreem("Nivel completado", "green", true);
            document.querySelector(".game-mision").style.display = "none"

            return
        }

        drawMSG("Repuesta Correcta", "white", "green")
        drawPress(preguntas_nivelActual[dataPres[total_respondidas].numero])

    } catch (error) {
        drawMSG(error, "white", "red")
        drawFinalScreem("<center>Error del juego<br/>Reiniciado en 3 segundos</center>", "red", true);
        const time_fuera = setTimeout(()=>{
            location.reload();
        }, 3000)
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

/*------------------------------------------------Creacion de las preguntas de manera de dipositovo--------------------------------------------------------------------------------*/

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

//nivel 0

preguntas.push(new Pregunta("¿De qué se alimenta pava las blanca?", "Brotes, frutos, etc.", 0, "Insectos ", "hiervas", "semillas", 0, 0))

//nivel 3

preguntas.push(new Pregunta("¿de que se alimenta el añuje?", "frutas,flores silvestres y pequeños vertebrados", 0, "insectos pequeños y hojas.", "hojas y semillas.", "frutas", 0, 3))
preguntas.push(new Pregunta("¿De qué otro nombre se le conoce al Maquisapa?", "Mono araña.", 0, "Coto", "Machín negro", "insecto de 8 patas", 2, 3))

//Pregunta media

//nivel 0
preguntas.push(new Pregunta("¿En qué hábitat vive el shansho?", "Pantanos, ríos de la selva", 1, "Mares, lagos", "Quebradas, riachuelos", "Tropical ", 1, 0))
preguntas.push(new Pregunta("¿cuánto mide la Punchana", "42 cm - 62 cm ", 1, "42 mt ,62 mt", "40 cm, 50 cm", "estatura", 2, 0))

//nivel 1

preguntas.push(new Pregunta("¿Cuál es el Estado de conservación de la taricaya?", "Esta clasificada como Vulnerable en la lista roja.", 1, "Esta en peligro medio de la lista roja.", "Las principales amenazas es su piel y su caza de sus huevos.", "Esta clasificada en una situación grave.", 2, 1))
preguntas.push(new Pregunta("¿Cuál es el periodo de gestación del caimán?", "entre 80 y 90 días.", 1, "entre 50 y 90 días.", "entre 112 y 200 días.", "Su diferencia es de 10 días.", 2, 1))

//nivel 2

preguntas.push(new Pregunta("¿Cuanto pesa un ronsoco adulto?", "35 – 66 kg", 1, "20-40kg", "70-90kg", "Se llevan 31kg de diferencia ", 2, 2))
preguntas.push(new Pregunta("¿Cuántas crías tiene el Yaguarundi?", "De 1 - 4 crías ", 1, "De 1 - 2 crías", "De 1- 6 crías", "16÷4", 2, 2))
preguntas.push(new Pregunta("¿Cuántos años vive un oso hormiguero?", "Puede vivir hasta los 14 años.", 1, "Puede vivir hasta los 10 años.", "Puede vivir hasta los 29 años.", "7x2", 2, 2))

//nivel 3

preguntas.push(new Pregunta("¿Cuánto tiempo puede vivir el gallito de las rocas?", "puede vivir hasta 30 años en cautiverio.", 1, "peude vivir hasta 15 años en cautiverio.", "puede vivir hasta 20 años en cautiverio.", "15x2", 2, 3))
preguntas.push(new Pregunta("¿De qué se alimenta el Machetero?", "De tallos tiernos, hojas, frutos y semillas.", 1, "Insectos pequeños", "Carne y Insectos pequeño", "Consume plantas", 0, 3))
preguntas.push(new Pregunta("¿cual es el nombre científico del achuni?", "Nasua nasua", 1, "Ateles chamek", "Podocnemis unifilis", "comienza con N", 2, 3))

//pregunta dificil

//nivel 0

preguntas.push(new Pregunta("¿Cuál es el nombre científico de manco", " Eira bárbara", 2, "Nasua nasua", "Cebus apella", "Barbie,", 2, 0))
preguntas.push(new Pregunta("¿Cuánto es la fecha de apareamiento del huapo?", " Octubre, mayo", 2, "Junio, agosto", "Octubre, diciembre", "Se llevan ocho meses de diferencia", 2, 0))

//nivel 1

preguntas.push(new Pregunta("¿Cuáles son las principales amenazas que enfrenta la taricaya?", "las amenazas son la caza excesiva de sus huevos, la destrucción de su hábitat, entre otros.", 2, "Esta en peligro de extinción.", "Las principales amenazas son su hábitat, entre otros.", "Huevos, carne, hábitat ", 2, 1))
preguntas.push(new Pregunta("¿Cuantos años vive la Bothriopsis?", "20 años.", 2, "10 años", "30 años", "√400", 2, 1))
preguntas.push(new Pregunta("¿Dónde habita el Allobates?", "Se distribuye en bosques tropicales.", 2, "Se distribuye en riachuelos.", "Se distribuye en lagos.", "bosques", 1, 1))
preguntas.push(new Pregunta("¿Cuál es el nombre científico del Shiuri?", "Tamandua tetradactyla.", 2, "Cunniculus paca.", "Nasua nasua.", "comienza con T", 2, 1))

//nivel 2

preguntas.push(new Pregunta("¿Qué clase es el tigrillo?", "mammalia", 2, "Amphibia", "Sauropsida", "Empieza con M", 2, 2))
preguntas.push(new Pregunta("¿cuantos huevos pone la charapa?", "charapa pequeña:10 a 35 huevos/ charapa grande :60 a 140 huevos", 2, "charapa pequeña: 20 a 30 huevos./ charapa grande: 80 a 120 huevos.", "charapa pequeña: 10 a 50 huevos./ charapa grande: 50 a 100 huevos.", "charapa pequeñ: 25 de diferencia/ charapa grande: 80 de diferencia.", 2, 2))

/*----------------Temp data------------------------------*/

let dataPres = [] /*[
    { numero: 0, respones: false },
    { numero: 1, respones: false },
    { numero: 2, respones: false },
    { numero: 3, respones: false },
    { numero: 4, respones: false },
    { numero: 5, respones: false },
    { numero: 6, respones: false },
    { numero: 7, respones: false },
];*/

//loadLevel(0)

/*---------------------------------------------Inicio del juego------------------------------------------------------------*/

const button_map = document.querySelectorAll(".loadmap_katio")
const info_level = document.querySelector("#info-level")

button_map.forEach(e => {
    e.addEventListener("click", () => {
        let num = parseInt(e.innerHTML)
        
        const time_fuera = setTimeout(()=>{
            loadLevel(num - 1)
        }, 600)
        info_level.style.left = "0"
        info_level.querySelector("h2").innerHTML = `Nivel ${num}`
    })
})

info_level.querySelector(".salir").addEventListener("click", ()=>{
    document.querySelector(".game-mision").style.display = "none"
    info_level.style.left = "-100%"
})

info_level.querySelector(".iniciar").addEventListener("click", ()=>{
    info_level.style.left = "-100%"
})

/*----------------------------------------Katio engine------------------------------------------------------*/

/*Nada de katio engine*/

/* 
--------------------------------------------------------------------------------------------------------------
|    Creador: Arquimedes                                                                                     |
|                                                                                                            |
|    Redes:                                                                                                  |
|        -Telegram @app_s1s                                                                                  |
|        -instagram @app_s1s                                                                                 |
|                                                                                                            |
|    notas del creador: En este proyecto cometi muchos crimenes de progracion pero se que no van a pagar     |
|    lo sufuciente para hacelo bien solo demore 2 Horas y soy malo para hacer Style                          |
|                                                                                                            |
|    postdata: mi español es malo confundo la r con la l y eso que soy peruano a fin no me                   |
|    dedico aser app para vivir yo soy de otro tema asi que creo que me salve                                |
|-------------------------------------------------------------------------------------------------------------
*/


window.addEventListener("load", ()=>{
    document.querySelector("#loader").style.top = "-100%";
})