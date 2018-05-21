import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postAction";

class PostItem extends Component {
  onDelete(id) {
    this.props.deletePost(id);
  }

  onLike(id) {
    this.props.addLike(id);
  }

  onUnlike(id) {
    this.props.removeLike(id);
  }

  //   check if user liked posts
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2 m-auto">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt={post.name}
            />
          </div>
          <div className="col-md-10">
            <span class="text-muted">{post.name}</span>
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLike.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("text-secondary fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlike.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View Post
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDelete.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
