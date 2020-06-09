function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + (windowHeight * 0.05) + (canvasHeight * 0.2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}


function setup() {
    canvasWidth = 400;
    canvasHeight = 1000;
    cnv = createCanvas(canvasWidth, canvasHeight);
    centerCanvas();
    xvelocity = 2;
    going = true;
    placaX = 30;
    placaY = 50;
    placaL = 350;
    placaH = 30;
    lineX = placaX;
    lineH = 40;
    eixo1dist = placaY + placaH + 200;
    separacaoEntreEixos = 200;
}code

function eixos(x, y, l, h, p) {
    //eixo x
    line(x - p, y, x + l, y);
    //eixo y
    line(x, y + p, x, y - h);
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
    apoioFixo(placaX + placaL, placaY + placaH, 30, 10, 10);
    apoioLivre(placaX, placaY + placaH, 30, 10, 5);

    // Carregamento P
    fill(175);
    line(lineX, placaY - lineH, lineX, placaY);
    triangle(lineX - 5, placaY - 5, lineX, placaY, lineX + 5, placaY - 5);

    // Grafico N (zero, neste caso)

    // Grafico V
    a = lineX - placaX;
    b = placaL - a;
    rect(placaX, eixo1dist + separacaoEntreEixos - (b * lineH) / (2 * 6 * 20), a, (b * lineH) / (2 * 6 * 20));
    rect(placaX + a, eixo1dist + separacaoEntreEixos, b, (a * lineH) / (2 * 6 * 20));

    // Grafico M
    triangle(placaX, eixo1dist + 2 * separacaoEntreEixos, placaX + a, eixo1dist + 2 * separacaoEntreEixos + (lineH * a * b) / (2 * 6 * 20 * 20), placaX + placaL, eixo1dist + 2 * separacaoEntreEixos);

    //Animacao
    if (mouseIsPressed) {
        lineX = mouseX
    }
    if (lineX <= placaX) {
        lineX = placaX
    } else if (lineX >= placaX + placaL) {
        lineX = placaX + placaL
    }
}