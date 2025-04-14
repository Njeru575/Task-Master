from flask import Flask
from flask_cors import CORS
from extensions import db, migrate  # Import from extensions

def create_app():
    app = Flask(_name_)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskmaster.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key'

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # Register routes
    from routes import register_routes
    register_routes(app)

    return app

if _name_ == '_main_':
    app = create_app()
    app.run(debug=True)