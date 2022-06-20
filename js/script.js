//JS FILE
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
    const shareData = {
        title: 'tripCopilot',
        text: 'hello boy',
        url: 'https://www.nicolasvaillant.net'
    }
    try {
        await navigator.share(shareData)
    } catch(error) {
        console.log(error)
    }
}
