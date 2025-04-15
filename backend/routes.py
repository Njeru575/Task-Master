from flask import request, jsonify
from datetime import datetime

from extensions import db  
from models import User, Project, Task, TaskAssignment

def register_routes(app):

    @app.route('/')
    def home():
        return "Welcome to the Task Management API!"

    # ---------- User Routes ----------
    @app.route('/api/users/register', methods=['POST'])
    def register_user():
        data = request.json
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Missing fields.'}), 400

        existing_user = User.query.filter(
            (User.username == data['username']) | (User.email == data['email'])
        ).first()

        if existing_user:
            return jsonify({'message': 'User already exists.'}), 409

        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully.'}), 201

    @app.route('/api/users/login', methods=['POST'])
    def login_user():
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user and user.check_password(data['password']):
            return jsonify({'message': 'Login successful.', 'user_id': user.id}), 200
        return jsonify({'message': 'Invalid credentials.'}), 401

    @app.route('/api/users/<int:id>', methods=['GET'])
    def get_user(id):
        user = User.query.get_or_404(id)
        return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
    
    # ---------- Getting all users ----------
    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([{
            'id': u.id,
            'username': u.username,
            'email': u.email
        } for u in users])
    
    

    @app.route('/api/users/<int:id>', methods=['DELETE'])
    def delete_user(id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully.'})
    

    # ---------- Project Routes ----------
    @app.route('/api/projects', methods=['POST'])
    def create_project():
        data = request.json
        project = Project(title=data['title'], description=data['description'], user_id=data['user_id'])
        db.session.add(project)
        db.session.commit()
        return jsonify({'message': 'Project created successfully.'}), 201

    @app.route('/api/projects', methods=['GET'])
    def get_projects():
        projects = Project.query.all()
        return jsonify([{
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'user_id': p.user_id
        } for p in projects])

    @app.route('/api/projects/<int:id>', methods=['GET'])
    def get_project(id):
        project = Project.query.get_or_404(id)
        return jsonify({
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'user_id': project.user_id
        })

    @app.route('/api/projects/<int:id>', methods=['PUT'])
    def update_project(id):
        data = request.json
        project = Project.query.get_or_404(id)
        project.title = data.get('title', project.title)
        project.description = data.get('description', project.description)
        db.session.commit()
        return jsonify({'message': 'Project updated successfully.'})

    @app.route('/api/projects/<int:id>', methods=['DELETE'])
    def delete_project(id):
        project = Project.query.get_or_404(id)
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted successfully.'})

    # ---------- Task Routes ----------
    @app.route('/api/tasks', methods=['POST'])
    def create_task():
        data = request.json
        title = data.get('title')
        description = data.get('description')
        status = data.get('status', 'pending')
        project_id = data.get('project_id')
    
        due_date_str = data.get('due_date')
        due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date() if due_date_str else None

        new_task = Task(
            title=title,
            description=description,
            due_date=due_date,
            status=status,
            project_id=project_id
        )
    
        db.session.add(new_task)
        db.session.commit()
        return jsonify({
            'id': new_task.id,
            'title': new_task.title,
            'description': new_task.description,
            'due_date': new_task.due_date.isoformat() if new_task.due_date else None,
            'status': new_task.status,
            'project_id': new_task.project_id
        }), 201

    @app.route('/api/tasks', methods=['GET'])
    def get_tasks():
        tasks = Task.query.all()
        return jsonify([{
            'id': t.id,
            'title': t.title,
            'description': t.description,
            'due_date': t.due_date,
            'status': t.status,
            'project_id': t.project_id
        } for t in tasks])

    @app.route('/api/tasks/<int:id>', methods=['GET'])
    def get_task(id):
        task = Task.query.get_or_404(id)
        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'due_date': task.due_date,
            'status': task.status,
            'project_id': task.project_id
        })
    
    @app.route('/api/tasks/<int:id>', methods=['PUT'])
    def update_task(id):
        task = Task.query.get_or_404(id)
        data = request.json

        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.status = data.get('status', task.status)

        due_date_str = data.get('due_date')
        if due_date_str:
            task.due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

        db.session.commit()
        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'due_date': task.due_date.isoformat() if task.due_date else None,
            'status': task.status,
            'project_id': task.project_id
        })

    # ---------- TaskAssignment Routes ----------
    @app.route('/api/assignments', methods=['POST'])
    def assign_task():
        data = request.json
        assignment = TaskAssignment(
            user_id=data['user_id'],
            task_id=data['task_id'],
            estimated_hours=data['estimated_hours']
        )
        db.session.add(assignment)
        db.session.commit()
        return jsonify({'message': 'Task assigned successfully.'}), 201

    @app.route('/api/assignments', methods=['GET'])
    def get_assignments():
        assignments = TaskAssignment.query.all()
        return jsonify([{
            'user_id': a.user_id,
            'task_id': a.task_id,
            'estimated_hours': a.estimated_hours
        } for a in assignments])