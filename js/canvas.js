class DrawingCanvas {
    constructor(
        name,
        emoji,
        img,
        imgBackground,
        frontImg,
        time,
        errorsLeft,
        sound,
        info,
        points,
    ) {
        // chaque dessin à une image correspondante qui sera revelée à la fin / à passer en paramètre dans le constructor ?
        this.name = name;
        this.emoji = emoji;
        this.img = new Image();
        this.img.src = img;
        this.background = new Image();
        this.background.src = imgBackground;
        this.frontImg = new Image();
        this.frontImg.src = frontImg;
        // this.time = temps défini pour résoudre le dessin
        this.time = time;
        // this.errorLeft = nombre d'erreurs possibles pour ce dessin
        this.info = info;
        this.sound = sound;
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
            ctx.font = "15px Roboto";
            ctx.fillStyle = "#3e3e3e";
            ctx.fillText(`${index + 1}`, element.x + 2, element.y - 5);
        });

        // Un dessin est constitué d'un ensemble de points --> envoyé sous forme d'objet ou de tableau en paramètre ?
        // lors du lancement du jeu, on place les points avec leur numéro (index) sur le canvas
    }
    gameOver() {
        // on définie une fonction qui permettra d'afficher le message de Gameover si le joueur a fait trop d'erreurs
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Shadows Into Light";
        ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2);
        stopTimer();
    }
    winner() {
        // on définie une fonction qui permettra d'afficher l'image associé pour révéler le dessin quand tous les points sont rattachés.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.background, 0, 0);
        ctx.drawImage(this.img, 0, 0);
        ctx.drawImage(this.frontImg, 0, 0);
        gameIntroText.innerHTML =
            "Congratulations, you found the " + this.name + this.emoji;
        var audio = new Audio(this.sound);
        goodToKnow.innerHTML = this.info;
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 3000);
        stopTimer();
    }
}