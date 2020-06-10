function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = link.height*2;
    cnv.position(x, y);
}

function centerButton(){
    var x = ((windowWidth + cnv.width - width) / 2) - link.width;
    var y = 0;
    link.position(x, y);
}

function setup() {
    cnv = createCanvas(400, 850);
    createAnchorButton();
    centerButton();
    centerCanvas();
    placaX = 30;
    placaY = 50;
    placaL = 350;
    placaH = 30;
    lineX = placaX;
    lineH = 40;
    eixo1dist = placaY + placaH + 200;
    separacaoEntreEixos = 200;
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

function apoioFixo(a, b, l, r, e) {
    x = a - l / 2;
    y = b + l * sqrt(3) / 2;
    triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
    circle(a, b, r);
    for (i = 0; i <= l; i = i + e) {
        line(x + i, y, x + i - e, y + e);
    }
}

function apoioLivre(a, b, l, r, e) {
    x = a - l / 2;
    y = b + l * sqrt(3) / 2;
    triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
    circle(a, b, r);
    line(x, y + e, x + l, y + e);
    line(x, y + 2 * e, x + l, y + 2 * e);
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
    apoioFixo(placaX, placaY + placaH, 30, 10, 10);
    apoioLivre(placaX + placaL, placaY + placaH, 30, 10, 5);

    // Carregamento P
    fill(175);
    line(lineX, placaY - lineH, lineX, placaY);
    triangle(lineX - 5, placaY - 5, lineX, placaY, lineX + 5, placaY - 5);

    //Forca distribuida triangular
    e = 35;
    line(placaX, placaY, placaX + placaL, placaY - lineH);
    for (i = 0; i <= placaL; i = i + e) {
        if ((i * (lineH) / placaL) >= 5) {
            seta(placaX + i, placaY, ((i) * (lineH) / placaL), 4);
        }
    }

    // Grafico N (zero, neste caso)

    // Grafico V
    a = lineX - placaX;
    b = placaL - a;
    for (i = 0; i <= placaL; i = i + 1) {
        if (placaX + i <= lineX) {
            line(placaX + i, eixo1dist + separacaoEntreEixos + ((b * lineH) / (placaL * 2)) - ((lineH * placaL) / (6 * 40 * 2)) + ((lineH * i * i) / (2 * placaL * 20 * 4)), placaX + i, eixo1dist + separacaoEntreEixos);
        } else {
            line(placaX + i, eixo1dist + separacaoEntreEixos - (a * lineH) / (placaL * 2) - ((lineH * placaL) / (6 * 40 * 2)) + ((lineH * i * i) / (2 * placaL * 40 * 2)), placaX + i, eixo1dist + separacaoEntreEixos);
        }
    }

    // Grafico M
    for (i = 0; i <= placaL; i = i + 1) {
        if (placaX + i <= lineX) {
            line(placaX + i, eixo1dist + 2 * separacaoEntreEixos + (lineH * b * i) / (placaL * 40 * 2) + (lineH * placaL * i) / (6 * 40 * 40 * 2) - (lineH * i * i * i) / (6 * placaL * 40 * 40 * 2), placaX + i, eixo1dist + 2 * separacaoEntreEixos);
        } else {
            line(placaX + i, eixo1dist + 2 * separacaoEntreEixos + (lineH * a * (placaL - i) / (placaL * 40 * 2)) + (lineH * placaL * i) / (6 * 40 * 40 * 2) - (lineH * i * i * i) / (6 * placaL * 40 * 40 * 2), placaX + i, eixo1dist + 2 * separacaoEntreEixos);
        }
    }

    //Animacao
    if (mouseIsPressed) {
        lineX = mouseX;
        if (lineX >= placaX + placaL) {
            lineX = placaX + placaL;
        } else if (lineX <= placaX) {
            lineX = placaX;
        }
    }
}