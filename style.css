window.login = function() {
    const phone = document.getElementById("loginPhone").value;
    if(phone.length < 10) return alert("يرجى إدخال رقم هاتف صحيح");
    window.fullPhone = phone; // نحفظ الرقم الكامل للباركود فقط
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updatePreview();
}

window.updatePreview = function() {
    const name = document.getElementById("nameInput").value || "نورالدين صباح";
    const fb = document.getElementById("fbInput").value || "";
    
    // تشفير الرقم ليظهر (077*****059)
    const p = window.fullPhone;
    const maskedPhone = p.substring(0, 3) + "*****" + p.substring(p.length - 3);
    
    document.getElementById("displayName").innerText = name;
    document.getElementById("displayPhone").innerText = maskedPhone;

    generateQR(name, window.fullPhone, fb);
}

window.generateQR = function(name, phone, fb) {
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    
    // الرابط الذي سيفتحه الباركود (يحتوي البيانات الكاملة)
    const baseUrl = window.location.href.split('?')[0];
    const profileUrl = `${baseUrl}?n=${encodeURIComponent(name)}&p=${phone}&fb=${encodeURIComponent(fb)}`;

    new QRCode(qrDiv, {
        text: profileUrl,
        width: 140,
        height: 140,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
