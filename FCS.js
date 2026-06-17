// Load saved stats or create default values
let stats = {
  mainCannon: 0,
  secondaryCannon: 0,
  laserCannon: 0,
};

// Load stats from JSON file
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

// Save stats to JSON file
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
// Update the stats display
function updateStats() {
  document.getElementById("mainCount").textContent = `Main Cannon Shots: ${stats.mainCannon}`;
  document.getElementById("secondaryCount").textContent = `Secondary Cannon Shots: ${stats.secondaryCannon}`;
  document.getElementById("laserCount").textContent = `Laser Cannon Shots: ${stats.laserCannon}`;
}

// Export stats to a JSON file
function exportStats() {
  const blob = new Blob([JSON.stringify(stats, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "stats.json";
  a.click();
}

// Remove saveStats calls from shoot, Sec, and Laser
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

// Create and move a bullet
function createBullet(bulletClass, barrelId, sliderId, speed = 25) {
  const rotation = parseFloat(document.getElementById(sliderId).value);
  const bullet = document.createElement("div");
  bullet.classList.add(bulletClass);

  const barrel = document.getElementById(barrelId);
  const barrelRect = barrel.getBoundingClientRect();
  const turret = barrel.parentElement;
  const turretRect = turret.getBoundingClientRect();

  const barrelCenterX = turretRect.left + turretRect.width / 2;
  const barrelCenterY = turretRect.top + turretRect.height / 2;

  const angle = rotation * (Math.PI / 180);
  let bulletX = barrelCenterX + Math.cos(angle) * (barrelRect.width / 2 + 10);
  let bulletY = barrelCenterY + Math.sin(angle) * (barrelRect.width / 2 + 10);

  bullet.style.left = `${bulletX}px`;
  bullet.style.top = `${bulletY}px`;
  bullet.style.transform = `rotate(${rotation}deg)`;
  document.body.appendChild(bullet);

  function moveBullet() {
    bulletX += Math.cos(angle) * speed;
    bulletY += Math.sin(angle) * speed;

    bullet.style.left = `${bulletX}px`;
    bullet.style.top = `${bulletY}px`;

    if (
      bulletX < 0 ||
      bulletY < 0 ||
      bulletX > window.innerWidth ||
      bulletY > window.innerHeight
    ) {
      bullet.remove();
    } else {
      requestAnimationFrame(moveBullet);
    }
  }

  moveBullet();
}

// Rotate turret based on slider value
function rotateTurret(sliderId, turretId, angleDisplayId) {
  const rotation = parseFloat(document.getElementById(sliderId).value);
  const turret = document.getElementById(turretId).style;
  turret.transform = `rotate(${180 + rotation}deg)`;
  document.getElementById(angleDisplayId).innerText = `${180 - rotation}°`;
}

// Initialize the game
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