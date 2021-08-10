const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const progressContainer = document.getElementById("progress-container")

const music = document.querySelector("audio")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

const song = [
  {
    name: "Ahwak",
    displayName: "Ahwak",
    artist: "Abdelhalim",
  },
  {
    name: "Alnahar",
    displayName: "Alnahar",
    artist: "Abdelhalim",
  },
  {
    name: "Ettouba",
    displayName: "Ettouba",
    artist: "Abdelhalim",
  },
]

let isPlaying = false

function playSong() {
  isPlaying = true
  playBtn.classList.replace("fa-play", "fa-pause")
  playBtn.setAttribute("title", "pause")
  music.play()
}

function pauseSong() {
  isPlaying = false
  playBtn.classList.replace("fa-pause", "fa-play")
  playBtn.setAttribute("title", "play")
  music.pause()
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))

function loadSong(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}
let songIndex = 0

loadSong(song[songIndex])

function nextSong() {
  songIndex++
  if (songIndex > song.length - 1) {
    songIndex = 0
  }
  loadSong(song[songIndex])

  playSong()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = song.length - 1
  }
  loadSong(song[songIndex])

  playSong()
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement

    const ProgressPercent = (currentTime / duration) * 100

    progress.style.width = `${ProgressPercent}%`

    const durationMinutes = Math.floor(duration / 60)

    let durationSecond = Math.floor(duration % 60)

    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`
    }
    if (durationSecond) {
      durationEl.textContent = `${durationMinutes}: ${durationSecond}`
    }

    const currentMinutes = Math.floor(currentTime / 60)

    let currentSecond = Math.floor(currentTime % 60)

    if (currentSecond < 10) {
      currentSecond = `0${currentSecond}`
    }
    currentTimeEl.textContent = `${currentMinutes} : ${currentSecond}`
  }
}

function setProgressBar(e) {
  const width = this.clientWidth

  const clickX = e.offsetX

  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("ended", nextSong)
music.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)
