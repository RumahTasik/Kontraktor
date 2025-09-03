const portfolioItems = [
  {
    title: "Rumah 1 Lantai Classic Modern",
    tag: ["Rumah 1 Lantai", "Classic"],
    img: "../img/minimalis modern/Rumah 1 Lantai.png",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll(".hero-content h1 span");
  let index = 0;

  // tampilkan span pertama
  spans[index].classList.add("active");

  setInterval(() => {
    const current = spans[index];

    // kasih animasi keluar
    current.classList.remove("active");
    current.classList.add("out");

    // pindah ke span berikutnya
    index = (index + 1) % spans.length;
    const next = spans[index];

    // tunggu dikit biar animasi out kelihatan
    setTimeout(() => {
      current.classList.remove("out"); // reset
      next.classList.add("active"); // animasi masuk
    }, 600); // sama dengan durasi animasi slideOutDown
  }, 3000);
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Ambil semua link navbar dan semua section
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

// Fungsi cek section aktif
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // offset biar gak kepotong navbar
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Hapus dulu semua active
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// --- HAMBURGER MENU ---
const hamburger = document.querySelector("#hamburger-menu");
const navMenu = document.querySelector(".nav-links"); // div nav-links
const navItems = document.querySelectorAll(".nav-links a"); // semua link dalam nav-links

// Klik hamburger -> toggle menu
hamburger.addEventListener("click", function (e) {
  e.preventDefault();
  navMenu.classList.toggle("active");
});

// Tutup menu saat klik link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// --- AKTIFKAN LINK SAAT DIKLIK ---
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    // hapus active dari semua link
    navItems.forEach((l) => l.classList.remove("active"));
    // tambahkan active ke link yg diklik
    link.classList.add("active");
  });
});

const grid = document.getElementById("portfolioGrid");
const renderPortfolio = (filter = "all") => {
  grid.innerHTML = "";
  portfolioItems
    .filter((item) => {
      if (filter === "all") return true;

      if (Array.isArray(item.tag)) {
        return item.tag.includes(filter);
      }

      return item.tag === filter;
    })
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
      <a href="${item.img}" target="_blank">
        <img src="${item.img}" alt="${item.title}"> </a>
        <h4>${item.title}</h4>
      `;
      grid.appendChild(div);
    });
};
renderPortfolio();

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPortfolio(btn.dataset.filter);
  });
});

// nomor WA admin (ganti dengan nomor kamu, pakai kode negara tanpa +)
const adminNumber = "6281381300825";

// ambil semua tombol order
const orderButtons = document.querySelectorAll(".btn-order");

orderButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // supaya tidak reload halaman

    const packageName = this.getAttribute("data-package");
    const packagePrice = this.getAttribute("data-price");

    const message = `Halo Min, saya ingin menggunakan Jasa Arsitek ${packageName} (${packagePrice})`;

    // encode pesan biar aman untuk URL
    const encodedMessage = encodeURIComponent(message);

    // arahkan user ke WhatsApp
    const waUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  });
});

document
  .getElementById("penawaranForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data form
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const wa = document.getElementById("wa").value;
    const jenis = document.getElementById("jenis").value;
    const budget = document.getElementById("budget").value;
    const pesan = document.getElementById("pesan").value;

    // Format pesan WhatsApp
    const text = `Halo min, saya ingin melakukan konsultasi proyek:%0A
Nama: ${nama}%0A
Email: ${email}%0A
WhatsApp: ${wa}%0A
Jenis Proyek: ${jenis}%0A
Anggaran: Rp. ${budget}%0A
Detail: ${pesan}`;

    // Nomor WA admin (ganti dengan nomor kamu)
    const adminWa = "6281381300825";

    // Buka WhatsApp
    window.open(`https://wa.me/${adminWa}?text=${text}`, "_blank");
  });
