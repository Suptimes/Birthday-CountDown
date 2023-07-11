import romanticMessages from './romanticMessages.js'

const days = document.getElementById("days")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

const currentYear = new Date().getFullYear()

const newBirthdayYear = new Date(`07 January ${currentYear + 1} 00:00:00`)

// Countdown Function -------------------------------

function updateCountdown(){
    
    const currentTime = new Date()
    const difference = newBirthdayYear - currentTime

    this.d = Math.floor(difference / (1000 * 60 * 60 * 24))
    let h = Math.floor(difference / (1000 * 60 * 60) % 24)
    let m = Math.floor(difference / (1000 * 60) % 60)
    let s = Math.floor(difference / (1000) % 60)

    days.textContent = this.d
    hours.textContent = h < 10 ? "0" + h : h
    minutes.textContent = m < 10 ? "0" + m : m
    seconds.textContent = s < 10 ? "0" + s : s
}

setInterval(updateCountdown,1000)

// Romantic Message Implementation ------------------

let countdownObj = new updateCountdown()
let messageIndex = Math.abs(countdownObj.d - romanticMessages.length)

const messageElement = document.getElementById("dailyMessage")
messageElement.textContent = romanticMessages[messageIndex]


// Romantic Envelope --------------------------------


const envelopeFull = document.getElementById("envelopeFull")
const envelope = document.getElementById("envelope")

envelopeFull.addEventListener("click", function openCloseEnv(){
        if(envelope.className == "close"){
            envelope.className = "open";
        }else if(envelope.className == "open"){
          envelope.className = "close";
        }
})

// Images Panorama ---------------------------------

const track = document.querySelector('.image-track')

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX
}

window.onmousemove = e => {
  if(track.dataset.mouseDownAt === '0') return

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX
  const maxDelta = window.innerWidth / 2

  const percentage = (mouseDelta / maxDelta) * -100
  // const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage
  
  const nextPercentage = Math.max(-100, Math.min(0, parseFloat(track.dataset.prevPercentage) + percentage));
  


  track.dataset.percentage = nextPercentage

  track.style.transform = `translate(${nextPercentage}%, 0%)`

  for(const image of track.getElementsByClassName("image")){
    track.animate({
      transform: `translate(${nextPercentage}%, 0%)`},{ duration: 1200, fill: "forwards" })
    
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`}, { duration: 1200, fill: "forwards"})
  }
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = '0'
  track.dataset.prevPercentage = track.dataset.percentage
}

