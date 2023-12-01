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
const oneHundred = 100, two = 2, ten = 10;

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
            console.log("impact");
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
    clone.style.height = ten + "rem"
    clone.classList.add("obstacles");
    const eightySix = 86; 
    clone.style.left = Math.floor((eightySix - 1 + 1) * Math.random()) + "%";
    clone.style.display = "block";
    containerObstacles.appendChild(clone);
    clones.push(clone);
    const timeDeletion = 5000;
    setTimeout (function() {
        clone.classList.add("down");
        setInterval (function() {
            checkCollision(clone);
        }, oneHundred);
        setTimeout (function() {
            clone.remove();
        }, timeDeletion);
    }, oneHundred);
}

function release() {
    const containerProjectile = document.querySelector(".containerProjectile");
    let projectile = document.createElement("img");
    projectile.src = "assets/Projectile.png";
    projectile.classList.add("projectile");
    projectile.style.left = (moveDistance + two) + "%";
    const eightyNine = 89;
    projectile.style.top = eightyNine + "%";
    projectile.style.height = two + "rem";
    projectile.style.display = "block";
    containerProjectile.appendChild(projectile);
    const projectileErasure = 2800;
    setTimeout(function() {
        projectile.classList.add("up");
        setInterval (function() {
            collisionObjects(projectile);
        }, oneHundred);
        setTimeout(function() {
            projectile.remove();
        }, projectileErasure);
    }, oneHundred);
}

function pad(value) {
    return value.toString().padStart(two, "0");
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
    const sixty = 60, oneThousand = 1000;
    timerID = setInterval(function() {
        ++seconds;
        if (seconds === sixty) {
            seconds = 0;
            ++minutes;
        }
        if (minutes === sixty) {
            minutes = 0;
            ++hours;
        }
        if (seconds % ten === 0) {
            modifyAppearanceTime();
        }
        let time = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        document.getElementById("timer").textContent = time;
    }, oneThousand);
    obstaclesIntervalID = setInterval (objection, appearanceTime);
}

function startGame() {
    let timer = document.getElementById("timer");
    timer.style.display = "block";
    let start = document.getElementById("start");
    start.style.display = "none";
    plane.style.display = "block";
    const five = 5, ninetyFive = 95;
    document.addEventListener('keydown', function(event) {
        if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            moveDistance += five;
            if (moveDistance < ninetyFive) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance -= five;
            }
        } else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            moveDistance -= five;
            if (moveDistance >= 0) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance += five;
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
