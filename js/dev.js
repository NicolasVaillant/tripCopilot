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
    load_comments()
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
                change_state_mood(true, select_mood.value)
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

function load_comments(){
    let new_array = []
    const files = ["data_10", "data_20", "data_30"]
    files.forEach((file) => {
        const comment_list = document.querySelector('.comment-list')
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if(this.responseText !== ""){
                    const json = JSON.parse(this.responseText)

                    // console.log(json)

                    const comment_of_day = document.createElement('div')
                    comment_of_day.classList.add('comment-day')
                    const text_comment_of_day = document.createElement('p')
                    text_comment_of_day.innerText = "Commentaires du jour"
                    text_comment_of_day.classList.add('text_comment_of_day')
                    comment_of_day.appendChild(text_comment_of_day)

                    const previous_comment = document.createElement('div')
                    previous_comment.classList.add('comment-previous')
                    const text_previous_comment = document.createElement('p')
                    text_previous_comment.innerText = "Anciens commentaires"
                    previous_comment.appendChild(text_previous_comment)

                    for (let i = 0; i < json.length; i++) {

                        const wrapper = document.createElement('div')
                        wrapper.classList.add('comment-container')

                        const div = document.createElement('div')
                        const text = document.createElement('p')
                        const date_comment = document.createElement('p')

                        if(json[i][1].includes(" ")){
                            div.classList.add(json[i][0].split(" ")[0])
                        }else{
                            div.classList.add(json[i][0])
                        }

                        div.setAttribute("data-date", json[i][2])
                        div.setAttribute("data-num", json[i][3])
                        div.setAttribute("data-text", json[i][1].substring(0, 20))

                        text.classList.add('comment-label')
                        text.innerText = json[i][1]
                        date_comment.classList.add('comment-date')

                        date_comment.innerText = json[i][2]
                        date_comment.setAttribute("data-date", json[i][2])
                        div.appendChild(text)
                        div.appendChild(date_comment)

                        wrapper.appendChild(text)
                        wrapper.appendChild(date_comment)
                        div.appendChild(wrapper)

                        const d = new Date()
                        let day = d.getDate()
                        if (day < 10) {
                            day = "0" + day
                        }
                        let month = Number(d.getMonth() + 1)
                        if (month < 10) {
                            month = "0" + month
                        }
                        let year = d.getFullYear()
                        let hour = d.getHours()
                        if (hour < 10) {
                            hour = "0" + hour
                        }
                        let min = d.getMinutes()
                        if (min < 10) {
                            min = "0" + min
                        }

                        const date = day + "/" + month + "/" + year

                        const reply_container = document.createElement('div')
                        reply_container.classList.add('reply_container')

                        const reply = document.createElement('div')
                        reply.classList.add('reply')

                        const reply_status = document.createElement('div')
                        const reply_status_text = document.createElement('p')
                        reply_status.appendChild(reply_status_text)
                        reply_status.classList.add('reply_status')
                        reply_status_text.classList.add('reply_status_text')

                        const reply_input = document.createElement('textarea')
                        const reply_button = document.createElement('button')
                        reply_input.setAttribute("wrap", "hard")
                        reply_input.setAttribute("cols", "20")
                        reply_input.setAttribute("rows", "2")

                        reply_button.innerText = "Envoyer"
                        reply_button.onclick = function (){sendReply(this)}
                        reply_button.classList.add('button-to-author')
                        reply_input.classList.add('button-to-author')

                        reply.appendChild(reply_input)
                        reply.appendChild(reply_button)

                        reply_container.appendChild(div)
                        reply_container.appendChild(reply)
                        reply_container.appendChild(reply_status)

                        if(date === json[i][2].split(" ")[0]){
                            div.classList.add("comment-today")
                            comment_of_day.appendChild(reply_container)
                            comment_list.insertBefore(comment_of_day, comment_list.firstChild)
                        }else{
                            previous_comment.appendChild(reply_container)
                            comment_list.appendChild(previous_comment)
                        }
                    }
                }
            }
        };
        request.open("GET", `https://trip.nicolasvaillant.net/php/get_comments.php?file=${file}`, true);
        request.send()
    })
}

function sendReply(element){
    const parent = element.closest('.reply')
    const container = element.closest('.reply_container')
    const reply_status_text = container.querySelector('.reply_status_text')
    const comment = container.querySelector('.comment-text')

    const textarea = parent.querySelector('textarea')
    const num = comment.dataset.num
    const date_comment = JSON.stringify(comment.dataset.date)
    const date_reply =  JSON.stringify(new Date())
    const text = JSON.stringify(comment.dataset.text)
    const reply = JSON.stringify(textarea.value)

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText !== undefined){
                console.log(this.responseText)
                textarea.value = ""
                reply_status_text.innerText = "Commentaire posté."
            }
        }
    };
    request.open("GET",
        `https://trip.nicolasvaillant.net/php/store_reply.php?num=${num}&date_comment=${date_comment}&date_reply=${date_reply}&text=${text}&reply=${reply}`,
        true);
    request.send();
}
