class DrawingCanvas {
    constructor(
        name,
        emoji,
        img,
        imgBackground,
        frontImg,
        imgEnd,
        time,
        errorsLeft,
        sound,
        endSound,
        info,
        points
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
        this.imgEnd = new Image();
        this.imgEnd.src = imgEnd;
        // this.time = temps défini pour résoudre le dessin
        this.time = time;
        // this.errorLeft = nombre d'erreurs possibles pour ce dessin
        this.info = info;
        this.sound = sound;
        this.endSound = endSound;
        this.errorsLeft = errorsLeft;
        this.currentPoint = 0;
        this.points = [];
        points.forEach((point, index) => {
            this.points.push(new Point(index, point.x, point.y)) //
        })

    }
    drawPoints(points) {
        // On passe un array en paramètre
        points.forEach((element, index) => {
            element.draw();
        });

        // Un dessin est constitué d'un ensemble de points --> envoyé sous forme d'objet ou de tableau en paramètre ?
        // lors du lancement du jeu, on place les points avec leur numéro (index) sur le canvas
    }
    gameOver() {
        // on définie une fonction qui permettra d'afficher le message de Gameover si le joueur a fait trop d'erreurs
        cancelAnimationFrame(arret);
        stopTimer();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.imgEnd, 0, 0)
        ctx.font = "50px Roboto";
        ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 3);
        var audio = new Audio(this.endSound);
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 3000);
        startButton.id = "try-again"
        document.querySelector('#try-again span').innerText = "Try Again"
    }
    winner() {
        // on définie une fonction qui permettra d'afficher l'image associé pour révéler le dessin quand tous les points sont rattachés.
        stopTimer();
        cancelAnimationFrame(arret);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.background, 0, 0);
        ctx.drawImage(this.img, 0, 0);
        ctx.drawImage(this.frontImg, 0, 0);
        gameIntroText.innerHTML =
            "Congratulations, you found the " + this.name + " " + this.emoji;
        var audio = new Audio(this.sound);
        goodToKnow.innerHTML = this.info;
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 3000);
        startButton.id = "try-again"
        document.querySelector('#try-again span').innerText = "Try Again"
    }
}