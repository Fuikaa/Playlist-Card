var lagu = [
    ['Aruarian Dance', 'Nujabes', '244K', '11M', 'AruarianDance.jpg', 'background: linear-gradient(gray,rgb(21, 22, 22))','Nujabes - aruarian dance.mp3'],
    ['Happy', 'Pharrell Williams', '9,3M', '1,4B', 'Happy.jpg', 'background: linear-gradient(bisque,rgb(31, 31, 31))', 'Pharrell Williams - Happy.mp3'],
    ['Feels', 'Calvin Harris', '4,5M', '772M', 'Feels.jpg', 'background: linear-gradient(#412521,rgb(0, 0, 0))', 'Calvin Harris - Feels.mp3'],
];

let card = document.getElementById("container");
let currentAudio = null;
let currentButton = null;

function updateSliderStyle(slider) {
    const value = slider.value;
    slider.style.background = `linear-gradient(to right, white 0%, white ${value}%, #888 ${value}%, #888 100%)`;
}

// Loop untuk membuat semua kartu sekaligus sebagai string HTML
let example_card = "";

for (let x = 0; x < lagu.length; x++) {
    var judul = lagu[x][0];
    var penyayi = lagu[x][1];
    var like = lagu[x][2];
    var play = lagu[x][3];
    var img = lagu[x][4];
    var bgimg = lagu[x][5];
    var song = lagu[x][6];

 example_card += `
        <div class="bgkartu" style="${bgimg}">
            <div class="title">
                <h2>${judul}</h2>
                <p><small><i>Oleh ${penyayi}</i></small></p>
            </div>
            <img src="${img}" alt="">
            <audio id="audio-${x}" src="${song}"></audio>
            <div class="controls">
                <input type="range" value="0" id="progress-${x}" class="progress-bar">
                <button id="play-btn-${x}"><i class="ph ph-play"></i></button>
            </div>
            <div class="footer">
                <div><p class="like"><i class="ph ph-heart"></i> ${like}</p></div>
                <div><p class="play"><i class="ph ph-play"></i> ${play}</p></div>
            </div>
        </div>
    `;
}
    card.innerHTML = example_card;

// Setelah elemen ada di DOM, pasang event listener
for (let x = 0; x < lagu.length; x++) {
    const audio = document.getElementById(`audio-${x}`);
    const button = document.getElementById(`play-btn-${x}`);
    const progress = document.getElementById(`progress-${x}`);
    updateSliderStyle(progress);

    button.addEventListener("click", () => {
        // Jika audio lain sedang diputar, hentikan
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentButton) currentButton.innerHTML = '<i class="ph ph-play"></i>';
        }

        // Toggle play/pause
        if (audio.paused) {
            audio.play();
            button.innerHTML = '<i class="ph ph-pause"></i>';
             currentAudio = audio;
            currentButton = button;
        } else {
            audio.pause();
            button.innerHTML = '<i class="ph ph-play"></i>';
            currentAudio = null;
            currentButton = null;
        }
    });

    // Update progress bar saat audio berjalan
    audio.addEventListener("timeupdate", () => {
        if (!isNaN(audio.duration)) {
            const value = (audio.currentTime / audio.duration) * 100;
            progress.value = value;
            updateSliderStyle(progress);
        }
    });

    // Seek audio saat user geser progress bar
    progress.addEventListener("input", () => {
        if (!isNaN(audio.duration)) {
            audio.currentTime = (progress.value / 100) * audio.duration;
            updateSliderStyle(progress);
        }
    });
}
