let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//let wakeLock = await navigator.wakeLock.request('screen');

let animations;

function lightColor(color) {
    light.style.background = color;
}

function startLight() {
    light.style.display = "flex";
}

function stopLight() {
    light.style.display = "none";
}

async function animation(delay=1000, color1, color2, color3=color1, color4=color2) {
    startLight();
    while (light.style.display == "flex") {
        lightColor(color1);
        await sleep(delay);
        lightColor(color2);
        await sleep(delay);
        lightColor(color3);
        await sleep(delay);
        lightColor(color4);
        await sleep(delay);
    }
}

function addAnimation() {
    let animation = [document.getElementById("name").value, `animation('${document.getElementById("delay").value}', '${document.getElementById("color1").value}', '${document.getElementById("color2").value}', '${document.getElementById("color3").value}', '${document.getElementById("color4").value}');`];
    load();
    animations.push(animation);
    save();
}

function load() {
    animations = JSON.parse(localStorage.getItem("animations")) || [];
}

function save() {
    localStorage.setItem("animations", JSON.stringify(animations));
    load();
}

function listAnimations() {
    load();
    animations.forEach(animation => {
        content.innerHTML += `<div class='card'><p>${animation[0]}</p><button onclick="${animation[1]}">Starten</button></div>`;
    });
}

function deleteAnimation() {
    footer.innerHTML = "<button class='big-button' onclick='window.location.href = `index.html`;'>Abbrechen</button>";
    footer.style = "justify-content: center;";
    content.innerHTML = "";
    load();
    let counter = 0;
    animations.forEach(animation => {
        content.innerHTML += `<div class='card'><p>${animation[0]}</p><button onclick="animations.splice(${counter}, 1); save(); window.location.href = 'index.html';">L&oumlschen</button></div>`;
        counter += 1;
    });
}