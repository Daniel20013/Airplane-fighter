const plane = document.querySelector(".plane");
const container = document.querySelector(".container");
const containerWidth = container.clientWidth;
const planeWidth = plane.clientWidth;
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
const containerObstacles = document.querySelector(".containerObstacles");
const obstacles = document.querySelector(".obstacles");
const img = document.createElement("img");
img.src="assets/airplane_u2708_icon_256x256.png";
for (let i = 0; i < 4; ++i) {
    const clone = img.cloneNode(true);
    clone.classList.add("obstacles");
    clone.style.left = Math.floor((76 - 1 + 1) * Math.random()) + "%";
    clone.style.display = "block";
    containerObstacles.appendChild(clone);
}
