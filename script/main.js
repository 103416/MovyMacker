for (let i = 0; i < 250; i++) {
    let middle = document.getElementById("starry_night")
    create_div = document.createElement("div");
    create_div.className = "star";

    create_div.style.width = Math.random() * 4 + "px";
    create_div.style.top = Math.random() * 100 + "%";
    create_div.style.left = Math.random() * 100 + "%";
    document.querySelector("#starry_night").appendChild(create_div);

}

const firstSound = document.getElementById("sound-clsh");
const humSound = document.getElementById("sound-hum");
const textElement = document.getElementById("home-text");

function startIntroAudio() {
    if (!firstSound || !humSound) return;

    firstSound.currentTime = 0;
    humSound.pause();
    humSound.currentTime = 0;

    firstSound.play().catch(() => {});
}

function switchToHum() {
    if (!firstSound || !humSound) return;

    firstSound.pause();
    humSound.currentTime = 0;
    humSound.play().catch(() => {});
}

window.addEventListener("load", startIntroAudio);
textElement?.addEventListener("animationstart", startIntroAudio);
textElement?.addEventListener("a", switchToHum);



