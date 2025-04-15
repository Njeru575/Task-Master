
// Quick form component I made for creating new projects


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProjectForm = ({ onSubmit, initialValues, isEditing = false, onCancel }) => {
  const defaultVals = {
    title: '',
    description: '',
  };

  const validateSchema = Yup.object({
    title: Yup.string().required('Come on, you need a title! 😉'),
    description: Yup.string().required('Please add some details about your project'),
  });

  return (
    <Formik
      initialValues={initialValues || defaultVals}
      enableReinitialize={true}
      validationSchema={validateSchema}
      onSubmit={(data, { resetForm }) => {
        const payload = isEditing ? { ...initialValues, ...data } : data;
        onSubmit(payload);
        resetForm();
      }}
    >
      {() => (
        <Form className="project-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className="form-control" />
            <ErrorMessage name="title" component="div" className="error-msg" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" rows="4" className="form-control" />
            <ErrorMessage name="description" component="div" className="error-msg" />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            {isEditing ? 'Update Project' : 'Create New Project'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary mt-3 mx-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;


// Note to Vall: Style error messages better!😹

