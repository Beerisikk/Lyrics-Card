// script.js - Fixed 4 Lines Display (No Scrollbar, Auto Replace)
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playBtn');
    const audio = document.getElementById('audioPlayer');
    const lyricsContainer = document.getElementById('lyricsContainer');
    let isPlaying = false;
    let currentLineIndex = -1;

    const lyrics = [
        "Kau buat aku jatuh hati pada mu",
        "Ku berharap bisa memutar waktu mu",
        "Kemarin malam kemana dirimu sayang?",
        "Aku lupa kalau kamu hobinya ngilang",
        "Calling calling tetapi tak ada balasan",
        "Dan ternyata aku hanya dipermainkan",
        "Kemarin malam kemana dirimu sayang?",
        "Aku lupa kalau kamu hobinya ngilang",
        "Calling calling tetapi tak ada balasan",
        "Dan ternyata aku hanya dipermainkan"
    ];

    // Timing hasil shifting (tanpa delay baris)
    const lineTimings = [
        0.00, 3.41, 6.60, 10.11, 13.83,
        17.50, 20.84, 24.35, 28.06, 31.87
    ];

    let TOTAL_DURATION = 35.38;
    const GLOBAL_OFFSET = 0.0;

    if (audio) audio.loop = true;

    function renderLyrics(startIndex) {
    lyricsContainer.innerHTML = ""; // kosongkan

    for (let i = 0; i < 4; i++) {
        const line = document.createElement("div");
        line.className = "lyric-line";
        line.textContent = lyrics[startIndex + i] || "";
        lyricsContainer.appendChild(line);
    }

    // kasih delay dikit supaya transisi aktif smooth
    setTimeout(() => {
        const lines = document.querySelectorAll(".lyric-line");
        if (lines[0]) lines[0].classList.add("active");
    }, 50);
}
    function highlightLyrics() {
        if (!isPlaying || !audio) return;

        let currentTime = (audio.currentTime + GLOBAL_OFFSET) % TOTAL_DURATION;
        let nextIndex = -1;

        for (let i = 0; i < lineTimings.length; i++) {
            const startTime = lineTimings[i];
            const endTime = (i === lineTimings.length - 1) ? TOTAL_DURATION : lineTimings[i + 1];
            if (currentTime >= startTime && currentTime < endTime) {
                nextIndex = i;
                break;
            }
        }

        if (nextIndex === -1) nextIndex = 0;

        if (nextIndex !== currentLineIndex) {
            currentLineIndex = nextIndex;
            renderLyrics(currentLineIndex); // render ulang mulai dari baris aktif
        }
    }

    function resetLyrics() {
        lyricsContainer.innerHTML = "";
        currentLineIndex = -1;
    }

  if (playBtn) {
    playBtn.addEventListener('click', function() {
        if (!isPlaying) {
            if (!audio) {
                alert('Audio element tidak ditemukan!');
                return;
            }
            audio.currentTime = 0;
            audio.play().catch(err => {
                console.error(err);
                alert('Gagal memutar lagu.');
            });

            playBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
            playBtn.classList.add('playing');
            isPlaying = true;

            currentLineIndex = 0;
            renderLyrics(currentLineIndex);

            // 🔥 animasi muncul box
            lyricsContainer.style.display = "block";
            setTimeout(() => lyricsContainer.classList.add("show"), 20);

        } else {
            if (audio) audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play Music</span>';
            playBtn.classList.remove('playing');
            resetLyrics();
            isPlaying = false;

            // 🔥 animasi hilang box
            lyricsContainer.classList.remove("show");
            setTimeout(() => {
                lyricsContainer.style.display = "none";
            }, 600);
        }
    });
}


    if (audio) {
        audio.addEventListener('timeupdate', function() {
            if (isPlaying) highlightLyrics();
        });
        audio.addEventListener('ended', resetLyrics);
        audio.addEventListener('pause', resetLyrics);
        audio.addEventListener('loadedmetadata', () => {
            TOTAL_DURATION = audio.duration - 3.49;
        });
    }
});
function renderLyrics(startIndex) {
    lyricsContainer.innerHTML = ""; // kosongkan
    for (let i = 0; i < 4; i++) {
        const line = document.createElement("div");
        line.className = "lyric-line";
        line.textContent = lyrics[startIndex + i] || "";
        lyricsContainer.appendChild(line);
    }

    // kasih delay dikit untuk animasi masuk baris aktif
    setTimeout(() => {
        const lines = document.querySelectorAll(".lyric-line");
        if (lines[0]) lines[0].classList.add("active");
    }, 50);
}
document.addEventListener("DOMContentLoaded", function() {
  const loadingPage = document.getElementById("loadingPage");
  const enterBtn = document.getElementById("enterBtn");
  const body = document.body;

  enterBtn.addEventListener("click", function() {
    loadingPage.classList.add("hidden");
    body.classList.add("loaded");
  });
});
