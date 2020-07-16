const $canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
let currentPoint;
let currentNumberPoint;
let followingNumberPoint = 1;

const drawings = {
    name: "girafe",
    img: "/images/girafe.png",
    time: 30,
    errorsLeft: 3,
    points: [{
            x: 268,
            y: 333,
        },
        {
            x: 199,
            y: 204,
        },
        {
            x: 148,
            y: 188,
        },
        {
            x: 117,
            y: 171,
        },
        {
            x: 177,
            y: 132,
        },
        {
            x: 236,
            y: 135,
        },
        {
            x: 266,
            y: 110,
        },
        {
            x: 263,
            y: 63,
        },
        {
            x: 288,
            y: 97,
        },
        {
            x: 311,
            y: 105,
        },
        {
            x: 342,
            y: 74,
        },
        {
            x: 387,
            y: 84,
        },
        {
            x: 374,
            y: 120,
        },
        {
            x: 395,
            y: 133,
        },
        {
            x: 443,
            y: 130,
        },
        {
            x: 494,
            y: 151,
        },
        {
            x: 514,
            y: 177,
        },
        {
            x: 482,
            y: 186,
        },
        {
            x: 423,
            y: 170,
        },
        {
            x: 436,
            y: 234,
        },
        {
            x: 416,
            y: 286,
        },
        {
            x: 356,
            y: 335,
        },
        {
            x: 363,
            y: 427,
        },
        {
            x: 373,
            y: 477,
        },
        {
            x: 406,
            y: 493,
        },
        {
            x: 462,
            y: 565,
        },
        {
            x: 477,
            y: 638,
        },
        {
            x: 468,
            y: 686,
        },
        {
            x: 428,
            y: 745,
        },
        {
            x: 414,
            y: 763,
        },
        {
            x: 419,
            y: 801,
        },
        {
            x: 345,
            y: 806,
        },
        {
            x: 324,
            y: 791,
        },
        {
            x: 304,
            y: 793,
        },
        {
            x: 271,
            y: 804,
        },
        {
            x: 209,
            y: 798,
        },
        {
            x: 218,
            y: 759,
        },
        {
            x: 163,
            y: 687,
        },
        {
            x: 169,
            y: 562,
        },
        {
            x: 256,
            y: 480,
        },
        {
            x: 266,
            y: 391,
        },
    ],
};
//     {
//         name: kangourou,
//         img : '/images/girafe.png',
//         time : 30,
//         errorsLeft : 3,
//     }

let draw;
// création du board de dessin
const startButton = document.getElementById("start-button");
if (startButton) {
    startButton.addEventListener("click", (event) => {
        draw = new DrawingCanvas(
            drawings.img,
            drawings.time,
            drawings.errorsLeft,
            drawings.points
        ); // girafe
        draw.drawPoints(drawings.points);
    });
}

// // Vérification du clic sur les points 
//function checkClickPoints() {}
canvas.addEventListener('click', event => {
    // currentPoint = [event.clientX, event.clientY]
    let array = draw.points;
    const rect = canvas.getBoundingClientRect()
    const xClickedPoint = event.clientX - rect.left
    const yClickedPoint = event.clientY - rect.top
    console.log("x: " + xClickedPoint + " y: " + yClickedPoint)
    array.forEach((element, index) => {
        // x doit être compris entre 5 de + et 5 de moins par rapport au x cliqué et y également
        if (element.x > xClickedPoint - 5 && element.y > yClickedPoint - 5 &&
            element.x < xClickedPoint + 5 && element.y > yClickedPoint - 5 &&
            element.x < xClickedPoint + 5 && element.y < yClickedPoint + 5 &&
            element.x > xClickedPoint - 5 && element.y < yClickedPoint + 5) {
            console.log("coordinate ok");
            currentNumberPoint = index + 1;
            console.log(currentNumberPoint)
            // si le numéro du point cliqué correspond aux numéros suivants à trouver alors on trace la ligne
            if (followingNumberPoint === currentNumberPoint) {
                followingNumberPoint++;
                console.log('now find number ' + followingNumberPoint)
                drawLines(element.x, element.y, 0, 0)
                // sinon décrémenter le compteur d'erreurs et mettre à jour l'affichage
            } else {
                draw.errorsLeft--;
                console.log("errors left " + draw.errorsLeft)
                showErrorsLeft(draw.errorsLeft)
            }
        } else {
            console.log("coordinate wrong");
        }
    });
});



// function de suivi de la souris
//document.addEventListener('onmousemove')

// Dessin de la ligne du point 1 au point 2, au suivi de la souris (en option)
function drawLines(xFrom, yFrom, xTo, yTo) {
    ctx.beginPath();
    ctx.moveTo(xFrom, yFrom);
    ctx.lineTo(0, 0)
    ctx.stroke();
}

function showErrorsLeft(errors) {
    ctx.clearRect(0, 0, 300, 33);
    ctx.font = "30px Arial";
    ctx.fillText(`${errors} errors left`, 30, 30);

}