
// console.log('devkant');
let inputbox = document.getElementById('inputbox');
let searchbutton = document.getElementById('searchbutton');
let results = document.getElementById('results');
let more = document.getElementById('more');
//call searchsong function on click
searchbutton.addEventListener('click', fetchsongdata);

//makes a fetch request
function fetchsongdata() {
    let searchterm = inputbox.value.trim();
    if(searchterm == ''){
        alert(`Input can't be Empty`);
    }
    else{
        results.innerHTML = ' <p>Your music will appear here</p>';
        fetch(`https://api.lyrics.ovh/suggest/${searchterm}`).then(response => response.json()).then((data) => displaysongs(data));
    }
}


//updates the DOM with the songs
function displaysongs(data) {
    let html = '<div id="accordion" class="mt-4">';
    data.data.forEach((element) => {
        html += `<div class="card">
    <div class="card-header">
        <a class="card-link" data-toggle="collapse" href="#collapse${element.id}">
        ${element.title} - ${element.artist.name}
        </a>
    </div>
    <div id="collapse${element.id}" class="collapse show" data-parent="#accordion">
        <div class="row">
            <div class="col-lg-6">
                <img src="${element.album.cover_medium}"
                    style="width:150px;height:150px;margin-top:10px;margin-bottom:10px">
            </div>
            <div class="col-lg-6">
                <div class="card-body">
                    <ul style="margin-left:-60px">
                        <div><strong>Song: </strong>${element.title}</div>
                        <div><strong>Artist: </strong>${element.artist.name}</div>
                        <div><strong>Album: </strong>${element.album.title}</div>
                        <div><strong>Duration: </strong>${element.duration}</div>
                        <div><strong>Rank: </strong><span
                                class="badge badge-pill badge-primary">${element.rank}</span></div>
                        <div><strong>Listen to Preview: </strong> <a 
                                href="${element.preview}" target="_blank">Listen</a>
                        </div>
                        <div><button class="btn btn-outline-primary" data-artist="${element.artist.name}" data-songtitle="${element.title}"
                                style="border-radius:40px;margin-top: 5px;">Get Lyrics</button></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`;
    });
    html += '</div>';

    results.innerHTML = html;

    //display previous and next button
    console.log(data.prev);
    console.log(data.next);

    // if(data.prev || data.next){
    //     more.innerHTML = `
    //     ${data.prev != undefined ? `<button class="middle btn btn-outline-primary" onclick="getMoresongs(${data.prev})">Prev</button>`:''}
    //     ${data.next != undefined ? `<button class="middle btn btn-outline-primary" onclick="getMoresongs(${data.next})">Next</button>`:''}
    //     `;
    // }
    // else{
    //     more.innerHTML='';
    // }
}

//get lyrics
results.addEventListener('click', e => {
    let clickedlement = e.target;
    if (clickedlement.tagName === 'BUTTON') {
        let artist = clickedlement.getAttribute('data-artist');
        let title = clickedlement.getAttribute('data-songtitle');
        getLyrics(artist, title);
    }
});


//get lyrics and update the DOM
function getLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(data => {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            results.innerHTML = `<h2 class="text-center mb-2 mt-2" style="font-family: 'Pacifico', cursive; text-decoration: underline;"><strong>${artist}</strong>-${title}</h2>
        <span class="text-center" style="font-family: 'Permanent Marker', cursive;">${lyrics}</span>`;
            results.innerHTML += `<br><button class="middle mt-3 btn btn-outline-primary" onclick="window.print()">Print</button>`
        });
}

//getmoresongs
// function getMoresongs(url){
//     fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(response => response.json()).then(data => displaysongs(data));
// }