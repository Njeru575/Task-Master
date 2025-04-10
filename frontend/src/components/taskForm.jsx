import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TaskForm = ({ projectId, onTaskCreated }) => {
    // form submission
    const handleSubmit = async (values, { resetForm }) => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create task');
        }
        const newTask = await response.json();
        onTaskCreated(newTask); // notifys parent component
        resetForm(); // clears the form
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };
}