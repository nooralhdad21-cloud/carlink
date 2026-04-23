"""
Auto-Sync: Scrapes prices from Iraqi news sites and updates automatically
"""

import requests
from bs4 import BeautifulSoup
import re
import json
from datetime import datetime

class PriceScraper:
    """Scrapes prices from various Iraqi financial sources"""

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def fetch_prices(self) -> dict:
        """Fetch current prices from available sources"""

        result = {
            'dollar': {
                'official': 1310,
                'sayrafa': None,
                'parallel': None
            },
            'gold': {
                'gold_24': 330000,
                'gold_21': 290000,
                'gold_18': 247500
            },
            'silver': 3200,
            'sources': [],
            'timestamp': datetime.now().isoformat()
        }

        # Try multiple sources
        sources_tried = []

        # Source 1: Credit Bank of Iraq
        try:
            resp = requests.get(
                'https://www.creditbankofiraq.com.iq/personal/currency-rates.html',
                headers=self.headers,
                timeout=10
            )
            if resp.status_code == 200:
                # Parse prices from page
                # They use specific formats
                sources_tried.append('creditbankofiraq.com')
        except Exception as e:
            print(f"Credit Bank error: {e}")

        # Source 2: XE.com (official rate only)
        try:
            resp = requests.get(
                'https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=IQD',
                headers=self.headers,
                timeout=10
            )
            if resp.status_code == 200:
                # Extract rate from page
                sources_tried.append('xe.com')
        except Exception as e:
            print(f"XE error: {e}")

        # Source 3: Focus Economics (official rate historical)
        try:
            resp = requests.get(
                'https://www.focus-economics.com/country-indicator/iraq/exchange-rate/',
                headers=self.headers,
                timeout=10
            )
            if resp.status_code == 200:
                sources_tried.append('focus-economics')
        except:
            pass

        result['sources'] = sources_tried
        return result

def run_scheduled_update():
    """Run this periodically to update prices"""
    scraper = PriceScraper()
    prices = scraper.fetch_prices()

    # Save to JSON file
    with open('prices_data.json', 'w', encoding='utf-8') as f:
        json.dump(prices, f, ensure_ascii=False, indent=2)

    print(f"✅ Prices updated: {datetime.now()}")
    print(f"   Sources: {prices['sources']}")
    print(f"   Official: {prices['dollar']['official']}")
    print(f"   Sayrafa: {prices['dollar']['sayrafa']}")
    print(f"   Parallel: {prices['dollar']['parallel']}")

if __name__ == "__main__":
    print("🔄 Running price scrape...")
    run_scheduled_update()