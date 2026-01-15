// ================= AMBIL FORM =================
const form = document.getElementById("booking-form");

// ================= FUNGSI KODE BOOKING =================
function generateBookingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "JKT48-RPD-";

  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

// ================= TAMPILKAN RINGKASAN =================
function showSummary(data) {
  document.getElementById("summary-code").textContent =
    `Kode Booking: ${data.bookingCode}`;

  document.getElementById("summary-name").textContent = `Nama: ${data.name}`;
  document.getElementById("summary-email").textContent = `Email: ${data.email}`;
  document.getElementById("summary-seat").textContent = `Kursi: ${data.seat}`;
  document.getElementById("summary-quantity").textContent =
    `Jumlah Tiket: ${data.quantity}`;
  document.getElementById("summary-total").textContent =
    `Total Bayar: Rp ${data.total.toLocaleString("id-ID")}`;

  // === METODE PEMBAYARAN ===
  let extraInfo = "";

  if (data.payment === "va-bca") {
    document.getElementById("summary-payment").textContent =
      "Metode Pembayaran: Virtual Account BCA";
    extraInfo = "<p><strong>No. VA:</strong> 1234567890</p>";
  } else if (data.payment === "va-bni") {
    document.getElementById("summary-payment").textContent =
      "Metode Pembayaran: Virtual Account BNI";
    extraInfo = "<p><strong>No. VA:</strong> 9876543210</p>";
  } else if (data.payment === "va-bri") {
    document.getElementById("summary-payment").textContent =
      "Metode Pembayaran: Virtual Account BRI";
    extraInfo = "<p><strong>No. VA:</strong> 5678901234</p>";
  } else if (data.payment === "qris") {
    document.getElementById("summary-payment").textContent =
      "Metode Pembayaran: QRIS";
    extraInfo = `
      <div style="text-align:center; margin-top:10px;">
        <img id="qris-img" src="QR-Code.jpg" width="200" style="border-radius:10px;">
        <p>Scan QRIS untuk pembayaran</p>
      </div>
    `;
  }

  document.getElementById("summary-payment-detail").innerHTML = extraInfo;

  // === MAPS ===
  document.getElementById("summary-map").innerHTML = `
    <h3>Lokasi Konser</h3>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.362415738094!2d106.801157!3d-6.2243732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14e455ccd9f%3A0xd635e33c7c001b3d!2sFX%20Sudirman!5e0!3m2!1sid!2sid"
      width="100%" height="300"
      style="border:0; border-radius:10px; margin-top:10px;"
      loading="lazy">
    </iframe>
  `;

  document.getElementById("order-summary").style.display = "block";
  document.getElementById("download-btn").style.display = "block";
  document.getElementById("order-summary")
    .scrollIntoView({ behavior: "smooth" });
}

// ================= SUBMIT FORM =================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const seat = document.getElementById("seat").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const payment = document.getElementById("payment").value;

  let price = 0;
  if (seat === "A1" || seat === "A2") price = 500000;
  else if (seat === "B1" || seat === "B2") price = 400000;
  else if (seat === "C1" || seat === "C2") price = 300000;

  const total = price * quantity;
  const bookingCode = generateBookingCode();

  const orderData = {
    bookingCode,
    name,
    email,
    seat,
    quantity,
    payment,
    total
  };

  localStorage.setItem("lastOrder", JSON.stringify(orderData));
  showSummary(orderData);
  document.getElementById("ticket-btn").style.display = "block";

});

// ================= LOAD DARI LOCALSTORAGE =================
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lastOrder");
  if (saved) {
    showSummary(JSON.parse(saved));
  }
});

// ================= DOWNLOAD PDF =================
document.getElementById("download-btn").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(14);
  doc.text("Ringkasan Pesanan Rapsodi Concert", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(document.getElementById("summary-code").textContent, 10, y); y += 10;
  doc.text(document.getElementById("summary-name").textContent, 10, y); y += 10;
  doc.text(document.getElementById("summary-email").textContent, 10, y); y += 10;
  doc.text(document.getElementById("summary-seat").textContent, 10, y); y += 10;
  doc.text(document.getElementById("summary-quantity").textContent, 10, y); y += 10;
  doc.text(document.getElementById("summary-total").textContent, 10, y); y += 10;

  const paymentText = document.getElementById("summary-payment").textContent;
  doc.text(paymentText, 10, y);
  y += 10;

  // ===== JIKA VA =====
  const paymentDetail = document.getElementById("summary-payment-detail").innerText;
  if (paymentDetail && !paymentText.includes("QRIS")) {
    doc.text(paymentDetail, 10, y);
    doc.save("Ringkasan_Pesanan.pdf");
  }

  // ===== JIKA QRIS =====
  if (paymentText.includes("QRIS")) {
    const img = new Image();
    img.src = "QR-Code.jpg";

    img.onload = function () {
      doc.text("Scan QRIS berikut untuk pembayaran:", 10, y);
      doc.addImage(img, "JPEG", 10, y + 5, 60, 60);
      doc.save("Ringkasan_Pesanan.pdf");
    };
  }
});


// ================= HALAMAN PEMBUKA =================
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen");

startBtn.addEventListener("click", function () {
  introScreen.classList.add("intro-hidden");

  setTimeout(() => {
    introScreen.style.display = "none";
    document.querySelector(".content")
      .scrollIntoView({ behavior: "smooth" });
  }, 1000);
});
document.getElementById("ticket-btn").addEventListener("click", () => {
  window.location.href = "tiket.html";
});
