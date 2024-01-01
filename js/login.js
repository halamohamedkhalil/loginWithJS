var memberName = document.getElementById("signUpName"),
    memberEmail = document.getElementById("signUpEmail"),
    memberPassword = document.getElementById("signUpPassword"),
    signinEmail = document.getElementById("signInEmail"),
    signinPassword = document.getElementById("signInPassword");


(function (){
   if(JSON.parse(localStorage.getItem('Logged'))){
       location.replace("home.html");
   }
}) ();
function getMembers(){
    var members = JSON.parse(localStorage.getItem('Members'));
    return members ?? [];
}
function setMembers(members){
    localStorage.setItem('Members', JSON.stringify(members));
}


function addmember(){
    if(validateALL()){
        if(!searchByEmail(memberEmail.value)){
        var member = {
            name : memberName.value,
            email : memberEmail.value,
            password : memberPassword.value
        };
        if (memberName.value == "" ||
            memberEmail.value == "" ||
            memberPassword.value == ""){
                alert("Error");
        }else{
            var members = getMembers()
            members.push(member);
            setMembers(members);
            clearForm();
        }
    } else{
        console.log("wrong")
    }
}
}

function clearForm(){
    memberName.value = "";
    memberEmail.value = "";
    memberPassword.value = "";
    clearValidate();
}
function clearValidate(){
    memberName.classList.remove("is-valid");
    memberEmail.classList.remove("is-valid");
    memberPassword.classList.remove("is-valid");
}

function validateALL(){
    return validateName(memberName.value) &&  validateEmail(memberEmail.value) && validatePassword(memberPassword.value);
}
function validateName(name){
    var nameRegEx = /^[A-Z a-z]{10,100}$/;
    return nameRegEx.test(name);
}

function validateEmail(email){
    var emailRegEx = /^[a-z A-Z 0-9]{3,}@[a-z A-Z]{3,20}\.com$/ ;
    return emailRegEx.test(email);
}

function validatePassword(password){
    var passwordRegEx = /^\d{4,20}$/ ;
    return passwordRegEx.test(password);
}

function searchByEmail(Email){
    var check= getMembers().filter(member=>member.email==Email).length==0 ?false : true;
        if(check){document.querySelector("#exist").innerHTML = ` <p> exist </p>`}
        else{document.querySelector("#exist").innerHTML = ` <p> Success </p>`};
    return check;
}

function validateErrorName(){
    if(validateName(memberName.value)){
        memberName.classList.add("is-valid");
        memberName.classList.remove("is-invalid");
    }
    else{
        memberName.classList.remove("is-valid");
        memberName.classList.add("is-invalid");
    }
}

function validateErrorEmail(){
    if(validateEmail(memberEmail.value)){
        memberEmail.classList.add("is-valid");
        memberEmail.classList.remove("is-invalid");
    }
    else{
        memberEmail.classList.remove("is-valid");
        memberEmail.classList.add("is-invalid");
    }
}

function validateErrorPassword(){
    if(validatePassword(memberPassword.value)){
        memberPassword.classList.add("is-valid");
        memberPassword.classList.remove("is-invalid");
    }
    else{
        memberPassword.classList.remove("is-valid");
        memberPassword.classList.add("is-invalid");
    }
}

// Login

function login(){
    var logged = searchByEmailPass(signinEmail.value,signinPassword.value)
    if(logged.length==0){
        document.querySelector("#incorrect").innerHTML= `incorrect email or password`;
    }else{
        document.querySelector("#incorrect").innerHTML = "";
        localStorage.setItem('Logged', JSON.stringify(logged[0]));
        location.replace("home.html");
    }
    
}

function searchByEmailPass(Email,Password){
    return getMembers().filter(member=>member.email==Email && member.password==Password);
}

// 
function display(type){
    if(type=="up")
    {
        document.getElementById("signup").classList.add("d-block");
        document.getElementById("signup").classList.remove("d-none")
        document.getElementById("signin").classList.add("d-none");
        document.getElementById("signin").classList.remove("d-block")
    }
    else{
        document.getElementById("signin").classList.add("d-block");
        document.getElementById("signin").classList.remove("d-none")
        document.getElementById("signup").classList.add("d-none");
        document.getElementById("signup").classList.remove("d-block")
    }

}