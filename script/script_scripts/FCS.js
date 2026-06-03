




for (let i = 0; i < 750; i++) {
    create_div = document.createElement("div");
    create_div.className = "star";

    create_div.style.width = Math.random() * 4 + "px";
    create_div.style.top = Math.random() * 100 + "%";
    create_div.style.left = Math.random() * 100 + "%";
    document.getElementById("space").appendChild(create_div);

}





const position_bullet = [];
const position_enemy = [];
let position = 50;

function Main() {
    let rotation = parseFloat(document.getElementById("turretSlider").value); // Get turret rotation
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");

    // Get the barrel and its position
    let barrel = document.getElementById("barrel-small");
    let barrelRect = barrel.getBoundingClientRect(); // Get barrel's position on the screen
    let turret = document.getElementById("turret");
    let turretRect = turret.getBoundingClientRect(); // Get turret's position on the screen

    // Calculate the center of the barrel
    let barrelCenterX = turretRect.left + turretRect.width / 2; // Center of the turret
    let barrelCenterY = turretRect.top + turretRect.height / 2; // Center of the turret

    // Adjust the bullet's position to the end of the barrel
    let angle = (rotation) * (Math.PI / 180); // Adjust angle for correct direction
    let bulletX = barrelCenterX + Math.cos(angle) * (barrelRect.width / 2 + 10); // X position at the end of the barrel
    let bulletY = barrelCenterY + Math.sin(angle) * (barrelRect.width / 2 + 10); // Y position at the end of the barrel

    // Center the bullet to the barrel
    bullet.style.left = `${bulletX - bullet.offsetWidth / 2}px`; // Adjust for bullet width
    bullet.style.top = `${bulletY - bullet.offsetHeight / 2}px`; // Adjust for bullet height
    bullet.style.transform = `rotate(${rotation}deg)`; // Rotate the bullet to match the barrel
    document.body.appendChild(bullet);

    position_bullet.push({ x: bulletX, y: bulletY });

    let hit = false;

    function moveBullet() {
        // Update bullet position based on angle
        bulletX += Math.cos(angle) * 25; // Use Math.cos for X movement
        bulletY += Math.sin(angle) * 25; // Use Math.sin for Y movement

        bullet.style.left = `${bulletX - bullet.offsetWidth / 2}px`; // Adjust for bullet width
        bullet.style.top = `${bulletY - bullet.offsetHeight / 2}px`; // Adjust for bullet height

        let enemyX = position_enemy[position_enemy.length - 1]?.x;
        let enemyY = position_enemy[position_enemy.length - 1]?.y;

        // Check for collision with enemy
        if (!hit && enemyX !== undefined && enemyY !== undefined &&
            Math.abs(enemyX - bulletX) < 10 && Math.abs(enemyY - bulletY) < 10) {
            hit = true;

            position_enemy.pop();
            spawn_enemy();
            bullet.remove();
        }

        // Remove bullet if it goes off-screen
        if (bulletY > -10 && bulletX > -10 && bulletX < window.innerWidth && bulletY < window.innerHeight) {
            requestAnimationFrame(moveBullet);
        } else {
            position_bullet.pop();
            bullet.remove();
        }
    }

    moveBullet();
}   

// Function to handle shooting when a button is clicked
function shoot() {
    Main(); // Call the Main function to create and shoot a bullet
}

function turretSlider() {
    let rotation = parseFloat(document.getElementById("turretSlider").value); // Get slider value
    let turret = document.getElementById("turret").style;
    turret.transform = `rotate(${180 + rotation}deg)`; // Rotate the turret
    document.getElementById("turretAngle").innerText = `${rotation}°`; // Update the displayed angle
}

