import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ projectId, onTaskCreated, taskToEdit, onTaskUpdated }) => {
  const isEditing = !!taskToEdit;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const url = isEditing
        ? `http://localhost:5000/api/tasks/${taskToEdit.id}`
        : `http://localhost:5000/api/tasks`;

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, project_id: projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const task = await response.json();

      if (isEditing) {
        onTaskUpdated(task);
      } else {
        onTaskCreated(task);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').min(4, 'Minimum 4 characters'),
    due_date: Yup.date().required('Due date is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <div>
      <h3>{isEditing ? 'Update Task' : 'Add New Task'}</h3>
      <Formik
        enableReinitialize
        initialValues={{
          title: taskToEdit?.title || '',
          description: taskToEdit?.description || '',
          due_date: taskToEdit?.due_date?.slice(0, 10) || '',
          status: taskToEdit?.status || 'To Do',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" placeholder="Enter task title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="due_date">Due Date</label>
            <Field name="due_date" type="date" />
            <ErrorMessage name="due_date" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <Field as="select" name="status">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Due date">Due Date</option>
              <option value="Done">Done</option>
            </Field>
          </div>

          <button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;