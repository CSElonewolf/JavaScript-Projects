//Grab all ids in the DOM
let geocode = document.getElementById('geocode');
let getaddressbtn = document.getElementById('getaddressbtn');
let cardbody = document.getElementById('cardbody');
let map= document.getElementById('map')

//Add 'click' event listener to the button
getaddressbtn.addEventListener('click', showaddress);

//Global varibale
let addressinput;

//display the address
function showaddress(e) {
    
    //sanitize the address
    addressinput = geocode.value;
    addressinput = addressinput.replace(/,/g, "");
    addressinput = addressinput.replace(/ /g, "+");

    //fetch API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressinput}&key=AIzaSyAnqRFUHkdPi4CxKyYc9OdH_1lqVHxTRrw`).then((response) => {
        return response.json();
    }).then((data) => {
        data = data.results[0];
        
        //display the main address
        let addresscomponent = data.address_components;
        let cardbodyhtml='';
        addresscomponent.forEach((element,index) => {
            cardbodyhtml
            += `<p class="card-text"><b>${element.types[0]}: </b>${element.long_name}</p>`;
        });
        
       cardbodyhtml +=`<h4 class="card-title">Category</h4>`

       //display the type of the organisation
       let typecomponent = data.types;
       cardbodyhtml +=`<ul>`;
       typecomponent.forEach(element =>{
           console.log(element)
           cardbodyhtml +=`<li>${element}</li>`
       });
       cardbodyhtml +=`</ul>`
       cardbody.innerHTML = cardbodyhtml;

       //get the lat and lng of the address
       let latitude = data.geometry.location.lat;
       let longitude = data.geometry.location.lng;

    // Code credit Google developer site
     var uluru = {lat: latitude, lng:longitude};
     var map = new google.maps.Map(
       document.getElementById('map'), {zoom: 16, center: uluru});
     var marker = new google.maps.Marker({position: uluru, map: map});

    })
    e.preventDefault();
}

