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
// const songCurrentTime=  document.getElementById('current_time'); // as we stored data using const songcurenttime next if we call it then we dont need to write const in front of variable name
// const songTotalTime = document.getElementById('end_time"');

var currentSongObj = {};
var defaultImage = "assests/images/defaultImage.gif";  // jiski value humne change karvani h usko var se define kre ge hamesha kuki
//const means constant it will not change,


// core logic
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


                cardbox.forEach(section => {  // this loop will run for each item in the cardbox. so it will fetch data of songsbox 
                    // and songscard from each section.
                    const { songsbox, songscards } = section; // songsbox, songscards are keyword in res in which data is stored so we taking data of
                    // songsbox in which songscard exsist from response res.
                    renderSection(songsbox, songscards); // this will also run in forreach funciton songsbox and songscard will store into this


                })
            }
            // 
        })
        .catch((err) => {
            console.error(err);
            alert('failed');
        })

}

function renderSection(title, songsList) {  // this function will take song list and title from songbox songlist where function is called.  
    const songsSection = makeSectionDom(title, songsList);
    musicLibsContainer.appendChild(songsSection); // this will add our code into html using dom. append used to add created element into html
}

function makeSectionDom(title, songsList) { // it will make section into dom .. dom means interface that allow progrram and scripts to dynamically
    // // acces and uopdate the content, structure and style of document. 

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


function buildSongCardDom(songObj) { // this function will take song obj input and will return dom
    // here we put a function on click which function will run which will take songobj
    // we fetching data from json in songobj hold songcard from json and we extracting data form songcard using id songobj.song_name.
    // we saved json songobj in data-songobj .
    // below onclick="playsong(this)" here this represent the div element. so onclick function it will return the whole div element.

    return `<div class="song-card"  onClick="playSong(this)" data-songobj='${JSON.stringify(songObj)}'> 
                <div class="img-cont">
                       <img src="/${songObj.image_source}" alt="${songObj.song_name}">
                        <div class="overlay"></div>
                </div>
                <p class="song-name">${songObj.song_name}</p>
         </div>`

    // json.stringify(songObj) means Why do we use JSON Stringify?
    //  JSON.stringify() A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to
    // be a string. Convert a JavaScript object into a string with JSON.stringify() .
}



// Music player function 

function playSong(songCardEl) {  // function for playing song
    const songObj=JSON.parse(songCardEl.dataset.songobj); // json.parse it will convert songobj into text. which will give us the values stored using keys name: ravi, so it will give us ravi // so first we called the whole div element using this. then from that element we extracted
                                              // some data in which json.songcard stored using dataset is used forThe dataset is a document-oriented module property to access and set the data attribute using JavaScript elements.
   // json.parse = A common use of JSON is to exchange data to/from a web server.When receiving data from a web server, the data is always a string.
   //Parse the data with JSON.parse(), and the data becomes a JavaScript object. JavaScript function JSON.parse() to convert text into a JavaScript object:
   
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