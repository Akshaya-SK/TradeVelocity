# backend/app.py
from flask import Flask
from flask_cors import CORS
from config import Config
from models import init_db
from routes import bp as api_bp
from websocket import socketio, mock_price_stream

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Initialize DB
    init_db(app.config['SQLALCHEMY_DATABASE_URI'])

    # Register API routes
    app.register_blueprint(api_bp, url_prefix="/api")

    # Attach SocketIO to app
    socketio.init_app(app)

    return app

app = create_app()

if __name__ == "__main__":
    # Start mock stock price stream AFTER SocketIO is attached
    socketio.start_background_task(mock_price_stream)

    # Use eventlet for WebSocket support on Windows
    socketio.run(app, host="0.0.0.0", port=5000)
