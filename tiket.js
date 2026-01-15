const data = JSON.parse(localStorage.getItem("lastOrder"));

if (!data) {
  alert("Data tiket tidak ditemukan");
  window.location.href = "index.html";
}

// Tampilkan data tiket
document.getElementById("t-name").textContent =
  "Nama: " + data.name;

document.getElementById("t-code").textContent =
  "Kode Booking: " + data.bookingCode;

document.getElementById("t-seat").textContent =
  "Kursi: " + data.seat;

document.getElementById("t-qty").textContent =
  "Jumlah Tiket: " + data.quantity;

// Isi QR Code tiket
const qrData = `
Kode: ${data.bookingCode}
Nama: ${data.name}
Kursi: ${data.seat}
`;

new QRCode(document.getElementById("qrcode"), {
  text: qrData,
  width: 150,
  height: 150
});
