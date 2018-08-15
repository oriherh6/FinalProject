loadMatches();
window.onload = function () { sortTable(0) };

function loadMatches() {
    fetch("http://127.0.0.1:3000/matches", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
        .then((matches) => {
        if(matches.status == '401')
        {
            window.location = "http://127.0.0.1:3000/static/login.html";
        }
            matches.forEach(function (match) {
                let rider= match.rider;
                let instructor = match.instructor;
                let horse = match.horse;
                let riderName = rider.firstName + " " + rider.lastName;
                let instructorName = instructor.firstName + " " + instructor.lastName;
                addMatchToTable(match.guid, match.lessonTime, riderName,instructorName, horse.name);
            });
        });
}


function addMatchToTable(id, date, riderName, instructorName, horseName)
{
    let tableBody =document.getElementById("tableBody");
    let row = `<tr id="${id}"><td>${date}</td><td>${riderName}</td><td>${instructorName}</td><td>${horseName}</td></tr>`;
    tableBody.innerHTML += row;
}


function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("matchesTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}