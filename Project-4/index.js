const token1 = '0123749d357062ff87f5bfcb584313d6';
const token2 = 'f0ca19018ba5f57aade5ee6daa17bb88';


let newstype = document.getElementById('newstype');
newstype.addEventListener('submit',shownews);

function shownews(e){
    // console.log("show news function");
    let world = document.getElementById('world')
    let nation = document.getElementById('nation')
    let business = document.getElementById('business')
    let technology = document.getElementById('technology')
    let entertainment = document.getElementById('entertainment')
    let sports = document.getElementById('sports')
    let science = document.getElementById('science')
    let health = document.getElementById('health')
    let topic;
    if(world.checked){
        topic = "world"
    }
    else if(nation.checked)
    {
        topic = "nation"
    }
    else if(business.checked)
    {
        topic = "business"
    }
    else if(technology.checked)
    {
        topic = "technology"
    }
    else if(entertainment.checked)
    {
        topic = "entertainment"
    }
    else if(sports.checked)
    {
        topic = "sports"
    }
    else if(science.checked)
    {
        topic = "science"
    }
    else if(health.checked)
    {
        topic = "health"
    }
    console.log(topic)
let apilink = `https://gnews.io/api/v3/topics/${topic}?token=${token1}`;
const xhr = new XMLHttpRequest();
xhr.open('GET',apilink, true);
let data;
xhr.onload = function () {
    let data = JSON.parse(this.response).articles;
    let newshtml = '';
    data.forEach(function (element, index) {
        let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index + 1}:</b> ${element.title}
                                </button>
                                </h2>
                            </div>
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                            <div class="card-body">News Source:-${element.source.name}</div>
                                <div class="card-body"><a href = ${element.url} target = "_blank"> Read More </a></div>
                            </div>
                        </div>`;
        newshtml += news;
    });
    newsAccordion.innerHTML = newshtml;
    console.log(JSON.parse(this.response))
}
xhr.send();
    e.preventDefault();
}
