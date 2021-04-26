

let pwerror = document.querySelector('.pwerror');



function pwcheck(){
    let password = document.querySelector('.password').value;
    let password2 = document.querySelector('.password2').value;
    if(password != password2){
        pwerror.style.display="block";
    }else{
        pwerror.style.display="none";
    } 
}

window.addEventListener('change',() => {
    let idc = document.querySelector('.id').value;
    let password = document.querySelector('.password').value;
    let password2 = document.querySelector('.password2').value;
    let smfunc = document.querySelector('.smfunc');
    if( idc && password && password2 == password ){
        smfunc.removeAttribute('disabled');
    } else if(password2 != password){
        smfunc.addAttribute('disabled');
    }
});

function showPopup() { window.open("popup.html", "a", "width=400, height=300, left=100, top=50"); }
