import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteAccount(e){
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data(object)
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted mb-0">
              Welcome <Link className="text-info" to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="mb-5">
              <button onClick={this.onDeleteAccount.bind(this)} className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        );
      } else {
        // user logged in has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted mb-0">Welcome {user.name}</p>
            <p>You have not yet setup your profile. Please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <h1 className="display-4">Dashboard</h1>
          {dashboardContent}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);