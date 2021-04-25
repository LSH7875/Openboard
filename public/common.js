let password = document.querySelector('.password');
let password2 = document.querySelector('.password2');
let pwerror = document.querySelector('.pwerror');
let smfunc = document.querySelector('.smfunc');
let idc = document.querySelector('.id');


function pwcheck(){
if(password != password2)
    pwerror.style.display="block";
}

window.addEventListener('DOMContentLoaded',() => {
    if( idc == undifined || password == undifined || password2 != password )
        smfunc.disabled=true;
}
);