const form = document.getElementById("booking-form");

// === Fungsi tampilkan ringkasan ===
function showSummary(data) {
    document.getElementById("summary-name").textContent = `Nama: ${data.name}`;
    document.getElementById("summary-email").textContent = `Email: ${data.email}`;
    document.getElementById("summary-seat").textContent = `Kursi: ${data.seat}`;
    document.getElementById("summary-quantity").textContent = `Jumlah Tiket: ${data.quantity}`;
    document.getElementById("summary-total").textContent = `Total Bayar: Rp ${data.total.toLocaleString("id-ID")}`;

    // tampilkan metode pembayaran
    let extraInfo = "";
    if (data.payment === "va-bca") {
        document.getElementById("summary-payment").textContent = "Metode Pembayaran: Virtual Account BCA";
        extraInfo = `<p><strong>No. VA:</strong> 1234567890 (BCA)</p>`;
    } else if (data.payment === "va-bni") {
        document.getElementById("summary-payment").textContent = "Metode Pembayaran: Virtual Account BNI";
        extraInfo = `<p><strong>No. VA:</strong> 9876543210 (BNI)</p>`;
    } else if (data.payment === "va-bri") {
        document.getElementById("summary-payment").textContent = "Metode Pembayaran: Virtual Account BRI";
        extraInfo = `<p><strong>No. VA:</strong> 5678901234 (BRI)</p>`;
    } else if (data.payment === "qris") {
        document.getElementById("summary-payment").textContent = "Metode Pembayaran: QRIS";
        extraInfo = `
            <div style="margin-top:10px; text-align:center;">
                <img src="QR-Code.jpg" alt="QRIS" width="200" style="border-radius:10px;">
                <p>Scan QRIS untuk melakukan pembayaran</p>
            </div>
        `;
    }
    document.getElementById("summary-payment-detail").innerHTML = extraInfo;

    // tampilkan maps
    document.getElementById("summary-map").innerHTML = `
        <h3>Lokasi Konser</h3>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.362415738094!2d106.801157!3d-6.2243732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14e455ccd9f%3A0xd635e33c7c001b3d!2sFX%20Sudirman!5e0!3m2!1sid!2sid!4v1758122694560!5m2!1sid!2sid"
            width="100%"
            height="300"
            style="border:0; border-radius:10px; margin-top:10px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    `;

    document.getElementById("order-summary").style.display = "block";
    document.getElementById("order-summary").scrollIntoView({ behavior: "smooth" });
}

// === Submit Form ===
form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    const orderData = { name, email, seat, quantity, payment, total };

    // Simpan ke localStorage
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Tampilkan ringkasan
    showSummary(orderData);
    document.getElementById("download-btn").style.display = "block";

});

// === Saat halaman dibuka, cek localStorage ===
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
        const data = JSON.parse(saved);
        showSummary(data);
    }
});
// ===== CETAK PDF =====
document.getElementById("download-btn").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Ringkasan Pesanan Rapsodi Concert", 10, 10);

    doc.setFontSize(12);
    doc.text(document.getElementById("summary-name").textContent, 10, 20);
    doc.text(document.getElementById("summary-email").textContent, 10, 30);
    doc.text(document.getElementById("summary-seat").textContent, 10, 40);
    doc.text(document.getElementById("summary-quantity").textContent, 10, 50);
    doc.text(document.getElementById("summary-total").textContent, 10, 60);
    doc.text(document.getElementById("summary-payment").textContent, 10, 70);

    // Tambah VA detail (kalau ada)
    const detail = document.getElementById("summary-payment-detail").innerText;
    if (detail) {
        doc.text(detail, 10, 80);
    }

    // Tambah QRIS ke PDF (kalau dipilih)
    const qrisImg = document.getElementById("qris-img");
    if (qrisImg) {
        const imgFormat = qrisImg.src.endsWith(".png") ? "PNG" : "JPEG";
        doc.addImage(qrisImg, imgFormat, 10, 90, 60, 60);
    }

    doc.save("Ringkasan_Pesanan.pdf");
});

// ===== HALAMAN PEMBUKA =====
  const intro = document.getElementById("intro-screen");
  intro.classList.add("intro-hidden");
  
  setTimeout(() => {
    intro.style.display = "none";
    document.querySelector(".content").scrollIntoView({ behavior: "smooth" });
  }, 1000);


// ===== HALAMAN PEMBUKA =====
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro-screen");
const introMusic = document.getElementById("intro-music");

  // Putar musik saat tombol diklik
  introMusic.play();

  // Animasi hilang pelan
  introScreen.classList.add("intro-hidden");

  // Hapus elemen intro setelah transisi
  setTimeout(() => {
    introScreen.style.display = "none";
    document.querySelector(".content").scrollIntoView({ behavior: "smooth" });
  }, 1000);



