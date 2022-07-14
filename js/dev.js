const log_status = document.querySelector('.log_status')
const result = document.querySelector('.result')
const col = document.querySelector('.result-col')
const first_row_change = document.querySelector('.first_row_change')
const col_mood = document.querySelector('.mood_day')
const mood_day_label = document.querySelector('.mood_day_label')
const result_button = document.querySelector('.result-button')
const select_mood = document.querySelector('#mood--day')
const send_data = document.querySelector('.send-data')
const allow = document.querySelector('.allow')

window.onload = function (){
    get_request_mood()

    const res = window.location.search.split("?")[1]
    if(res !== undefined){
        if(res === "wrong-login"){
            log_status.innerHTML = "Impossible de vous authentifier"
        }
    }
}

function send_request_mood(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            result.classList.add('result-ok')
            col.classList.add('result-ok')
            if(this.responseText === "ok"){
                result.innerHTML = "Data added successfully."
                result_button.classList.add('result-ok')
                change_state_mood(true)
            }else{
                result.innerHTML = "Erreur"
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/store_mood.php?mood=${select_mood.value}`, true);
    request.send();
}

function get_request_mood(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const res = JSON.parse(this.responseText)
            for (let i = 0; i < res.length; i++) {
                const date = res[i].date
                const mood = res[i].mood
                let day = date.split("/")[0]
                let month = date.split("/")[1]

                const objectDate = new Date()
                const current_month = "0" + Number(objectDate.getMonth() + 1)
                const current_day = objectDate.getDate().toString()

                if(month === current_month){
                    if(day === current_day) {
                        change_state_mood(true, mood)
                    }
                }
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_mood.php`, true);
    request.send();
}

function change_state_mood(status, mood){
    //disable
    if(status === true){
        allow.querySelector('i').classList.add('fa-times')
        allow.querySelector('i').classList.remove('can-write')
        send_data.setAttribute('disabled','disabled')
        first_row_change.classList.add('disabled')
        col_mood.classList.add('result-ok')
        mood_day_label.innerHTML = `Mood of the day : ${mood}`
    }
}