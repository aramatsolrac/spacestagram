const spaceData = document.getElementById("spaceData");

async function getImages() {
    // TODO: gif loading spaceData.innerHTML = null
    const source = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&count=10`)).json();
    spaceData.innerHTML = null
    source.map(function(d) {
        spaceData.innerHTML += `
            <div class="spaceData__container" id="spaceData__container">
                <img id="pic" src="${d.hdurl}" alt="NASA Picture Of The Day"/>
                <div class="card_details">
                    <div>
                        <p>${d.title}</p>
                        <p>Date: ${d.date}</p>
                    </div>
                    <button class="btn-like" onclick="clickLikeBtn(this)">
                        <i class="fas fa-heart" id="icon-like"></i>
                    </button>
                <div>
            </div>
            `
    })
};

window.onload = getImages()

//like
function clickLikeBtn(like) {
    like.classList.toggle("btn-liked");
}


//changeTheme
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", changeTheme);

function changeTheme() {
    body.classList.toggle("dark");
    for (let i = 0; i < spaceData__container.length; i++) {
        spaceData__container[i].classList.toggle("grey");
    }
}

//search

const calendarIcon = document.getElementById("calendar-icon");
const closeIcon = document.getElementById("close-icon");
const inputDate = document.getElementById("mobile-input-date");
const searchBtn = document.getElementById("search-btn");
const label = document.getElementById("label");
const h1 = document.getElementById("h1");

let showInput = false;

calendarIcon.addEventListener("click", mobileSearch);
closeIcon.addEventListener("click", mobileSearch);

function mobileSearch() {
    if (!showInput) {
        inputDate.style.display = "flex";
        closeIcon.style.display = "flex";
        searchBtn.style.display = "flex";
        calendarIcon.style.display = "none";
        label.style.display = "none";
        h1.style.display = "none";
        showInput = true;
    } else {
        inputDate.style.display = "none";
        closeIcon.style.display = "none";
        searchBtn.style.display = "none";
        calendarIcon.style.display = "flex";
        label.style.display = "flex";
        h1.style.display = "flex";
        showInput = false;
        getImages()
    }
};



searchBtn.addEventListener("click", findPic);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

async function findPic() {

    if (today > inputDate.value) {
        const img = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&date=${inputDate.value}`)).json();
        spaceData.innerHTML = `
            <div class="spaceData__container" id="spaceData__container">
                <img id="pic" src="${img.hdurl}" alt="NASA Picture Of The Day"/>
                <div class="card_details">
                    <div>
                        <p>${img.title}</p>
                        <p>Date: ${img.date}</p>
                    </div>
                    <button class="btn-like" onclick="clickLikeBtn(this)">
                        <i class="fas fa-heart" id="icon-like"></i>
                    </button>
                <div>
            </div>`
    } else {
        alert("Please wait for this image.");
    }
};