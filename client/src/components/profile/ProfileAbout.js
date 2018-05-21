import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // get 1st name
    const firstName = profile.user.name.trim().split(" ")[0];

    // skill list
    const skills = profile.skills.map((skill, index) => (
      <span key={index} className="badge badge-secondary mr-1">
        {skill}
      </span>
    ));

    return (
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {isEmpty(profile.bio) ? <span>{firstName} does not have a bio</span> : <span>{profile.bio}</span>}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
            {skills}
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
