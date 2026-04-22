// ============================================================
// ⚙️ ملف المنطق البرمجي (JavaScript Logic) لـ Artiva
// ============================================================

const { useState, useEffect } = React;

export const useArtivaLogic = () => {
    // 1. حالات النظام (States)
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [credentials, setCredentials] = useState({ user: "", pass: "" });

    // 2. إدارة التخزين والكاش (LocalStorage Persistence)
    useEffect(() => {
        // التحقق إذا كان المستخدم مسجل دخول كأدمن سابقاً
        const authStatus = localStorage.getItem("artiva_admin_session");
        if (authStatus === "true") {
            setIsAdmin(true);
        }

        // مراقبة التمرير لتغيير شكل الـ Navbar
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 3. دالة تسجيل دخول المدير
    const loginAsAdmin = (e) => {
        if (e) e.preventDefault();
        
        // البيانات التي حددتها (admin / admin123)
        if (credentials.user === "admin" && credentials.pass === "admin123") {
            setIsAdmin(true);
            setShowLogin(false);
            localStorage.setItem("artiva_admin_session", "true");
            console.log("✅ تم تفعيل وضع المدير");
        } else {
            alert("⚠️ خطأ في بيانات الإدارة!");
        }
    };

    // 4. دالة تسجيل الخروج
    const logoutAdmin = () => {
        setIsAdmin(false);
        localStorage.removeItem("artiva_admin_session");
        console.log("👋 تم تسجيل الخروج");
    };

    // 5. وظيفة الربط مع Google Drive (محاكاة برمجية)
    const syncWithGoogleDrive = async (designData) => {
        if (!isAdmin) {
            alert("هذه الميزة متاحة للمديرين فقط.");
            return;
        }

        console.log("⏳ جاري تحضير البيانات للرفع إلى Google Drive...");
        
        // هنا يتم استدعاء Google API مستقبلاً
        try {
            // كود الرفع الافتراضي
            localStorage.setItem("artiva_cloud_backup", JSON.stringify(designData));
            alert("🚀 تم الحفظ سحابياً بنجاح (محاكاة)");
        } catch (error) {
            console.error("خطأ في المزامنة:", error);
        }
    };

    // تصدير القيم والوظائف لاستخدامها في الواجهة
    return {
        isAdmin,
        showLogin,
        setShowLogin,
        isScrolled,
        credentials,
        setCredentials,
        loginAsAdmin,
        logoutAdmin,
        syncWithGoogleDrive
    };
};

// ============================================================
// 🛠️ وظيفة إضافية لإخفاء وإظهار العناصر عند السكرول (Reveal Effect)
// ============================================================
export const initRevealEffect = () => {
    const reveal = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach((el) => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", reveal);
};
