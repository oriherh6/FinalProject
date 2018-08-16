loadRiders();


function loadRiders() {
    fetch("http://127.0.0.1:3000/riders", {
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
                window.location = "http://127.0.0.1:3000/static/login.html";
            }
            riders.forEach(function (rider) {
                let pic = rider.picture;
                if(pic == "")
                {
                    //default picture for horse
                    pic = "https://media.thequoteunquote.com/default-user-1494243238_350x300_.png";
                }
                createNewRiderElement(rider.guid, rider.firstName, rider.lastName,rider.age, rider.classTime, pic)
            });
        });
}



function createNewRiderElement(id, firstName, lastName, age, classTime, picture) {
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.setAttribute("riderId", id);
    li.setAttribute("dateForInstructor", classTime);
    li.setAttribute("onclick", "selectRider(this.getAttribute('riderId'), this.getAttribute('dateForInstructor')); markElement(\"myULRiders\",id);")
    li.setAttribute("class", "list-item");
    li.innerHTML = `<div class="list-item__image">
			<img src="${picture}" alt="Thumbnail">
		</div>
		<div class="list-item__content">
			<h4>${firstName} ${lastName}</h4>
			<p>Age: ${age} </p>
			<h4>${classTime}</h4>
		</div>`;
    document.getElementById("myULRiders").appendChild(li);
}

function selectRider(riderId, date)
{
    document.getElementById("myULInstructors").innerHTML="";
    document.getElementById("myULHorses").innerHTML="";
    let dateFormat = new Date(date);
    let day = dateFormat.getDay();
    fetch("http://127.0.0.1:3000/instructors/" + day, {
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
                window.location = "http://127.0.0.1:3000/static/login.html";
            }
            instructors.forEach(function (instructor) {
                let pic = instructor.picture;
                if(pic == "")
                {
                    //default picture for horse
                    pic = "https://media.thequoteunquote.com/default-user-1494243238_350x300_.png";
                }
                createNewInstructorElement(instructor.guid, instructor.firstName, instructor.lastName,instructor.email, date, riderId, pic)
            });
        });

}

function createNewInstructorElement(id, firstName, lastName, email, date, riderId, picture) {
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.setAttribute("instructorID", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("date", date);
    li.setAttribute("onclick","selectInstructor(this.getAttribute('instructorID'),this.getAttribute('date'),this.getAttribute('riderId')); markElement(\"myULInstructors\",id);");
    li.setAttribute("class", "list-item");
    li.innerHTML = `<div class="list-item__image">
			<img src="${picture}" alt="Thumbnail" style="width: 80px"; border-radius="50%">
		</div>
		<div class="list-item__content">
			<h4>${firstName} ${lastName}</h4>
			<p>Email: ${email} </p>
		</div>`;
    document.getElementById("myULInstructors").appendChild(li);
}


function selectInstructor(instructorId, date, riderId)
{
    document.getElementById("myULHorses").innerHTML="";
    let dateFormat = new Date(date);
    fetch("http://127.0.0.1:3000/horses/" + dateFormat, {
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
                window.location = "http://127.0.0.1:3000/static/login.html";
            }
            horses.forEach(function (horse) {
                let pic = horse.picture;
                if(pic == "")
                {
                    //default picture for horse
                    pic = "https://www.caribuhorsewear.com.au/images/P/Purple-Rope-Halter%20%283%29.jpg"
                }
                createNewHorseElement(horse.guid, horse.name, horse.breed, pic, date, riderId, instructorId)
            });
        });

}

function createNewHorseElement(id, name, breed, picture, date, riderId, instructorId) {
    if(picture == "")
    {
        //default picture for horse
        picture = "https://www.caribuhorsewear.com.au/images/P/Purple-Rope-Halter%20%283%29.jpg"
    }

    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.setAttribute("horseId", id);
    li.setAttribute("riderId", riderId);
    li.setAttribute("instructorId", instructorId);
    li.setAttribute("date", date);
    li.setAttribute("onclick","createMatch(this.getAttribute('date'),this.getAttribute('riderId'),this.getAttribute('instructorId'),this.getAttribute('horseId')); markElement(\"myULHorses\",id)");
    li.setAttribute("class", "list-item");
    li.innerHTML = `<div class="list-item__image">
			<img src="${picture}" alt="Thumbnail" style="width: 80px"; border-radius="50%">
		</div>
		<div class="list-item__content">
			<h4>${name}</h4>
			<p>Breed: ${breed}</p>
		</div>`;
    document.getElementById("myULHorses").appendChild(li);
}

function createMatch(lessonTime, riderId, instructorId, horseId) {
    let lesson = JSON.stringify({lessonTime:lessonTime, riderId:riderId, instructorId:instructorId, horseId:horseId});
    fetch("http://127.0.0.1:3000/matches", {
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
                window.location = "http://127.0.0.1:3000/static/login.html"
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
        lis[i].className="list-item";
    }
    document.getElementById(id).className += " active";
}
