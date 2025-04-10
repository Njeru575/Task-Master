from app import create_app
from app import db
from models import User, Project, Task, TaskAssignment
from werkzeug.security import generate_password_hash
from datetime import date

app = create_app()

with app.app_context():
    # Recreate the database
    db.drop_all()
    db.create_all()

    # Create users
    user1 = User(
        username="alice",
        email="alice@example.com",
        password=generate_password_hash("password123")
    )
    user2 = User(
        username="bob",
        email="bob@example.com",
        password=generate_password_hash("password456")
    )
    user3 = User(
        username="carol",
        email="carol@example.com",
        password=generate_password_hash("pass789")
    )
    user4 = User(
        username="dave",
        email="dave@example.com",
        password=generate_password_hash("securepass")
    )

    db.session.add_all([user1, user2, user3, user4])
    db.session.commit()

    # Create projects
    project1 = Project(
        title="Website Redesign",
        description="Redesign the company website for mobile responsiveness.",
        creator=user1
    )
    project2 = Project(
        title="Marketing Campaign",
        description="Plan and launch the Q3 marketing campaign.",
        creator=user2
    )
    project3 = Project(
        title="Mobile App Development",
        description="Develop a mobile app for the internal HR system.",
        creator=user3
    )
    project4 = Project(
        title="Product Launch Plan",
        description="Outline the plan and content for the new product launch.",
        creator=user4
    )

    db.session.add_all([project1, project2, project3, project4])
    db.session.commit()

    # Create tasks
    task1 = Task(
        title="Create wireframes",
        description="Design low-fidelity wireframes for mobile view.",
        due_date=date(2025, 4, 15),
        project=project1
    )
    task2 = Task(
        title="Develop landing page",
        description="Implement landing page in React.",
        due_date=date(2025, 4, 20),
        project=project1
    )
    task3 = Task(
        title="Design email banners",
        description="Create banners for email blast.",
        due_date=date(2025, 4, 18),
        project=project2
    )
    task4 = Task(
        title="Set up authentication",
        description="Implement JWT auth in Flask backend.",
        due_date=date(2025, 4, 22),
        project=project3
    )
    task5 = Task(
        title="Create onboarding flow",
        description="Design the first-time user experience for mobile app.",
        due_date=date(2025, 4, 25),
        project=project3
    )
    task6 = Task(
        title="Write press release",
        description="Craft a press release for the new product.",
        due_date=date(2025, 4, 21),
        project=project4
    )
    task7 = Task(
        title="Design promotional graphics",
        description="Create visuals for launch across platforms.",
        due_date=date(2025, 4, 23),
        project=project4
    )

    db.session.add_all([task1, task2, task3, task4, task5, task6, task7])
    db.session.commit()

    # Assign tasks to users
    assignment1 = TaskAssignment(user=user1, task=task1, estimated_hours=5)
    assignment2 = TaskAssignment(user=user2, task=task2, estimated_hours=8)
    assignment3 = TaskAssignment(user=user1, task=task3, estimated_hours=4)
    assignment4 = TaskAssignment(user=user3, task=task4, estimated_hours=6)
    assignment5 = TaskAssignment(user=user3, task=task5, estimated_hours=7)
    assignment6 = TaskAssignment(user=user4, task=task6, estimated_hours=3)
    assignment7 = TaskAssignment(user=user4, task=task7, estimated_hours=5)

    db.session.add_all([assignment1, assignment2, assignment3, assignment4, assignment5, assignment6, assignment7])
    db.session.commit()

    print("Database is seeded successfully!")




