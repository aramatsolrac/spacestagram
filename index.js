const spaceData = document.getElementById("spaceData");

window.onload = async function getImages() {
    const source = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&count=10`)).json();
    console.log(source)
    const data = source.map(function(d) {
        spaceData.innerHTML += `
            <div class="spaceData__container">
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

function clickLikeBtn(like) {
    like.classList.toggle("btn-liked");
}