// let x = localStorage.getItem("x_as_getal");
// let y = localStorage.getItem("y_as_getal");
// let z = localStorage.getItem("z_as_getal");

// if (z === null) {
//     z = Math.floor(Math.random() * 1000000);
//     localStorage.setItem("z_as_getal", z)
// }


let x_as = document.getElementById("x");
let y_as = document.getElementById("y");
let z_as = document.getElementById("z");

let x = Math.floor(Math.random() * 1000000);
let y = Math.floor(Math.random() * 1000000);
let z = Math.floor(Math.random() * 1000000);

x_as.innerText = x;
y_as.innerText = y;
z_as.innerText = z;

console.log("X: " + x);
console.log("Y: " + y);
console.log("Z: " + z);


function travel() {
    let x_input = document.getElementById("x_input").value;
    let y_input = document.getElementById("y_input").value;
    let z_input = document.getElementById("z_input").value;
    x_as = document.getElementById("x");
    y_as = document.getElementById("y");
    z_as = document.getElementById("z");
    console.log("x: " + x_input);
    console.log("y: " + y_input);
    console.log("z: " + z_input);

    if (x_input !== "" || y_input !== "" || z_input !== "") {
        if (x_input !== "") { x_as.innerText = x_input; }
        if (y_input !== "") { y_as.innerText = y_input; }
        if (z_input !== "") { z_as.innerText = z_input; }

        document.getElementById("x_input").value = "";
        document.getElementById("y_input").value = "";
        document.getElementById("z_input").value = "";
        console.log("X input: " + x_input);
        console.log("Y input: " + y_input);
        console.log("Z input: " + z_input);

        takeoff();
    } else {
        alert("No changes have been made...");
        console.log("No changes have been made...");
    }
}

const video = document.getElementById("takeoff_animation");
const page = document.getElementById("whole_page");
const body = document.getElementById("body_page");

function takeoff() {
    page.style.display = "none";
    video.style.display = "block";
    body.style.overflow = "hidden";
    video.currentTime = 0;
    video.play();
    console.log("Video playing");
}

video.addEventListener("ended", () => {
    page.style.display = "block";
    video.pause();
    video.currentTime = 0;
    video.style.display = "none";
    body.style.overflow = "visible"
})