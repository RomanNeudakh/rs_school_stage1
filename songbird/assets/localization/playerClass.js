export class BirdPlayer {
  constructor (birdSong, startButton, songVolume, soundImg, progress, audioDuration, progressContainer) {
    this.birdSong = birdSong;
    this.startButton = startButton;
    this.songVolume = songVolume;
    this.soundImg = soundImg;
    this.progress = progress;
    this.audioDuration = audioDuration;
    this.progressContainer = progressContainer;
    this.refreshProgressBar();
    this.mousedown = false;
    this.loadedData = false;
  }
  refreshProgressBar() {
    this.progress.style.flexBasis = 0;
  }
  timeStatus() {
    const birdSongDuration = `${Math.floor(this.birdSong.duration/60) > 9 ? Math.floor(this.birdSong.duration/60) : '0' + Math.floor(this.birdSong.duration/60)}:${Math.round(this.birdSong.duration)%60 > 9 ? Math.round(this.birdSong.duration)%60 : '0' + Math.round(this.birdSong.duration)%60}`;
    const birdSongCurentTime = `${Math.floor(this.birdSong.currentTime/60) > 9 ? Math.floor(this.birdSong.currentTime/60) : '0' + Math.floor(this.birdSong.currentTime/60)}:${Math.round(this.birdSong.currentTime)%60 > 9 ? Math.round(this.birdSong.currentTime)%60 : '0' + Math.round(this.birdSong.currentTime)%60}`;
    this.audioDuration.textContent = `${birdSongCurentTime}/${birdSongDuration}`;
  }
  loadAudio(){
    this.birdSong.onloadedmetadata = (event) => {
    this.loadedData = true;
    this.timeStatus();
    };
  }
  setSrc(src) {
    this.birdSong.src = src;
    this.loadAudio();
  }
  stopSong (start_play) {
    if (this.birdSong.paused && start_play) {
      this.startButton.textContent = '❚❚';
      this.birdSong.play();
    } else {
      this.startButton.textContent = '►';
      this.birdSong.pause();
    }
  }
  changeVolume() {
    this.songVolume.value == 0 ? this.soundImg.src = '../../assets/icon/sound-off.png' : this.soundImg.src = '../../assets/icon/sound.png';
    this.birdSong.volume = this.songVolume.value;
  }
  offVolume() {
    if (this.songVolume.value == 0) {
      this.birdSong.volume = 0.5;
      this.songVolume.value = 0.5;
      this.soundImg.src = '../../assets/icon/sound.png';
    } else {
      this.birdSong.volume = 0;
      this.songVolume.value = 0;
      this.soundImg.src = '../../assets/icon/sound-off.png';
    }
  }
  handleProgress() {
    const percent = (this.birdSong.currentTime / this.birdSong.duration) * 100;
    this.progress.style.flexBasis = `${percent}%`;
    if (this.loadedData) {
      this.timeStatus();
    } else {
      this.audioDuration.textContent = `Loading....`;
    }
  }
  scrub(e) {
    const scrubTime = (e.offsetX / this.progressContainer.offsetWidth) * this.birdSong.duration;
    this.birdSong.currentTime = scrubTime;
    this.timeStatus();
  }
  enableListeners() {
    this.startButton.addEventListener('click', () => {this.stopSong(true)});
    this.birdSong.addEventListener('timeupdate', () => {this.handleProgress()});
    this.songVolume.addEventListener('change', () => {this.changeVolume();});
    this.songVolume.addEventListener('mousemove', () => {this.changeVolume();});
    this.soundImg.addEventListener('click', () => {this.offVolume()});
    this.progressContainer.addEventListener('click', (e) => {this.scrub(e)});
    this.progressContainer.addEventListener('mousemove', (e) => {this.mousedown && this.scrub(e)});
    this.progressContainer.addEventListener('mousedown', () => {this.mousedown = true});
    this.progressContainer.addEventListener('mouseup', () => {this.mousedown = false});
  }
  swithLoadedDataFlag(){
    this.loadedData = false;
  }
}