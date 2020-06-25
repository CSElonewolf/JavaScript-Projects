import reddit from './redditapi'

//grab the ids in the index.html
let searchform = document.getElementById('search-form')
let searchinput = document.getElementById('search-input')
let limit = document.getElementById('limit');

//add submit event listener to the form
searchform.addEventListener('submit', e => {
    const searchterm = searchinput.value;
    limit = limit.value;
    const sortby = document.querySelector('input[name="sortby"]:checked').value;
    //call showerror function if the serach term is empty
    if (searchterm === '') {
        showerror("Please enter the search term", "alert-danger")
    }
    //call  the reddit api
    reddit.search(searchterm, sortby, limit)
        .then(data => {
            console.log(data)
            let html = ''
            data.forEach(post => {
                let image = post.preview ? post.preview.images[0].source.url : 'https://lh3.googleusercontent.com/proxy/jXF1EnIcWuxNL8hVHrgmnuAadZyD0MXwVadsva-R8py1xvysIXW2PD7CkmD7JA5e9yC4uGD-KIov2Ezz6vKL_ojdcBz37gxnYglT9RYGQL4xYc-6tS2KHd0Re7d8Kcqk';
                html += `<div class="card col-lg-3 col-md-4 col-sm-12 mb-2 shadow p-4 mb-4 bg-white">
        <img class="card-img-top" src="${image}" alt="Card image">
        <div class="card-body">
          <h4 class="card-title" style="font-family: 'Pangolin', cursive;">${post.title}</h4>
          <p class="card-text" style="font-family: 'Montserrat', sans-serif;">${shorten(post.selftext, 100)}</p>
          
          <span class="badge badge-pill badge-primary">scores:${post.score}</span>
        <span class="badge badge-pill badge-success">subscribers:${post.subreddit_subscribers}</span>
        <span class="badge badge-pill badge-secondary">ups:${post.ups}</span><br>
          <a href="${post.url}" class="btn btn-primary mt-4">Read More</a>
        </div>
        </div>`
            });
            document.getElementById('results').innerHTML = html
            searchinput.value = '';

        });
    e.preventDefault();
});
//display the error message
function showerror(message, classname) {

    //create the danger alert message div
    let div = document.createElement('div');
    div.className = ` mt-2 alert ${classname}`;
    div.appendChild(document.createTextNode(message))
    let container = document.getElementById('container');
    let card = document.getElementById('card');

    //insert the error html 
    container.insertBefore(div, card);

    //hide the error msg after 3 sec
    setTimeout(() => {
        div.style.display = 'none';
    }, 3000);

}

function shorten(text, textlimit) {
    if (text.length == 0) {
        return text;
    }
    else {
        return text.substring(0, text.indexOf(' ', textlimit))
    }

}