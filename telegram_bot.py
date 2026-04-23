#!/usr/bin/env python3
"""
Telegram Bot for Iraqi Dinar Prices
Controls price updates via chat commands
"""

import os
import json
import asyncio
from datetime import datetime
from typing import Optional, Dict, List

# Try to import telegram - install if needed
try:
    from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
    from telegram.ext import (
        Application, CommandHandler, MessageHandler,
        CallbackQueryHandler, ContextTypes, filters
    )
    TELEGRAM_AVAILABLE = True
except ImportError:
    TELEGRAM_AVAILABLE = False
    print("python-telegram-bot not installed. Run: pip install python-telegram-bot")

# Configuration
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8628219355:AAGw9oOu1kfk9z3OZhHLtUN-jkH02FJ7570")

# Price storage
prices = {
    "official": 1310,
    "sayrafa": 1540,
    "parallel": None,
    "gold_24": 330000,
    "gold_21": 290000,
    "gold_18": 247500,
    "silver": 3200
}

last_update = datetime.now().isoformat()

# Bot commands
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Welcome message"""
    welcome = """
🏦 *مرحباً بك في بوت أسعار الدينار*

هذا البوت يتيح لك تحديث أسعار الصرف والذهب تلقائياً.

📊 *الأوامر المتاحة:*
/prices - عرض الأسعار الحالية
/update - تحديث سعر جديد
/help - المساعدة

💡 *طريقة الاستخدام:*
استخدم الأمر /update متبوعاً بالسعر
مثال: /update parallel 1555
"""
    await update.message.reply_text(welcome, parse_mode='Markdown')

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Help message"""
    help_text = """
📖 *دليل الاستخدام*

🔹 تحديث الأسعار:
/update parallel 1555 - تحديث السعر الموازي
/update sayrafa 1540 - تحديث سعر صيرفة
/update gold21 290000 - تحديث ذهب 21 عيار

🔹 عرض الأسعار:
/prices - عرض كل الأسعار
/prices gold - عرض أسعار الذهب فقط
/prices dollar - عرض أسعار الدولار فقط

🔹 مصادر الأسعار:
• البنك المركزي: cbi.iq
• منصة صيرفة: sayrafa.cbi.iq
• البورصة: كفاح والحارثية (بغداد)
"""
    await update.message.reply_text(help_text, parse_mode='Markdown')

async def prices_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show current prices"""
    global last_update

    currency = context.args[0].lower() if context.args else None

    msg = "📊 *الأسعار الحالية*\n\n"

    if currency == 'gold':
        msg += "🥇 *الذهب (دينار/غرام)*\n"
        msg += f"24 عيار: {prices['gold_24']:,}\n"
        msg += f"21 عيار: {prices['gold_21']:,}\n"
        msg += f"18 عيار: {prices['gold_18']:,}\n"
        msg += f"فضة: {prices['silver']:,}"
    elif currency == 'dollar':
        msg += "💵 *أسعار الدولار*\n"
        msg += f"رسمي: {prices['official']:,}\n"
        msg += f"صيرفة: {prices['sayrafa']:,}\n"
        msg += f"موازي: {prices['parallel'] or 'غير محدد':,}"
    else:
        msg += "💵 *الدولار*\n"
        msg += f"• رسمي: {prices['official']:,}\n"
        msg += f"• صيرفة: {prices['sayrafa']:,}\n"
        msg += f"• موازي: {prices['parallel'] or 'غير محدد':,}\n\n"
        msg += "🥇 *الذهب*\n"
        msg += f"• 24: {prices['gold_24']:,}\n"
        msg += f"• 21: {prices['gold_21']:,}\n"
        msg += f"• 18: {prices['gold_18']:,}\n\n"
        msg += "⚪ *فضة: {prices['silver']:,}"

    msg += f"\n\n🕐 آخر تحديث: {last_update}"
    await update.message.reply_text(msg, parse_mode='Markdown')

async def update_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Update a price"""
    global prices, last_update

    if not context.args or len(context.args) < 2:
        await update.message.reply_text(
            "❌ *خطأ*\n\nالاستخدام: /update <النوع> <السعر>\n\nالمثال: /update parallel 1555\n\nالأنواع:\n• official - السعر الرسمي\n• sayrafa - سعر صيرفة\n• parallel - السعر الموازي\n• gold24, gold21, gold18\n• silver"
        , parse_mode='Markdown')
        return

    price_type = context.args[0].lower()
    try:
        value = float(context.args[1].replace(',', ''))
    except ValueError:
        await update.message.reply_text("❌ السعر يجب أن يكون رقماً!")
        return

    valid_types = ['official', 'sayrafa', 'parallel', 'gold24', 'gold21', 'gold18', 'silver']

    if price_type not in valid_types:
        await update.message.reply_text(f"❌ النوع غير صحيح!\nالأنواع المتاحة: {', '.join(valid_types)}")
        return

    # Update price
    if price_type == 'gold24':
        prices['gold_24'] = value
    elif price_type == 'gold21':
        prices['gold_21'] = value
    elif price_type == 'gold18':
        prices['gold_18'] = value
    else:
        prices[price_type] = value

    last_update = datetime.now().isoformat()

    # Save to JSON
    save_prices_to_json()

    await update.message.reply_text(
        f"✅ *تم التحديث!*\n\n{price_type}: {value:,}\n🕐 {last_update}"
    , parse_mode='Markdown')

def save_prices_to_json():
    """Save prices to JSON file for web API"""
    global prices, last_update

    api_data = {
        "success": True,
        "timestamp": last_update,
        "prices": {
            "dollar": {
                "official": prices["official"],
                "sayrafa": prices["sayrafa"],
                "parallel": prices["parallel"]
            },
            "gold": {
                "gold_24": prices["gold_24"],
                "gold_21": prices["gold_21"],
                "gold_18": prices["gold_18"]
            },
            "silver": prices["silver"]
        },
        "sources": {
            "official": "Central Bank of Iraq (cbi.iq)",
            "sayrafa": "Sayrafa Platform (cbi.iq/sayrafa)",
            "parallel": "Bursa Al-Kifah & Al-Harithiya",
            "gold": "Local Market"
        }
    }

    with open('prices_data.json', 'w', encoding='utf-8') as f:
        json.dump(api_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Prices saved: {api_data}")

async def unknown_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle unknown messages"""
    await update.message.reply_text(
        "❓ لم أفهم!\nاستخدم /help لرؤية الأوامر المتاحة"
    )

def run_bot():
    """Run the Telegram bot"""
    if not TELEGRAM_AVAILABLE:
        print("❌ python-telegram-bot not installed!")
        print("Run: pip install python-telegram-bot")
        return

    print("🚀 Starting Telegram Bot...")

    # Create application
    app = Application.builder().token(BOT_TOKEN).build()

    # Add handlers
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("prices", prices_command))
    app.add_handler(CommandHandler("update", update_command))
    app.add_handler(MessageHandler(filters.COMMAND, unknown_command))

    # Start polling
    print("✅ Bot is running! Send /start in your Telegram bot chat.")
    print(f"Bot URL: https://t.me/MyWebSync_Bot")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    run_bot()