const display = document.querySelector('.display')
const displayTimeLeft = document.querySelector('.display__time-left')
const displayEndTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const form = document.querySelector('form')
let countdown;
function timer(secs){
    clearInterval(countdown)
    const now = Date.now()
    const stop = now + secs * 1000
    displayEndTimeLeft(stop)
    displayTime(secs)
    countdown = setInterval(()=> {
        const timeLeft = Math.round((stop - Date.now() )/ 1000);
        displayTime(timeLeft)
        if( timeLeft === 0) clearInterval(countdown)
    }, 1000)
}


function displayTime(secs){
    const mins = Math.floor(secs / 60 )
    remainderSecs = secs % 60
    document.title = `${mins}:${remainderSecs < 10 ? 0 : ''}${remainderSecs}`
    displayTimeLeft.textContent = `${mins}:${remainderSecs < 10 ? 0 : ''}${remainderSecs}`
    
}

function displayEndTimeLeft(input){
    const now = new Date(input);
    const h = now.getHours()
    const m = now.getMinutes()
    displayEndTime.textContent = `Be Back At ${h}:${m < 10 ? 0 : ''}${m}`


}

function clickTimer(){
    const time = this.dataset.time
    setInterval(timer(time), 1000)
}

function inputTimer(e){
    e.preventDefault()
    let inputValue = parseInt(this.querySelector('input[type="text"]').value * 60)
    timer(inputValue)
}

buttons.forEach(button=> button.addEventListener('click',clickTimer))
form.addEventListener('submit', inputTimer)