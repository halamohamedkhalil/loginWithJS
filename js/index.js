var loginUser;

(function(){
    loginUser = JSON.parse(localStorage.getItem("Logged"));
    loginUser ?changeName() : logout();
}) ();
function changeName(){
    document.getElementById("chagename").innerHTML = loginUser.name;
}

function logout(){
    localStorage.removeItem("Logged");
    location.replace("index.html");
}