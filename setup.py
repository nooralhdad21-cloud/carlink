"""
Setup script - Install dependencies and initialize the system
"""

import os
import subprocess
import sys

def install_packages():
    """Install required Python packages"""
    packages = [
        "python-telegram-bot",
        "requests",
        "beautifulsoup4"
    ]

    print("📦 Installing required packages...")
    for package in packages:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package, "-q"])
            print(f"  ✅ {package}")
        except Exception as e:
            print(f"  ⚠️ {package}: {e}")

    print("\n✅ All packages installed!")

def create_data_files():
    """Create initial data files"""
    import json

    # Create initial prices JSON
    initial_prices = {
        "success": True,
        "timestamp": "",
        "prices": {
            "dollar": {
                "official": 1310,
                "sayrafa": 1540,
                "parallel": None
            },
            "gold": {
                "gold_24": 330000,
                "gold_21": 290000,
                "gold_18": 247500
            },
            "silver": 3200
        },
        "sources": {
            "official": "Central Bank of Iraq (cbi.iq)",
            "sayrafa": "Sayrafa Platform (cbi.iq/sayrafa)",
            "parallel": "Bursa Al-Kifah & Al-Harithiya",
            "gold": "Local Market"
        }
    }

    with open('prices_data.json', 'w', encoding='utf-8') as f:
        json.dump(initial_prices, f, ensure_ascii=False, indent=2)

    print("✅ Initial data files created")

def show_instructions():
    """Show setup instructions"""
    instructions = """
╔══════════════════════════════════════════════════════════════╗
║     🚀 نظام تحديث الأسعار التلقائي - تم التأسيس!            ║
╚══════════════════════════════════════════════════════════════╝

📱 *البوت جاهز على تيليگرام:*
   t.me/MyWebSync_Bot

🔹 *لتحديث الأسعار يدوياً (من البوت):*
   /update parallel 1555
   /update sayrafa 1540
   /update gold21 290000

🔹 *لمشاهدة الأسعار:*
   /prices

🔹 *لتشغيل البوت:*
   python telegram_bot.py

═══════════════════════════════════════════════════════════════

🌐 *لربط الموقع الإلكتروني:*

1. ارفع الملفات على استضافة تدعم Python (مثل Railway, Render, Heroku)
2. أو استخدم GitHub Actions للتحديث التلقائي
3. الموقع يجلب البيانات من prices_data.json تلقائياً

═══════════════════════════════════════════════════════════════

⚡ *التحديث التلقائي من التيليگرام:*

للأسف،_channels التيليگرام ما عندهم API عام -
لذلك تحتاج أحد الحلول التالية:

✅ الحل 1: تحديث يدوي (موصى به)
   - شخص يتابع الأسعار و يحدث عبر البوت
   - أو يرسل رسالة للبوت و يتقبل التحديثات

✅ الحل 2: Web Scraping من مواقع الأخبار
   - نقدر ننسف أسعار من مواقع إخبارية معينة
   - لكن تحتاج تحديد المواقع أولاً

✅ الحل 3: إضافة Bot للأعضاء
   - أي شخص يرسل السعر ← ينحدث تلقائياً
   - نمنع الرسائل ونسخ فقط

═══════════════════════════════════════════════════════════════
"""
    print(instructions)

if __name__ == "__main__":
    print("🔧 Setting up Iraqi Dinar Price Sync System...\n")
    install_packages()
    create_data_files()
    show_instructions()