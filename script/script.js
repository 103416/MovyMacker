let path = window.location.pathname;
let fileName = path.substring(path.lastIndexOf('/') + 1);

alert(fileName)
let i = 0
let screens = ["./screen1.html","./screen2.html","./index.html","./screen3.html","./screen4.html"]
if(fileName === "screen4.html"){
    i = 5
}
if(fileName === "screen3.html"){
    i = 4
}
if(fileName === "index.html"){
    i = 3
}
if(fileName === "screen2.html"){
    i = 2
}
if(fileName === "screen1.html"){
    i = 1
}


window.addEventListener("keypress", (e) => {
    if(e.key === "d"){
        i++
        window.location.replace(screens[i])
    }
    if(e.key === "a"){
        i--
        window.location.replace(screens[i])
    }
})