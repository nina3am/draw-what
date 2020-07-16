class DrawingCanvas {
    constructor(img, time, errorsLeft, points) {
        this.context = document.getElementById('game-board').getContext('2d')
        // chaque dessin à une image correspondante qui sera revelée à la fin / à passer en paramètre dans le constructor ?
        this.img = img;
        // this.time = temps défini pour résoudre le dessin
        this.time = time;
        // this.errorLeft = nombre d'erreurs possibles pour ce dessin
        this.errorsLeft = errorsLeft;
        this.actualPoint = 0;
        this.points = points;
    }
    drawPoints() {
        this.context.fillRect(0,0, 100, 100)
        // Un dessin est constitué d'un ensemble de points --> envoyé sous forme d'objet ou de tableau en paramètre ?
        // lors du lancement du jeu, on place les points avec leur numéro (index) sur le canvas 
    }
    gameOver() {
        // on définie une fonction qui permettra d'afficher le message de Gameover si le dessin n'est pas finalisé dans le temps imparti
        //ou si le joueur a fait trop d'erreurs

    }
    winner() {
        // on définie une fonction qui permettra d'afficher l'image associé pour révéler le dessin quand tous les points sont rattachés
    }
}

const drawings = {
        name: girafe,
        img: '/images/girafe.png',
        time: 30,
        errorsLeft: 3
        points: [{
            
        }]
            x: 268,
            y: 333, 
        }, {
            x : 199,
            y : 204,
        }
        };
    {
        name: kangourou,
        img : '/images/girafe.png',
        time : 30,
        errorsLeft : 3,
    }

// création du dessin de girafe


// Dessin de la ligne du point 1 au point 2, au suivi de la souris (en option)
function drawLines() {

}

// Vérification du clic sur les points suivants // à coupler avec clickFirstPoint ()
function checkClickPoints() {

}

const startButton = document.getElementById('start-button');

if (startButton) {
    startButton.addEventListener('click', event => {
        let girafe = new DrawingCanvas(drawings[0].img, drawings[0].time, drawings[0].errorsLeft, drawings[0].points) // girafe
        girafe.drawPoints();
    })
}




// function de suivi de la souris 
//document.addEventListener('onmousemove')