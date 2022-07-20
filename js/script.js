//JS FILE
const info_image = document.querySelector('.info-image')
const backTopTop = document.querySelector('.backTopTop')

backTopTop.addEventListener('click', () => {
    window.scrollTo(0, 0)
})

function commentCheck(element){
    const comment = element.closest('.comment-wrapper')
    const input = element.closest('.row').querySelector('input')
    const comment_not_posted = comment.querySelector('.comment_not_posted')

    if(input.value.length > 250){
        comment_not_posted.classList.add('show')
    }else{
        comment_not_posted.classList.remove('show')
    }
}

function commentCreation(element){
    const comment = element.closest('.comment-wrapper')
    const comments = comment.querySelector('.comments')
    const input = element.closest('.row').querySelector('input')
    const expand = comment.querySelector('.expand')
    const number_of_element_to = comment.querySelector('.number_of_element_to')
    const header_comments = comment.querySelector('.header_comments')
    const comment_not_posted = comment.querySelector('.comment_not_posted')

    if(input.value !== ""){

        if(input.value.length < 10){
            comment_not_posted.classList.add('show')
            setTimeout(function (){
                comment_not_posted.classList.remove('show')
            }, 5000)
            return
        }

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

        const date = day + "/" + month + "/" + year + " à " + hour + ":" + min

        let com = input.value
        let val = Number(number_of_element_to.innerHTML)
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

        const wrapper = document.createElement('div')
        wrapper.classList.add('comment-container')

        const user = document.createElement('div')
        const user_icon = document.createElement('i')
        user_icon.classList.add('fas')
        user_icon.classList.add('fa-user')
        user.classList.add('user')

        const div = document.createElement('div')
        div.classList.add('comment-text')

        const text = document.createElement('p')
        text.classList.add('comment-label')
        text.innerText = com

        const date_comment = document.createElement('p')
        date_comment.classList.add('comment-date')
        date_comment.innerText = "A l'instant"
        date_comment.setAttribute("data-date", date)

        user.appendChild(user_icon)
        wrapper.appendChild(text)
        wrapper.appendChild(date_comment)
        div.appendChild(user)
        div.appendChild(wrapper)

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
                    // const date = a.querySelector('.comment-date').innerHTML
                    const date = a.querySelector('.comment-date').getAttribute("data-date")
                    array.push(a.className, text, date, e.dataset.num)
                    if(array.length !== 0){
                        all.push(array)
                    }
                })
            }
        }
    })
    const data = JSON.stringify(all)
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
                    const wrapper = document.createElement('div')
                    wrapper.classList.add('comment-container')

                    const user = document.createElement('div')
                    const user_icon = document.createElement('i')
                    user_icon.classList.add('fas')
                    user_icon.classList.add('fa-user')
                    user.classList.add('user')

                    const div = document.createElement('div')
                    const text = document.createElement('p')
                    const date_comment = document.createElement('p')

                    if(json[i][0].includes(" ")){
                        div.classList.add(json[i][0].split(" ")[0])
                    }else{
                        div.classList.add(json[i][0])
                    }

                    text.classList.add('comment-label')
                    text.innerText = json[i][1]
                    date_comment.classList.add('comment-date')

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

                    // console.log(json[i][2])
                    const dateGet = json[i][2].split("à")[0]
                    const dayGet = dateGet.split("/")[0]
                    const monthGet = dateGet.split("/")[1]

                    date_comment.innerText = json[i][2]
                    if(monthGet >= month){
                        if(dayGet < day){
                            if(dayGet === "0" + Number(day - 1)){
                                date_comment.innerText = "Hier"
                            }else{
                                date_comment.innerText = "Il y a quelques jours"
                            }
                        }else{
                            date_comment.innerText = "Dans la journée"
                        }
                    }else{
                        date_comment.innerText = "Le mois dernier"
                    }

                    date_comment.setAttribute("data-date", json[i][2])
                    div.appendChild(text)
                    div.appendChild(date_comment)

                    user.appendChild(user_icon)
                    wrapper.appendChild(text)
                    wrapper.appendChild(date_comment)
                    div.appendChild(user)
                    div.appendChild(wrapper)

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
    const title = element.querySelector('.title')
    const shareData = {
        title: 'tripCopilot',
        text: title.innerText,
        url: `https://trip.nicolasvaillant.net/index.html#${element.id}`
    }
    try {
        await navigator.share(shareData)
        e.closest('span').classList.add('success')
    } catch(error) {
        console.log(error)
    }
}

function like(e, event){
    const i = e.querySelector('i')
    const p = i.closest('span').querySelector('p')
    let value = Number(p.innerText)

    // const container = document.querySelector('#party-js-particles')
    // container.classList.add('container_confetti')
    // const posY = event.clientY - window.innerHeight/2
    // const posX = event.clientX - window.innerWidth/2
    // container.style.top = posY + "px"
    // container.style.left = posX + "px"

    if(e.getAttribute("data-clicked") === "on"){
        p.innerHTML = value-1
        i.closest('span').classList.remove('success')
        e.setAttribute("data-clicked", "off")

        store_reaction(i.className, e, p.innerText)
    }else{
        p.innerHTML = value+1
        i.closest('span').classList.add('success')
        e.setAttribute("data-clicked", "on")

        const element_clicked = e.querySelector('i')
        if(element_clicked.classList.contains('fa-star')){
            // party.sparkles(e, {gravity: 0})
            party.confetti(e,{
                shapes: ["etoile"]
            })
            //#FF817DE0
            party.resolvableShapes["etoile"] = `<img src="../resources/party/star.png"/>`;
        }else if(element_clicked.classList.contains('fa-thumbs-up')){
            party.confetti(e,{
                shapes: ["pouce"]
            })
            //#4747d8
            party.resolvableShapes["pouce"] = `<img src="../resources/party/thumb-up.png"/>`;
        }else if(element_clicked.classList.contains('fa-heart')){
            party.confetti(e,{
                shapes: ["coeur"]
            })
            // #ff5c5c
            party.resolvableShapes["coeur"] = `<img src="../resources/party/heart.png"/>`;
        }

        store_reaction(i.className, e, p.innerText)
    }
}

function store_reaction(className, element, value){
    const clicked = className.split(" ")[1]
    const num = element.closest('.element').getAttribute("data-num")
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText !== ""){
                console.log(this.responseText)
            }else{
                console.log("stored!")
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/store_infos.php?element=${num}&clicked=${clicked}&value=${value}`, true);
    // request.open("GET", `https://trip.nicolasvaillant.net/php/store_ip.php?element=${num}&clicked=${clicked}&value=${value}`, true);
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


function splideFunction(){
    var main_carousel = document.getElementsByClassName( 'main-carousel' );
    var thumbnail_carousel = document.getElementsByClassName( 'thumbnail-carousel' );

    for ( var i = 0; i < main_carousel.length; i++ ) {
        var main = new Splide(main_carousel[i], {
            type      : 'slide',
            rewind    : true,
            gap       : 10,
            pagination: false,
            arrows    : false,
        })
        var thumbnails = new Splide(thumbnail_carousel[i], {
            fixedWidth  : 100,
            fixedHeight : 60,
            gap         : 10,
            rewind      : true,
            pagination  : false,
            isNavigation: true,
            breakpoints : {
                600: {
                    fixedWidth : 60,
                    fixedHeight: 44,
                },
            },
        } );

        main.sync( thumbnails );
        main.mount();
        thumbnails.mount();
    }
}
window.onload = function (){
    // initConfetti()
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

    splideFunction()
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
    })
    load_comments()
    const date1 = new Date('8/19/2022')
    const date2 = new Date()
    getDifferenceInDays(date1, date2)
    moodOfTheDaysFunction(setSearchDate)
    chart()
    searchInit()
    getMoods()
}

window.onscroll = function (){
    const imgContainer = document.querySelectorAll('.img')
    imgContainer.forEach(e => {
        const img = e.querySelector('img')
        img.classList.remove('scaleImg')
    })

    if(window.scrollY !== 0){
        backTopTop.classList.add('click_allowed')
    }else{
        backTopTop.classList.remove('click_allowed')
    }
}

const menu_bar = document.querySelector('.menu-bar')
const close = document.querySelector('.close')
const layer = document.querySelector('.layer')
const article = document.querySelector('#article')

menu_bar.addEventListener('click', hamburger)
close.addEventListener('click', hamburger)

function hamburger(){
    layer.classList.toggle('layer-visibility')
    article.classList.toggle('article-visibility')

    if(article.classList.contains('article-visibility')){
        window.scrollTo(0, 0)
    }
    // document.body.classList.toggle('body-overflow')
}

const leftDays_label = document.querySelector('.leftDays_label')
const leftDays_label_weeks = document.querySelector('.leftDays_label_weeks')

function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1)
    const value = (Math.ceil(diffInMs / (1000 * 60 * 60 * 24))).toString()
    const weeks_max = (Math.ceil(value/7)).toString()
    const weeks_min = (Math.floor(value/7)).toString()
    leftDays_label.innerHTML = `Il reste ${value} jours avant mon retour.`
    leftDays_label_weeks.innerHTML = `Donc un peu plus de ${weeks_min} semaines, mais un peu moins que ${weeks_max}.`
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const objectDate = new Date()
const month = objectDate.getMonth() + 1
const year = objectDate.getFullYear()
const currentMonth = getDaysInMonth(year, month);
// july and august : 31 days

function getMoods(){
    const calendar_container_day = document.querySelectorAll('.calendar_container_day')
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const json = JSON.parse(this.responseText)
            for (let i = 0; i < json.length; i++) {
                const mood = json[i].mood
                const date = json[i].date

                const day = date.split("/")[0]
                const month = date.split("/")[1]

                for (let j = 0; j < calendar_container_day.length; j++) {
                    const label = calendar_container_day[j].querySelector('p')
                    if(label.innerText === day){
                        if(stack[mood] === stack.triste || stack[mood] === stack.fatigue || stack[mood] === stack.saoule){
                            label.style.color = "white"
                        }
                        calendar_container_day[j].style.background = stack[mood]
                    }
                }
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_mood.php`, true);
    request.send();
}
const stack = {
    "content" : "#61e18b",
    "incroyable" : "#e7a646",
    "normal" : "#61e1d6",
    "mauvais" : "#959897",
    "fatigue" : "#33754c",
    "triste" : "#521d93",
    "enerve" : "#f34949",
    "stresse" : "#eee75a",
    "saoule" : "#102825"
}

let mood = [
    "",
    stack.content,
    stack.normal,
    stack.normal,
    stack.normal,
    stack.saoule,
    stack.fatigue,
    stack.normal,
    stack.content,
    stack.normal,
    stack.fatigue,
    stack.normal,
    stack.fatigue,
    stack.normal,
]

const defaultColor = "#ffffff"
const calendar = document.querySelector('.calendar')
const legend = document.querySelector('.legend')
const container_last_search_element = document.querySelector('.container_last_search_element')

function moodOfTheDaysFunction(callback){
    Object.entries(stack).forEach(stack => {
        const container = document.createElement('div')
        const color = document.createElement('div')
        const label = document.createElement('p')
        container.classList.add('legend_container')
        color.classList.add('legend_color')
        label.classList.add('legend_label')
        if(stack[0] === "saoule"){
            label.innerHTML = "saoulé"
        }else if(stack[0] === "enerve"){
            label.innerHTML = "énervé"
        }else if(stack[0] === "fatigue"){
            label.innerHTML = "fatigué"
        }else if(stack[0] === "stresse"){
            label.innerHTML = "stressé"
        }else{
            label.innerHTML = stack[0]
        }

        color.style.background = stack[1]
        container.appendChild(color)
        container.appendChild(label)
        legend.appendChild(container)
    });

    const june = document.createElement('div')
    const june_summary = document.createElement('div')
    const june_days = document.createElement('div')
    const june_days_summary = document.createElement('div')
    june_days.classList.add('june_days')
    june_days_summary.classList.add('june_days')
    const june_label = document.createElement('p')
    const june_label_summary = document.createElement('p')
    june_label.classList.add('label')
    june_label_summary.classList.add('label')
    june_label.innerHTML = "Mois de juin"
    june_label_summary.innerHTML = "Mois de juin"
    june.appendChild(june_label)
    june_summary.appendChild(june_label_summary)
    june.appendChild(june_days)
    june_summary.appendChild(june_days_summary)

    const july = document.createElement('div')
    const july_summary = document.createElement('div')
    const july_days = document.createElement('div')
    const july_days_summary = document.createElement('div')
    july_days.classList.add('july_days')
    july_days_summary.classList.add('july_days')
    const july_label = document.createElement('p')
    const july_label_summary = document.createElement('p')
    july_label.classList.add('label')
    july_label_summary.classList.add('label')
    july_label.innerHTML = "Mois de juillet"
    july_label_summary.innerHTML = "Mois de juillet"
    july.appendChild(july_label)
    july_summary.appendChild(july_label_summary)
    july.appendChild(july_days)
    july_summary.appendChild(july_days_summary)

    for (let i = 24; i < 31; i++) {
        const searchDay = document.createElement('div')
        const searchDay_summary = document.createElement('div')
        const searchLabel = document.createElement('p')
        const searchLabel_summary = document.createElement('p')
        searchDay.classList.add('searchDay')
        searchDay_summary.classList.add('searchDay')
        june.classList.add('june')
        june_summary.classList.add('june_summary')
        searchLabel.innerHTML = i.toString()
        searchLabel_summary.innerHTML = i.toString()
        searchDay.appendChild(searchLabel)
        searchDay_summary.appendChild(searchLabel_summary)
        june_days.appendChild(searchDay)
        june_days_summary.appendChild(searchDay_summary)
        search_date_content.appendChild(june)
        search_date_content_summary.appendChild(june_summary)
    }

    for (let i = 1; i < currentMonth + 1; i++) {
        const day = document.createElement('div')
        const searchDay = document.createElement('div')
        const searchDay_summary = document.createElement('div')
        const label = document.createElement('p')
        const searchLabel = document.createElement('p')
        const searchLabel_summary = document.createElement('p')

        day.classList.add('calendar_container_day')
        july.classList.add('july')
        july_summary.classList.add('july_summary')
        searchDay.classList.add('searchDay')
        searchDay_summary.classList.add('searchDay')
        label.innerHTML = i.toString()
        searchLabel.innerHTML = i.toString()
        searchLabel_summary.innerHTML = i.toString()

        day.appendChild(label)
        searchDay.appendChild(searchLabel)
        searchDay_summary.appendChild(searchLabel_summary)

        if(mood[i] === undefined || mood[i] === "undefined"){
            day.style.background = defaultColor
        }else{
            if(mood[i] === stack.triste || mood[i] === stack.fatigue || mood[i] === stack.saoule){
                day.querySelector('p').style.color = "white"
            }
            day.style.background = mood[i]
        }
        calendar.appendChild(day)

        july_days.appendChild(searchDay)
        july_days_summary.appendChild(searchDay_summary)

        search_date_content.appendChild(july)
        search_date_content_summary.appendChild(july_summary)
    }
    callback()
}

function setSearchDate(){
    const date = document.querySelectorAll('.element .date')
    const search_date_content = document.querySelector('.search_date_content')
    const search_date_content_summary = document.querySelector('.search_date_content_summary')

    const june = search_date_content.querySelector('.june')
    const june_summary = search_date_content_summary.querySelector('.june_summary')
    const july = search_date_content.querySelector('.july')
    const july_summary = search_date_content_summary.querySelector('.july_summary')

    const searchDay_june = june.querySelectorAll('.searchDay')
    const searchDay_june_summary = june_summary.querySelectorAll('.searchDay')
    const searchDay_july = july.querySelectorAll('.searchDay')
    const searchDay_july_summary = july_summary.querySelectorAll('.searchDay')

    date.forEach(e => {
        const posted = e.querySelector('p').innerText
        const day = posted.split(" ")[0].split("/")[0]
        const month = posted.split(" ")[0].split("/")[1]
        for (let i = 0; i < searchDay_june.length; i++) {
            const card = searchDay_june[i].querySelector('p')
            const card_summary = searchDay_june_summary[i].querySelector('p')
            if(month === "06"){
                if(day === card.innerText){
                    card.closest('.searchDay').classList.add('active_day')
                    card_summary.closest('.searchDay').classList.add('active_day')
                    card.closest('.searchDay').onclick = function (){gotoDate(this)}
                    card_summary.closest('.searchDay').onclick = function (){gotoDate(this)}
                }
            }
        }
        for (let i = 0; i < searchDay_july.length; i++) {
            const card = searchDay_july[i].querySelector('p')
            const card_summary = searchDay_july_summary[i].querySelector('p')
            if(month === "07"){
                let d
                if(day < 10){d = "0" + card.innerText}
                else{d = card.innerText}
                // console.log(d)
                if(day === d){
                    card.closest('.searchDay').classList.add('active_day')
                    card_summary.closest('.searchDay').classList.add('active_day')
                    card.closest('.searchDay').onclick = function (){gotoDate(this)}
                    card_summary.closest('.searchDay').onclick = function (){gotoDate(this)}
                }
            }
        }
    })
}

const search_text = document.querySelector('.search_text')
const search_text_input = document.querySelector('#search_text')
const search_date = document.querySelector('.search_date')
const search_text_content = document.querySelector('.search_text_content')
const search_date_content = document.querySelector('.search_date_content')
const search_date_content_summary = document.querySelector('.search_date_content_summary')
const search_wrapper = document.querySelector('.search_wrapper')
const table_content_add = document.querySelector('.table_content_add')
const table_content = document.querySelector('.table_content')

function closeSearch(){
    search_wrapper.classList.remove('show')
    search_text_input.value = ""
}

function searchInit(){
    const title = document.querySelectorAll('.element h1.title')
    const article = document.querySelectorAll('.element')
    title.forEach((e, i) => {
        const element = document.createElement('div')
        const label = document.createElement('p')
        const ico = document.createElement('i')
        const div_ico = document.createElement('div')
        ico.classList.add('fas')
        ico.classList.add('fa-external-link-square-alt')
        div_ico.classList.add('div_ico')
        element.classList.add('element_find')
        label.innerHTML = e.innerHTML

        if(article[i+1].querySelector('.link_pages_img') !== null ||
            article[i+1].querySelector('.thumbnails_img') !== null){
            const ico_img = document.createElement('i')
            ico_img.classList.add('fas')
            ico_img.classList.add('fa-images')
            div_ico.appendChild(ico_img)
        }

        div_ico.appendChild(ico)
        element.appendChild(label)
        element.appendChild(div_ico)

        search_text_content.appendChild(element)
        table_content_add.appendChild(element.cloneNode(true))
    })
    summaryScroll()
}

function summaryScroll(){
    const limit = 5
    let value = table_content_add.childElementCount - limit
    let el = table_content_add.children
    for (let i = 0; i < table_content_add.childElementCount; i++) {
        el[i].onclick = function (){
            goto(this)
        }
    }
    if(table_content_add.childElementCount >= limit){
        for (let i = 0; i < value; i++) {
            table_content_add.children[i + limit].classList.add('hidden_summary')
            table_content_add.children[i + limit].setAttribute('data-summary', 'hidden_summary')
        }

        const more_content = document.createElement('div')
        const label = document.createElement('p')
        const ico = document.createElement('i')
        ico.classList.add('fas')
        ico.classList.add('fa-chevron-down')
        more_content.classList.add('more_content_summary')
        label.innerHTML = `${value} résultats supplémentaires`
        more_content.appendChild(label)
        more_content.appendChild(ico)
        more_content.onclick = function (){expand_all_summary(ico, label, value)}

        table_content.appendChild(more_content)
    }
}

function expand_all_summary(ico, label, value){
    if(ico.classList.contains('fa-chevron-down')){
        ico.classList.remove('fa-chevron-down')
        ico.classList.add('fa-chevron-up')
        label.innerText = 'Enrouler'
    }else{
        ico.classList.remove('fa-chevron-up')
        ico.classList.add('fa-chevron-down')
        label.innerText = `${value} résultats supplémentaires`
    }


    const hidden_summary = table_content_add.querySelectorAll('.element_find')
    hidden_summary.forEach(e => {
        if(e.getAttribute('data-summary') === 'hidden_summary'){
            e.classList.toggle('hidden_summary')
        }
    })
}

function searchDate(clicked, key, fromClicked){
    search_wrapper.classList.add('show')

    if(fromClicked === true){
        if(clicked === "search_text"){
            search_date.classList.remove('show')
            search_text.classList.add('show')
            const children = search_text_content.querySelectorAll('.element_find')
            children.forEach(e => {
                e.classList.remove('click_allowed')
                e.classList.add('click_denied')
            })
        }else{
            //search_date
            search_text_input.value = ""
            search_text.classList.remove('show')
            search_date.classList.add('show')
        }
    }else{
        if(clicked === "search_text"){
            search_date.classList.remove('show')
            search_text.classList.add('show')

            let filter
            let txtValue

            filter = search_text_input.value.toUpperCase();
            const children = search_text_content.querySelectorAll('.element_find')
            if(key.key === "Backspace"){
                children.forEach(e => {
                    e.classList.remove('click_allowed')
                    e.classList.add('click_denied')
                })
            }
            if(search_text_input.value !== ""){
                for (let i = 0; i < children.length; i++) {
                    txtValue = children[i].innerText
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        children[i].classList.remove('click_denied')
                        children[i].classList.add('click_allowed')
                        children[i].onclick = function (){goto(this)}
                    } else {
                        children[i].classList.remove('click_allowed')
                        children[i].classList.add('click_denied')
                    }
                }
            }
        }else{
            //search_date
            search_text_input.value = ""
            search_text.classList.remove('show')
            search_date.classList.add('show')
        }
    }
}

function chart(){
    const container = document.querySelector('#container_chart')
    const label = container.querySelector('p')
    var bar = new ProgressBar.Circle(container_chart, {
        color: '#817de0',
        trailColor: '#ffffff',
        svgStyle: null,
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
    });

    //0,99 + 1,05 + 5,5 + 0,92 + 1,08 + 8,6 + 18,87 (02/07)
    //1,08 + 6,90 +  1,05 (05/07)
    //1,00
    //9,63 (07/07)
    //14,03 (09/07)
    //3,63 (11/07)
    //8,40 (12/07)
    //16,36 (15/07)
    //3,53 (16/07)
    //3,53 (16/07)
    //24.19 (17/07)
    const res = 126.18 //(17/07)
    label.innerHTML = `${res} km`
    let value = res/150
    bar.animate(value);
}

function goto(element){
    search_text_input.value = ""
    const label = element.querySelector('p').innerText
    const title = document.querySelectorAll('.element h1.title')
    title.forEach(e => {
        if(e.innerHTML === label){
            const to = e.closest('.element').offsetTop
            const res = to - window.innerHeight/6
            window.scrollTo(0, res)
        }
    })
}

function gotoDate(element){
    const wrapper = element.closest('.searchDay').parentElement

    const date = document.querySelectorAll('.element .date')
    date.forEach(e => {
        const value = e.querySelector('p').innerText
        const day = value.split(" ")[0].split("/")[0]
        const month = value.split(" ")[0].split("/")[1]
        const label = element.querySelector('p').innerText
        let dayBefore10
        if(wrapper.className === "june_days"){
            if(month === "06"){
                if(label === day){
                    const to = e.closest('.element').offsetTop
                    const res = to - window.innerHeight/6
                    window.scrollTo(0, res)
                }
            }
        }
        if(wrapper.className === "july_days"){
            if(month === "07"){
                if(label < 10){dayBefore10 = "0" + label}
                else{dayBefore10 = label}
                if(dayBefore10 === day){
                    const to = e.closest('.element').offsetTop
                    const res = to - window.innerHeight/6
                    window.scrollTo(0, res)
                }
            }
        }
    })
}

function scrollToTop(){
    window.scrollTo(0, 0)
    if(article.classList.contains('article-visibility')){
        layer.classList.remove('layer-visibility')
        article.classList.remove('article-visibility')
    }
}

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show_article", entry.isIntersecting)
            // if(entry.target.parentElement === "header") continue
            if(entry.target.parentElement.tagName !== "HEADER"){
                entry.target.querySelector('.title').classList.toggle("show_title", entry.isIntersecting)
            }
        })
    },
    {
        threshold : .1
    }
)

const card = document.querySelectorAll('.element')
card.forEach(card => {
    observer.observe(card)
})