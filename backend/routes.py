from flask import Blueprint, request, jsonify, current_app
from models import Base, User, Portfolio, init_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib
import jwt
import datetime

bp = Blueprint("api", __name__)
engine = create_engine(current_app.config['SQLALCHEMY_DATABASE_URI'] if False else "sqlite:///database.db", future=True)
Session = sessionmaker(bind=engine)

# Simple password hashing (use bcrypt in production)
def hash_password(pw):
    return hashlib.sha256(pw.encode()).hexdigest()

@bp.route("/", methods=["GET"])
def home():
    return jsonify({"Backend is running"}), 400

@bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error":"username and password required"}), 400
    session = Session()
    if session.query(User).filter_by(username=username).first():
        return jsonify({"error":"user exists"}), 400
    user = User(username=username, password_hash=hash_password(password))
    session.add(user)
    session.commit()
    return jsonify({"message":"created"}), 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    session = Session()
    user = session.query(User).filter_by(username=username).first()
    if not user or user.password_hash != hash_password(password):
        return jsonify({"error":"invalid credentials"}), 401
    payload = {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)}
    token = jwt.encode(payload, current_app.config.get("JWT_SECRET", "jwt-secret"), algorithm="HS256")
    return jsonify({"token": token})

def auth_required(fn):
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization","")
        if not auth.startswith("Bearer "):
            return jsonify({"error":"missing token"}), 401
        token = auth.split(" ",1)[1]
        try:
            data = jwt.decode(token, current_app.config.get("JWT_SECRET","jwt-secret"), algorithms=["HS256"])
            request.user_id = data["user_id"]
        except Exception as e:
            return jsonify({"error":"invalid token", "detail": str(e)}), 401
        return fn(*args, **kwargs)
    return wrapper

@bp.route("/portfolio", methods=["GET"])
@auth_required
def get_portfolio():
    session = Session()
    rows = session.query(Portfolio).filter_by(user_id=request.user_id).all()
    result = [{"id": r.id, "symbol": r.symbol, "quantity": r.quantity, "buy_price": r.buy_price} for r in rows]
    return jsonify(result)

@bp.route("/portfolio", methods=["POST"])
@auth_required
def add_portfolio():
    data = request.json
    symbol = data.get("symbol")
    quantity = float(data.get("quantity",0))
    buy_price = float(data.get("buy_price",0))
    session = Session()
    p = Portfolio(user_id=request.user_id, symbol=symbol.upper(), quantity=quantity, buy_price=buy_price)
    session.add(p)
    session.commit()
    return jsonify({"message":"added","id":p.id})

@bp.route("/portfolio/<int:pid>", methods=["DELETE"])
@auth_required
def delete_portfolio(pid):
    session = Session()
    p = session.query(Portfolio).filter_by(id=pid, user_id=request.user_id).first()
    if not p:
        return jsonify({"error":"not found"}), 404
    session.delete(p)
    session.commit()
    return jsonify({"message":"deleted"})
