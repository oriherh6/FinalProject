document.getElementById("addRider").addEventListener('click', newRider);
document.getElementById("addInstructor").addEventListener('click', newInstructor);
document.getElementById("addHorse").addEventListener('click', newHorse);





function switch_entity(entity) {
    switch(entity) {
        case 0:
            document.getElementById("rider").style.display="block";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="none";
            break;
        case 1:
            document.getElementById("rider").style.display="none";
            document.getElementById("instructor").style.display="block";
            document.getElementById("horse").style.display="none";
            break;
        case 2:
            document.getElementById("rider").style.display="none";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="block";
            break;
        default:
            document.getElementById("rider").style.display="block";
            document.getElementById("instructor").style.display="none";
            document.getElementById("horse").style.display="none";
    }
}


function newRider(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname_rider").value;
    let lastName = document.getElementById("lname_rider").value;
    let age = document.getElementById("age_rider").value;
    let classTime = document.getElementById("class_date_rider").value;
    let picture = document.getElementById("picture_rider").value;


    let rider = JSON.stringify({firstName:firstName, lastName:lastName, age:age, classTime:classTime, picture:picture});
    if (firstName === '' || lastName === '' || age ==='' || classTime === '') {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://127.0.0.1:3000/riders", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: rider
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-success alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Success!</strong> New rider added."
                document.getElementById("rider").appendChild(div);
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else if(res.status == '401')
            {
                window.location = "http://127.0.0.1:3000/static/login.html"
            }
            else{
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-danger alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Error!</strong> during adding rider."
                document.getElementById("rider").appendChild(div);
            }
        });
}

function newInstructor(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname_instructor").value;
    let lastName = document.getElementById("lname_instructor").value;
    let email = document.getElementById("email_instructor").value;
    let days = [].filter.call(document.getElementsByName('days'), (c) => c.checked).map(c => c.value);
    let picture = document.getElementById("picture_instructor").value;


    let instructor = JSON.stringify({firstName:firstName, lastName:lastName, email:email, days:days, picture:picture});
    if (firstName === '' || lastName === '' || email ==='' || days == []) {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://127.0.0.1:3000/instructors", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: instructor
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-success alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Success!</strong> New instructor added."
                document.getElementById("instructor").appendChild(div);
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else if(res.status == '401')
            {
                window.location = "http://127.0.0.1:3000/static/login.html"
            }
            else{
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-danger alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Error!</strong> during adding instructor."
                document.getElementById("instructor").appendChild(div);
            }
        });
}


function newHorse(e) {
    e.preventDefault();
    let name = document.getElementById("name_horse").value;
    let breed = document.getElementById("breed_horse").value;
    let age = document.getElementById("age_horse").value;
    let picture = document.getElementById("picture_horse").value;

    let horse = JSON.stringify({name:name, breed:breed, age:age, picture:picture, takenDays:[]});
    if (name === '' || breed === '' || age ==='') {
        alert("Please fill all the fields");
        return;
    }
    fetch("http://127.0.0.1:3000/horses", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: horse
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-success alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Success!</strong> New horse added."
                document.getElementById("horse").appendChild(div);
                let elements = document.getElementsByTagName("input");
                for (let ii=0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text") {
                        elements[ii].value = "";
                    }
                }
            }
            else if(res.status == '401')
            {
                window.location = "http://127.0.0.1:3000/static/login.html"
            }
            else{
                let div = document.createElement("div");
                div.setAttribute("class", "alert alert-danger alert-dismissible");
                div.innerHTML = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
                    "                <strong>Error!</strong> during adding horse."
                document.getElementById("horse").appendChild(div);
            }
        });
}