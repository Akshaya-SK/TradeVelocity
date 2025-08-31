# backend/websocket.py
from flask_socketio import SocketIO
import time
import random

# Initialize SocketIO (async_mode='threading' works on Windows)
socketio = SocketIO(async_mode='threading', cors_allowed_origins="*")

def mock_price_stream():
    """Emit fake stock prices every second."""
    while True:
        price = round(100 + random.uniform(-1, 1), 2)
        payload = {
            "symbol": "AAPL",
            "price": price,
            "ts": time.time()  # timestamp
        }
        socketio.emit("price_update", payload, namespace="/stream")
        time.sleep(1)
