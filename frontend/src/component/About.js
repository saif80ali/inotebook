import React from "react";
import NoteBookScreenshot from "../asset/iNotebook-screenshot.png";
import LinkedinBadge from "./LinkedinBadge";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center py-5 bg-light">
        <div className="container">
          <h1>About iNotebook</h1>
          <p className="lead">
            Your ultimate digital notebook for organizing and managing your
            notes efficiently.
          </p>
        </div>
      </section>

      {/* About Content */}
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={NoteBookScreenshot}
              className="img-fluid"
              alt="iNotebook Screenshot"
            />
          </div>
          <div className="col-lg-6">
            <h2>Our Vision</h2>
            <p>
              iNotebook is built on the MERN stack and aims to provide a
              seamless experience for managing your notes online. Whether you're
              a student, a professional, or someone who loves to jot down ideas,
              iNotebook is designed to meet all your note-taking needs.
            </p>
            <h3>Key Features</h3>
            <ul>
              <li>Easy note creation and organization</li>
              <li>Rich text formatting</li>
              <li>All CRUD operations</li>
              <li>Flexible schema model </li>
              <li>Cross-device synchronization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}

      <LinkedinBadge></LinkedinBadge>
    </div>
  );
};

export default About;
