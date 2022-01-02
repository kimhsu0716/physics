const PI = Math.PI;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.style.background = 'url("images/xyaxis2.jpg")';

let playing = false;
let show = true;

/*
let bg = new Image();
bg.src = "./images/xyaxis.jpg";
bg.onload = () => {
    ctx.drawImage(bg, 0, 0);
}
*/

let time = 0;
let yVals = new Array(250);
yVals.fill(0);

class Wave {
    //V: 속력, L: 파장, A: 진폭
    constructor(V = 1, L = 1, A = 1, color = 'blue') {
        this.V = 1.5 * V;
        this.L = L;
        this.A = A;
        this.T = this.L / this.V;
        this.f = 1 / this.T;
        this.start = 0;
        this.color = color;
        this.yVals = [];
        this.show = true;
        for (let i = 0; i < 250; i++) {
            this.yVals.push(-50 * A * Math.sin(PI / L * ((4 * i - 50) / 150 - this.V * time / 120)));
        }
        //this.draw();
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.yVals[0] + 250);
        for (let i = 0; i < 250; i++) {
            ctx.lineTo(4 * i, this.yVals[i] + 250);
        }
        ctx.stroke();
    }

    /*
    updateYVals(){
        for (let i = 0; i < 1000; i++) {
            this.yVals[i] = -50 * this.A * Math.sin(PI / this.L * ((i - 50) / 75 - this.V * time / 60));
            yVals[i] += this.yVals[i];
        }
    }
    */
}

function draw() {
    ctx.strokeStyle = 'purple';
    ctx.beginPath();
    ctx.moveTo(0, yVals[0] + 250);
    for (let i = 0; i < 250; i++) {
        ctx.lineTo(4 * i, yVals[i] + 250);
    }
    ctx.stroke();
}

function play() {
    if (playing) return;
    playing = true;
    document.querySelectorAll("input").forEach((elem) => {
        elem.disabled = true;
    });
    return setInterval(() => {
        time++;
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        yVals.fill(0);
        for (let i = 0; i < 250; i++) {
            w1.yVals[i] = -50 * w1.A * Math.sin(PI / w1.L * ((4 * i - 50) / 150 - w1.V * time / 120));
            w2.yVals[i] = -50 * w2.A * Math.sin(PI / w2.L * ((4 * i - 50) / 150 - w2.V * time / 120));
            w3.yVals[i] = -50 * w3.A * Math.sin(PI / w3.L * ((4 * i - 50) / 150 - w3.V * time / 120));
            yVals[i] += w1.yVals[i] + w2.yVals[i] + w3.yVals[i];
        }
        if (w1.show) w1.draw();
        if (w2.show) w2.draw();
        if (w3.show) w3.draw();
        if(show) draw();
    }, 1000 / 60);
}

function pause(id) {
    if (!id) return;
    clearInterval(id);
    playing = false;
    document.querySelectorAll("input").forEach((elem) => {
        elem.disabled = false;
    });
}

function stop(id) {
    if (!id) return;
    clearInterval(id);
    time = 0;
    playing = false;
    document.querySelectorAll("input").forEach((elem) => {
        elem.disabled = false;
    });
    recheck();
    if (w1.show) w1.draw();
    if (w2.show) w2.draw();
    if (w3.show) w3.draw();
    if(show) draw();
}

function playClicked() {
    if (playing) pause(playid);
    else playid = play();
}

function redraw() {
    stop(playid);
    if (w1.show) w1.draw();
    if (w2.show) w2.draw();
    if (w3.show) w3.draw();
    if(show) draw();
}

function recheck() {
    let w1_V = Number(document.getElementById("w1_V").value);
    let w1_L = Number(document.getElementById("w1_L").value);
    let w1_A = Number(document.getElementById("w1_A").value);
    let w1_show = document.getElementById("w1_show").checked;
    let w2_V = Number(document.getElementById("w2_V").value);
    let w2_L = Number(document.getElementById("w2_L").value);
    let w2_A = Number(document.getElementById("w2_A").value);
    let w2_show = document.getElementById("w2_show").checked;
    let w3_V = Number(document.getElementById("w3_V").value);
    let w3_L = Number(document.getElementById("w3_L").value);
    let w3_A = Number(document.getElementById("w3_A").value);
    let w3_show = document.getElementById("w3_show").checked;
    let sup_show = document.getElementById("sup_show").checked;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    yVals.fill(0);
    delete w1, w2, w3;
    w1 = new Wave(w1_V, w1_L, w1_A);
    w2 = new Wave(w2_V, w2_L, w2_A, 'red');
    w3 = new Wave(w3_V, w3_L, w3_A, 'green');
    w1.show = w1_show;
    w2.show = w2_show;
    w3.show = w3_show;
    show = sup_show;
    for (let i = 0; i < 250; i++) {
        w1.yVals[i] = -50 * w1.A * Math.sin(PI / w1.L * ((4 * i - 50) / 150 - w1.V * time / 120));
        w2.yVals[i] = -50 * w2.A * Math.sin(PI / w2.L * ((4 * i - 50) / 150 - w2.V * time / 120));
        w3.yVals[i] = -50 * w3.A * Math.sin(PI / w3.L * ((4 * i - 50) / 150 - w3.V * time / 120));
        yVals[i] += w1.yVals[i] + w2.yVals[i] + w3.yVals[i];
    }
    if(w1.show) w1.draw();
    if(w2.show) w2.draw();
    if(w3.show) w3.draw();
    if(show) draw();
}

/*
for(let i = 0; i < 5; i++){
    waves.push(new Wave(Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1, 0.5, 'red'))
}
*/

let w1 = new Wave(1, 1, 1);
let w2 = new Wave(3, 1, -1, 'red');
let w3 = new Wave(2, 2, 2, 'green');

let playid = play();

//setTimeout(() => pause(playid), 10000);