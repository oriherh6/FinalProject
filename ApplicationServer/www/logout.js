function logOut() {

    create_cookie('user', '', -10);
    window.location = "http://127.0.0.1:3000/static/login.html"
};

function create_cookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
};
