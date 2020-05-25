

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://gnews.io/api/v3/top-news?token=f0ca19018ba5f57aade5ee6daa17bb88', true);
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
                          
                                <div class="card-body"><a href = ${element.url} target = "_blank"> Read More </a></div>
                            </div>
                        </div>`;
        newshtml += news;
    });
    newsAccordion.innerHTML = newshtml;
    console.log(JSON.parse(this.response))
}
xhr.send();
