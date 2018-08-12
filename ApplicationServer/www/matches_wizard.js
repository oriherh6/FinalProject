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
    li.setAttribute("id", id);
    li.setAttribute("dateForInstructor", classTime);
    li.setAttribute("onclick", "selectRider(this.getAttribute('id'), this.getAttribute('dateForInstructor'))");
    document.getElementById("myULRiders").appendChild(li);
}

function selectRider(idRider, date)
{
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
                createNewRiderElement(instructor.guid, instructor.firstName, instructor.lastName,instructor.email, instructor.classTime)
            });
        });

}

function createNewInstructorElement(id, firstName, lastName, email, day) {
    let li = document.createElement("li");
    let inputValue = firstName + " " + lastName + "   Email:" + email + "   Day:" + day;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute("id", id);
    // li.setAttribute("date", date);
    // li.setAttribute("onclick",selectRider(this.getAttribute('id'),this.getAttribute('date')));
    document.getElementById("myULInstructors").appendChild(li);
}