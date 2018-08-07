// Create a "close" button and append it to each list item
let i;
let todoList = [];
loadTodos();


function loadTodos() {
    fetch("http://localhost:3000/idea", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
        .then((todos) => {
            todoList = todos;
            todos.forEach(function (todo) {
                createNewTodoElement(todo.id, todo.content, todo.done)
            });
        });
}


// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');

function getTodoById(id) {
    objIndex = todoList.findIndex((obj => obj.id == id));
    return todoList[objIndex];
}

function updateTodo(todo) {
    objIndex = todoList.findIndex((obj => obj.id == todo.id));
    return todoList[objIndex] = todo;
}


list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        id = ev.target.getAttribute("id");
        todo = getTodoById(id);
        todo.done = !todo.done;
        fetch("http://localhost:3000/idea/" + id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo: todo})
        }).then((response) => response.json())
            .then((todo) => {
                ev.target.classList.toggle('checked');
                updateTodo(todo);
            });
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let todo = JSON.stringify({todo: {content: inputValue, done: false}});
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }
    fetch("http://localhost:3000/idea", {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: todo
    }).then((response) => response.json())
        .then((id) => {
            todoList.push({id: id.id, content: inputValue, done: false});

            createNewTodoElement(id.id, inputValue, false);
        });


}

function handleDeleteing() {
    let close = document.getElementsByClassName("close");

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            let id = div.getAttribute('id');
            fetch("http://localhost:3000/idea/" + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function () {
                div.style.display = "none";

            })
        }
    }
}

function createNewTodoElement(id, inputValue, done) {
    let li = document.createElement("li");
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.setAttribute("id", id);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";
    if (done)
        li.classList.toggle('checked');

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);


    handleDeleteing();

}

