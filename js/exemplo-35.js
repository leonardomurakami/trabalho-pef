function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + (windowHeight * 0.15);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    cnv = createCanvas(500, 1000);
    centerCanvas()
    placaX = 30;
    placaY = 70;
    placaL = 350;
    placaH = 30;
    lineX = placaX;
    lineH = 60;
    eixo1dist = placaY + placaH + 200;
    separacaoEntreEixos = 200;
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

    //Momento M
    noFill();
    arc(placaX + placaL, placaY + placaH - 15, placaH + 60, placaH + 60, PI + PI / 2, TWO_PI + PI / 2);
    //fill(175);
    triangle(placaX + placaL, placaY + placaH - 15 - placaH / 2 - 30, placaX + placaL + 6, placaY + placaH - 15 - placaH / 2 - 30 + 6, placaX + placaL + 4, placaY + placaH - 15 - placaH / 2 - 30 - 4);

    // Grafico N (zero, neste caso)

    // Grafico V
    for (i = 0; lineX - placaX >= i; i = i + 1) {
        line(placaX + i, eixo1dist + separacaoEntreEixos, placaX + i, eixo1dist + separacaoEntreEixos - lineH);
    }

    // Grafico M
    for (i = 0; i <= lineX - placaX; i = i + 1) {
        line(placaX + i, eixo1dist + 2 * separacaoEntreEixos - lineH - 30 + (i) * (lineH / (lineX - placaX)), placaX + i, eixo1dist + 2 * separacaoEntreEixos);
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