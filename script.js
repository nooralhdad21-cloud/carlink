// تحديث البيانات حياً
function updateLive() {
    const name = document.getElementById('inName').value || "المهندس نورالدين صباح";
    const phone = document.getElementById('inPhone').value || "07701109692";
    const msg = document.getElementById('inMsg').value || "أعتذر عن الوقوف الخاطئ، يرجى الاتصال بي";

    document.getElementById('outName').innerText = name;
    document.getElementById('outPhone').innerText = phone;
    document.getElementById('outMsg').innerText = msg;
}

// تغيير القوالب
function setTpl(style, btn) {
    const card = document.getElementById('cardBox');
    card.className = 'main-card tpl-' + style;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// حفظ كصورة بجودة عالية
function takeShot() {
    const card = document.getElementById('cardBox');
    const saveBtn = document.querySelector('.btn-save');
    saveBtn.innerText = "جاري الحفظ...";

    html2canvas(card, {
        scale: 3, 
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CarLink-Pro-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        saveBtn.innerText = "💾 حفظ الصورة";
    }).catch(err => {
        saveBtn.innerText = "💾 حفظ الصورة";
        alert("حدث خطأ بسيط، حاول مرة أخرى");
    });
}
