const $canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
let draw;
let currentPoint = 0; // index du point
let currentNumberPoint; // numéro du point
let followingNumberPoint = 1; // numéro précédent
let mouseLineStartNumber = 0; // point de départ de la souris
let gameIntroText = document.querySelector("#instructions");
let goodToKnow = document.querySelector("#goodtoknow");
let int;
let arret;
let mousePosition = {
  x: 0,
  y: 0,
}

class Point {
  constructor(index, x, y) {
    this.index = index,
      this.x = x,
      this.y = y,
      this.radius = 3;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "15px Roboto";
    ctx.fillStyle = "#3e3e3e";
    ctx.fillText(`${this.index + 1}`, this.x + 2, this.y - 5);
  }
}
// function setupCanvas(canvas) {
//   // Get the device pixel ratio, falling back to 1.
//   // var dpr = window.devicePixelRatio || 1;
//   var dpr = 1;
//   // Get the size of the canvas in CSS pixels.
//   var rect = canvas.getBoundingClientRect();
//   // Give the canvas pixel dimensions of their CSS
//   // size * the device pixel ratio.
//   canvas.width = rect.width * dpr;
//   canvas.height = rect.height * dpr;
//   // Scale all drawing operations by the dpr, so you
//   // don't have to worry about the difference.
//   context.scale(dpr, dpr);
//   console.log(dpr)
//   return context;
// }

// // Now this line will be the same size on the page
// // but will look sharper on high-DPI devices!
// const ctx = setupCanvas($canvas);


const drawings = {
  name: "girafe",
  emoji: "🦒",
  img: "/images/girafe.png",
  imgBackground: "/images/fond-arriere.png",
  frontImg: "/images/fond-avant.png",
  time: 60,
  errorsLeft: 3,
  sound: "/sons/0879.mp3",
  info: "💡Did you know the girafe doesn't make any sound ? </br> <button id=\"btn-info\"><a href=\"https://www.maxisciences.com/girafe/a-quoi-ressemble-le-cri-de-la-girafe-des-scientifiques-ont-trouve-la-reponse_art35980.html\" target=\"_blank\">See more here<a> </button>",
  points: [{
      x: 330, //1
      y: 298,
    },
    {
      x: 275, //2
      y: 174,
    },
    {
      x: 216, //3
      y: 160,
    },
    {
      x: 190, //4
      y: 151,
    },
    {
      x: 243, //5
      y: 106,
    },
    {
      x: 301, //6
      y: 110,
    },
    {
      x: 330, //7
      y: 85,
    },
    {
      x: 326, //8
      y: 42,
    },
    {
      x: 349, //9
      y: 74,
    },
    {
      x: 370,
      y: 82,
    },
    {
      x: 405,
      y: 86,
    },
    {
      x: 399,
      y: 51,
    },
    {
      x: 444,
      y: 61,
    },
    {
      x: 430,
      y: 94,
    },
    {
      x: 496,
      y: 104,
    },
    {
      x: 545,
      y: 126,
    },
    {
      x: 561,
      y: 150,
    },
    {
      x: 531,
      y: 160,
    },
    {
      x: 477,
      y: 145,
    },
    {
      x: 469,
      y: 256,
    },
    {
      x: 416,
      y: 306,
    },
    {
      x: 420,
      y: 390,
    },
    {
      x: 461,
      y: 454,
    },
    {
      x: 515,
      y: 521,
    },
    {
      x: 527,
      y: 589,
    },
    {
      x: 518,
      y: 640,
    },
    {
      x: 481,
      y: 695,
    },
    {
      x: 468,
      y: 713,
    },
    {
      x: 472,
      y: 748,
    },
    {
      x: 402,
      y: 751,
    },
    {
      x: 385,
      y: 737,
    },
    {
      x: 363,
      y: 740,
    },
    {
      x: 335,
      y: 752,
    },
    {
      x: 278,
      y: 746,
    },
    {
      x: 284,
      y: 709,
    },
    {
      x: 233,
      y: 641,
    },
    {
      x: 231,
      y: 740,
    },
    {
      x: 238,
      y: 519,
    },
    {
      x: 319,
      y: 438,
    },
    {
      x: 330,
      y: 355,
    },
  ],
};
//     {
//         name: kangourou,
//         img : '/images/girafe.png',
//         time : 30,
//         errorsLeft : 3,
//     }

function anim() {
  // effacer le canvas
  // tracer tous tes points
  // tracer toustes les lignes
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.drawPoints(draw.points);
  drawAllLines(currentPoint);
  drawMouseLines();
  displaynumberErrors(draw.errorsLeft);
  printTimer();
  arret = requestAnimationFrame(anim)
}

// création du board de dessin
const startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rdmNumber = Math.random() * 2
    draw = new DrawingCanvas(
      drawings.name,
      drawings.emoji,
      drawings.img,
      drawings.imgBackground,
      drawings.frontImg,
      drawings.time,
      drawings.errorsLeft,
      drawings.sound,
      drawings.info,
      drawings.points
    ); // girafe
    anim();
    checkTimer();
    gameIntroText.innerHTML = "First step : find the number 1";
  });
}


// // Vérification du clic sur les points
//function checkClickPoints() {}
canvas.addEventListener("click", (event) => {
  // currentPoint = [event.clientX, event.clientY]
  const array = draw.points;
  const rect = canvas.getBoundingClientRect();
  const xClickedPoint = event.clientX - rect.left;
  const yClickedPoint = event.clientY - rect.top;
  //console.log("x: " + xClickedPoint + " y: " + yClickedPoint);
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
      //console.log("coordinate ok");
      currentNumberPoint = index + 1;
      currentPoint++;
      // si le numéro est le premier alors on affiche l'instruction mais aucun trait ne se dessine
      if (element.x === array[0].x && element.y === array[0].y) {
        //console.log("first element");
        followingNumberPoint++;
        gameIntroText.innerHTML = "Next step : Find the number 2";
        // lorsque j'arrive au dernier point alors c'est gagné et j'affiche mon dessin
        // TODO : gérer la fermeture de ma forme -> clic sur le 1 ? ou fillForm ?
      } else if (currentNumberPoint === 7) {
        //console.log("last element");
        draw.winner();
        // si le numéro du point cliqué correspond aux numéros suivants à trouver alors on trace la ligne
      } else if (followingNumberPoint === currentNumberPoint) {
        followingNumberPoint++;
        mouseLineStartNumber++;
        //console.log("now find number " + followingNumberPoint);
        draw.points[index].line = true;
        //sinon décrémenter le compteur d 'erreurs et mettre à jour l'affichage
      } else {
        draw.errorsLeft--;
        //console.log("errors left " + draw.errorsLeft);
        showErrorsLeft(draw.errorsLeft);
      }
    }
  });
});

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
  ctx.clearRect((canvas.width - 220), 0, 300, 40);
  ctx.font = "20px Roboto";
  ctx.fillText(`Time left : ${draw.time} second(s)`, (canvas.width - 220), 30);
  // setInterval(() => {
  //   ctx.clearRect((canvas.width - 220), 0, 300, 40);
  //   ctx.font = "20px Roboto";
  //   ctx.fillText(`Time left : ${draw.time} second(s)`, (canvas.width - 220), 30);
  // }, 1000);
}

function checkTimer() {
  int = setInterval(() => {
    draw.time--;
    if (draw.time === 0) {
      draw.gameOver();
      stopTimer();
      ctx.clearRect((canvas.width - 220), 0, 300, 40);

    }
  }, 1000);
}

function stopTimer() {
  clearInterval(int);
}

function biggerPoint(point) {
  point.radius = 7;
}

function clearBiggerPoint(point) {
  point.radius = 3;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

//TODO: dessine toutes les lignes
function drawAllLines(currentPoint) {
  draw.points.forEach((element, index) => {
    const prevPoint = index - 1
    if (draw.points[index].line === true) {
      drawLines(element.x, element.y, draw.points[prevPoint].x, draw.points[prevPoint].y)
    }
  })
}

function drawMouseLines() {
  if (currentPoint != 0) {
    drawLines(draw.points[mouseLineStartNumber].x, draw.points[mouseLineStartNumber].y, mousePosition.x, mousePosition.y);
  }
}

canvas.addEventListener('mousemove', function (evt) {
  if (!draw) return
  var mousePos = getMousePos(canvas, evt);
  mousePosition.x = mousePos.x;
  mousePosition.y = mousePos.y;
  // const array = draw.points;
  draw.points.forEach((element, index) => {
    if (
      element.x > mousePos.x - 5 &&
      element.y > mousePos.y - 5 &&
      element.x < mousePos.x + 5 &&
      element.y > mousePos.y - 5 &&
      element.x < mousePos.x + 5 &&
      element.y < mousePos.y + 5 &&
      element.x > mousePos.x - 5 &&
      element.y < mousePos.y + 5
    ) {
      biggerPoint(element);
    } else {
      clearBiggerPoint(element);
    }
  });
});