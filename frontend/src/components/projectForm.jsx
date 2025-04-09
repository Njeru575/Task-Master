
// Quick form component I made for creating new projects


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';  // love formik for forms
import * as Yup from 'yup';  // yup makes validation way easier than doing it manually

const ProjectForm = ({ onSubmit }) => {
    // default empty values - might need to add more fields later
    const defaultVals = {
        title: '',
        description: '',
        
    };

    // basic validation rules - keeping it simple for now
    const validateSchema = Yup.object({
        title: Yup.string()
            .required('Come on, you need a title!😉'),
        description: Yup.string()
            .required('Please add some details about your project'),
    });

    // main form render
    return (
        <Formik
            initialValues={defaultVals}
            validationSchema={validateSchema}
            onSubmit={(data, { resetForm }) => {
                // send data up to parent component
                onSubmit(data);
                resetForm();  // clear form after submit
            }}
        >
            {/* had to use render prop pattern here because formik needs it  */}
            {(_formikProps) => (
                <Form className="project-form">  {/* added className for styling */}
                    <div className="form-group">
                        <label htmlFor="title">Project Title</label>
                        <Field 
                            name="title" 
                            type="text"
                            className="form-control"  // bootstrap classes
                        />
                        <ErrorMessage 
                            name="title" 
                            component="div" 
                            className="error-msg"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Project Details</label>
                        <Field 
                            name="description" 
                            as="textarea"
                            rows="4"  // makes textarea bigger
                            className="form-control"
                        />
                        <ErrorMessage 
                            name="description" 
                            component="div" 
                            className="error-msg" 
                        />
                    </div>

                    {/* style this button better */}
                    <button 
                        type="submit" 
                        className="btn btn-primary mt-3" // margin top 3 -kaspace above button
                    >
                        Create New Project
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProjectForm;

// Note to Valerie: Style error messages better!😹
