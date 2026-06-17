let path = window.location.pathname;
let fileName = path.substring(path.lastIndexOf('/') + 1);
let i = 0
console.log("script.js loaded");


let screens = ["./FCS.html","./DCS.html","./index.html","./NAV.html","./HOL.html"]
if(fileName === "HOL.html"){
    i = 4
}
if(fileName === "NAV.html"){
    i = 3
}
if(fileName === "index.html"){
    i = 2
}
if(fileName === "DCS.html"){
    i = 1
}
if(fileName === "FCS.html"){
    i = 0
}
window.addEventListener("keydown", (e) => {
    if (e.key === "d") {
        if (i >= 4) {
            console.log("je kan niet verder");
        } else {
            i++;
            window.location.replace(screens[i]);
        }
    }
    if (e.key === "a") {
        if (i <= 0) {
            console.log("je kan niet verder");
        } else {
            i--;
            window.location.replace(screens[i]);
        }
    }
});

for (let i = 0; i < 250; i++) {
    let middle = document.getElementById("starry_night")
    create_div = document.createElement("div");
    create_div.className = "star";

    create_div.style.width = Math.random() * 4 + "px";
    create_div.style.top = Math.random() * 100 + "%";
    create_div.style.left = Math.random() * 100 + "%";
    document.querySelector("#starry_night").appendChild(create_div);

}

const pages = [
    "index.html",
    "nav.html",
    "dcs.html",
    "fcs.html"
];

let currentPage = pages.indexOf(window.location.pathname.split("/").pop());
if (currentPage === -1) currentPage = 0;

// create transition overlay
const transition = document.createElement("div");
transition.classList.add("page-transition");
document.body.appendChild(transition);

function goToPage(index, direction) {
    if (index < 0 || index >= pages.length) return;

    transition.classList.remove("active");
    void transition.offsetWidth;
    transition.classList.add("active");

    setTimeout(() => {
        window.location.href = pages[index];
    }, 400);
}

window.addEventListener("keydown", (e) => {

    if (e.key === "a" || e.key === "A") {
        goToPage(currentPage - 1, "left");
    }

    if (e.key === "d" || e.key === "D") {
        goToPage(currentPage + 1, "right");
    }

});