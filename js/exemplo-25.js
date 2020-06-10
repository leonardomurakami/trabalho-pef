function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = link.height * 2;
    cnv.position(x, y);
}

function centerButton() {
    var x = ((windowWidth + cnv.width - width) / 2) - link.width;
    var y = 0;
    link.position(x, y);
}

function setup() {
    cnv = createCanvas(500, 1000);
    createAnchorButton();
    centerButton();
    centerCanvas();
    placaX = 30;
    placaY = 70;
    placaL = 350;
    placaH = 30;
    lineX = placaX;
    lineH = 60;
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
    line(lineX, placaY - lineH, lineX, placaY);
    triangle(lineX - 5, placaY - 5, lineX, placaY, lineX + 5, placaY - 5);
    line(placaX + placaL, placaY + placaH / 2, placaX + placaL + lineH, placaY + placaH / 2);
    triangle(placaX + placaL, placaY + placaH / 2, placaX + placaL + 5, placaY + placaH / 2 + 5, placaX + placaL + 5, placaY + placaH / 2 - 5);

    // Grafico N
    for (i = 0; placaL - i >= 0; i = i + 1) {
        line(placaX + i, eixo1dist, placaX + i, eixo1dist - lineH);
    }

    // Grafico V
    for (i = 0; lineX - placaX >= i; i = i + 1) {
        line(placaX + i, eixo1dist + separacaoEntreEixos, placaX + i, eixo1dist + separacaoEntreEixos - lineH);
    }

    // Grafico M
    for (i = 0; i <= lineX - placaX; i = i + 1) {
        line(placaX + i, eixo1dist + 2 * separacaoEntreEixos - lineH + (i) * (lineH / (lineX - placaX)), placaX + i, eixo1dist + 2 * separacaoEntreEixos);
    }

    if (mouseIsPressed) {
        lineX = mouseX;
        if (lineX >= placaX + placaL) {
            lineX = placaX + placaL;
        } else if (lineX <= placaX) {
            lineX = placaX;
        }
    }
}