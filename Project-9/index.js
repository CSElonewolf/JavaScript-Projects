// little bit of designing is done
let valueparam = document.getElementById('valueparam');
setInterval(() => {

    if (window.innerWidth <= 762) {
        valueparam.classList.add('mt-2');
    }
    if (window.innerWidth >= 762) {
        valueparam.classList.remove('mt-2');
    }
}, 500);

//let the value of customparamters be 
let paramterindex = 0;


//By default get option is checked
document.getElementById('contenttype').style.display = 'none';
document.getElementById('parametersBox').style.display = 'none';
document.getElementById('requestJsonBox').style.display = 'none';

//suppose get is clicked then the POST options get hidden
let get = document.getElementById('get');
get.addEventListener('click', () => {
    document.getElementById('contenttype').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'none';
})

//when we clcik on post the other options are displayed
let post = document.getElementById('post');
post.addEventListener('click', () => {
    document.getElementById('contenttype').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//when jsonradio is slected paramaterbox gets hidden
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//when customparamter box is selected the requestjson box gets hidden
let customparams = document.getElementById('paramsRadio');
customparams.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
})

//when POSt is selcted and custom p[aramter is selcted and the user clicks on + button
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row mb-2">
     <label for="url" class="col-sm-2 col-form-label">Parameter ${paramterindex + 2}</label>
     <div class="col-md-4">
         <input type="text" class="form-control" id="parameterKey${paramterindex + 2}" placeholder="Enter Parameter ${paramterindex + 2} Key">
     </div>
     <div class="col-md-4" id="valueparam">
         <input type="text" class="form-control" id="parameterValue${paramterindex + 2}" placeholder="Enter Parameter ${paramterindex + 2} Value">
     </div>
     <button class="btn btn-primary ml-2 deleteparam">-</button>
 </div>`;

    //call the function addparamterbox
    let paramelement = addparameterbox(string);
    //append the returned value from the function 
    params.appendChild(paramelement);
    //increament the value of the of the parameterindex;
    paramterindex++;
    //grab the deleteparam class
    let deleteparam = document.getElementsByClassName('deleteparam');
    //loop over the newly created paramters and delete the one which is asked 
    for (let item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

});

//definition of the addparamter function
function addparameterbox(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//when we click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    //grab all the ids from the DOM
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    // document.getElementById('responseJsonText').value = `Please wait! Your ${requestType} Request is on the way`;
    document.getElementById('responseJsonText').innerText = `Please wait! Your ${requestType} Request is on the way`;

    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //SUPPOSE THE CUASTON PARASMS OPTION IS CHOSEN
    if (contentType == 'params') {
        //empty object is defined
        data = {};
        //loop over the custom parameters to grab the keys and values
        for (let i = 0; i < (paramterindex + 1); i++) {
            //grab the keys and valus only if the key and the value id defined
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    //GET request
    if (requestType == 'GET') {

        fetch(url, {
            method: 'GET'
        })
        .then((response) => response.text())
        .then((recieveddata) => {
            //  document.getElementById('responseJsonText').value = recieveddata;
            document.getElementById('responseJsonText').innerText = recieveddata;
            // Prism.highlightAll();
        });
    }
    else {
        //POST Request
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.text())
        .then((recieveddata) => {
            // document.getElementById('responseJsonText').value = recieveddata;
            document.getElementById('responseJsonText').innerText = recieveddata;
            // Prism.highlightAll();
        })
    }
})
