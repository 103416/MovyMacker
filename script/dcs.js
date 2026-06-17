const ship = document.getElementById("ship");
const sections = document.querySelectorAll(".section");
const result = document.getElementById("result");
const repairBtn = document.getElementById("repairBtn");
console.log(repairBtn);

let repairing = false;
let activated = false;
let damagedSections = [];

ship.addEventListener("click", () => {

    if (activated) return;

    activated = true;

    sections.forEach(section => {
        section.style.display = "block";
    });
});

sections.forEach(section => {

    section.addEventListener("click", () => {

        if (repairing) return;
    
        const damagePresent = Math.random() < 0.5;
    
        section.classList.remove("damageFound");
        section.classList.remove("damageFree");
    
        void section.offsetWidth;
    
        if(damagePresent){
    
            section.classList.add("damageFound");
    
            if(!damagedSections.includes(section)){
                damagedSections.push(section);
            }
    
            repairBtn.disabled = false;
    
            result.textContent =
                `${section.id.toUpperCase()} SECTION - DAMAGE DETECTED`;
    
        }else{
    
            section.classList.add("damageFree");
    
            result.textContent =
                `${section.id.toUpperCase()} SECTION - NO DAMAGE FOUND`;
        }
    
    });
});

repairBtn.addEventListener("click", () => {

    if (damagedSections.length === 0 || repairing) return;

    repairing = true;
    repairBtn.disabled = true;

    result.textContent = "REPAIR CREWS DEPLOYED... ETA 5 SECONDS";

    let countdown = 5;

    const timer = setInterval(() => {

        result.textContent =
            `REPAIR CREWS WORKING... ${countdown}s`;

        countdown--;

        if(countdown < 0){
            clearInterval(timer);
        }

    }, 1000);

    setTimeout(() => {

        sections.forEach(section => {

            section.classList.remove("damageFound");
            section.classList.remove("damageFree");
            section.classList.add("repaired");
        });

        result.textContent =
            "ALL SECTIONS OPERATIONAL";

        setTimeout(() => {

            sections.forEach(section => {
                section.classList.remove("repaired");
            });

            damagedSections = [];
            repairing = false;

            result.textContent =
                "SYSTEM READY";

        }, 10000);

    }, 5000);

});

sections.forEach(section => {
    section.classList.add("repairing");
});

sections.forEach(section => {
    section.classList.remove("repairing");
    section.classList.add("repaired");
});

setTimeout(() => {

    sections.forEach(section => {
        section.classList.remove(
            "repaired",
            "damageFound",
            "damageFree"
        );
    });

    damagedSections = [];
    repairing = false;
    repairBtn.disabled = true;

    result.textContent = "SYSTEM READY";

}, 10000);

