//GLOBALS
var form = document.querySelector('form');
var para = document.querySelector('p');
var list = document.querySelector('.list');
var error = document.querySelectorAll('.error');
var uname = document.querySelector('.uname');
var email = document.querySelector('.uemail');
var age = document.querySelector('.uage');
var loc = document.querySelector('.ulocation');
var section = document.querySelector('section');
var support = document.querySelector('.support-btn');
var cats = document.getElementById('cats');

//JSON handling!
var requestURL = 'dealdetails.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


// EVENT LISTENERS

//Process the JSON file and calls a listDeals function once the file is loaded
request.onload = function() {
    var noelsDeals = request.response;
    listDeals(noelsDeals);
}

//Special "support" button extra ;)
support.addEventListener("click", function(event) {
    cats.classList.remove('hidden');
});

//name handlers
uname.addEventListener("input", function(event) {
    if(uname.validity.valid) {
        addError(0, "", false);
        uname.classList.remove("invalid");
    } else {
        uname.classList.add("invalid");
    }
}, false);

uname.addEventListener("focusout", function(event) {

    if(!uname.validity.valid) {
        addError(0, "Please enter a valid name", true);
    }

}, false);


//Email handlers
email.addEventListener("input", function(event) {
    if(email.validity.valid) {
        addError(1, "", false);
        email.classList.remove("invalid");
    } else {
        email.classList.add("invalid");
    }
}, false);

email.addEventListener("focusout", function(event) {

    if(!email.validity.valid) {
        addError(1, "Please enter a valid email", true);
    }

}, false);


//Age handlers
age.addEventListener("input", function(event) {
    if(age.validity.valid) {
        addError(2, "", false);
        age.classList.remove("invalid");
    } else {
        age.classList.add("invalid");
    }
}, false);

age.addEventListener("focusout", function(event) {

    if(!age.validity.valid) {
        addError(2, "Please enter a valid age between 1 and 120", true);
    }

}, false);

//Location handlers
loc.addEventListener("input", function(event) {
    if(loc.validity.valid) {
        addError(3, "", false);
        loc.classList.remove("invalid");
    } else {
        loc.classList.add("invalid");
    }
}, false);

loc.addEventListener("focusout", function(event) {

    if(!loc.validity.valid) {
        addError(3, "Please enter your location", true);
    }

}, false);


//Submit buttton error handling!
form.addEventListener("submit", function(event) {

    // This will help us track if the form has 1 or more errors
    let hasErr = false;

    /* Don't submit the form using default logic because we will be running some
    custom code to handle the page instead! */
    event.preventDefault();

    if(!uname.validity.valid) {
        addError(0, "Please enter a valid name", true);
        uname.classList.add("invalid");
        hasErr = true;
    } 
    
    if(!email.validity.valid) {
        addError(1, "Please enter a valid email", true)
        email.classList.add("invalid");
        hasErr = true;
    } 

    if (!age.validity.valid) {
        addError(2, "Please enter a valid age between 1 and 120", true);
        age.classList.add("invalid");
        hasErr = true;
    } 

    if (!loc.validity.valid) {
        addError(3, "Please enter your location", true);
        loc.classList.add("invalid");
        hasErr = true;
    }

    //The form can be submitted, now we will display the deals!
    if(!hasErr) {
        event.preventDefault();
        form.classList.add("hidden");
        para.textContent = "Thank you for providing your information. Please enjoy the deals below!";
        listDisplay();
    }

}, false);

/* Custom function to add an error message to the associated error id number
with the provided message and a boolean if the msg should be actively displayed */
function addError(errNum, msg, active) {
    error[errNum].innerHTML = msg;
    if(active) {
        error[errNum].className = "error active";
    } else {
        error[errNum].className = "error";
    }
};

/* This will be called by an event listener on the add to list button. It will take the value
of the textbox and insert it into the list with the appropriate html tags, then creating new
event listeners for the new buttons we create when adding a new task to the list! */
function listDisplay() {

    list.classList.remove('hidden');
    
};

/* This custom function takes the provided JSON object and loops through the info, adding
 the different properties to Article tags and appends them to a secret tag that is
 hidden with the power of CSS until   */
function listDeals(jsonObj){
    var topDeals = jsonObj['amazingProducts'];

    for (var i = 0; i < topDeals.length; i++) {

        var article = document.createElement('article');
        var h2 = document.createElement('h2');
        var img = document.createElement('img');
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var nlist = document.createElement('ul');

        img.setAttribute('src', 'images/' + topDeals[i].image);
        img.setAttribute('alt', topDeals[i].name);
        h2.textContent = topDeals[i].name;
        p1.textContent = 'Price: ' + topDeals[i].price;
        p2.textContent = 'Description: ' + topDeals[i].description;

        var features = topDeals[i].features;
        for (var j = 0; j < features.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = features[j];
            nlist.appendChild(listItem);
        }

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(nlist);
        section.appendChild(article);
        }

};

// Initialize and add the map
function initMap() {
    // The location of georgian
    var georgian = {lat: 44.412107, lng: -79.666818};
    // The map, centered at georgian
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 16, center: georgian});
    // The marker, positioned at georgian
    var marker = new google.maps.Marker({position: georgian, map: map});
  }