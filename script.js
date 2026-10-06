document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const track = document.querySelector('.gallery-track');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const previousButton = document.querySelector('[data-direction="prev"]');
  const nextButton = document.querySelector('[data-direction="next"]');
  const progress = document.querySelector('.slider-progress span');
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const updateSlider = () => {
    cards.forEach((card, index) => {
      const position = (index - currentIndex + cards.length) % cards.length;
      card.dataset.position = position;
    });
    previousButton.disabled = false;
    nextButton.disabled = false;
    progress.style.width = `${((currentIndex + 1) / cards.length) * 100}%`;
  };

  previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  });

  const finishSwipe = () => {
    if (!isDragging) return;
    const distance = currentX - startX;
    if (Math.abs(distance) > 45) {
      currentIndex = (currentIndex + (distance < 0 ? 1 : -1) + cards.length) % cards.length;
    }
    isDragging = false;
    track.style.transform = '';
    updateSlider();
  };

  track.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    isDragging = true;
    startX = event.clientX;
    currentX = startX;
    track.setPointerCapture(event.pointerId);
    track.style.transition = 'none';
  });

  track.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    currentX = event.clientX;
    track.style.transform = `translateX(${currentX - startX}px)`;
  });

  track.addEventListener('pointerup', finishSwipe);
  track.addEventListener('pointercancel', finishSwipe);

  window.addEventListener('resize', updateSlider);
  updateSlider();

  const leadership = [
    { kelompok: 'BMJ', nama: 'Pdt. Yohanis Runtuwene, S.Th.', foto: 'https://randomuser.me/api/portraits/men/32.jpg', jabatan: 'Ketua BMJ', periode: '2027–2031', profil: 'Melayani sebagai pendeta jemaat dengan perhatian pada penguatan iman dan pelayanan lintas generasi.', email: 'yohanis.runtuwene@gmail.com' },
    { kelompok: 'BMJ', nama: 'Rudy Sondakh, S.Pd.', foto: 'https://randomuser.me/api/portraits/women/44.jpg', jabatan: 'Sekretaris BMJ', periode: '2027–2031', profil: 'Aktif dalam administrasi gereja dan pendidikan; berkomitmen menjaga komunikasi pelayanan yang tertib.', email: 'rudy.sondakh@gmail.com' },
    { kelompok: 'BMJ', nama: 'Marthin Lumenta, S.E.', foto: 'https://randomuser.me/api/portraits/men/34.jpg', jabatan: 'Bendahara BMJ', periode: '2027–2031', profil: 'Berpengalaman mengelola keuangan organisasi dan mendorong pelaporan yang transparan serta bertanggung jawab.', email: 'marthin.lumenta@gmail.com' },
    { kelompok: 'P/KB', nama: 'Yohanes Pangemanan', foto: 'https://randomuser.me/api/portraits/men/37.jpg', jabatan: 'Ketua P/KB', periode: '2027–2031', profil: 'Rindu membangun persekutuan kaum bapa yang saling menguatkan dan menjadi teladan iman di keluarga.', email: 'yohanes.pangemanan@gmail.com' },
    { kelompok: 'P/KB', nama: 'Daniel Waworuntu', foto: 'https://randomuser.me/api/portraits/men/41.jpg', jabatan: 'Sekretaris P/KB', periode: '2027–2031', profil: 'Senang bekerja secara teratur dan siap mendukung program pembinaan serta komunikasi anggota P/KB.', email: 'daniel.waworuntu@gmail.com' },
    { kelompok: 'P/KB', nama: 'Hendrik Tumiwa', foto: 'https://randomuser.me/api/portraits/men/52.jpg', jabatan: 'Bendahara P/KB', periode: '2027–2031', profil: 'Memiliki kepedulian pada pelayanan sosial dan ingin memastikan dana kegiatan dikelola dengan baik.', email: 'hendrik.tumiwa@gmail.com' },
    { kelompok: 'W/KI', nama: 'Ruth Moniaga', foto: 'https://randomuser.me/api/portraits/women/47.jpg', jabatan: 'Ketua W/KI', periode: '2027–2031', profil: 'Terlibat dalam pelayanan keluarga dan kerohanian; ingin mengembangkan persekutuan perempuan yang peduli dan bertumbuh.', email: 'ruth.moniaga@gmail.com' },
    { kelompok: 'W/KI', nama: 'Martha Kumaat', foto: 'https://randomuser.me/api/portraits/women/49.jpg', jabatan: 'Sekretaris W/KI', periode: '2027–2031', profil: 'Teliti dalam pencatatan kegiatan dan bersemangat mendukung pelayanan serta pemberdayaan kaum ibu.', email: 'martha.kumaat@gmail.com' },
    { kelompok: 'W/KI', nama: 'Yuliana Sumual', foto: 'https://randomuser.me/api/portraits/women/50.jpg', jabatan: 'Bendahara W/KI', periode: '2027–2031', profil: 'Siap melayani dengan integritas dan mendukung program diakonia serta kebersamaan anggota W/KI.', email: 'yuliana.sumual@gmail.com' },
    { kelompok: 'Pemuda', nama: 'Pnt. Claudio Kuhon,S.pd', foto: 'https://randomuser.me/api/portraits/men/54.jpg', jabatan: 'Ketua Komisi Pemuda', periode: '2027–2031', profil: 'Memiliki semangat kolaborasi dan ingin menghadirkan ruang kreatif bagi pemuda untuk bertumbuh dalam iman.', email: 'claudiokuhon@gmail.com' },
    { kelompok: 'Pemuda', nama: 'Christiani Makatindu M.pd', foto: 'https://randomuser.me/api/portraits/women/51.jpg', jabatan: 'Sekretaris Komisi Pemuda', periode: '2027–2031', profil: 'Aktif dalam kegiatan pemuda dan siap mengoordinasikan informasi serta agenda pelayanan dengan terbuka.', email: 'cmakatindu@gmail.com' },
    { kelompok: 'Pemuda', nama: 'Angel Kerap,S.pd', foto: 'https://randomuser.me/api/portraits/men/56.jpg', jabatan: 'Bendahara Komisi Pemuda', periode: '2027–2031', profil: 'Tertarik pada pengembangan talenta dan berkomitmen mengelola dukungan kegiatan pemuda secara akuntabel.', email: 'angelkerap@gmail.com' },
    { kelompok: 'Remaja', nama: 'Pnt. Pingkan Sondakh,S.pd', foto: 'https://randomuser.me/api/portraits/women/54.jpg', jabatan: 'Ketua Komisi Remaja', periode: '2027–2031', profil: 'Rindu mendampingi remaja mengenal potensi diri dan membangun pertemanan yang sehat dalam persekutuan.', email: 'pingkansondakh@gmail.com' },
    { kelompok: 'Remaja', nama: 'Josua Kussoy,S.pd', foto: 'https://randomuser.me/api/portraits/men/58.jpg', jabatan: 'Sekretaris Komisi Remaja', periode: '2027–2031', profil: 'Komunikatif dan teratur; siap membantu kegiatan pembinaan remaja berjalan konsisten dan menyenangkan.', email: 'joskussoy@gmail.com' },
    { kelompok: 'Remaja', nama: 'Melisa Tangkudung', foto: 'https://randomuser.me/api/portraits/women/55.jpg', jabatan: 'Bendahara Komisi Remaja', periode: '2027–2031', profil: 'Peduli pada kebutuhan remaja dan ingin mendukung kegiatan yang aman, membangun, serta bermanfaat.', email: 'melisa.tangkudung@gmail.com' },
    { kelompok: 'ASM', nama: 'Norma Kanter', foto: 'https://randomuser.me/api/portraits/women/57.jpg', jabatan: 'Ketua Komisi ASM', periode: '2027–2031', profil: 'Mengasihi pelayanan anak dan berkomitmen menghadirkan pembinaan iman yang ramah serta sesuai usia.', email: 'normakanter@gmail.com' },
    { kelompok: 'ASM', nama: 'Grace Tumiwa', foto: 'https://randomuser.me/api/portraits/women/58.jpg', jabatan: 'Sekretaris Komisi ASM', periode: '2027–2031', profil: 'Terampil mengatur jadwal dan bahan kegiatan, serta senang mendukung guru sekolah minggu.', email: 'grace.tumiwa@gmail.com' },
    { kelompok: 'ASM', nama: 'Samuel Rotinsulu', foto: 'https://randomuser.me/api/portraits/men/61.jpg', jabatan: 'Bendahara Komisi ASM', periode: '2027–2031', profil: 'Mendukung pelayanan anak dengan kepedulian dan siap menjaga penggunaan dana kegiatan secara tertib.', email: 'samuel.rotinsulu@gmail.com' },
    { kelompok: 'Lansia', nama: 'Dey kaseger', foto: 'https://randomuser.me/api/portraits/women/60.jpg', jabatan: 'Ketua Komisi Lansia', periode: '2027–2031', profil: 'Menghargai pengalaman para senior dan ingin memperkuat persekutuan yang hangat, sehat, dan saling menopang.', email: 'deykaseger@gmail.com' },
    { kelompok: 'Lansia', nama: 'Agustina Mamesah', foto: 'https://randomuser.me/api/portraits/women/62.jpg', jabatan: 'Sekretaris Komisi Lansia', periode: '2027–2031', profil: 'Tekun dalam pelayanan kunjungan dan siap membantu koordinasi kegiatan bagi anggota lanjut usia.', email: 'agustina.mamesah@gmail.com' },
    { kelompok: 'Lansia', nama: 'Ferdinand Tangkudung', foto: 'https://randomuser.me/api/portraits/men/65.jpg', jabatan: 'Bendahara Komisi Lansia', periode: '2027–2031', profil: 'Ingin mendukung pelayanan yang memperhatikan kebutuhan lansia melalui pengelolaan dana yang bertanggung jawab.', email: 'ferdinand.tangkudung@gmail.com' }
  ];
  const groupNames = { BMJ: 'Badan Majelis Jemaat · Inti', 'P/KB': 'Pria / Kaum Bapa', 'W/KI': 'Wanita / Kaum Ibu', Pemuda: 'Komisi Pemuda', Remaja: 'Komisi Remaja', ASM: 'Anak Sekolah Minggu', Lansia: 'Komisi Lansia' };
  const leadershipGroups = document.querySelectorAll('[data-leadership-group]');
  const leadershipRoster = document.querySelector('#leadership-roster');
  const renderLeadership = (group) => {
    const officers = leadership.filter((person) => person.kelompok === group);
    leadershipRoster.innerHTML = `<div class="leadership-roster-heading"><div><span>STRUKTUR PELAYANAN</span><h3>${groupNames[group]}</h3></div><span>${officers.length} pengurus</span></div><div class="leadership-grid">${officers.map((person) => `<article class="leader-card"><p class="leader-role">${person.jabatan}</p><div class="leader-identity"><span class="leader-avatar" data-initial="${person.nama.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('')}"><img src="${person.foto}" alt="" loading="lazy"></span><h4>${person.nama}</h4></div><p class="leader-bio">${person.profil}</p><a href="mailto:${person.email}">${person.email}</a></article>`).join('')}</div>`;
    leadershipRoster.querySelectorAll('.leader-avatar img').forEach((image) => image.addEventListener('error', () => image.parentElement.classList.add('photo-fallback'), { once: true }));
  };
  leadershipGroups.forEach((button) => button.addEventListener('click', () => {
    leadershipGroups.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderLeadership(button.dataset.leadershipGroup);
  }));
  renderLeadership('BMJ');
});
