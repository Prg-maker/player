import audios from "./data.js"
import {path, secondsToMinutes} from "./ultis.js"
import elements from "./playerElements.js"
export default {
    
    audiosData: audios,
    currentAudio : {},
    currentPlaying: 0,
    isPlaying: false,
    start(){
        elements.get.call(this)
        
        this.update()
    },
    play(){
        this.isPlaying = true
        this.audio.play()
        this.playerPause.innerText = "pause"
    },
    pause(){
        this.isPlaying = false
        this.audio.pause()
        this.playerPause.innerText = "play_arrow"

    },
    togglePlayPause(){
        if(this.isPlaying ){
            this.pause()
        }else{
            this.play()
        }
    },
    toggleMute(){
        this.audio.muted = !this.audio.muted
        this.mute.innerText = this.audio.muted ? "volume_off" : "volume_up"

    },
    next() {
        this.currentPlaying++;
        if(this.currentPlaying >= this.audiosData.length) this.restart();
            
        
        this.update()
        this.play()

       

    },
    setVolume(value) {
        this.audio.volume = value / 100;

    },
    setSeek(value) {
        this.audio.currentTime = value
    },
    timeUpdate(){
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime)
        this.seekbar.value = this.audio.currentTime
    },

    update(){
        this.currentAudio= this.audiosData[this.currentPlaying]
        this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center /cover `


        this.title.innerText =  this.currentAudio.title
        this.artist.innerText =  this.currentAudio.artist
        elements.creteAudioElement.call(this,path(this.currentAudio.file))
        this.audio.onloadeddata = () => {
            elements.action.call(this)


            
        } 
       


    },
    restart(){
        this.currentPlaying = 0 
        this.update()
    }
    
}