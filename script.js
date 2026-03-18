function updateLive() {
    // ربط فوري للمدخلات
    const name = document.getElementById('inName').value || "المهندس نورالدين صباح";
    const phone = document.getElementById('inPhone').value || "07XXXXXXXXX";
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ، يرجى الاتصال بي لتحريك السيارة";

    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
}

function setTpl(style) {
    const card = document.getElementById('cardBox');
    const btns = document.querySelectorAll('.tab-btn');
    
    // تغيير الكلاس
    card.className = 'main-card tpl-' + style;
    
    // تحديث شكل الأزرار
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function takeShot() {
    const card = document.getElementById('cardBox');
    // إشعار المستخدم بالانتظار قليلاً
    const btn = document.querySelector('.btn-save');
    btn.innerText = "جاري الحفظ...";

    html2canvas(card, {
        scale: 4, 
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CarLink-Pro-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        btn.innerText = "💾 حفظ كصورة";
    });
}
