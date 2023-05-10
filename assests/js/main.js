//1. genrate all section using data and js.
//2. add event listner to play audio.
//3. create a audio navbar.
//4. scroll state.
//5. queue.

// constants

const musicLibsContainer = document.getElementById('music-libs');
const audioPlayer = document.getElementById('audio_player');
const pausedBtn = document.getElementById('paused');
const playingBtn = document.getElementById('playing');


var currentSongObj = {};
var defaultImage = "assests/images/defaultImage.gif";  


//core logic
window.addEventListener('load', bootUpApp)

function bootUpApp() {
    fetchAndRenderAllSections();  //will fetch all data and genrate
}

function fetchAndRenderAllSections() {
    // renderSection(data); // genrate the data and fetch all section data

    fetch('/assests/js/ganna.json') // i's fetching data from json file
        .then(res => res.json()) // then we converted data into json. (json=> )
        .then(res => {
            console.table('response', res);

            const { cardbox } = res;
            if (Array.isArray(cardbox) && cardbox.length) { // checking cardbox is array or not


                cardbox.forEach(section => {  
                    // and songscard from each section.
                    const { songsbox, songscards } = section; // songsbox, songscards are keyword in res in which data is stored so we taking data of
                    // songsbox in which songscard exsist from response res.
                    renderSection(songsbox, songscards); 


                })
            }
            // 
        })
        .catch((err) => {
            console.error(err);
            alert('failed');
        })

}

function renderSection(title, songsList) {    
    const songsSection = makeSectionDom(title, songsList);
    musicLibsContainer.appendChild(songsSection); 
}

function makeSectionDom(title, songsList) { 

    //now we will create dom using javascript starting from trending songs which we created using html.

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'songs-sections';  // we gave class name to the div which we have created.
    sectionDiv.innerHTML = `
        <h2 class="section-heading">${title}</h2>
            <div class="songs-cont" >
                    ${songsList.map(songObj => buildSongCardDom(songObj)).join('')} 
             </div>
`
    // so in songlist songcard is stored from jason which have songs data so above we created a new array using map and map itno buldsongcardom
    // function which which take songobj means songcard . and that function making a dom and uusing identiy from songobj songobj.name 
    // songobj.image_source and it's fetching data from json.

    console.log(sectionDiv);
    return sectionDiv;
}


function buildSongCardDom(songObj) { 

    return `<div class="song-card"  onClick="playSong(this)" data-songobj='${JSON.stringify(songObj)}'> 
                <div class="img-cont">
                       <img src="/${songObj.image_source}" alt="${songObj.song_name}">
                        <div class="overlay"></div>
                </div>
                <p class="song-name">${songObj.song_name}</p>
         </div>`

   
}



// Music player function 

function playSong(songCardEl) {  // function for playing song
    const songObj=JSON.parse(songCardEl.dataset.songobj); 
   
    console.log(songObj);
    setAndPlayCurrentSong(songObj) // it will set the current song which we clicked on .. it will pick that song

    document.getElementById('music-player').classList.remove('hidden');
}

 function setAndPlayCurrentSong(songObj){
    currentSongObj = songObj;
    audioPlayer.pause();  // predefined fucntion to pause the audio
    audioPlayer.src = songObj.quality.low;
    // audioPlayer.currentTime = "0";
    audioPlayer.play();  // predefined function to play a audio

    updatePlayerUi(songObj);  // now we will update the player

} 

function updatePlayerUi(songObj){
    const songImg = document.getElementById('song-img'); 
    const songName =document.getElementById('song-name');
   
   


    songImg.src = songObj.image_source;  // here we will pic the songImg source and exchange it with image source
    songName.innerHTML = songObj.song_name;

    // songCurrentTime.innerHTML = audioPlayer.currentTime;
   

     pausedBtn.style.display='none';
     playingBtn.style.display='display';


}

function togglePlayer(){
    if(audioPlayer.paused){
         audioPlayer.play();
    }
    else{
     audioPlayer.pause();
    }
    pausedBtn.style.display= audioPlayer.paused ? 'block':'none';  // if audio player is paused then style will none
     playingBtn.style.display=audioPlayer.paused ? 'none':'block';
}

// function updatePlayerTime(){
//      if(!audioPlayer || audioPlayer.paused) return;

//      const songCurrentTime = document.getElementById('songTimeStart')
//      songCurrentTime.innerHTML= getTimeString(audioPlayer.currentTime);

//      songTotalTime.innerHTML = getTimeString(audioPlayer.duration);  // it will pick the duration time from audio player itself
// }
 
// function getTimeString(time){
//     return isNaN(audioPlayer.duration)?"0:00":Math.floor(time/60)+":"+parseInt((((time/60)%1)*100).toPrecision(2));
// }













// javascript for view port 


showMe = document.querySelector('.yesClick')
view = document.querySelector('.ad-cont')

showMe.addEventListener('click', () => {
    view.classList.toggle('hide-class');
})
