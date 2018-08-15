function register() {
    let name = document.getElementById("name").value;
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    let userRegister = JSON.stringify({user: {name: name, user: user, password: password}});
    if (name === '' || user === '' || password === '') {
        alert("You must write something!");
        return;
    }
    fetch("http://127.0.0.1:3000/users/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: userRegister
    }).then((response) => response.json())
        .then((res) => {
            if (res.error===undefined){
                alert("New user created successfully");
                location.href=res.url;
            }
            else{
                document.getElementById("error").innerHTML=res.error;
                console.log(res.error);
            }
        });
}
