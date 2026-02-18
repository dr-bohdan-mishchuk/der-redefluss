/* =========================
   APP STATE
========================= */
let currentLang = 'ua';
let currentCat = 'pro';
let currentIndex = 0;

/* =========================
   DOM ELEMENTS
========================= */
const deEl = document.getElementById("de");
const transEl = document.getElementById("trans");
const cardEl = document.getElementById("mainCard");
const catButtons = document.querySelectorAll(".cat-btn");
const langSelect = document.getElementById("langSelect");
const nextBtn = document.getElementById("nextBtn");
const hintText = document.getElementById("hint-text");
const infoModal = document.getElementById("infoModal");
const openInfo = document.getElementById("openInfo");
const closeInfo = document.getElementById("closeInfo");

/* =========================
   HELPERS
========================= */
function getCurrentList() {
  return DATA[currentCat];
}

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function updateRTL() {
  if (currentLang === 'fa') {
    transEl.classList.add('rtl');
  } else {
    transEl.classList.remove('rtl');
  }
}

function updateUI() {
    // Оновлення перекладів кнопок
    const ui = { ua: "Наступна →", tr: "Sonraki →", so: "Xiga →", fa: "بعدی ←" };
    const hints = { ua: "Натисни для перекладу", tr: "Çeviri için karta tıkla", so: "Guji si aad u turjunto", fa: "برای ترجمه ضربه بزنید" };
    
    if (nextBtn) nextBtn.innerText = ui[currentLang] || ui['ua'];
    if (hintText) hintText.innerText = hints[currentLang] || hints['ua'];

    // Оновлення інфо-блоку
    document.querySelectorAll('.info-section').forEach(s => s.classList.remove('active'));
    const activeInfo = document.getElementById('info-' + currentLang);
    if(activeInfo) activeInfo.classList.add('active');
}

/* =========================
   RENDER
========================= */
function render() {
  const list = getCurrentList();
  if (!list || list.length === 0) return;
  
  const item = list[currentIndex];

  deEl.innerHTML = item.de;
  transEl.textContent = item.t[currentLang] || item.t['ua'];
  
  // Сховати переклад при зміні картки
  transEl.classList.remove("show");
  
  updateRTL();
}

function nextPhrase() {
  const list = getCurrentList();
  if (list && list.length > 0) {
    currentIndex = getRandomIndex(list.length);
    render();
  }
}

/* =========================
   EVENTS
========================= */

cardEl.addEventListener("click", () => {
  transEl.classList.toggle("show");
});

nextBtn.addEventListener("click", nextPhrase);

catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentCat = btn.dataset.cat;
    
    catButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    nextPhrase();
  });
});

langSelect.addEventListener("change", (e) => {
  currentLang = e.target.value;
  updateUI();
  render();
});

// Модальне вікно
openInfo.addEventListener("click", () => { infoModal.style.display = 'flex'; });
closeInfo.addEventListener("click", () => { infoModal.style.display = 'none'; });
infoModal.addEventListener("click", (e) => {
    if (e.target === infoModal) infoModal.style.display = 'none';
});

/* =========================
   INIT
========================= */
window.addEventListener("load", () => {
    updateUI();
    nextPhrase();
});
