function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = link.height * 2
    cnv.position(x, y);
}

function centerButton() {
    var x = ((windowWidth + cnv.width - width) / 2) - link.width;
    var y = 0;
    link.position(x, y);
}

function setup() {
    canvasWidth = 400;
    canvasHeight = 1200;
    cnv = createCanvas(canvasWidth, canvasHeight);
    createAnchorButton();
    centerButton();
    centerCanvas()
    xvelocity = 2;
    going = true;
    placaX = 30;
    placaY = 100;
    placaL = 350;
    placaH = 30;
    lineX = placaX;
    lineH = 80;
    eixo1dist = placaY + placaH + 200;
    separacaoEntreEixos = 250;
}

function createAnchorButton() {
    link = createA("index.html", "Voltar");
    link.style(`
        display: inline - block;
        padding: 0.35em 1.2em;
        border: 0.1em solid #162447;
        margin: 0 0.4em 0.3em 0;
        border-radius: 0.12em;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        color: #162447;
        text-align: center;
    `);
    return link;
}

function windowResized() {
    centerButton();
    centerCanvas();
}

function eixos(x, y, l, h, p) {
    //eixo x
    line(x - p, y, x + l, y);
    //eixo y
    line(x, y + p, x, y - h);
}

function seta(x, y, h, p) {
    line(x, y - h, x, y);
    triangle(x - p, y - p, x, y, x + p, y - p);
}

function draw() {
    background(230);

    //Graficos
    eixos(placaX, eixo1dist, placaL, 120, 20);
    eixos(placaX, eixo1dist + separacaoEntreEixos, placaL, 120, 20);
    eixos(placaX, eixo1dist + 2 * separacaoEntreEixos, placaL, 120, 20);

    // Placa
    fill(100);
    rect(placaX, placaY, placaL, placaH);

    // Engastamento 
    e = 10;
    for (i = 0; i <= placaH; i = i + e) {
        line(placaX, placaY + i, placaX - e, placaY - e + i);
    }

    // Carregamento P
    fill(175);
    seta(lineX, placaY, lineH, 5);

    //Forca distribuida triangular
    e = 20;
    line(placaX, placaY - lineH, placaX + placaL, placaY);
    for (i = 0; i <= placaL; i = i + e) {
        if (lineH - (i * (lineH) / placaL) >= 5) {
            seta(placaX + i, placaY, lineH - (i * (lineH) / placaL), 4);
        }
    }

    // Grafico N (zero, neste caso)

    // Grafico V
    for (i = 0; placaL - i >= 0; i = i + 1) {
        if (placaX + placaL - i >= lineX) {
            line(placaX + placaL - i, eixo1dist + separacaoEntreEixos + ((lineH * i * i) / (2 * placaL * 20 * 20)), placaX + placaL - i, eixo1dist + separacaoEntreEixos);
        } else {
            line(placaX + placaL - i, eixo1dist + separacaoEntreEixos - lineH + ((lineH * i * i) / (2 * placaL * 20 * 20)), placaX + placaL - i, eixo1dist + separacaoEntreEixos);
        }
    }

    // Grafico M
    for (i = 0; placaL - i >= 0; i = i + 1) {
        if (placaX + placaL - i >= lineX) {
            line(placaX + placaL - i, eixo1dist + 2 * separacaoEntreEixos + ((lineH * i * i * i) / (6 * placaL * 20 * 20 * 20)), placaX + placaL - i, eixo1dist + 2 * separacaoEntreEixos);
        } else {
            line(placaX + placaL - i, eixo1dist + 2 * separacaoEntreEixos - (-placaX - placaL + i + lineX) * (lineH / (lineX - placaX)) + ((lineH * i * i * i) / (6 * placaL * 20 * 20 * 20)), placaX + placaL - i, eixo1dist + 2 * separacaoEntreEixos);
        }
    }

    if (mouseIsPressed) {
        lineX = mouseX
    }
    if (lineX <= placaX) {
        lineX = placaX
    } else if (lineX >= placaX + placaL) {
        lineX = placaX + placaL
    }
}

function mousePressed() {
    going = !going;
}