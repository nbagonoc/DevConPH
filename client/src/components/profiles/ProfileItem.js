import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2 d-none d-md-block m-auto">
              <img
                src={profile.user.avatar}
                alt={profile.user.name}
                className="rounded-circle"
              />
            </div>
            <div className="col-md-10 m-auto">
              <h3>{profile.user.name}</h3>
              <p>
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
              <p />
              <span>Skills: </span>
              {profile.skills.slice(0, 10).map((skill, index) => (
                <span key={index} className="badge badge-secondary mr-1">
                  {skill}
                </span>
              ))}
              <div className="mt-3">
                <Link
                  to={`/profile/${profile.handle}`}
                  className="btn btn-info"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
