const spaceData = document.getElementById("spaceData");

window.onload = async function getImages() {
    const source = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=OCbAbDXICtYgGu3b2fbgmqZFJ4eP1Vff6GgQzq38&count=10`)).json();
    console.log(source)
    const data = source.map(function(detail) {
        spaceData.innerHTML += `
            <div>
                <img id="pic" src="${detail.hdurl}" alt="NASA Picture Of The Day"/>
                <p>${detail.title}</p>
                <p>${detail.date}</p>
            </div>
            `
    })
};