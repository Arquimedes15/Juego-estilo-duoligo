export function numeroRadom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function loadLevel(nivel) {

    preguntas_nivelActual = buscarNivel(nivel)

    console.log(preguntas_nivelActual)

    cantidadVida = parseInt(preguntas_nivelActual.length / 2);
    drawVida(cantidadVida)

    console.log(genRespuesta())

    const pregunta_html = document.querySelector("#pregunta-html")
}

export function buscarNivel(nivel) {
    let pregunta_level = []

    preguntas.forEach(element => {
        if (element.nivel == nivel) {
            pregunta_level.push(element)
        }
    });

    return pregunta_level
}

export function genRespuesta(){
    let num = 0

    do{
        num = numeroRadom(0, 2)
    }while(num == tempRandom)
    
    tempRandom = num

    return num

}

export function drawVida(vida) {
    document.querySelector("#vidas").innerHTML = vida;
}

export function desordenadr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
