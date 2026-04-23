"""
Simple Flask API server for prices
Can be deployed on Railway, Render, or any Python hosting
"""

from flask import Flask, jsonify, send_file
from datetime import datetime
import json
import os

app = Flask(__name__)

# Load prices
def load_prices():
    try:
        with open('prices_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {
            "success": False,
            "error": "No price data available",
            "timestamp": datetime.now().isoformat()
        }

# Routes
@app.route('/')
def index():
    """Main page - redirect to website or show prices"""
    return """
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>سعر الصرف - API</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, sans-serif;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
            .container { text-align: center; padding: 40px; }
            h1 { font-size: 2.5em; margin-bottom: 10px; color: #00d4aa; }
            .subtitle { color: #888; margin-bottom: 40px; }
            .prices { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; max-width: 800px; margin: 0 auto; }
            .card {
                background: rgba(255,255,255,0.05);
                border-radius: 16px;
                padding: 25px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                transition: transform 0.3s;
            }
            .card:hover { transform: translateY(-5px); }
            .card-label { color: #888; font-size: 14px; margin-bottom: 8px; }
            .card-value { font-size: 32px; font-weight: bold; }
            .card.official .card-value { color: #27ae60; }
            .card.sayrafa .card-value { color: #00b4d8; }
            .card.parallel .card-value { color: #ff6b35; }
            .card.gold .card-value { color: #ffd700; }
            .update-time { color: #666; margin-top: 40px; font-size: 12px; }
            .api-link {
                display: inline-block;
                margin-top: 30px;
                padding: 12px 30px;
                background: #00d4aa;
                color: #1a1a2e;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
            }
            .api-link:hover { background: #00b896; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>💰 أسعار الصرف</h1>
            <p class="subtitle">الدينار العراقي مقابل الدولار</p>

            <div class="prices" id="prices">
                <div class="card official">
                    <div class="card-label">🏛️ السعر الرسمي (CBI)</div>
                    <div class="card-value" id="official">--</div>
                </div>
                <div class="card sayrafa">
                    <div class="card-label">🏧 منصة صيرفة</div>
                    <div class="card-value" id="sayrafa">--</div>
                </div>
                <div class="card parallel">
                    <div class="card-label">🏪 السوق الموازي</div>
                    <div class="card-value" id="parallel">--</div>
                </div>
                <div class="card gold">
                    <div class="card-label">🥇 ذهب 21 عيار (غرام)</div>
                    <div class="card-value" id="gold21">--</div>
                </div>
            </div>

            <div class="update-time" id="last-update">جاري التحميل...</div>
            <a href="/api" class="api-link">📡 API JSON</a>
        </div>

        <script>
            async function loadPrices() {
                try {
                    const response = await fetch('/api/prices');
                    const data = await response.json();

                    if (data.success) {
                        document.getElementById('official').textContent = data.prices.dollar.official || '--';
                        document.getElementById('sayrafa').textContent = data.prices.dollar.sayrafa || '--';
                        document.getElementById('parallel').textContent = data.prices.dollar.parallel || '--';
                        document.getElementById('gold21').textContent = data.prices.gold.gold_21 ? data.prices.gold.gold_21.toLocaleString() : '--';

                        const date = new Date(data.timestamp);
                        document.getElementById('last-update').textContent = 'آخر تحديث: ' + date.toLocaleString('ar-IQ');
                    }
                } catch (e) {
                    document.getElementById('last-update').textContent = 'خطأ في تحميل البيانات';
                }
            }

            loadPrices();
            setInterval(loadPrices, 60000); // Refresh every minute
        </script>
    </body>
    </html>
    """

@app.route('/api/prices')
def api_prices():
    """API endpoint for prices"""
    data = load_prices()
    data['server_time'] = datetime.now().isoformat()
    return jsonify(data)

@app.route('/api/prices/update', methods=['POST'])
def api_update():
    """API endpoint to update prices (secure with token)"""
    # This would require authentication in production
    return jsonify({
        "success": False,
        "message": "Use the Telegram bot to update prices"
    })

@app.route('/api/sources')
def api_sources():
    """Get information about data sources"""
    return jsonify({
        "sources": [
            {
                "name": "Central Bank of Iraq",
                "url": "https://cbi.iq",
                "type": "official",
                "description": "السعر الرسمي للدينار"
            },
            {
                "name": "Sayrafa Platform",
                "url": "https://cbi.iq/sayrafa",
                "type": "official",
                "description": "منصة بيع الدولار للمواطنين"
            },
            {
                "name": "Bursa Al-Kifah & Al-Harithiya",
                "type": "parallel",
                "description": "البورصة المحلية في بغداد - المرجع الرئيسي للسوق الموازي"
            }
        ]
    })

@app.route('/prices_data.json')
def serve_prices():
    """Serve the prices JSON file"""
    return send_file('prices_data.json', mimetype='application/json')

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "time": datetime.now().isoformat()})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)