for (let i = 0; i < 250; i++) {
    let middle = document.getElementById("starry_night")
    create_div = document.createElement("div");
    create_div.className = "star";

    create_div.style.width = Math.random() * 4 + "px";
    create_div.style.top = Math.random() * 100 + "%";
    create_div.style.left = Math.random() * 100 + "%";
    document.querySelector("#starry_night").appendChild(create_div);

}



