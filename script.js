const plane = document.querySelector(".plane");
let score = document.getElementById("score");
let seconds = 0, minutes = 0, hours = 0;
let timerID;
let obstaclesIntervalID;
let puncture = 0;
let gameOver = document.querySelector(".gameOver");
let appearanceTime = 1500;
let moveDistance = 52;
let clones = [];

function collisionObjects(projectile) {
    const rect1 = projectile.getBoundingClientRect();
    for (let i = 0; i < clones.length; ++i) {
        const rect2 = clones[i].getBoundingClientRect();
        if (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        ) {
            ++puncture;
            clones[i].remove();
            projectile.remove();
        }
    }
}

function checkCollision(clone) {
    const rect1 = clone.getBoundingClientRect();
    const rect2 = plane.getBoundingClientRect();
    if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    ) {
        score.textContent = "Score: " + puncture;
        gameOver.style.display = "block";
        seconds = 0;
        minutes = 0;
        hours = 0;
        clearInterval(timerID);
        clearInterval(obstaclesIntervalID);
        plane.style.display = "none";
    }
}

function objection() {
    const containerObstacles = document.querySelector(".containerObstacles");
    let clone = document.createElement("img");
    clone.src = "assets/output-onlinepngtools (1).png";
    const heightOfObstacles = 10;
    clone.style.height = heightOfObstacles + "rem";
    clone.classList.add("obstacles");
    const maxLimit = 86; 
    clone.style.left = Math.floor((maxLimit - 1 + 1) * Math.random()) + "%";
    clone.style.display = "block";
    containerObstacles.appendChild(clone);
    clones.push(clone);
    const timeDeletion = 5000, timeUntilAccess = 100;
    setTimeout (function() {
        clone.classList.add("down");
        setInterval (function() {
            checkCollision(clone);
        }, timeUntilAccess);
        setTimeout (function() {
            clone.remove();
        }, timeDeletion);
    }, timeUntilAccess);
}

function release() {
    const containerProjectile = document.querySelector(".containerProjectile");
    let projectile = document.createElement("img");
    projectile.src = "assets/Projectile.png";
    projectile.classList.add("projectile");
    const moveDistanceIncrease = 2;
    projectile.style.left = (moveDistance + moveDistanceIncrease) + "%";
    const eightyNine = 89;
    projectile.style.top = eightyNine + "%";
    const projectileHeight = 2;
    projectile.style.height = projectileHeight + "rem";
    projectile.style.display = "block";
    containerProjectile.appendChild(projectile);
    const projectileErasure = 2800, timeUntilAccess = 100;
    setTimeout(function() {
        projectile.classList.add("up");
        setInterval (function() {
            collisionObjects(projectile);
        }, timeUntilAccess);
        setTimeout(function() {
            projectile.remove();
        }, projectileErasure);
    }, timeUntilAccess);
}

function pad(value) {
    const theNamberOfDigits = 2;
    return value.toString().padStart(theNamberOfDigits, "0");
}

function modifyAppearanceTime() {
    const timeLimit = 300, decreaseTime = 150;
    if (appearanceTime >= timeLimit) {
        appearanceTime -= decreaseTime;
    }
    clearInterval(obstaclesIntervalID);
    obstaclesIntervalID = setInterval(objection, appearanceTime);
}

function startTimer() {
    const convertMinutes = 60, convertHours = 60, timeModification = 10, recallToTheSecond = 1000;
    timerID = setInterval(function() {
        ++seconds;
        if (seconds === convertMinutes) {
            seconds = 0;
            ++minutes;
        }
        if (minutes === convertHours) {
            minutes = 0;
            ++hours;
        }
        if (seconds % timeModification === 0) {
            modifyAppearanceTime();
        }
        let time = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        document.getElementById("timer").textContent = time;
    }, recallToTheSecond);
    obstaclesIntervalID = setInterval (objection, appearanceTime);
}

function startGame() {
    let timer = document.getElementById("timer");
    timer.style.display = "block";
    let start = document.getElementById("start");
    start.style.display = "none";
    plane.style.display = "block";
    const moveTheAirplane = 5, moveLimit = 95;
    document.addEventListener('keydown', function(event) {
        if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            moveDistance += moveTheAirplane;
            if (moveDistance < moveLimit) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance -= moveTheAirplane;
            }
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            moveDistance -= moveTheAirplane;
            if (moveDistance >= 0) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance += moveTheAirplane;
            }
        }
        if (event.key === " " || event.key === "ArrowUp") {
            release();
        }
    });
    startTimer();
}

function restartGame() {
    startTimer();
    plane.style.display = "block";
    gameOver.style.display = "none";
    puncture = 0;
    appearanceTime = 1500;
    clearInterval(obstaclesIntervalID);
    obstaclesIntervalID = setInterval(objection, appearanceTime);
    moveDistance = 52;
    plane.style.left = moveDistance + "%";
}
