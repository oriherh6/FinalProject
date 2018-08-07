function login() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    let userLogin = JSON.stringify({user: {user: user, password: password}});
    if (user === '' || password === '') {
        alert("You must write something!");
        return;
    }
    fetch("http://localhost:3000/users/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json'
        },
        body: userLogin
        }).then((response) => response.json())
         .then((res) => {
            if (res.error===undefined){
               location.href=res.url;
            }
            else{
                location.href=res.url;
            }
        });
}
