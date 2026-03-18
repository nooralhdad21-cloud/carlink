// تثبيت الدوال في Window لضمان عملها على GitHub Pages
window.login = function() {
    const p = document.getElementById("loginPhone").value;
    if(p.length < 10) {
        alert("يرجى إدخال رقم هاتف صحيح");
        return;
    }
    window.fullPhone = p; // حفظ الرقم المدخل
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updatePreview();
}

window.updatePreview = function() {
    const name = document.getElementById("nameInput").value || "نورالدين صباح";
    const insta = document.getElementById("instaUser").value;
    const tele = document.getElementById("teleUser").value;
    
    // تحديث الرقم ليظهر بالكامل كما هو (بدون تشفير)
    document.getElementById("displayName").innerText = name;
    document.getElementById("displayPhone").innerText = window.fullPhone;
    
    // تحديث اليوزرات
    document.getElementById("instaLabel").innerText = insta ? "IG: " + insta : "";
    document.getElementById("teleLabel").innerText = tele ? " | TG: " + tele : "";

    // إنشاء الرابط الذي سيفتحه الباركود
    const baseUrl = window.location.href.split('?')[0];
    window.finalLink = `${baseUrl}?n=${encodeURIComponent(name)}&p=${window.fullPhone}&ig=${insta}&tg=${tele}`;
    
    generateQR(window.finalLink);
}

window.generateQR = function(link) {
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, { 
        text: link, 
        width: 140, 
        height: 140,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

window.downloadCard = function() {
    const target = document.getElementById("captureTarget");
    html2canvas(target, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'CarLink-Card.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

window.copyLink = function() {
    navigator.clipboard.writeText(window.finalLink);
    alert("تم نسخ رابط بطاقتك الشخصي!");
}
