let play = document.getElementById('play');
let audio = new Audio();
let currentSong = 0;
let order = [];

let progressbar = document.getElementById('progressBar');
let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowbar = document.querySelector('.now-bar');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');

// All 7 songs with their correct paths
let songs = [
{
songname:'Peaceful Nasheed 1',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p1.jpeg',
songpath:'Audio/PeaceFull_Nasheed_1.mp3'
},
{
songname:'Peaceful Nasheed 2',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p2.jpeg',
songpath:'Audio/PeaceFull_Nasheed_2.mp3'
},
{
songname:'Peaceful Nasheed 3',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p3.jpeg',
songpath:'Audio/PeaceFull_Nasheed_3.mp3'
},
{
songname:'Peaceful Nasheed 4',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p4.jpeg',
songpath:'Audio/PeaceFull_Nasheed_4.mp3'
},
{
songname:'Peaceful Nasheed 5',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p5.jpeg',
songpath:'Audio/PeaceFull_Nasheed_5.mp3'
},
{
songname:'Peaceful Nasheed 6',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p6.jpeg',
songpath:'Audio/PeaceFull_Nasheed_6.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p7.jpeg',
songpath:'Audio/PeaceFull_Nasheed_7.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p8.jpeg',
songpath:'Audio/PeaceFull_Nasheed_8.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p9.jpeg',
songpath:'Audio/PeaceFull_Nasheed_9.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p10.jpeg',
songpath:'Audio/PeaceFull_Nasheed_10.mp3'
},
{
    songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p11.jpeg',
songpath:'Audio/PeaceFull_Nasheed_11.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p12.jpeg',
songpath:'Audio/PeaceFull_Nasheed_12.mp3'
},

{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p13.jpeg',
songpath:'Audio/PeaceFull_Nasheed_13.mp3'
},
{
songname:'Peaceful Nasheed 7',
songsdec:'Peaceful Nasheed',
songImage:'Audio/p14.jpeg',
songpath:'Audio/PeaceFull_Nasheed_14.mp3'
},





];
// Initialize order with original songs
order = [...songs];

// Create music cards dynamically
function createMusicCards() {
    const songsContainer = document.getElementById('songs-container');
    if (!songsContainer) return;
    
    songsContainer.innerHTML = ''; // Clear existing content
    
    songs.forEach((song, index) => {
        const musicCard = document.createElement('div');
        musicCard.className = 'music-card';
        musicCard.setAttribute('data-song-index', index);
        
        musicCard.innerHTML = `
            <img src="${song.songImage}" alt="${song.songname}" onerror="this.src='final.jpeg'">
            <div class="music-play-btn">
                <i class="playMusic fa-solid fa-circle-play"></i>
            </div>
            <div class="img-tittle">${song.songname}</div>
            <div class="img-description">${song.songsdec}</div>
        `;
        
        songsContainer.appendChild(musicCard);
    });
}

// Call this function to create cards
createMusicCards();

// Play/Pause main button
play.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src) {
            currentSong = 0;
            loadAndPlaySong(currentSong);
        } else {
            audio.play().catch(error => {
                console.log('Playback failed:', error);
                alert('Could not play the audio file. Please check if the file exists.');
            });
        }
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    }
});

// Function to load and play a song
function loadAndPlaySong(index) {
    if (index >= 0 && index < order.length && order[index]) {
        console.log('Loading song:', order[index].songpath);
        console.log('With image:', order[index].songImage);
        
        audio.src = order[index].songpath;
        audio.load();
        audio.currentTime = 0;
        
        updateNowbar();
        updatePlayButtons(index);
        
        audio.play().catch(error => {
            console.log('Playback failed:', error);
            alert(`Could not play "${order[index].songname}". File not found: ${order[index].songpath}`);
            play.classList.remove('fa-pause');
            play.classList.add('fa-play');
        });
    }
}

// Update all play buttons
function updatePlayButtons(activeIndex) {
    let playMusic = document.querySelectorAll('.playMusic');
    playMusic.forEach((element, index) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
    
    if (playMusic[activeIndex]) {
        playMusic[activeIndex].classList.remove('fa-circle-play');
        playMusic[activeIndex].classList.add('fa-circle-pause');
    }
}

// Play music from cards - need to reattach event listeners after dynamic creation
function attachPlayButtonListeners() {
    let playMusic = document.querySelectorAll('.playMusic');
    
    playMusic.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            
            currentSong = index;
            loadAndPlaySong(currentSong);
            
            play.classList.remove('fa-play');
            play.classList.add('fa-pause');
        });
    });
}

// Call this after cards are created
attachPlayButtonListeners();

// Progress bar update
audio.addEventListener("timeupdate", () => {
    if (audio.duration && !isNaN(audio.duration)) {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressbar.value = progress;
        updateProgressBarColor(progress);
    }
});

// Progress bar seeking
progressbar.addEventListener('input', function() {
    let value = this.value;
    updateProgressBarColor(value);
    
    if (audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = (value * audio.duration) / 100;
    }
});

function updateProgressBarColor(progress) {
    progressbar.style.background = `linear-gradient(to right, rgb(11,156,59) ${progress}%, #ccc ${progress}%)`;
}

// Shuffle functionality
let songOnRepeat = false;
let songOnShuffle = false;

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

shuffle.addEventListener('click', () => {
    if (!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');
        
        let currentSongPath = order[currentSong]?.songpath;
        order = shuffleArray(songs);
        
        if (currentSongPath) {
            let newIndex = order.findIndex(song => song.songpath === currentSongPath);
            if (newIndex !== -1) currentSong = newIndex;
        }
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');
        
        let currentSongPath = order[currentSong]?.songpath;
        order = [...songs];
        
        if (currentSongPath) {
            let newIndex = songs.findIndex(song => song.songpath === currentSongPath);
            if (newIndex !== -1) currentSong = newIndex;
        }
    }
});

// Repeat functionality
repeat.addEventListener('click', () => {
    if (!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
});

// Play next song
function playNextSong() {
    if (order.length === 0) return;
    
    if (songOnRepeat) {
        audio.currentTime = 0;
        audio.play().catch(error => console.log('Playback failed:', error));
    } else {
        let nextIndex = (currentSong + 1) % order.length;
        currentSong = nextIndex;
        loadAndPlaySong(currentSong);
    }
}

// Play previous song
function playPrevSong() {
    if (order.length === 0) return;
    
    let prevIndex = (currentSong - 1 + order.length) % order.length;
    if (prevIndex >= 0 && prevIndex < order.length) {
        currentSong = prevIndex;
        loadAndPlaySong(currentSong);
    }
}

// Update now playing bar
function updateNowbar() {
    if (nowbar && order[currentSong]) {
        let nowbarImg = nowbar.querySelector('img');
        let nowbarTitle = nowbar.querySelector('.img-tittle-info');
        let nowbarDesc = nowbar.querySelector('.img-desc-info');
        
        if (nowbarImg) {
            nowbarImg.src = order[currentSong].songImage;
            nowbarImg.onerror = function() {
                this.src = 'final.jpeg'; // Fallback image if song image not found
            };
        }
        if (nowbarTitle) nowbarTitle.textContent = order[currentSong].songname;
        if (nowbarDesc) nowbarDesc.textContent = order[currentSong].songsdec;
    }
}

// Event listeners
forward.addEventListener('click', playNextSong);
backward.addEventListener('click', playPrevSong);

audio.addEventListener('ended', playNextSong);

audio.addEventListener('pause', () => {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
});

audio.addEventListener('play', () => {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
});

// Error handling
audio.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    console.error('Failed source:', audio.src);
    
    // Check if file exists
    fetch(audio.src, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                alert(`Error: File not found - ${audio.src}`);
            }
        })
        .catch(() => {
            alert(`Error: Cannot access file - ${audio.src}`);
        });
});

// Initialize
if (songs.length > 0) {
    // Don't set audio.src here, wait for user interaction
    updateNowbar();
}

console.log('App initialized with', songs.length, 'songs');