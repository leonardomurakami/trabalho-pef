let lineX;
let MIN_WIDTH = 30;
let MAX_WIDTH = 370;

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
    //400, 700
    cnv = createCanvas(400, 700);
    createAnchorButton();
    centerButton();
    centerCanvas();
    lineX = mouseX;
    xvelocity = 2;
    MIN_WIDTH = 30;
    MAX_WIDTH = 370;
    
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

function draw() {
    background(230);

    // engastamento 
    line(MIN_WIDTH, 50, 20, 40);
    line(MIN_WIDTH, 60, 20, 50);
    line(MIN_WIDTH, 70, 20, 60);
    line(MIN_WIDTH, 80, 20, 70);

    // eixos
    line(MIN_WIDTH, 100, 30, 250);
    line(MIN_WIDTH, 300, 30, 450);
    line(MIN_WIDTH, 500, 30, 650);

    line(10, 220, 370, 220);
    line(10, 420, 370, 420);
    line(10, 620, 370, 620);

    // grafico N

    // grafico V
    rect(MIN_WIDTH, 310, lineX - MIN_WIDTH, 110)


    // grafico M
    triangle(30, 510, 30, 620, lineX, 620);

    // retangulo
    fill(250);
    rect(30, 50, 340, 30);

    // Carregamento P
    fill(0);
    line(lineX, 10, lineX, 50);
    triangle(lineX - 5, 45, lineX, 50, lineX + 5, 45);

    if (mouseIsPressed) {
        lineX = mouseX
    }
    if (lineX <= MIN_WIDTH) {
        lineX = MIN_WIDTH
    } else if (lineX >= MAX_WIDTH) {
        lineX = MAX_WIDTH
    }
}
