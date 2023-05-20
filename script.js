const plane = document.querySelector(".plane");

function obstaclesAppear() {
    const containerObstacles = document.querySelector(".containerObstacles");
    const img = document.createElement("img");
    img.src = "assets/airplane_u2708_icon_256x256.png";
    const clone = img.cloneNode(true);
    clone.classList.add("obstacles");
    clone.style.left = Math.floor((76 - 1 + 1) * Math.random()) + "%";
    clone.style.display = "block";
    containerObstacles.appendChild(clone);
  
    setTimeout(function() {
        clone.classList.add("down");

        setTimeout(function() {
            checkCollision(clone);
        }, 4500);

        setTimeout(function() {
            clone.remove();
        }, 5000);
    }, 100);
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
      alert("impact"); 
      return true;
    }
    return false;
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
    }, 1000);
    setInterval(obstaclesAppear, 1500);
}

function startGame() {
    startTimer();
    let timer = document.getElementById("timer");
    timer.style.display = "block";
    let start = document.getElementById("start");
    start.style.display = "none";
    plane.style.display = "block";
    let moveDistance = 52;
    document.addEventListener('keydown', function(event) {
        let = currentPosition = parseInt(plane.style.left || "0");
        if (event.key === "ArrowRight") {
            moveDistance += 5;
            if (moveDistance < 95) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance -= 5;
            }
        } else if (event.key === "ArrowLeft") {
            moveDistance -= 5;
            if (moveDistance >= 0) {
                plane.style.left = moveDistance + "%";
            } else {
                moveDistance += 5;
            }
        }
    });
}
