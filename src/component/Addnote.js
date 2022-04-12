import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const note = useContext(noteContext);
  const addNote = note.addNote

  const handleAddnote = (e) => {
    e.preventDefault();
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let tag = document.getElementById("tag");
    
    const newNote = {
      title:title.value,
      description:description.value,
      tag:tag.value
      };
    addNote(newNote);
    title.value = ""
    description.value = ""
    tag.value = "General"
  };
  return (
    <div className="container my-3">
      <h2>Create a note</h2>

      <form onSubmit={handleAddnote}>
        <div className="row">
          <div className="col-lg-4 col-sm-12 col-md-6 my-2">
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Title"
              minLength={3}
              required
            />
          </div>
          <div className="col-lg-4 col-sm-12 col-md-6 my-2">
            <input
              type="text"
              id="description"
              className="form-control"
              placeholder="Description"
              minLength={5}
              required
            />
          </div>
          <div className="col-lg-4 col-sm-12 col-md-12 my-2">
          <select
              id="tag"
              defaultValue="General"
              className="form-control"
              aria-label="Default select example"
            >
              <option value="General">Tag</option>
              <option value="General">General</option>
              <option value="Sports">Sports</option>
              <option value="Fun">Fun</option>
              <option value="Daily Life">Daily Life</option>
              <option value="Studies">Studies</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary my-3"
          
        >
          Add note
        </button>
      </form>
      <hr></hr>
    </div>
  );
};

export default Addnote;
