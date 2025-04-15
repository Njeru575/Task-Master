from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class TaskAssignment(db.Model):
    __tablename__ = 'task_assignments'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id', ondelete="CASCADE"), primary_key=True)
    estimated_hours = db.Column(db.Float, nullable=False)

    user = db.relationship('User', backref=db.backref('assignments', passive_deletes=True), overlaps="tasks,assigned_users")
    task = db.relationship('Task', backref=db.backref('task_assignments', passive_deletes=True), overlaps="assigned_users,tasks")


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    projects = db.relationship('Project', backref='creator', lazy=True, cascade="all, delete-orphan")

    tasks = db.relationship(
        'Task',
        secondary='task_assignments',
        backref=db.backref('assigned_users', lazy='dynamic', overlaps="task_assignments,assignments"),
        lazy='dynamic',
        overlaps="assignments,task_assignments"
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # ✅ Cascade delete: when a project is deleted, delete its tasks too
    tasks = db.relationship(
        'Task',
        backref='project',
        lazy=True,
        cascade="all, delete-orphan"
    )


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(50), default='Pending')
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    # 🔄 Relationship with TaskAssignment already defined through `task_assignments`

