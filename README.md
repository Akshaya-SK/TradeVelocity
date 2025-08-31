# TradeVelocity(React + Flask + Chart.js + WebSockets)

A starter production-ready project scaffold for a live stock trading dashboard. Frontend is React (Vite) with Redux and Chart.js. Backend is Flask with Flask-SocketIO and SQLAlchemy (SQLite). Styling uses pure CSS with a dark/light toggle.

## Quick start (development)

### Backend (Python)
1. Create & activate a virtual environment:
   - Windows (PowerShell):
     ```
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - macOS / Linux:
     ```
     python -m venv venv
     source venv/bin/activate
     ```

2. Install dependencies:
```
pip install -r backend/requirements.txt
```

3. Copy `.env.example` to `.env` and set secrets (optional). By default the app will create `database.db`.

4. Run the backend (uses eventlet for SocketIO):
```
python backend/app.py
```
This will start Flask + SocketIO on `http://0.0.0.0:5000`.

### Frontend (Node)
1. From project root:
```
cd frontend
npm install
npm run dev
```
Vite dev server starts at `http://localhost:5173`.

## Features implemented
- WebSocket mock price streamer (backend) that emits `price_update` every second.
- React frontend consumes socket events and updates charts live.
- Basic JWT auth (signup/login) and protected portfolio CRUD endpoints.
- SQLite persistence via SQLAlchemy.
- Chart.js line chart demo and placeholder for financial/candlestick charts.
- Responsive layout and dark/light toggle implemented in pure CSS.

## Notes & Next steps
- The backend includes a `USE_YFINANCE` flag—if enabled, you can extend websocket streamer to fetch real market snapshots using `yfinance`.
- Passwords are hashed with SHA256 in this scaffold for simplicity. **Use bcrypt** (e.g. `passlib`) in production.
- For production deployment, use a proper WSGI server and secure HTTPS, environment variables, CORS, rate-limiting, and secrets management.
- Chart.js candlestick rendering uses `chartjs-chart-financial`. You may need to adapt data formats for real OHLC data.

## File structure
``` css
stock-dashboard/
│
├── backend/
│   ├── app.py                # Flask app entry point
│   ├── websocket.py          # SocketIO mock price stream
│   ├── config.py             # Configurations (DB URI, secrets, etc.)
│   ├── models.py             # DB models + init_db()
│   ├── routes.py             # API routes (Blueprint)
│   ├── requirements.txt      # Backend dependencies
│   └── venv1/                # Your virtual environment (not pushed to GitHub)
│
├── frontend/
│   ├── public/               # React public assets
│   ├── src/
│   │   ├── components/       # UI components (charts, cards, etc.)
│   │   ├── pages/            # React pages (Dashboard, etc.)
│   │   ├── App.js            # Root React component
│   │   ├── index.js          # React entry point
│   │   └── ...               # Other JS/CSS files
│   ├── package.json          # React dependencies
│   ├── vite.config.js        # Vite config (if using Vite) OR webpack config
│   └── node_modules/         # Installed packages (ignored by git)
│
├── .gitignore                # Ignoring venv, node_modules, etc.
└── README.md                 # GitHub readme
```

