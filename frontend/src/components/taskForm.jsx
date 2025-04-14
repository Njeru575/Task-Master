import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ projectId, onTaskCreated }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, project_id: projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      onTaskCreated(newTask);
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(4, 'Title must be at least 4 characters'),
    due_date: Yup.date()
      .required('Due date is required')
      .min(new Date(), 'Due date cannot be in the past'),
    description: Yup.string()
      .required('Please add a description for the task'),
  });

  return (
    <div>
      <h3>Add New Task</h3>
      <Formik
        initialValues={{
          title: '',
          description: '',
          due_date: '',
          status: 'To Do',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {/* Title Input */}
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" placeholder="Enter task title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" placeholder="Enter task details" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          {/* Due Date Input */}
          <div>
            <label htmlFor="due_date">Due Date</label>
            <Field name="due_date" type="date" />
            <ErrorMessage name="due_date" component="div" className="error" />
          </div>

          {/* Status Dropdown */}
          <div>
            <label htmlFor="status">Status</label>
            <Field as="select" name="status">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Field>
          </div>

          {/* Submit Button */}
          <button type="submit">Create Task</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;