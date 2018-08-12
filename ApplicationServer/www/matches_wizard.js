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
                createNewTodoElement(rider.guid, rider.firstName, rider.lastName,rider.age, rider.classTime)
            });
        });
}



function createNewTodoElement(id, firstName, lastName, age, classTime) {
    let li = document.createElement("li");
    let inputValue = firstName + " " + lastName + "   Age:" + age + "   Class Time:" + classTime;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute("id", id);
    document.getElementById("myUL").appendChild(li);
}