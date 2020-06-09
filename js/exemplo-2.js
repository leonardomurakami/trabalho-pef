var x1 = 150;
let extraCanvas;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + (windowHeight * 0.40);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    extraCanvas = createGraphics(600, 1500);
    extraCanvas.clear();
    extraCanvas2 = createGraphics(600, 1500);
    extraCanvas2.clear();
    cnv = createCanvas(600, 1500);
    centerCanvas();
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
    rect(150, 200, 300, 30);
    // engastamento
    line(150, 190, 150, 240);
    line(140, 180, 150, 190);
    line(140, 205, 150, 215);
    line(140, 230, 150, 240)
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
            rect(i, -10 * 0.01 * (450 - i) + 20 + 420, 0, 10 * 0.01 * (450 - i) + 55);
            stroke(0, 0, 0);
        }
        for (i = 450; i >= mouseX; i--) {
            stroke(150, 150, 150);
            rect(i, -10 * 0.01 * (450 - i) + 495, 0, 10 * 0.01 * (450 - i));
            stroke(0, 0, 0);
        }
        //Graf. de M
        stroke(220, 0, 0);
        stroke(0, 0, 0);
        for (i = 150; i <= mouseX; i = i + 1) {
            stroke(150, 150, 150);
            rect(i, (-(10 * sq((i - 450) * 0.016)) / (2) + (45 * i - 6750) / (mouseX - 150) + 650), 0, (10 * sq((i - 450) * 0.016)) / (2) - (45 * i - 6750) / (mouseX - 150) + 45);
            stroke(0, 0, 0);
        }
        for (i = mouseX; i <= 450; i = i + 1) {
            stroke(150, 150, 150);
            rect(i, -(10 * sq((i - 450) * 0.016)) / (2) + 695, 0, 10 * sq((i - 450) * 0.016) / (2));
            stroke(0, 0, 0);
        }
    }
}