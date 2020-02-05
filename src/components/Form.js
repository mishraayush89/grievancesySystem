import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Formik } from "formik";
import {
  createGrievance
} from "./firebase/FirebaseUitls";
import "../Form.css";
class Form extends Component {
  state = {};

  render() {
    return (
      <Formik
        initialValues={{
          message: "",
          name: "",
          usn: "",
          category: "department",
          subcategory: "finance"
        }}
        validate={values => {
          const errors = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const error = {};
          setSubmitting(true);
          await createGrievance(values)
            .catch(err => {
              alert(err);
            })
            .then(() => {

            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
          /* and other goodies */
        }) => (
          <div className="form-style-5">
            <form>
              <fieldset>
                <legend>
                  <span>Feel free to discuss the problems!</span>
                </legend>
                <legend>
                  <span className="number">1</span> Candidate Info
                </legend>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && errors.name}
                <input
                  type="text"
                  name="usn"
                  placeholder="USN"
                  value={values.usn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.usn && touched.usn && errors.usn}
                <label htmlFor="job">Category:</label>
                <select
                  id="job"
                  name="field4"
                  value={values.category}
                  onChange={e => {
                    setFieldValue("category", e.target.value);
                  }}
                >
                  <option value="department">Department</option>
                  <option value="institute">Institute</option>
                  <option value="university">University</option>
                </select>
                {errors.category && touched.category && errors.category}
                <label htmlFor="job">Sub-category:</label>
                <select
                  id="job"
                  name="field4"
                  value={values.subcategory}
                  onChange={e => setFieldValue("subcategory", e.target.value)}
                >
                  <option value="admission">Admission</option>
                  <option value="finance">Finance</option>
                  <option value="examination">Examination</option>
                  <option value="paperreevaluation">Paper re-evaluation</option>
                  <option value="ragging">Ragging</option>
                  <option value="lecture">Lecture timetable/learning</option>
                </select>
                {errors.subcategory &&
                  touched.subcategory &&
                  errors.subcategory}
              </fieldset>
              <fieldset>
                <legend>
                  <span className="number">2</span> Problem info
                </legend>
                <Editor
                  className="editor"
                  apiKey="geoxjsm08zurahn4oana65mf4pcwnr4j8ntf0q1feee0mrbj"
                  initialValue="<p></p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount"
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help"
                  }}
                  onEditorChange={(content, editor) => {
                    setFieldValue("message", content);
                  }}
                />
              </fieldset>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={e => {
                  handleSubmit(e);
                }}
              >
                Apply
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
  }
}

export default Form;
