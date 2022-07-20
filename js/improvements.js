function goHome(){
    window.close();
}

const textarea = document.querySelector('#textarea')
const validation = document.querySelector('.validation')
const result = validation.querySelector('.result')
function send_request_idea(){
    let idea = textarea.value
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText === "ok"){
                validation.classList.add('success_data')
                result.innerHTML = "Merci, votre participation a bien été prise en compte !"
                textarea.value = ""
            }else{
                validation.classList.add('fail_data')
                result.innerHTML = "Oops, une erreur est survenue...! Vous avez pensez à brancher la prise"
            }
        }
    };
    let data = JSON.stringify(idea)
    request.open("GET", `https://trip.nicolasvaillant.net/php/store_idea.php?idea=${data}`, true);
    request.send();
}

function get_request_idea(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText)
            console.log(data)
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_ideas.php`, true);
    request.send();
}
window.onload = function (){
    get_request_idea()
}

function fontSize(state){
    const textarea = document.querySelector('#textarea')
    const fontSize = window.getComputedStyle(textarea).fontSize
    const value = Number(fontSize.split("px")[0])
    if(state === true){
        textarea.style.fontSize = value + 10 + "px"
    }else{
        textarea.style.fontSize = value - 10 + "px"
    }
}

const checkbox = document.querySelector('#checkbox')
const checkbox_checked = document.querySelector('.checkbox_checked')
checkbox.addEventListener('change', function () {
    if (this.checked){
        checkbox_checked.classList.add('show_all_form')
    }else {
        checkbox_checked.classList.remove('show_all_form')
    }
})
