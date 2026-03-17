let userData = {
    name: "نورالدين صباح",
    phone: "+9647701109692",
    social: []
};

const icons = {
    instagram: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
    whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    telegram: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
};

function login() {
    const phone = document.getElementById("loginPhone").value.trim();
    if(phone.length < 9) {
        alert("يرجى إدخال رقم هاتف صحيح");
        return;
    }
    userData.phone = "+964 " + phone;
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    updatePreview();
}

function addSocialRow() {
    const container = document.getElementById("socialInputs");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "10px";
    div.innerHTML = `
        <select onchange="updatePreview()">
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="facebook">Facebook</option>
        </select>
        <input type="text" placeholder="اسم المستخدم" oninput="updatePreview()">
        <button onclick="this.parentElement.remove(); updatePreview();" style="background:#dc3545">❌</button>
    `;
    container.appendChild(div);
}

function updatePreview() {
    document.getElementById("displayName").innerText = document.getElementById("nameInput").value || "نورالدين صباح";
    document.getElementById("displayPhone").innerText = userData.phone;

    const socialContainer = document.getElementById("displaySocial");
    socialContainer.innerHTML = "";
    
    document.querySelectorAll("#socialInputs div").forEach(row => {
        const type = row.querySelector("select").value;
        const user = row.querySelector("input").value;
        if(user) {
            const item = document.createElement("div");
            item.className = "social-item";
            item.innerHTML = `<img src="${icons[type]}"> ${user}`;
            socialContainer.appendChild(item);
        }
    });
    generateQR();
}

function generateQR() {
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    const name = document.getElementById("displayName").innerText;
    const content = `Name: ${name}\nPhone: ${userData.phone}`;
    
    new QRCode(qrDiv, {
        text: content,
        width: 140,
        height: 140
    });
}

function printA4() {
    window.print();
}
