import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../Form.css';
class Form extends Component {
  state = {  }
  //editor handlechange function
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }


  render() { 
    return ( 
      
        <div className="form-style-5">
        <form>
        
        <fieldset>
          <legend><span>Feel free to discuss the problems!</span></legend>
        <legend><span className="number">1</span> Candidate Info</legend>
  
        <input type="text" name="name" placeholder="Your Name *" />
        <input type="email" name="email" placeholder="Your Email *" />
        <input type="text" name ="usn" placeholder="USN" />
        <label for="job">Category:</label>
        <select id="job" name="field4">
        
          <option value="department">Department</option>
          <option value="institute">Institute</option>
          <option value="university">University</option>
          
          
        
        </select>
        <label for="job">Sub-category:</label>
        <select id="job" name="field4">
          <option value="Admission">Admission</option>
          <option value="Finance">Finance</option>
          <option value="Examination">Examination</option>
          <option value="Paperreevaluation">Paper re-evaluation</option>
          <option value="Ragging">Ragging</option>
          <option value="Lecture">Lecture timetable/learning</option>
          
          
        </select>      
        </fieldset>
        <fieldset>
        <legend><span className="number">2</span> Problem info</legend>
        <Editor className="editor"
        apiKey='geoxjsm08zurahn4oana65mf4pcwnr4j8ntf0q1feee0mrbj'
           initialValue="<p></p>"
           init={{
             height: 500,
             menubar: false,
             plugins: [
               'advlist autolink lists link image charmap print preview anchor',
               'searchreplace visualblocks code fullscreen',
               'insertdatetime media table paste code help wordcount'
             ],
             toolbar:
               'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help'
           }}
           onEditorChange={this.handleEditorChange}
         />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        </div>
       
     
     );
  }
}
 
export default Form;