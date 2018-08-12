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
    li.setAttribute("riderId", id);
    li.setAttribute("dateForInstructor", classTime);
    li.setAttribute("onclick", "selectRider(this.getAttribute('riderId'), this.getAttribute('dateForInstructor'))");
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
    li.setAttribute("instructorID", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("date", date);
    li.setAttribute("onclick","selectInstructor(this.getAttribute('instructorID'),this.getAttribute('date'),this.getAttribute('riderId'))");
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
            horses.forEach(function (horse) {
                createNewHorseElement(horse.guid, horse.name, horse.breed,horse.picture, date, riderId, instructorId)
            });
        });

}

function createNewHorseElement(id, name, breed, picture, date, riderId, instructorId) {
    let li = document.createElement("li");
    li.innerHTML = `<h5>${name}</h5> <img src="https://zippy.gfycat.com/UnconsciousAngelicAmericangoldfinch.gif">`;
    li.setAttribute("horseId", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("instructorId", instructorId);
    li.setAttribute("date", date);
    // li.setAttribute("onclick",selectInstructor(this.getAttribute('id'),this.getAttribute('date')));
    document.getElementById("myULHorses").appendChild(li);
}