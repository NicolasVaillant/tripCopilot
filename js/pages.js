function goHome(){
    window.close();
}

const wrapper_short_content = document.querySelector('.wrapper_short_content')
const children_value = wrapper_short_content.childElementCount

if(children_value >= 3){
    wrapper_short_content.classList.add('max-columns')
}
