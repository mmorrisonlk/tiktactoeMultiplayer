let sqContent = "";

for (let i = 1; i <= 9; i++) {

    sqContent += "<canvas id='canvas" + i + "' width='150' height='150'></canvas>";
    if (i % 3 === 0) {
        sqContent += "<br>";
    }
    $("#mainSquare").html(sqContent);
}

for (let i = 1; i <= 9; i++) {
    let canvas = document.getElementById("canvas" + i);
    let context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, 150, 150);
}

let won = false;

let isFinished = false;

let moves = 0;

var squares = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function fillRed(x, y, z) {
    let arr = [x, y, z];

    for (let i = 0; i < 3; i++) {
        let canvas = document.getElementById("canvas" + (arr[i] + 1));
        let context = canvas.getContext("2d");

        context.fillStyle = "red";
        context.fillRect(0, 0, 150, 150);
        context.stroke();
    }
}

function isWon() {

    let w = 0;

    if (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== 0) {
        fillRed(0, 1, 2);

        w = squares[0];
    }

    if (squares[3] === squares[4] && squares[4] === squares[5] && squares[3] !== 0) {
        fillRed(3, 4, 5);

        w = squares[3];
    }

    if (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== 0) {
        fillRed(6, 7, 8);

        w = squares[6];
    }

    if (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== 0) {
        fillRed(0, 3, 6);

        w = squares[0];
    }

    if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== 0) {
        fillRed(1, 4, 7);

        w = squares[1];
    }

    if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== 0) {
        fillRed(2, 5, 8);

        w = squares[2];
    }

    if (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== 0) {
        fillRed(0, 4, 8);

        w = squares[0];
    }

    if (squares[6] === squares[4] && squares[4] === squares[2] && squares[6] !== 0) {
        fillRed(6, 4, 2);

        w = squares[6];
    }

    if (w === 0) {
        return;
    } else if (w === 1) {
        $("#results").html("You Win!!");
        $("#rep").css("width", "200px");
    } else if (w === 2) {
        $("#results").html("Your Opponent Win!!");
        $("#rep").css("width", "460px");
    }

    $("#tryagain").fadeIn();

    won = true;
    isFinished = true;
}

function opponentPlay() {
    let x = Math.floor(Math.random() * 9);

    while (squares[x] !== 0) {
        x = Math.floor(Math.random() * 9);
    }

    squares[x] = 2;

    x++;

    let canvas = document.getElementById("canvas" + x);
    let context = canvas.getContext("2d");

    context.beginPath();
    context.arc(75, 75, 65, 0, 2 * Math.PI);
    context.lineWidth = 10;
    context.strokeStyle = "blue";
    context.stroke();
}

$("canvas").click(function () {

    if (!won) {
        let clickelem = $(this).attr('id') + "";

        let num = parseInt(clickelem.slice(6, 7));

        if (squares[num - 1] !== 0) {
            return;
        }

        squares[num - 1] = 1;

        let canvas = document.getElementById(clickelem);
        let context = canvas.getContext("2d");

        context.moveTo(10, 10);
        context.lineTo(140, 140);

        context.moveTo(10, 140);
        context.lineTo(140, 10);

        context.lineWidth = 10;
        context.strokeStyle = "green";
        context.stroke();

        isWon();

        moves++;

        if (moves === 5) {
            isFinished = true;
            $("#results").html("It's a draw!!");
            $("#rep").css("width", "250px");
            $("#tryagain").fadeIn();
        }

        if (!isFinished) {
            opponentPlay();
        }

        isWon();
    }
});

$("canvas").hover(function () {
    let sel = $(this).attr('id') + "";
    let canvas = document.getElementById(sel);
    let context = canvas.getContext("2d");
    context.fillStyle = "#c0c170";
    context.fillRect(0, 0, 150, 150);
    context.stroke();

    isWon();
}, function () {
    let sel = $(this).attr('id') + "";
    let canvas = document.getElementById(sel);
    let context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, 150, 150);
    context.stroke();

    isWon();
});

$("#tryagain").click(function () {
    location.reload();
})