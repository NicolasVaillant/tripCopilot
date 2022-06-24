//JS FILE
const status = document.querySelector('#status')

function commentCreation(element){

    const comment = element.closest('.comment-wrapper')
    const comments = comment.querySelector('.comments')
    const input = element.closest('.row').querySelector('input')
    const expand = comment.querySelector('.expand')

    if(input.value !== ""){
        const d = new Date()
        const date = d.getDate() + "/" + Number(d.getMonth() + 1) + "/" + d.getFullYear() + " à " + d.getHours() + ":" + d.getMinutes()

        let com = input.value
        if(comments.childElementCount >= 2){
            expand.setAttribute("data-class", "")
            let child = comments.children
            for (let i = 0; i < comments.childElementCount; i++) {
                child[i].classList.remove('unstack')
                expand.innerHTML = "Dérouler <i class=\"fas fa-chevron-down\"></i>"
            }

            if(child[1].classList.contains('second-comment')){
                child[1].classList.remove('second-comment')
            }
            child[0].classList.add('second-comment')
            child[1].classList.add('third-comment')
        }

        const div = document.createElement('div')
        const text = document.createElement('p')
        const date_comment = document.createElement('p')
        div.classList.add('comment-text')
        date_comment.classList.add('comment-date')
        date_comment.innerText = date
        text.innerText = com
        div.appendChild(text)
        div.appendChild(date_comment)
        comments.insertBefore(div, comments.firstChild)

        input.value = ""
    }
    saveComments(element)
}

let comments = []
function saveComments(element){
    const wrapper = element.closest('.comment-wrapper')
    const comments_container = wrapper.querySelector('.comments')
    const comment_text = comments_container.querySelectorAll('.comment-text')
    console.log(comment_text)
}

let a = 0
function commentExpand(element){
    a++
    const comment = element.closest('.comment-wrapper')
    const comments = comment.querySelector('.comments')
    let all_comments = comments.children

    for (let i = 0; i < comments.childElementCount; i++) {
        if(a%2 === 0){
            all_comments[i].classList.remove('unstack')
            element.innerHTML = "Dérouler <i class=\"fas fa-chevron-down\"></i>"
        }else{
            all_comments[i].classList.add('unstack')
            element.innerHTML = "Enrouler <i class=\"fas fa-chevron-up\"></i>"
        }
    }
}

async function shareElement(e){
    const element = e.closest('.element')
    const share_text = element.querySelector('.share_text')
    const shareData = {
        title: 'tripCopilot',
        text: share_text.innerText.substring(0, 50) + "...",
        url: 'https://trip.nicolasvaillant.net'
    }
    try {
        await navigator.share(shareData)
        e.closest('span').classList.add('success')
    } catch(error) {
        console.log(error)
    }
}

function like(e){
    const i = e.querySelector('i')
    const p = i.closest('span').querySelector('p')
    let value = Number(p.innerText)

    if(e.getAttribute("data-clicked") === "on"){
        p.innerHTML = value - 1
        i.closest('span').classList.remove('success')
        e.setAttribute("data-clicked", "off")

        store_data(i.className, e, p.innerText)
    }else{
        p.innerHTML = value + 1
        i.closest('span').classList.add('success')
        e.setAttribute("data-clicked", "on")

        store_data(i.className, e, p.innerText)
    }
}

function store_data(className, element, value){
    const clicked = className.split(" ")[1]
    const num = element.closest('.element').getAttribute("data-num")
    const request = new XMLHttpRequest();
    console.log("store");
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //console.log(this.responseText)
            // const result = JSON.parse(this.responseText);
            // console.log(result)
        }
    };
    request.open("GET", `php/store_infos.php?element=${num}&clicked=${clicked}&value=${value}`, false);
    request.send();
}

function load_data(className, element){
    const clicked = className;
    const num = element.closest('.element').getAttribute("data-num")
    const request = new XMLHttpRequest();
    console.log("load");
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //console.log("rep:" + this.responseText);
            element.querySelector('p').innerHTML = JSON.parse(this.responseText);
            // console.log(result, className, element)
        }
    };
    request.open("GET", `php/get_infos.php?element=${num}&clicked=${clicked}`, false);
    request.send();
}

window.onload = function (){
    const like = document.querySelectorAll('.like')
    like.forEach(e => {
        const span = e.querySelectorAll('.fas')
        span.forEach(a => {
            const clicked = a.className.split(" ")[1]
            const num =  a.closest('span')
            if(clicked !== "fa-share"){
                load_data(clicked, num)
            }
        })
    })
}