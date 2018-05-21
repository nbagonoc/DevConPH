import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCredentials extends Component {
  render() {
    const { experience, education } = this.props;

    // Experience
    const expItems = experience.map(exp => (
      <div key={exp._id} className="card mb-3">
        <div className="card-header">
          <h4>{exp.company}</h4>
        </div>
        <div className="card-body">
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {exp.title}
          </p>
          <p>
            {exp.location === "" ? null : (
              <span>
                <strong>Location: </strong> {exp.location}
              </span>
            )}
          </p>
          <p>
            {exp.description === "" ? null : (
              <span>
                <strong>Description: </strong> {exp.description}
              </span>
            )}
          </p>
        </div>
      </div>
    ));

    // Education
    const eduItems = education.map(edu => (
      <div key={edu._id} className="card mb-3">
        <div className="card-header">
          <h4>{edu.school}</h4>
        </div>
        <div className="card-body">
          <p>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree:</strong> {edu.degree}
          </p>
          <p>
            <strong>Field of Study:</strong> {edu.fieldofstudy}
          </p>
          <p>
            {edu.description === "" ? null : (
              <span>
                <strong>Description: </strong> {edu.description}
              </span>
            )}
          </p>
        </div>
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
              <div>
                { expItems }
              </div>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
              <div>
              { eduItems }
              </div>
          ) : (
            <p className="text-center">No education listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCredentials;
