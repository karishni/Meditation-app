const app =()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-select button')
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-picker button');
    //length of the circle
    const length = outline.getTotalLength();
    //duration: time selected
    let duraation = 60;

    outline.style.strokeDasharray = length;
    outline.style.strokeDashoffset = length;


    play.addEventListener('click', ()=>{
        checkPlaying(song)
    })

    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src=this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            //checkPlaying(song);
        })
    })

    timeSelect.forEach(option=>{
        option.addEventListener('click', function(){
            duraation = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duraation/60)}:${Math.floor(duraation%60)}`;
        })
    })

    const checkPlaying=song=>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        }else{
            song.pause();
            video.pause();
            play.src='./svg/play.svg';
        }
    }

    song.ontimeupdate=()=>{
        let currentTime = song.currentTime;
        //console.log(currentTime);
        let elapsed = duraation - currentTime;
        //console.log(elapsed)
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        console.log(seconds, minutes)

        let progress = length - currentTime / duraation * length;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent= `${minutes}:${seconds}`;

        if(currentTime >= duraation){
            song.pause();
            song.currentTime = 0;
            play.src='./svg/play.svg';
            video.pause();
        }
    }
}
app();