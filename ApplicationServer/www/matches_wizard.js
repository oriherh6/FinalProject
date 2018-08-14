loadRiders();


function loadRiders() {
    fetch("http://localhost:3000/riders", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
        .then((riders) => {
            if(riders.status == '401')
            {
                window.location = "http://localhost:3000/static/login.html";
            }
            riders.forEach(function (rider) {
                createNewRiderElement(rider.guid, rider.firstName, rider.lastName,rider.age, rider.classTime)
            });
        });
}



function createNewRiderElement(id, firstName, lastName, age, classTime) {
    let li = document.createElement("li");
    let inputValue = firstName + " " + lastName + "   Age:" + age + "   Class Time:" + classTime;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute("id", id);
    li.setAttribute("riderId", id);
    li.setAttribute("dateForInstructor", classTime);
    li.setAttribute("onclick", "selectRider(this.getAttribute('riderId'), this.getAttribute('dateForInstructor')); markElement(\"myULRiders\",id);");
    document.getElementById("myULRiders").appendChild(li);
}

function selectRider(riderId, date)
{
    document.getElementById("myULInstructors").innerHTML="";
    document.getElementById("myULHorses").innerHTML="";
    let dateFormat = new Date(date);
    let day = dateFormat.getDay();
    fetch("http://localhost:3000/instructors/" + day, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
        .then((instructors) => {
            if(instructors.status == '401')
            {
                window.location = "http://localhost:3000/static/login.html";
            }
            instructors.forEach(function (instructor) {
                createNewInstructorElement(instructor.guid, instructor.firstName, instructor.lastName,instructor.email, date, riderId)
            });
        });

}

function createNewInstructorElement(id, firstName, lastName, email, date, riderId) {
    let li = document.createElement("li");
    let inputValue = firstName + " " + lastName + "   Email:" + email;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute("id", id);
    li.setAttribute("instructorID", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("date", date);
    li.setAttribute("onclick","selectInstructor(this.getAttribute('instructorID'),this.getAttribute('date'),this.getAttribute('riderId')); markElement(\"myULInstructors\",id);");
    document.getElementById("myULInstructors").appendChild(li);
}


function selectInstructor(instructorId, date, riderId)
{
    document.getElementById("myULHorses").innerHTML="";
    let dateFormat = new Date(date);
    fetch("http://localhost:3000/horses/" + dateFormat, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
        .then((horses) => {
            if(horses.status == '401')
            {
                window.location = "http://localhost:3000/static/login.html";
            }
            horses.forEach(function (horse) {
                createNewHorseElement(horse.guid, horse.name, horse.breed,horse.picture, date, riderId, instructorId)
            });
        });

}

function createNewHorseElement(id, name, breed, picture, date, riderId, instructorId) {
    let li = document.createElement("li");
    if(picture == "")
    {
        //default picture for horse
        picture = "https://www.caribuhorsewear.com.au/images/P/Purple-Rope-Halter%20%283%29.jpg"
    }
    li.innerHTML = `<h4 style="display: inline">${name}</h4> &nbsp &nbsp <img src="${picture}" style="width: 12%;height: 12%">`;
    li.setAttribute("id", id);
    li.setAttribute("horseId", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("instructorId", instructorId);
    li.setAttribute("date", date);
    li.setAttribute("onclick","createMatch(this.getAttribute('date'),this.getAttribute('riderId'),this.getAttribute('instructorId'),this.getAttribute('horseId')); markElement(\"myULHorses\",id)");
    document.getElementById("myULHorses").appendChild(li);
}

function createMatch(lessonTime, riderId, instructorId, horseId) {
    let lesson = JSON.stringify({lessonTime:lessonTime, riderId:riderId, instructorId:instructorId, horseId:horseId});
    fetch("http://localhost:3000/matches", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: lesson
    }).then((response) => response.json())
        .then((res) => {
            if (res.status == '200'){
                alert("New lesson added successfully");
                location.reload();

            }
            else if(res.status == '401')
            {
                window.location = "http://localhost:3000/static/login.html"
            }
            else{
                alert("Error during adding new lesson");
            }
        });
}


function markElement(ulName,id) {
    let ul = document.getElementById(ulName);
    let lis = ul.getElementsByTagName("li");
    for(let i=0; i< lis.length;i++)
    {
        lis[i].className="";
    }
    document.getElementById(id).className += "active";
}
