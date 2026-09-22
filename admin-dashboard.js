document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const views = document.querySelectorAll('.view');
  const breadcrumbTitle = document.querySelector('#breadcrumb-title');
  const sidebar = document.querySelector('#sidebar');
  const viewNames = { dashboard: 'Dashboard', jemaat: 'Data Jemaat', pelayan: 'Pelayan Khusus', pengaturan: 'Pengaturan' };
  const showView = (name) => {
    views.forEach((view) => view.classList.toggle('active', view.dataset.section === name));
    navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === name));
    breadcrumbTitle.textContent = viewNames[name] || 'Dashboard';
    sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navItems.forEach((item) => item.addEventListener('click', (event) => {
    event.preventDefault();
    showView(item.dataset.view);
  }));
  document.querySelectorAll('[data-scroll-to]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.scrollTo)));
  document.querySelector('.menu-open').addEventListener('click', () => sidebar.classList.add('open'));
  document.querySelector('.sidebar-close').addEventListener('click', () => sidebar.classList.remove('open'));

  const members = [
    ['Keluarga Lumenta', 'Kolom 01', 18, 9, 9, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Sondakh', 'Kolom 02', 16, 7, 9, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Runtuwene', 'Kolom 03', 21, 10, 11, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Moniaga', 'Kolom 04', 13, 6, 7, 'Belum', 'Sudah', 'Perlu verifikasi'], ['Keluarga Waworuntu', 'Kolom 05', 19, 10, 9, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Pangemanan', 'Kolom 06', 15, 7, 8, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Kumaat', 'Kolom 07', 22, 11, 11, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Tumiwa', 'Kolom 08', 17, 8, 9, 'Sudah', 'Belum', 'Perlu verifikasi'], ['Keluarga Roring', 'Kolom 09', 14, 7, 7, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Sumual', 'Kolom 10', 16, 8, 8, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Mamesah', 'Kolom 11', 12, 5, 7, 'Belum', 'Sudah', 'Perlu verifikasi'], ['Keluarga Kembuan', 'Kolom 12', 20, 10, 10, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Wowor', 'Kolom 13', 18, 8, 10, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Lasut', 'Kolom 14', 15, 7, 8, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Wullur', 'Kolom 15', 11, 5, 6, 'Belum', 'Belum', 'Perlu verifikasi'], ['Keluarga Tangkudung', 'Kolom 16', 14, 7, 7, 'Sudah', 'Sudah', 'Aktif'], ['Keluarga Rotinsulu', 'Kolom 17', 17, 9, 8, 'Sudah', 'Sudah', 'Aktif']
  ];
  const columnFilter = document.querySelector('#column-filter');
  const memberBody = document.querySelector('#member-table tbody');
  const memberSearch = document.querySelector('#member-search');
  const memberCount = document.querySelector('#member-count');
  members.forEach((member) => { const option = document.createElement('option'); option.value = member[1]; option.textContent = member[1]; columnFilter.appendChild(option); });
  const renderMembers = () => {
    const query = memberSearch.value.toLowerCase();
    const column = columnFilter.value;
    const filtered = members.filter((member) => (column === 'all' || member[1] === column) && member.slice(0, 2).join(' ').toLowerCase().includes(query));
    memberBody.innerHTML = filtered.map((member) => `<tr><td><span class="table-person">${member[0].split(' ').map((word) => word[0]).slice(0, 2).join('')}</span>${member[0]}</td><td>${member[1]}</td><td>${member[2]}</td><td>${member[3]}</td><td>${member[4]}</td><td><span class="status ${member[5] === 'Sudah' ? 'active-status' : 'pending-status'}">${member[5]}</span></td><td><span class="status ${member[6] === 'Sudah' ? 'active-status' : 'pending-status'}">${member[6]}</span></td><td><span class="status ${member[7] === 'Aktif' ? 'active-status' : 'pending-status'}">${member[7]}</span></td></tr>`).join('');
    memberCount.textContent = `${filtered.length} wilayah`;
  };
  memberSearch.addEventListener('input', renderMembers); columnFilter.addEventListener('change', renderMembers); renderMembers();

  const servantSearch = document.querySelector('#servant-search');
  const roleFilter = document.querySelector('#role-filter');
  const servantRows = Array.from(document.querySelectorAll('#servant-table tbody tr'));
  const renderServants = () => { const query = servantSearch.value.toLowerCase(); const role = roleFilter.value; servantRows.forEach((row) => { row.hidden = !row.textContent.toLowerCase().includes(query) || (role !== 'all' && !row.textContent.includes(role)); }); };
  servantSearch.addEventListener('input', renderServants); roleFilter.addEventListener('change', renderServants);
  const toast = document.querySelector('#toast');
  document.querySelectorAll('[data-toast]').forEach((button) => button.addEventListener('click', () => { toast.textContent = button.dataset.toast; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }));
  document.querySelector('#export-button').addEventListener('click', () => { const csv = ['Kepala Keluarga,Kolom,Anggota,Laki-laki,Perempuan,Sidi,Baptis,Status', ...members.map((member) => member.join(','))].join('\n'); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'rekap-jemaat-kolom-1-17.csv'; link.click(); URL.revokeObjectURL(link.href); });
});
