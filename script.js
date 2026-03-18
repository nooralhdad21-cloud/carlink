window.updatePreview = function() {
    const name = document.getElementById("nameInput").value || "نورالدين صباح";
    const insta = document.getElementById("instaUser").value;
    const tele = document.getElementById("teleUser").value;
    
    // إظهار الرقم بالكامل (بدون تشفير) ليكون واضحاً على الزجاج
    const phone = window.fullPhone;
    document.getElementById("displayName").innerText = name;
    document.getElementById("displayPhone").innerText = phone;
    
    document.getElementById("instaLabel").innerText = insta ? "IG: " + insta : "";
    document.getElementById("teleLabel").innerText = tele ? "TG: " + tele : "";

    const baseUrl = window.location.href.split('?')[0];
    window.finalLink = `${baseUrl}?n=${encodeURIComponent(name)}&p=${phone}&ig=${insta}&tg=${tele}`;
    
    generateQR(window.finalLink);
}
