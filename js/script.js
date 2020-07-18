const $canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
let draw;
let currentPoint;
let currentNumberPoint;
let followingNumberPoint = 1;
let previousNumberPoint;
let gameIntroText = document.querySelector("#instructions");
let goodToKnow = document.querySelector("#goodtoknow");
let int;

const drawings = {
  name: "girafe",
  emoji: "🦒",
  img: "/images/girafe.png",
  imgBackground: "/images/fond-arriere.png",
  frontImg: "/images/fond-avant.png",
  time: 60,
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


// création du board de dessin
const startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw = new DrawingCanvas(
      drawings.name,
      drawings.emoji,
      drawings.img,
      drawings.imgBackground,
      drawings.frontImg,
      drawings.time,
      drawings.errorsLeft,
      drawings.points
    ); // girafe
    draw.drawPoints(drawings.points);
    printTimer();
    checkTimer();
    displaynumberErrors(draw.errorsLeft);
    gameIntroText.innerHTML = "First step : find the number 1";
  });
}

// // Vérification du clic sur les points
//function checkClickPoints() {}
canvas.addEventListener("click", (event) => {
  // currentPoint = [event.clientX, event.clientY]
  let array = draw.points;
  const rect = canvas.getBoundingClientRect();
  const xClickedPoint = event.clientX - rect.left;
  const yClickedPoint = event.clientY - rect.top;
  console.log("x: " + xClickedPoint + " y: " + yClickedPoint);
  array.forEach((element, index) => {
    // x doit être compris entre 5 de + et 5 de moins par rapport au x cliqué et y également
    if (
      element.x > xClickedPoint - 5 &&
      element.y > yClickedPoint - 5 &&
      element.x < xClickedPoint + 5 &&
      element.y > yClickedPoint - 5 &&
      element.x < xClickedPoint + 5 &&
      element.y < yClickedPoint + 5 &&
      element.x > xClickedPoint - 5 &&
      element.y < yClickedPoint + 5
    ) {
      console.log("coordinate ok");
      currentNumberPoint = index + 1;
      previousNumberPoint = index - 1;
      // si le numéro est le premier alors on affiche l'instruction mais aucun trait ne se dessine
      if (element.x === array[0].x && element.y === array[0].y) {
        console.log("first element");
        followingNumberPoint++;
        gameIntroText.innerHTML = "Next step : Find the number 2";
        // lorsque j'arrive au dernier point alors c'est gagné et j'affiche mon dessin
        // TODO : gérer la fermeture de ma forme -> clic sur le 1 ? ou fillForm ?
      } else if (currentNumberPoint === 7) {
        console.log("last element");
        draw.winner();

        // si le numéro du point cliqué correspond aux numéros suivants à trouver alors on trace la ligne
      } else if (followingNumberPoint === currentNumberPoint) {
        followingNumberPoint++;
        console.log("now find number " + followingNumberPoint);
        drawLines(
          element.x,
          element.y,
          array[previousNumberPoint].x,
          array[previousNumberPoint].y
        );
        //sinon décrémenter le compteur d 'erreurs et mettre à jour l'affichage
      } else {
        draw.errorsLeft--;
        //console.log("errors left " + draw.errorsLeft);
        showErrorsLeft(draw.errorsLeft);
      }
    }
  });
});

// function de suivi de la souris
//document.addEventListener('onmousemove')

// Dessin de la ligne du point 1 au point 2, au suivi de la souris (en option)
function drawLines(xFrom, yFrom, xTo, yTo) {
  ctx.beginPath();
  ctx.moveTo(xFrom, yFrom);
  ctx.lineTo(xTo, yTo);
  ctx.stroke();
}

function showErrorsLeft(errors) {
  if (errors != 0) {
    ctx.clearRect(0, 0, 300, 40);
    ctx.font = "20px Roboto";
    ctx.fillText(`${errors} errors left`, 10, 30);
  } else {
    draw.gameOver();
  }
}

function displaynumberErrors(errors) {
  ctx.clearRect(0, 0, 300, 40);
  ctx.font = "20px Roboto";
  ctx.fillText(`${errors} errors left`, 10, 30);
}

function printTimer() {
  int = setInterval(() => {
    draw.time--;
    //console.log(draw.time);
    ctx.clearRect((canvas.width - 250), 0, 300, 40);
    ctx.font = "20px Roboto";
    ctx.fillText(`Time left : ${draw.time} second(s)`, (canvas.width - 250), 30);
  }, 1000);
}

function checkTimer() {
  setInterval(() => {
    if (draw.time === 0) {
      draw.gameOver();
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(int);
}