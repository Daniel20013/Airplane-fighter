function obstaclesAppear() {
    const containerObstacles = document.querySelector(".containerObstacles");
    const obstacles = document.querySelector(".obstacles");
    const img = document.createElement("img");
    img.src="assets/airplane_u2708_icon_256x256.png";
    const clone = img.cloneNode(true);
    clone.classList.add("obstacles");
    clone.style.left = Math.floor((76 - 1 + 1) * Math.random()) + "%";
    clone.style.display = "block";
    containerObstacles.appendChild(clone);
}

function pad(value) {
    return value.toString().padStart(2, "0");
}

function startTimer() {
    let timerID;
    let seconds = 0, minutes = 0, hours = 0;
    timerID = setInterval(function() {
        ++seconds;
        if (seconds === 60) {
            seconds = 0;
            ++minutes;
        }
        if (minutes === 60) {
            minutes = 0;
            ++hours;
        }
        let time = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
        document.getElementById("timer").textContent = time;
        obstaclesAppear();
    }, 1000);
}

function startGame() {
    startTimer();
    let timer = document.getElementById("timer");
    timer.style.display = "block";
    let start = document.getElementById("start");
    start.style.display = "none";
    const plane = document.querySelector(".plane");
    plane.style.display = "block";
    let moveDistance = 52;
    document.addEventListener('keydown', function(event) {
        let = currentPosition = parseInt(plane.style.left || "0");
        if (event.key === "ArrowRight") {
            moveDistance += 10;
            if (moveDistance < 100) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance -= 10;
            }
        } else if (event.key === "ArrowLeft") {
            moveDistance -= 10;
            if (moveDistance >= 0) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance += 10;
            }
        }
    });
}
