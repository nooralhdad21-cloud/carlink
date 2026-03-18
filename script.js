function updateLive() {
    // ربط المدخلات بالمخرجات فوراً
    const name = document.getElementById('inName').value || "المهندس نورالدين صباح";
    const phone = document.getElementById('inPhone').value || "07XXXXXXXXX";
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ، يرجى الاتصال بي لتحريك السيارة";

    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
}

function setTpl(style) {
    const card = document.getElementById('cardBox');
    const tabs = document.querySelectorAll('.tpl-card');
    
    // تغيير شكل البطاقة
    card.className = 'main-card tpl-' + style;
    
    // تحديث شكل الأزرار في القائمة
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tpl="${style}"]`).classList.add('active');
}

function takeShot() {
    const card = document.getElementById('cardBox');
    html2canvas(card, {
        scale: 4, // دقة جبارة للطباعة
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CarLink-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
