
let stats = {
  mainCannon: 0,
  secondaryCannon: 0,
  laserCannon: 0,
};

async function loadStats() {
  try {
    const response = await fetch("stats.json");
    if (response.ok) {
      stats = await response.json();
      updateStats();
    } else {
      console.error("Failed to load stats.json");
    }
  } catch (error) {
    console.error("Error loading stats:", error);
  }
}

async function saveStats() {
  try {
    await fetch("http://localhost:3000/saveStats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    });
    console.log("Stats saved successfully!");
  } catch (error) {
    console.error("Error saving stats:", error);
  }
}
function updateStats() {
  document.getElementById("mainCount").textContent = `Main Cannon Shots: ${stats.mainCannon}`;
  document.getElementById("secondaryCount").textContent = `Secondary Cannon Shots: ${stats.secondaryCannon}`;
  document.getElementById("laserCount").textContent = `Laser Cannon Shots: ${stats.laserCannon}`;
}

function exportStats() {
  const blob = new Blob([JSON.stringify(stats, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "stats.json";
  a.click();
}
function rotateTurret(sliderId, turretId, barrelId, angleDisplayId) {
  const rotation = parseFloat(document.getElementById(sliderId).value);
  const turret = document.getElementById(turretId).style;
  const barrel = document.getElementById(barrelId).style;

  turret.transform = `rotate(${rotation}deg)`;
  barrel.transform = `rotate(${rotation}deg)`;

  document.getElementById(angleDisplayId).innerText = `${rotation}°`;
}

function turretSlider() {
  rotateTurret("turretSlider", "turret", "barrel-small", "turretAngle");
}

function turretSlider1() {
  rotateTurret("turretSlider1", "big-turret", "barrel-big", "turretAngle1");
}

function turretSlider2() {
  rotateTurret("turretSlider2", "laser", "barrel-laser", "turretAngle2");
}

function shoot() {
  stats.mainCannon++;
  updateStats();
  createBullet("bullet", "barrel-small", "turretSlider");
}

function Sec() {
  stats.secondaryCannon++;
  updateStats();
  createBullet("big-bullet", "barrel-big", "turretSlider1");
}

function Laser() {
  stats.laserCannon++;
  updateStats();
  createBullet("laser-bullet", "barrel-laser", "turretSlider2", 10);
}

function createBullet(bulletClass, barrelId, sliderId, speed = 25) {
  const rotation = parseFloat(document.getElementById(sliderId).value); // Get the rotation from the slider
  const bullet = document.createElement("div");
  bullet.classList.add(bulletClass);

  const barrel = document.getElementById(barrelId);
  const barrelRect = barrel.getBoundingClientRect();

  const barrelCenterX = barrelRect.left + barrelRect.width / 2;
  const barrelCenterY = barrelRect.top + barrelRect.height / 2;

  const angle = rotation * (Math.PI / 180);

  const bulletX = barrelCenterX + Math.cos(angle) * (barrelRect.height / 2);
  const bulletY = barrelCenterY + Math.sin(angle) * (barrelRect.height / 2);
 
  bullet.style.position = "absolute";
  bullet.style.left = `${bulletX}px`;
  bullet.style.top = `${bulletY}px`;
  bullet.style.transform = `rotate(${rotation}deg)`;
  document.body.appendChild(bullet);

  function moveBullet() {
    const moveX = Math.cos(angle) * speed;
    const moveY = Math.sin(angle) * speed;

    bullet.style.left = `${parseFloat(bullet.style.left) + moveX}px`;
    bullet.style.top = `${parseFloat(bullet.style.top) + moveY}px`;

    if (
      parseFloat(bullet.style.left) < 0 ||
      parseFloat(bullet.style.top) < 0 ||
      parseFloat(bullet.style.left) > window.innerWidth ||
      parseFloat(bullet.style.top) > window.innerHeight
    ) {
      bullet.remove();
    } else {
      requestAnimationFrame(moveBullet);
    }
  }

  moveBullet();
}
function rotateTurret(sliderId, turretId, angleDisplayId) {
  const rotation = parseFloat(document.getElementById(sliderId).value);
  const turret = document.getElementById(turretId).style;
  turret.transform = `rotate(${180 + rotation}deg)`;
  document.getElementById(angleDisplayId).innerText = `${180 - rotation}°`;
}

function init() {
  loadStats();

  window.addEventListener("keypress", (e) => {
    if (e.key === " ") shoot();
  });

  for (let i = 0; i < 750; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = Math.random() * 4 + "px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    document.getElementById("space").appendChild(star);
  }
}

init();