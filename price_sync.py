"""
Telegram Price Sync Bot - Iraqi Dinar & Gold Prices
Fetches prices from Telegram channels and serves them via API
"""

import os
import re
import json
import asyncio
from datetime import datetime, timedelta
from typing import Optional, Dict, List
from dataclasses import dataclass, asdict
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class PriceData:
    """Price data structure"""
    # Dollar rates
    official: Optional[float] = None
    sayrafa: Optional[float] = None
    parallel: Optional[float] = None

    # Gold prices (per gram in IQD)
    gold_24: Optional[float] = None
    gold_21: Optional[float] = None
    gold_18: Optional[float] = None

    # Silver (per gram in IQD)
    silver: Optional[float] = None

    # Metadata
    source: str = ""
    timestamp: str = ""
    city: str = ""

    def to_dict(self):
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict):
        return cls(**{k: v for k, v in data.items() if k in cls.__annotations__})

class PriceDatabase:
    """Simple JSON-based price database"""

    def __init__(self, filepath: str = "prices_data.json"):
        self.filepath = filepath
        self.data = self._load()

    def _load(self) -> Dict:
        if os.path.exists(self.filepath):
            try:
                with open(self.filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                return {}
        return {}

    def save(self):
        with open(self.filepath, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)

    def update_price(self, key: str, value: float, source: str = "telegram"):
        self.data[key] = {
            "value": value,
            "source": source,
            "updated_at": datetime.now().isoformat()
        }
        self.save()

    def get_price(self, key: str) -> Optional[float]:
        if key in self.data:
            return self.data[key].get("value")
        return None

    def get_all_prices(self) -> Dict:
        return self.data.copy()

    def to_api_response(self) -> Dict:
        """Format data for API response"""
        return {
            "success": True,
            "timestamp": datetime.now().isoformat(),
            "prices": {
                "dollar": {
                    "official": self.get_price("official"),
                    "sayrafa": self.get_price("sayrafa"),
                    "parallel": self.get_price("parallel")
                },
                "gold": {
                    "gold_24": self.get_price("gold_24"),
                    "gold_21": self.get_price("gold_21"),
                    "gold_18": self.get_price("gold_18")
                },
                "silver": self.get_price("silver")
            },
            "sources": {
                "official": "Central Bank of Iraq (cbi.iq)",
                "sayrafa": "Sayrafa Platform (cbi.iq/sayrafa)",
                "parallel": "Bursa Al-Kifah & Al-Harithiya",
                "gold": "Local Market Prices"
            }
        }

class PriceParser:
    """Parse price messages from various formats"""

    # Common patterns for Iraqi prices
    DOLLAR_PATTERNS = [
        # "155,500" or "155500" for 100 dollars
        r'(\d{3}[\d,]+)\s*(?:د\.ع|دينار|للمئة|لكل\s*100|100\s*دولار)',
        # "155.500" decimal format
        r'(\d{3}\.\d{3})\s*(?:د\.ع|دينار)',
        # Just a large number followed by context
        r'(?:سعر\s*)?(?:الدولار?\s*)?(?:100\s*\$?\s*[=:]\s*)?(\d{3}[\d,\.]+)',
        # "1555" for per-dollar (less common)
        r'(?:الدولار\s*[=:]\s*)(\d{4,5})'
    ]

    GOLD_PATTERNS = [
        # "290,000" for gold prices (per gram in thousands)
        r'(?:ذهب\s*)?(?:الغرام?\s*)?(?:21\s*عيار?\s*[=:]\s*)?(\d{3}[\d,]+)\s*(?:د\.ع|دينار)',
        r'(?:ذهب\s*21\s*)[=:]\s*(\d{3}[\d,]+)',
        # "290" in thousands
        r'(?:غرام\s*)?(?:21\s*عيار?\s*[=:]\s*)(\d{2,3}[\d]*)\s*ألف'
    ]

    @staticmethod
    def clean_number(text: str) -> float:
        """Clean and convert text to number"""
        # Remove commas and spaces
        text = text.replace(',', '').replace(' ', '').strip()
        try:
            return float(text)
        except:
            return 0

    @staticmethod
    def parse_dollar(text: str) -> Optional[float]:
        """Parse dollar price from text"""
        # Look for 100$ = price format first
        match_100 = re.search(r'(?:100\s*\$|لكل\s*100\s*دولار|[آأ]سعار?\s*100\s*دولار?)\s*[=:\s]+(\d{3}[\d,\.]+)', text)
        if match_100:
            return PriceParser.clean_number(match_100.group(1)) / 100

        # Look for just the price with context
        for pattern in PriceParser.DOLLAR_PATTERNS:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                num = PriceParser.clean_number(match.group(1))
                # If it's a large number, likely is per 100 dollars
                if num >= 1000:
                    return num / 100
                return num
        return None

    @staticmethod
    def parse_gold(text: str) -> Optional[float]:
        """Parse gold price from text"""
        for pattern in PriceParser.GOLD_PATTERNS:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                num = PriceParser.clean_number(match.group(1))
                # If number is less than 1000, it's probably in thousands
                if num < 1000:
                    num *= 1000
                return num
        return None

    @staticmethod
    def determine_market(text: str) -> str:
        """Determine if price is official, sayrafa, or parallel"""
        text_lower = text.lower()
        if any(word in text_lower for word in ['صيرفة', 'sayrafa', 'منصة']):
            return 'sayrafa'
        elif any(word in text_lower for word in ['بنك مركزي', 'رسمي', 'cbi', 'official']):
            return 'official'
        else:
            return 'parallel'

    @staticmethod
    def determine_city(text: str) -> str:
        """Extract city name from text"""
        cities = ['بغداد', 'البصرة', 'أربيل', 'الموصل', 'النجف', 'كربلاء',
                  'نينوى', 'كركوك', 'ديالى', 'بابل', 'الحلة', 'السليمانية',
                  'اربيل', 'حلبجة', 'دهوك', 'واسط', 'ميسان', 'ذي قار']
        for city in cities:
            if city in text:
                return city
        return 'unknown'

def save_api_json():
    """Save current prices to a JSON file for the website to fetch"""
    db = PriceDatabase()
    api_data = db.to_api_response()

    with open('api_prices.json', 'w', encoding='utf-8') as f:
        json.dump(api_data, f, ensure_ascii=False, indent=2)

    logger.info("API JSON updated")
    return api_data

def create_standalone_api():
    """Create a simple standalone API file that can be deployed"""
    api_code = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dinar Prices API</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #1a1a2e; color: #eee; }
        .price-card { background: #16213e; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .price-label { color: #888; font-size: 14px; }
        .price-value { font-size: 28px; font-weight: bold; color: #00d4aa; }
        .gold { color: #ffd700; }
        .update-time { color: #666; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>💰 أسعار صرف الدينار</h1>
    <div id="prices">جاري التحميل...</div>
    <div class="update-time" id="last-update">آخر تحديث: --</div>

    <script>
    // Auto-refresh every 30 seconds
    async function loadPrices() {
        try {
            const response = await fetch('prices_data.json');
            const data = await response.json();
            displayPrices(data);
        } catch(e) {
            document.getElementById('prices').innerHTML = 'خطأ في تحميل البيانات';
        }
    }

    function displayPrices(data) {
        const p = data.prices;
        let html = '';

        html += '<div class="price-card">';
        html += '<div class="price-label">الدولار الرسمي (CBI)</div>';
        html += '<div class="price-value">' + (p.dollar.official || '--') + '</div></div>';

        html += '<div class="price-card">';
        html += '<div class="price-label">صيرفة</div>';
        html += '<div class="price-value" style="color:#00b4d8">' + (p.dollar.sayrafa || '--') + '</div></div>';

        html += '<div class="price-card">';
        html += '<div class="price-label">الموازي</div>';
        html += '<div class="price-value" style="color:#ff6b35">' + (p.dollar.parallel || '--') + '</div></div>';

        html += '<div class="price-card gold">';
        html += '<div class="price-label">ذهب 21 عيار</div>';
        html += '<div class="price-value">' + (p.gold.gold_21 || '--') + '</div></div>';

        document.getElementById('prices').innerHTML = html;
        document.getElementById('last-update').textContent = 'آخر تحديث: ' + new Date(data.timestamp).toLocaleString('ar-IQ');
    }

    loadPrices();
    setInterval(loadPrices, 30000);
    </script>
</body>
</html>'''

    with open('api_display.html', 'w', encoding='utf-8') as f:
        f.write(api_code)

    logger.info("Standalone API display created")

def update_prices_manually():
    """Function to manually update prices from Telegram messages"""
    db = PriceDatabase()

    # Example: You can call this function with scraped data
    def add_price(price_type, value, source="manual"):
        db.update_price(price_type, value, source)
        logger.info(f"Updated {price_type}: {value}")

    # Example usage (you'll call this from Telegram bot)
    # add_price("parallel", 1555, "telegram")
    # add_price("gold_21", 290000, "telegram")

    return db.to_api_response()

if __name__ == "__main__":
    print("="*60)
    print("💰 Iraqi Dinar Price Sync System")
    print("="*60)
    print("\nAvailable functions:")
    print("1. PriceDatabase - Store and retrieve prices")
    print("2. PriceParser - Parse prices from text")
    print("3. save_api_json() - Export prices to JSON")
    print("4. create_standalone_api() - Create API display page")
    print("\nTo use with Telegram Bot, integrate with the bot token:")
    print("Bot Token: 8628219355:AAGw9oOu1kfk9z3OZhHLtUN-jkH02FJ7570")
    print("="*60)

    # Save initial API
    save_api_json()
    create_standalone_api()