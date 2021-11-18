const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const toggle = document.querySelector('.toggle')
const ranges = document.querySelectorAll('[type = "range"]')
const skips = document.querySelectorAll('[data-skip]')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const fullscreen = document.querySelector('.full_screen')

function handleVideo(){
    video.paused ? video.play() : video.pause()
    const button = video.paused ? '►' : '❚ ❚'
    toggle.innerHTML = button
}

function handleRange(){
    video[this.name] = this.value
}

function handleSkip(){
    console.log('skip')
    video.currentTime += parseFloat(this.dataset.skip)
}


function handleProgress(){
    let time = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${time}%`
}


function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
    console.log('scrub')
}

function handleFullscreen(){
    video.requestFullscreen()
}

video.addEventListener('click', handleVideo)
video.addEventListener('timeupdate',handleProgress)

ranges.forEach(range=> range.addEventListener('change',handleRange))
ranges.forEach(range=> range.addEventListener('mousemove',  handleRange))

skips.forEach(skip => skip.addEventListener('click', handleSkip))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e))
progress.addEventListener('mousedown', ()=> mousedown = true)
progress.addEventListener('mouseup', ()=> mousedown = false)

fullscreen.addEventListener('click', handleFullscreen)