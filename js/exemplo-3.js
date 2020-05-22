function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + (windowHeight * 0.05) + (canvasHeight*0.2);
    cnv.position(x, y);
}

function setup() {
    canvasWidth = 400;
    canvasHeight = 1200;
    cnv = createCanvas(canvasWidth, canvasHeight);
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

function windowResized() {
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