/* =========================================================
   WEBSITE ANNIVERSARY
   JavaScript
========================================================= */

/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

/* =========================================================
   MUSIC PLAYER
========================================================= */

const backgroundMusic = document.querySelector("#background-music");

const musicToggle = document.querySelector("#music-toggle");

const heroButton = document.querySelector(".hero-button");

let isPlaying = false;

/* =========================================================
   PLAY MUSIC
========================================================= */

function playMusic() {
  if (!backgroundMusic) return;

  backgroundMusic
    .play()
    .then(() => {
      isPlaying = true;

      if (musicToggle) {
        musicToggle.classList.add("playing");

        musicToggle.textContent = "Ⅱ";

        musicToggle.setAttribute("aria-label", "Jeda musik");
      }
    })
    .catch((error) => {
      console.error("Musik gagal diputar:", error);
    });
}

/* =========================================================
   PAUSE MUSIC
========================================================= */

function pauseMusic() {
  if (!backgroundMusic) return;

  backgroundMusic.pause();

  isPlaying = false;

  if (musicToggle) {
    musicToggle.classList.remove("playing");

    musicToggle.textContent = "♫";

    musicToggle.setAttribute("aria-label", "Putar musik");
  }
}

/* =========================================================
   ENTER OUR STORY
========================================================= */

if (heroButton) {
  heroButton.addEventListener("click", () => {
    playMusic();
  });
}

/* =========================================================
   MUSIC TOGGLE BUTTON
========================================================= */

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");
const galleryItems = document.querySelectorAll(".gallery-item");

const revealElements = document.querySelectorAll(
  ".story-content, .gallery-item, .timeline-item, .letter-wrapper, .counter-content, .closing-content",
);

/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    header.classList.toggle("menu-open");
  });
}

/* =========================================================
   3. CLOSE MOBILE MENU
   Ketika salah satu menu diklik
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    header.classList.remove("menu-open");
  });
});

/* =========================================================
   4. HEADER ON SCROLL
========================================================= */

function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

/* Jalankan sekali ketika halaman pertama kali dibuka */
handleHeaderScroll();

/* =========================================================
   5. ANNIVERSARY COUNTER
========================================================= */

/*
   GANTI tanggal di bawah dengan tanggal
   awal hubungan yang sebenarnya.

   Format:
   YYYY-MM-DDTHH:MM:SS

   Contoh:
   14 September 2024 pukul 00:00
*/

const anniversaryDate = new Date("2024-10-06T00:00:00");

const daysElement = document.querySelector("#days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");

function updateCounter() {
  const now = new Date();

  const difference = now - anniversaryDate;

  /* Jika tanggal awal belum terjadi */
  if (difference < 0) {
    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  /* Tambahkan leading zero */

  daysElement.textContent = String(days).padStart(3, "0");

  hoursElement.textContent = String(hours).padStart(2, "0");

  minutesElement.textContent = String(minutes).padStart(2, "0");

  secondsElement.textContent = String(seconds).padStart(2, "0");
}

/* Jalankan counter setiap 1 detik */
setInterval(updateCounter, 1000);

/* Jalankan langsung ketika halaman dibuka */
updateCounter();

/* =========================================================
   6. SCROLL REVEAL ANIMATION
========================================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        /*
                   Setelah muncul, observer tidak perlu
                   mengawasi elemen tersebut lagi.
                */

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   7. GALLERY LIGHTBOX
========================================================= */

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    if (!image) return;

    /*
           Ambil sumber gambar dan alt text
           dari gambar yang diklik.
        */

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    /* Tampilkan lightbox */

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    /*
           Mencegah halaman di belakang lightbox
           ikut scrolling.
        */

    document.body.style.overflow = "hidden";
  });
});

/* =========================================================
   8. CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {
  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  /*
       Kosongkan sumber gambar setelah lightbox ditutup.
    */

  setTimeout(() => {
    lightboxImage.src = "";
  }, 300);
}

/* Tombol X */

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

/* =========================================================
   9. CLOSE LIGHTBOX DENGAN BACKGROUND
========================================================= */

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    /*
           Hanya tutup jika yang diklik adalah
           background lightbox, bukan gambar.
        */

    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

/* =========================================================
   10. CLOSE LIGHTBOX DENGAN TOMBOL ESC
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox.classList.contains("active")) {
      closeLightbox();
    }

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      header.classList.remove("menu-open");
    }
  }
});

/* =========================================================
   11. PREVENT RIGHT CLICK PADA FOTO
========================================================= */

/*
   Opsional.

   Ini bukan sistem keamanan. Foto di website tidak bisa
   benar-benar diamankan dari pengguna yang tahu sedikit
   saja tentang browser.

   Fungsinya hanya mengurangi kemungkinan klik kanan
   tidak sengaja pada foto.
*/

galleryItems.forEach((item) => {
  const image = item.querySelector("img");

  if (!image) return;

  image.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
});

/* =========================================================
   12. HANDLE WINDOW RESIZE
========================================================= */

window.addEventListener("resize", () => {
  /*
       Jika layar kembali ke ukuran desktop,
       tutup menu mobile.
    */

  if (window.innerWidth > 650) {
    navMenu.classList.remove("active");
    header.classList.remove("menu-open");
  }
});

/* =========================================================
   13. PAGE LOADED
========================================================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
