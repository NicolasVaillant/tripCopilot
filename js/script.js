//JS FILE
const status = document.querySelector('#status')
const info_image = document.querySelector('.info-image')

function swiperFunction(){
    if(window.matchMedia("(max-width: 700px)").matches){
        document.querySelectorAll('.mySwiper').forEach(e => {
            new Swiper(e, {
                effect: "cards",
                grabCursor: true,
            });
        })
        document.querySelectorAll('.swiper-button-prev').forEach(e => {
            e.style.display = "none"
        })
        document.querySelectorAll('.swiper-button-next').forEach(e => {
            e.style.display = "none"
        })
    }else{
        document.querySelectorAll('.mySwiper').forEach(e => {
            new Swiper(e, {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        })
    }
}
window.onresize = function (){swiperFunction()}

function commentCreation(element){

    const comment = element.closest('.comment-wrapper')
    const comments = comment.querySelector('.comments')
    const input = element.closest('.row').querySelector('input')
    const expand = comment.querySelector('.expand')
    const number_of_element_to = comment.querySelector('.number_of_element_to')
    const header_comments = comment.querySelector('.header_comments')

    if(input.value !== ""){
        const d = new Date()
        const date = d.getDate() + "/" + Number(d.getMonth() + 1) + "/" + d.getFullYear() + " à " + d.getHours() + ":" + d.getMinutes()

        let com = input.value
        let val = Number(number_of_element_to.innerHTML)
        console.log(val)
        console.log(val+1)
        if(comments.childElementCount >= 2){
            header_comments.setAttribute("data-class", "")
            number_of_element_to.innerHTML = (val+1).toString()
            let child = comments.children
            for (let i = 1; i < comments.childElementCount; i++) {
                child[i].classList.remove('unstack')
                child[i].classList.add('third-comment')
                expand.innerHTML = "Dérouler <i class=\"fas fa-chevron-down\"></i>"
            }
            child[0].classList.remove('unstack')
            child[0].classList.add('second-comment')
        }

        const div = document.createElement('div')
        const text = document.createElement('p')
        const date_comment = document.createElement('p')
        div.classList.add('comment-text')
        date_comment.classList.add('comment-date')
        text.classList.add('comment-label')
        date_comment.innerText = date
        text.innerText = com
        div.appendChild(text)
        div.appendChild(date_comment)
        comments.insertBefore(div, comments.firstChild)

        input.value = ""
        saveComments()
    }
}
function saveComments(){
    let all = []
    const elements = document.querySelectorAll('.element')
    elements.forEach((e, i) => {
        if(e.dataset.class !== "hidden"){
            const comments = e.querySelector('.comments')
            if(typeof(comments) !== 'undefined' && comments !== null){
                const comment_text = comments.querySelectorAll('.comment-text')
                comment_text.forEach(a => {
                    let array = []
                    const text = a.querySelector('.comment-label').innerHTML
                    const date = a.querySelector('.comment-date').innerHTML
                    array.push(a.className, text, date, e.dataset.num)
                    if(array.length !== 0){
                        all.push(array)
                    }
                })
            }
        }
    })
    const data = JSON.stringify(all)
    console.log(data)

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText)
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/store_comments.php?data=${data}`, true);
    request.send();
}

function load_comments(){
    const element = document.querySelectorAll('.element')
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText !== ""){
                const json = JSON.parse(this.responseText)
                // console.log(json)
                for (let i = 0; i < json.length; i++) {
                    const div = document.createElement('div')
                    const text = document.createElement('p')
                    const date_comment = document.createElement('p')
                    if(json[i][0].includes(" ")){
                        div.classList.add(json[i][0].split(" ")[0])
                        // div.classList.add(json[i][0].split(" ")[1])
                    }else{
                        div.classList.add(json[i][0])
                    }

                    text.classList.add('comment-label')
                    text.innerText = json[i][1]
                    date_comment.classList.add('comment-date')
                    date_comment.innerText = json[i][2]
                    div.appendChild(text)
                    div.appendChild(date_comment)
                    element.forEach(e => {
                        if(e.dataset.num === json[i][3]){
                            e.querySelector('.comments').insertBefore(div, e.querySelector('.comments').firstChild)
                        }
                    })
                    if(i === json.length - 1){
                        sortComments()
                    }
                }
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_comments.php?`, true);
    request.send()
}

function sortComments(){
    const element = document.querySelectorAll('.element')
    element.forEach(e => {
        const expand = e.querySelector('.expand')
        const number_of_element_to = e.querySelector('.number_of_element_to')
        const header_comments = e.querySelector('.header_comments')
        if(e.dataset.class !== "hidden" && e.dataset.num !== undefined){
            const comments = e.querySelector('.comments')
            if(comments !== null){
                if(comments.childElementCount >= 2){
                    header_comments.setAttribute("data-class", "")
                    number_of_element_to.innerHTML = (comments.childElementCount).toString()
                    let child = comments.children
                    for (let i = 2; i < comments.childElementCount; i++) {
                        child[i].classList.remove('unstack')
                        child[i].classList.add('third-comment')
                        expand.innerHTML = "Dérouler <i class=\"fas fa-chevron-down\"></i>"
                    }
                    child[1].classList.add('second-comment')
                }
            }

        }
    })
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
        p.innerHTML = value-1
        i.closest('span').classList.remove('success')
        e.setAttribute("data-clicked", "off")

        store_reaction(i.className, e, p.innerText)
    }else{
        p.innerHTML = value+1
        i.closest('span').classList.add('success')
        e.setAttribute("data-clicked", "on")

        store_reaction(i.className, e, p.innerText)
    }
}

function store_reaction(className, element, value){
    const clicked = className.split(" ")[1]
    const num = element.closest('.element').getAttribute("data-num")
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText)
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/store_infos.php?element=${num}&clicked=${clicked}&value=${value}`, true);
    request.send();
}

function load_reaction(className, element){
    const clicked = className
    const num = element.closest('.element').getAttribute("data-num")
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            element.querySelector('p').innerHTML = JSON.parse(this.responseText);
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_infos.php?element=${num}&clicked=${clicked}`, true);
    request.send();
}

window.onload = function (){
    swiperFunction()
    if(window.matchMedia("(max-width: 700px)").matches){
        info_image.innerHTML = "Vous pouvez désormais accéder aux images disponibles en glissant votre doigt pour les faire défiler."
    }else{
        info_image.innerHTML = "Vous pouvez désormais accéder aux images disponibles en cliquant sur les flèches de défilement."
    }
    const like = document.querySelectorAll('.like')
    like.forEach((e, i) => {
        const span = e.querySelectorAll('.fas')
        span.forEach(a => {
            const clicked = a.className.split(" ")[1]
            const num =  a.closest('span')
            if(clicked !== "fa-share"){
                load_reaction(clicked, num)
            }
        })
        if(i === like.length - 1){
            status.innerHTML = "Vous êtes à jour."
        }else{
            status.innerHTML = "Erreur lors du chargement des informations."
        }
    })
    load_comments()
    resizeContainerImage()
}

function resizeContainerImage(){
    return
    const imgContainer = document.querySelectorAll('.img')
    imgContainer.forEach(e => {
        const img = e.querySelector('img')
        e.style.minHeight = img.height + "px"
        e.style.minWidth = img.width + "px"
    })
}

function scaleImage(img){
    return
    img.classList.toggle('scaleImg')
}

window.onscroll = function (){
    const imgContainer = document.querySelectorAll('.img')
    imgContainer.forEach(e => {
        const img = e.querySelector('img')
        img.classList.remove('scaleImg')
    })
}