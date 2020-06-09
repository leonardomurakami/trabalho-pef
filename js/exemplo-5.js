var x1 = 150;
let extraCanvas;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + (windowHeight * 0.25);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    background(220, 220, 220);
    extraCanvas = createGraphics(600, 1000);
    extraCanvas.clear();
    cnv = createCanvas(600, 1000);
    centerCanvas()
    frameRate(1440)
}

function draw() {
    //Força distribuída constante
    while (x1 <= 450) {
        extraCanvas.triangle(x1, 200, x1 + 5, 195, x1 - 5, 195);
        extraCanvas.line(x1, 195, x1, 160);
        x1 += 15;
    }
    image(extraCanvas, 0, 0)
    // barra
    fill(150, 150, 150);
    rect(150, 200, 300, 30);
    noFill(150, 150, 150);
    // Apoio simples
    triangle(150, 233, 140, 248, 160, 248);
    fill(220, 220, 220);
    circle(150, 233, 6);
    noFill()
    line(140, 250, 160, 250);
    line(140, 252, 160, 252);
    // Apoio fixo
    triangle(450, 233, 440, 248, 460, 248);
    fill(220, 220, 220);
    circle(450, 233, 6);
    noFill()
    line(440, 248, 434, 255);
    line(445, 248, 439, 255);
    line(450, 248, 444, 255);
    line(455, 248, 449, 255);
    line(460, 248, 454, 255);
    // Base dos Gráficos
    line(150, 295, 450, 295); //N
    line(150, 495, 450, 495); //V
    line(150, 695, 450, 695); //M
}

function mouseDragged() {
    if (mouseIsPressed) {
        // Mantem tudo sempre na barra
        if (mouseX >= 450) {
            mouseX = 450;
        } else if (mouseX <= 150) {
            mouseX = 150;
        }
        // Força pontual
        background(220, 220, 220);
        fill(220, 0, 0);
        triangle(mouseX, 200, mouseX + 5, 195, mouseX - 5, 195);
        noFill();
        line(mouseX, 195, mouseX, 125);
        //Graf. de N é desnecessário
        //Graf. de V
        for (i = 150; i <= mouseX; i++) {
            stroke(150, 150, 150);
            rect(i, -(10 * (450 - i) * 0.05 / (2) + 10 * (450 - mouseX) * 5 / (300)) + 532.5, 0, (10 * (450 - i) * 0.05 / (2) + 10 * (450 - mouseX) * 5 / (300)) - 37.5);
            stroke(0, 0, 0);
        }
        for (i = mouseX; i <= 450; i++) {
            stroke(150, 150, 150);
            rect(i, -(10 * (450 - i) * 0.05 / (2) - 10 * (mouseX - 150) * 5 / (300)) + 532.5, 0, (10 * (450 - i) * 0.05 / (2) - 10 * (mouseX - 150) * 5 / (300)) - 37.5);
            stroke(0, 0, 0);
        }
        line(mouseX, -(10 * (450 - mouseX) * 0.05 / (2) + 10 * (450 - mouseX) * 5 / (300)) + 532.5, mouseX, -(10 * (450 - mouseX) * 0.05 / (2) - 10 * (mouseX - 150) * 5 / (300)) + 532.5);
        line(150, -(10 * 300 * 0.05 / (2) + 10 * (450 - mouseX) * 5 / (300)) + 532.5, 150, 495);
        line(450, (10 * (mouseX - 150) * 5 / (300)) + 532.5, 450, 495);
        //Graf. de M
        stroke(150, 150, 150);
        for (i = 150; i <= mouseX; i = i + 1) {
            rect(i, (-(i - 150) * (i - 450) * 0.006 + (1500 * (i - 150) / (mouseX - 150) * 0.06 + 695)), 0, (i - 150) * (i - 450) * 0.006 - (1500 * (i - 150) / (mouseX - 150) * 0.06));
        }
        for (i = mouseX; i <= 450; i++) {
            rect(i, (-(i - 150) * (i - 450) * 0.006 + (1500 * (i - 450) / (mouseX - 450) * 0.06 + 695)), 0, (i - 150) * (i - 450) * 0.006 - (1500 * (i - 450) / (mouseX - 450) * 0.06));
        }
        stroke(0, 0, 0);
    }
}