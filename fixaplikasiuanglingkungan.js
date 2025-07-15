<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aplikasi Bendahara Web</title>
  <style>
    :root {
      --bg-light: #fffdf7;
      --bg-dark: #2c2c2c;
      --card-light: #ffffff;
      --card-dark: #3a3a3a;
      --text-light: #3e2f20;
      --text-dark: #f8f8f8;
      --primary: #00796b;
      --primary-dark: #004d40;
      --danger: #e53935;
      --danger-dark: #b71c1c;
      --accent-light: #ffcc80;
      --accent-dark: #616161;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      background: var(--bg-light);
      color: var(--text-light);
      transition: all 0.5s ease;
    }

    body.dark {
      background: var(--bg-dark);
      color: var(--text-dark);
    }

    h2, h3 {
      text-align: center;
      color: inherit;
    }

    form, table, .saldo, .rekap-bulanan, .akses-rekap {
      margin: 20px auto;
      max-width: 1000px;
      background: var(--card-light);
      border-radius: 15px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      padding: 25px;
      transition: background 0.5s ease, color 0.5s ease;
    }

    body.dark form,
    body.dark table,
    body.dark .saldo,
    body.dark .rekap-bulanan,
    body.dark .akses-rekap {
      background: var(--card-dark);
    }

    input, select, button {
      padding: 12px;
      margin: 5px 0;
      width: 100%;
      border-radius: 10px;
      border: 1px solid #c4a77d;
      font-size: 16px;
      background: white;
      color: inherit;
    }

    body.dark input,
    body.dark select {
      background: #444;
      color: white;
      border: 1px solid #888;
    }

    button {
      background: var(--primary);
      color: white;
      font-weight: bold;
      border: none;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background: var(--primary-dark);
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    th, td {
      border: 1px solid #e0c9a6;
      padding: 10px;
      text-align: center;
      font-size: 15px;
    }

    th {
      background: var(--accent-light);
      color: #4e342e;
    }

    body.dark th {
      background: var(--accent-dark);
      color: white;
    }

    tr:nth-child(even) {
      background-color: #fffaf4;
    }

    body.dark tr:nth-child(even) {
      background-color: #333;
    }

    tr:hover {
      background-color: #f1f8e9;
    }

    body.dark tr:hover {
      background-color: #444;
    }

    .hapus-btn {
      background-color: var(--danger);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: bold;
      transition: 0.3s;
    }

    .hapus-btn:hover {
      background-color: var(--danger-dark);
    }

    .hidden {
      display: none;
    }

    .rekap-bulanan h3::before {
      content: "📊 ";
    }

    #infoSaldoBulanan {
      font-size: 18px;
      background: #fff3e0;
      padding: 15px;
      border-radius: 10px;
      border-left: 6px solid #ffb74d;
    }

    body.dark #infoSaldoBulanan {
      background: #555;
      border-left: 6px solid #888;
    }

    .toggle-mode {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 18px;
      z-index: 1000;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .toggle-mode:hover {
      background: var(--primary-dark);
    }
  </style>
<script src="https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js"></script>

</head>
<body>
<div id="cover" style="
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, #00796b, #004d40);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
  font-family: 'Segoe UI', sans-serif;
">
  <h1 style="font-size: 48px; margin-bottom: 20px;">💰 WILAYAH YAKOBUS</h1>
  <p style="font-size: 18px; margin-bottom: 40px;">Aplikasi Pencatatan Keuangan Lingkungan</p>
  <button onclick="hilangkanCover()" style="
    padding: 12px 24px;
    font-size: 16px;
    background: white;
    color: #00796b;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  ">Masuk Aplikasi</button>
</div>

  <div class="toggle-mode" onclick="toggleMode()">🌙 Mode</div>

  <h2>💰 Uang Lingkungan</h2>

  <form id="formTransaksi">
    <select id="nama">
      <option value="">-- Pilih Nama (tidak perlu untuk pengeluaran) --</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
    </select>
    <input type="date" id="tanggal" required>
    <input type="text" id="keterangan" placeholder="Keterangan" required>
    <select id="jenis" required>
      <option value="">-- Pilih Jenis --</option>
      <option value="masuk_ppks">Pemasukan PPKS</option>
      <option value="masuk_sukarela">Pemasukan Sukarela</option>
      <option value="keluar">Pengeluaran</option>
    </select>
    <input type="number" id="jumlah" placeholder="Jumlah (Rp)" required>
    <button type="submit">Tambah Transaksi</button>
  </form>

  <div class="saldo">
    <label for="saldoAwal">Saldo Awal Tahun:</label>
    <input type="number" id="saldoAwal" placeholder="Masukkan saldo awal tahun">
    <button onclick="simpanSaldoAwal()">Simpan Saldo Awal</button>

    <label for="bulanFilter">Bulan:</label>
    <select id="bulanFilter">
      <option value="">Semua</option>
      <option value="0">Januari</option>
      <option value="1">Februari</option>
      <option value="2">Maret</option>
      <option value="3">April</option>
      <option value="4">Mei</option>
      <option value="5">Juni</option>
      <option value="6">Juli</option>
      <option value="7">Agustus</option>
      <option value="8">September</option>
      <option value="9">Oktober</option>
      <option value="10">November</option>
      <option value="11">Desember</option>
    </select>

    <label for="tahunFilter">Tahun:</label>
    <select id="tahunFilter"></select>

    <p>Total Pemasukan PPKS: Rp <span id="totalPPKS">0</span></p>
    <p>Total Pemasukan Sukarela: Rp <span id="totalSukarela">0</span></p>
    <p>Total Pengeluaran: Rp <span id="totalKeluar">0</span></p>
    <p><strong>Saldo Akhir: Rp <span id="saldo">0</span></strong></p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Nama</th>
        <th>Tanggal</th>
        <th>Keterangan</th>
        <th>Jenis</th>
        <th>Jumlah (Rp)</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody id="tabelTransaksi"></tbody>
  </table>

  <div id="infoSaldoBulanan" style="text-align:center; margin-top: 20px; font-weight: bold;"></div>
<div style="text-align:center; margin-top: 20px;">
  <button onclick="exportTableToExcel('tabelTransaksi', 'Data_Transaksi')">📥 Export ke Excel</button>
</div>


  <div class="akses-rekap">
    <h3>Akses Rekap Bulanan</h3>
    <input type="password" id="rekapPassword" placeholder="Masukkan Password">
    <button onclick="bukaRekap()">Buka Rekap</button>
  </div>

  <div class="rekap-bulanan hidden" id="rekapBulananPPKS"></div>
  <div class="rekap-bulanan hidden" id="rekapBulananSukarela"></div>
  <div class="rekap-bulanan hidden" id="rekapTotalPenerimaan"></div>
  <div class="rekap-bulanan hidden" id="rekapBulananKeluar"></div>

  <script>
    function toggleMode() {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", document.body.classList.contains("dark"));
      document.querySelector(".toggle-mode").textContent = document.body.classList.contains("dark") ? "☀️ Mode" : "🌙 Mode";
    }

    window.onload = () => {
      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
        document.querySelector(".toggle-mode").textContent = "☀️ Mode";
      }
    };
  </script>

  <!-- Tambahkan script transaksi, simpanSaldoAwal, populateTahunFilter, updateTabel, hapusTransaksi, dan tampilkanRekap seperti di versi sebelumnya -->
  <!-- Jika kamu ingin saya langsung lengkapi semua JS transaksi dan rekapnya di bawah sini juga, beri tahu ya. -->
<!-- Tambahan ini berada sebelum </body> -->
  <script>
 function exportTableToExcel(tabelId, namaFile = 'data') {
  const table = document.getElementById(tabelId);
  const wb = XLSX.utils.book_new();
  const ws_data = [];

  // Ambil isi saldo awal dan akhir dari #infoSaldoBulanan
  const saldoInfoDiv = document.getElementById("infoSaldoBulanan");
  if (saldoInfoDiv && saldoInfoDiv.innerHTML.trim() !== "") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = saldoInfoDiv.innerHTML;
    const lines = tempDiv.querySelectorAll("p");
    if (lines[0]) ws_data.push([lines[0].textContent.trim()]); // Saldo Awal Bulan
    ws_data.push([]); // baris kosong
  }

  // Tambahkan header tabel transaksi
  ws_data.push(["Nama", "Tanggal", "Keterangan", "Jenis", "Jumlah (Rp)"]);

  // Tambahkan data dari tabel transaksi
  for (let row of table.rows) {
    const rowData = [];
    for (let cell of row.cells) {
      if (cell.innerText !== "Hapus") {
        rowData.push(cell.innerText.trim());
      }
    }
    if (rowData.length > 0) {
      ws_data.push(rowData);
    }
  }

  // Baris kosong sebelum saldo akhir
  ws_data.push([]);

  // Ambil saldo akhir dari elemen #saldo
  const saldoAkhir = document.getElementById("saldo")?.innerText || "0";
  ws_data.push([`Total Saldo Akhir Bulan: Rp ${saldoAkhir}`]);

  // Buat dan simpan file Excel
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Transaksi");
  XLSX.writeFile(wb, namaFile + ".xlsx");
}


  </script>
<script>
  // Fungsi untuk hilangkan cover
  function hilangkanCover() {
    const cover = document.getElementById("cover");
    cover.style.opacity = "0";
    setTimeout(() => cover.style.display = "none", 500);
  }

  // Saat halaman selesai dimuat
  window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
      document.querySelector(".toggle-mode").textContent = "☀️ Mode";
    }

  };
</script>

</body>
</html>

</body>
</html>

</body>
</html>
<script>
  const bulanFilter = document.getElementById('bulanFilter');
  const tahunFilter = document.getElementById('tahunFilter');
  const saldoAwalInput = document.getElementById('saldoAwal');

  let data = JSON.parse(localStorage.getItem("keuangan")) || [];
  let saldoAwalTahun = JSON.parse(localStorage.getItem("saldoAwalTahun")) || {};

  function simpanSaldoAwal() {
    const tahun = tahunFilter.value;
    if (tahun) {
      saldoAwalTahun[tahun] = parseInt(saldoAwalInput.value) || 0;
      localStorage.setItem("saldoAwalTahun", JSON.stringify(saldoAwalTahun));
      updateTabel();
    } else {
      alert("Pilih tahun terlebih dahulu");
    }
  }

  function populateTahunFilter() {
    const tahunSet = new Set();
    data.forEach(item => {
      const tahun = new Date(item.tanggal).getFullYear();
      tahunSet.add(tahun);
    });
    tahunFilter.innerHTML = '';
    [...tahunSet].sort().forEach(tahun => {
      const option = document.createElement('option');
      option.value = tahun;
      option.textContent = tahun;
      tahunFilter.appendChild(option);
    });
  }

 function updateTabel() {
  const filterBulan = bulanFilter.value;
  const filterTahun = tahunFilter.value;
  const saldoAwalTahunIni = saldoAwalTahun[filterTahun] || 0;

  let saldoAwal = saldoAwalTahunIni;
  let masukPPKS = 0, masukSukarela = 0, keluar = 0;
  let isiTabel = "";

  // Hitung saldo awal bulan berjalan
  if (filterTahun && filterBulan !== "") {
    const bulanInt = parseInt(filterBulan);
    data.forEach(item => {
      const date = new Date(item.tanggal);
      const bulan = date.getMonth();
      const tahun = date.getFullYear();
      if (tahun == filterTahun && bulan < bulanInt) {
        if (item.jenis === "masuk_ppks" || item.jenis === "masuk_sukarela") {
          saldoAwal += item.jumlah;
        } else if (item.jenis === "keluar") {
          saldoAwal -= item.jumlah;
        }
      }
    });
  }

  // Isi tabel berdasarkan filter bulan & tahun
  data.forEach((item, index) => {
    const date = new Date(item.tanggal);
    const bulan = date.getMonth();
    const tahun = date.getFullYear();

    if (filterTahun !== "" && parseInt(filterTahun) !== tahun) return;
    if (filterBulan !== "" && parseInt(filterBulan) !== bulan) return;

    if (item.jenis === "masuk_ppks") masukPPKS += item.jumlah;
    else if (item.jenis === "masuk_sukarela") masukSukarela += item.jumlah;
    else if (item.jenis === "keluar") keluar += item.jumlah;

    isiTabel += `
    <tr>
      <td>${item.nama || "-"}</td>
      <td>${item.tanggal}</td>
      <td>${item.keterangan}</td>
      <td>${item.jenis.replace("masuk_ppks", "Pemasukan PPKS").replace("masuk_sukarela", "Pemasukan Sukarela").replace("keluar", "Pengeluaran")}</td>
      <td>${item.jumlah.toLocaleString("id-ID")}</td>
      <td><button class="hapus-btn" onclick="hapusTransaksi(${index})">Hapus</button></td>
    </tr>`;
  });

  document.getElementById("tabelTransaksi").innerHTML = isiTabel;
  document.getElementById("totalPPKS").innerText = masukPPKS.toLocaleString("id-ID");
  document.getElementById("totalSukarela").innerText = masukSukarela.toLocaleString("id-ID");
  document.getElementById("totalKeluar").innerText = keluar.toLocaleString("id-ID");
  document.getElementById("saldo").innerText = (saldoAwal + masukPPKS + masukSukarela - keluar).toLocaleString("id-ID");

  const infoSaldo = document.getElementById("infoSaldoBulanan");
  if (filterTahun && filterBulan !== "") {
    const saldoAkhirBulan = saldoAwal + masukPPKS + masukSukarela - keluar;
    infoSaldo.innerHTML = `
      <p>Saldo Awal Bulan: Rp ${saldoAwal.toLocaleString("id-ID")}</p>
      <p>Saldo Akhir Bulan: Rp ${saldoAkhirBulan.toLocaleString("id-ID")}</p>
    `;
  } else {
    infoSaldo.innerHTML = "";
  }
}


  function hapusTransaksi(index) {
    if (confirm("Yakin ingin menghapus transaksi ini?")) {
      data.splice(index, 1);
      localStorage.setItem("keuangan", JSON.stringify(data));
      populateTahunFilter();
      updateTabel();
    }
  }

  document.getElementById("formTransaksi").addEventListener("submit", function(e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const keterangan = document.getElementById("keterangan").value;
    const jenis = document.getElementById("jenis").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (!tanggal || !keterangan || !jenis || !jumlah) {
      alert("Harap lengkapi semua data!");
      return;
    }

    data.push({ nama, tanggal, keterangan, jenis, jumlah });
    localStorage.setItem("keuangan", JSON.stringify(data));

    this.reset();
    populateTahunFilter();
    updateTabel();
  });

  bulanFilter.addEventListener('change', updateTabel);
  tahunFilter.addEventListener('change', updateTabel);

  populateTahunFilter();
  updateTabel();

  function bukaRekap() {
    const inputPassword = document.getElementById('rekapPassword').value;
    if (inputPassword === "1234") {
      document.getElementById('rekapBulananPPKS').classList.remove('hidden');
      document.getElementById('rekapBulananSukarela').classList.remove('hidden');
      document.getElementById('rekapTotalPenerimaan').classList.remove('hidden');
      document.getElementById('rekapBulananKeluar').classList.remove('hidden');
      tampilkanRekap();
    } else {
      alert("Password salah!");
    }
  }

  function tampilkanRekap() {
    const filterTahun = tahunFilter.value;
    if (!filterTahun) return alert("Pilih tahun terlebih dahulu!");

    const bulanNama = ["JAN","FEB","MAR","APR","MEI","JUN","JUL","AGT","SEP","OKT","NOP","DES"];
    const jenisList = ["masuk_ppks", "masuk_sukarela", "keluar"];
    const targetIDs = {
      masuk_ppks: "rekapBulananPPKS",
      masuk_sukarela: "rekapBulananSukarela",
      keluar: "rekapBulananKeluar"
    };

    jenisList.forEach(jenis => {
      const byKey = {};
      for (const d of data) {
        const tgl = new Date(d.tanggal);
        const tahun = tgl.getFullYear();
        const bulan = tgl.getMonth();
        if (tahun == filterTahun && d.jenis === jenis) {
          const key = jenis === "keluar" ? d.keterangan : d.nama;
          if (!byKey[key]) byKey[key] = Array(12).fill(0);
          byKey[key][bulan] += d.jumlah;
        }
      }

      let html = `<h3>📊 ${jenis === "masuk_ppks" ? "IURAN PPKS" : jenis === "masuk_sukarela" ? "IURAN SUKARELA" : "PENGELUARAN"}</h3>`;
      html += `<table><thead><tr><th>${jenis === "keluar" ? "Keterangan" : "Nama"}</th><th>Tahun</th>`;
      bulanNama.forEach(b => html += `<th>${b}</th>`);
      html += `<th>Total</th></tr></thead><tbody>`;

      const totalPerBulan = Array(12).fill(0);
      for (const key in byKey) {
        html += `<tr><td>${key}</td><td>${filterTahun}</td>`;
        let totalBaris = 0;
        byKey[key].forEach((jml, i) => {
          html += `<td>${jml ? jml.toLocaleString("id-ID") : ""}</td>`;
          totalBaris += jml;
          totalPerBulan[i] += jml;
        });
        html += `<td><strong>${totalBaris.toLocaleString("id-ID")}</strong></td></tr>`;
      }

      html += `<tr><td colspan="2"><strong>TOTAL ${filterTahun}</strong></td>`;
      let totalAll = 0;
      totalPerBulan.forEach(jml => {
        html += `<td><strong>${jml ? jml.toLocaleString("id-ID") : ""}</strong></td>`;
        totalAll += jml;
      });
      html += `<td><strong>${totalAll.toLocaleString("id-ID")}</strong></td></tr>`;
      html += `</tbody></table>`;

      document.getElementById(targetIDs[jenis]).innerHTML = html;
    });

    // TOTAL PENERIMAAN
    const penerimaanHTML = `
      <h3>📊 TOTAL PENERIMAAN</h3>
      <table>
        <thead><tr>${bulanNama.map(b => `<th>${b}</th>`).join("")}<th>TOTAL</th></tr></thead>
        <tbody><tr>
          ${Array(12).fill(0).map((_, i) => {
            const totalPerBulan = (
              (data.filter(d => new Date(d.tanggal).getFullYear() == filterTahun && new Date(d.tanggal).getMonth() == i && d.jenis === "masuk_ppks").reduce((a, b) => a + b.jumlah, 0)) +
              (data.filter(d => new Date(d.tanggal).getFullYear() == filterTahun && new Date(d.tanggal).getMonth() == i && d.jenis === "masuk_sukarela").reduce((a, b) => a + b.jumlah, 0))
            );
            return `<td>${totalPerBulan ? totalPerBulan.toLocaleString("id-ID") : ""}</td>`;
          }).join("")}
          <td><strong>${
            data.filter(d => new Date(d.tanggal).getFullYear() == filterTahun && (d.jenis === "masuk_ppks" || d.jenis === "masuk_sukarela")).reduce((a, b) => a + b.jumlah, 0).toLocaleString("id-ID")
          }</strong></td>
        </tr></tbody>
      </table>`;

    document.getElementById("rekapTotalPenerimaan").innerHTML = penerimaanHTML;
  }
</script>
