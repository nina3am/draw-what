const $canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
let draw;
let currentPoint = 0; // index du point
let currentNumberPoint; // numéro du point
let followingNumberPoint = 1; // numéro précédent
let mouseLineStartNumber = 0; // point de départ de la souris
let gameIntroText = document.querySelector("#instructions");
let goodToKnow = document.querySelector("#goodtoknow");
let startButton = document.getElementById("start-button")
let tryAgainButton = document.getElementById("try-again")
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
    ctx.fillText(`${this.index + 1}`, this.x + 1, this.y - 5);
  }
}

const image = new Image()
image.src = "/images/crayon-intro.png"
window.addEventListener('load', (event) => {
  const x = (canvas.width / 2 - image.width / 2);
  const y = (canvas.height / 2 - image.height / 2);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, x, y);
});


const drawings = [{
  name: "girafe",
  emoji: "🦒",
  img: "/images/girafe.png",
  imgBackground: "/images/fond-arriere.png",
  frontImg: "/images/fond-avant.png",
  imgEnd: "/images/game-over",
  time: 60,
  errorsLeft: 3,
  sound: "/sons/0879.mp3",
  endSound: "/sons/oups.mp3",
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
      x: 460,
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
      x: 231,
      y: 740,
    },
    {
      x: 233,
      y: 641,
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
}, {
  name: "elephant",
  emoji: "🐘",
  img: "/images/elephant.png",
  imgBackground: "/images/fond-arriere-elephant.png",
  frontImg: "/images/fond-avant-elephant.png",
  imgEnd: "/images/game-over",
  time: 120,
  errorsLeft: 5,
  sound: "/sons/elephant-2.mp3",
  endSound: "/sons/oups.mp3",
  info: "💡Did you the baby elephant sucks his trunk to feel better, </br> like a baby</br> <button id=\"btn-info\"><a href=\"https://secouchermoinsbete.fr/70738-les-elephanteaux-sucent-leur-trompe\" target=\"_blank\">See more here<a> </button>",
  points: [{
      x: 344,
      y: 678,
    },
    {
      x: 308,
      y: 682,
    },
    {
      x: 255,
      y: 671,
    },
    {
      x: 257,
      y: 643,
    },
    {
      x: 222,
      y: 607,
    },
    {
      x: 207,
      y: 545,
    },
    {
      x: 208,
      y: 500,
    },
    {
      x: 173,
      y: 499,
    },
    {
      x: 182,
      y: 479,
    },
    {
      x: 152,
      y: 485,
    },
    {
      x: 125,
      y: 556,
    },
    {
      x: 114,
      y: 592,
    },
    {
      x: 140,
      y: 588,
    },
    {
      x: 167,
      y: 604,
    },
    {
      x: 148,
      y: 636,
    },
    {
      x: 102,
      y: 644,
    },
    {
      x: 77,
      y: 631,
    },
    {
      x: 85,
      y: 570,
    },
    {
      x: 71,
      y: 533,
    },
    {
      x: 66,
      y: 455,
    },
    {
      x: 87,
      y: 448,
    },
    {
      x: 61,
      y: 407,
    },
    {
      x: 64,
      y: 376,
    },
    {
      x: 63,
      y: 340,
    },
    {
      x: 57,
      y: 314,
    },
    {
      x: 66,
      y: 240,
    },
    {
      x: 90,
      y: 246,
    },
    {
      x: 124,
      y: 241,
    },
    {
      x: 149,
      y: 242,
    },
    {
      x: 189,
      y: 233,
    },
    {
      x: 229,
      y: 246,
    },
    {
      x: 259,
      y: 261,
    },
    {
      x: 306,
      y: 251,
    },
    {
      x: 367,
      y: 258,
    },
    {
      x: 345,
      y: 272,
    },
    {
      x: 387,
      y: 281,
    },
    {
      x: 427,
      y: 286,
    },
    {
      x: 468,
      y: 298,
    },
    {
      x: 503,
      y: 319,
    },
    {
      x: 528,
      y: 347,
    },
    {
      x: 543,
      y: 383,
    },
    {
      x: 541,
      y: 425,
    },
    {
      x: 568,
      y: 477,
    },
    {
      x: 544,
      y: 476,
    },
    {
      x: 525,
      y: 461,
    },
    {
      x: 518,
      y: 496,
    },
    {
      x: 513,
      y: 539,
    },
    {
      x: 515,
      y: 587,
    },
    {
      x: 519,
      y: 620,
    },
    {
      x: 506,
      y: 648,
    },
    {
      x: 461,
      y: 659,
    },
    {
      x: 420,
      y: 652,
    },
    {
      x: 400,
      y: 577,
    },
    {
      x: 394,
      y: 621,
    },
    {
      x: 396,
      y: 638,
    },
    {
      x: 356,
      y: 643,
    },
  ]
}, ];

function anim() {
  // effacer le canvas
  // tracer tous tes points
  // tracer toustes les lignes
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.drawPoints(draw.points);
  drawAllLines(currentPoint);
  drawMouseLines();
  drawPen();
  displaynumberErrors(draw.errorsLeft);
  printTimer();
  arret = requestAnimationFrame(anim)
}

if (startButton) {
  startButton.addEventListener("click", (event) => {
    startGame();
    startButton.id = "try-again"
    document.querySelector('#try-again span').innerText = "Try Again"
  });
}

if (tryAgainButton) {
  tryAgainButton.addEventListener("click", (event) => {
    startGame();
    tryAgainButton.id = "start-button"
    document.querySelector('#try-again span').innerText = "Start drawing"
  });
}

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stopTimer();
  rdmNumber = Math.floor(Math.random() * 2)
  draw = new DrawingCanvas(
    drawings[rdmNumber].name,
    drawings[rdmNumber].emoji,
    drawings[rdmNumber].img,
    drawings[rdmNumber].imgBackground,
    drawings[rdmNumber].frontImg,
    drawings[rdmNumber].imgEnd,
    drawings[rdmNumber].time,
    drawings[rdmNumber].errorsLeft,
    drawings[rdmNumber].sound,
    drawings[rdmNumber].endSound,
    drawings[rdmNumber].info,
    drawings[rdmNumber].points
  );
  currentPoint = 0; // index du point
  currentNumberPoint; // numéro du point
  followingNumberPoint = 1; // numéro précédent
  mouseLineStartNumber = 0; // point de départ de la souris
  gameIntroText.innerHTML = "First step : find the number 1";
  goodToKnow.innerText = " ";
  drawings.time = 0;
  anim();
  checkTimer();
}

// // Vérification du clic sur les points
canvas.addEventListener("click", (event) => {
  if (!draw) return
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
      } else if (currentNumberPoint === array.length) {
        //console.log("last element");
        draw.winner();
        // si le numéro du point cliqué correspond aux numéros suivants à trouver alors on trace la ligne
      } else if (followingNumberPoint === currentNumberPoint) {
        followingNumberPoint++;
        mouseLineStartNumber++;
        gameIntroText.innerHTML = `Next step : Find the number ${index + 2}`;
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

// Fait grossir le point
function biggerPoint(point) {
  point.radius = 7;
}

// Fait diminuer la taille du point
function clearBiggerPoint(point) {
  point.radius = 3;
}

// Donne la position de la souris sur le canvas
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// dessine toutes les lignes
function drawAllLines(currentPoint) {
  draw.points.forEach((element, index) => {
    const prevPoint = index - 1
    if (draw.points[index].line === true) {
      drawLines(element.x, element.y, draw.points[prevPoint].x, draw.points[prevPoint].y)
    }
  })
}

//  Permet de dessiner la ligne au mouseover
function drawMouseLines() {
  if (currentPoint != 0) {
    drawLines(draw.points[mouseLineStartNumber].x, draw.points[mouseLineStartNumber].y, mousePosition.x, mousePosition.y);
  }
}

const pen = new Image()
pen.src = "/images/crayon.png"

// Permet d'afficher le crayon
function drawPen() {
  const x = mousePosition.x - (pen.width / 0, 5)
  const y = mousePosition.y - (pen.height)
  ctx.drawImage(pen, x, y)
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