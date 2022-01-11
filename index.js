const spaceData = document.getElementById("spaceData");

async function getImages() {
    spaceData.innerHTML =
        `<div class="loader" id="loader">
            <div class="sun"></div>
            <div class="orbit orbitA"><div class="planet planetA"></div></div>
            <div class="orbit orbitB"><div class="planet planetB"></div></div>
            <div class="orbit orbitC"><div class="planet planetC"></div></div>
         </div>`
    const source = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&count=10`)).json();

    source.map(function(d) {
        spaceData.innerHTML +=
            `<div class="spaceData__container ${body.classList.contains("dark") ? "grey" : null}" id="spaceData__container">
                <img class="spaceData__container__img" src="${d.hdurl}" alt="Image from NASA Picture Of The Day API"/>
                <div class="card_details">
                    <div>
                        <h3>${d.title}</h3>
                        <p>${d.date}</p>
                    </div>
                    <button class="btn-like" onclick="clickLikeBtn(this)">
                        <i class="fas fa-heart" id="icon-like" aria-hidden="true"></i>
                    </button>
                <div>
            </div>`
    })
};

window.onload = getImages()

//like
function clickLikeBtn(like) {
    like.classList.toggle("btn-liked");
}


//darkMode
const toggle = document.getElementById("toggle");
const loader = document.getElementById("loader");
toggle.addEventListener("click", darkMode);

function darkMode() {
    body.classList.toggle("dark");
    loader.classList.toggle("dark");
    for (let i = 0; i < spaceData__container.length; i++) {
        spaceData__container[i].classList.toggle("grey");
    }
}


toggle.addEventListener("click", changeLogo);

function changeLogo() {
    const logo = document.getElementById("logo").src;
    if (logo.indexOf('dark.svg') != -1) {
        document.getElementById('logo').src = './images/light.svg';
    } else {
        document.getElementById('logo').src = './images/dark.svg';
    }
}


//search

const calendarBtn = document.getElementById("calendar-btn");
const closeBtn = document.getElementById("close-btn");
const inputDate = document.getElementById("input-date");
const label = document.getElementById("label");
const h1 = document.getElementById("h1");

let showInput = false;

calendarBtn.addEventListener("click", searchPic);
closeBtn.addEventListener("click", searchPic);


function searchPic() {
    if (!showInput) {
        inputDate.style.display = "flex";
        closeBtn.style.display = "flex";
        calendarBtn.style.display = "none";
        label.style.display = "none";
        h1.style.display = "none";
        showInput = true;
    } else {
        inputDate.style.display = "none";
        closeBtn.style.display = "none";
        calendarBtn.style.display = "flex";
        label.style.display = "flex";
        h1.style.display = "flex";
        showInput = false;
        getImages()
    }
};


inputDate.addEventListener("change", findPic);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

async function findPic() {
    if (today >= inputDate.value) {
        const img = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&date=${inputDate.value}`)).json();
        spaceData.innerHTML = `
        <div class="spaceData__container ${body.classList.contains("dark") ? "grey" : null}" id="spaceData__container">
            <img class="spaceData__container__img" src="${img.hdurl}" alt="Image from NASA Picture Of The Day API"/>
            <div class="card_details">
                <div>
                    <h3>${img.title}</h3>
                    <p>${img.date}</p>
                </div>
                <button class="btn-like" onclick="clickLikeBtn(this)">
                    <i class="fas fa-heart" id="icon-like" aria-hidden="true"></i>
                </button>
            <div>
        </div>`
    } else {
        alert("Please wait for this image.");
    }
};