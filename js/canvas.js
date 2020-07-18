class DrawingCanvas {
    constructor(img, time, errorsLeft, points) {
        // chaque dessin à une image correspondante qui sera revelée à la fin / à passer en paramètre dans le constructor ?
        this.img = new Image();
        this.img.src = img;
        // this.time = temps défini pour résoudre le dessin
        this.time = time;
        // this.errorLeft = nombre d'erreurs possibles pour ce dessin
        this.errorsLeft = errorsLeft;
        this.currentPoint = 0;
        this.points = points;
    }
    drawPoints(points) {
        // On passe un array en paramètre
        points.forEach((element, index) => {
            //ctx.fillRect(element.x, element.y, 10, 10);
            ctx.beginPath();
            ctx.arc(element.x, element.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "18px Arial";
            ctx.fillText(`${index + 1}`, element.x + 5, element.y + 5);
        });

        // Un dessin est constitué d'un ensemble de points --> envoyé sous forme d'objet ou de tableau en paramètre ?
        // lors du lancement du jeu, on place les points avec leur numéro (index) sur le canvas
    }
    gameOver() {
        // on définie une fonction qui permettra d'afficher le message de Gameover si le dessin n'est pas finalisé dans le temps imparti
        //ou si le joueur a fait trop d'erreurs
        if (this.errorsLeft === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2);
        }
    }
    winner() {
        // on définie une fonction qui permettra d'afficher l'image associé pour révéler le dessin quand tous les points sont rattachés.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.img, 0, 0)
    }
}