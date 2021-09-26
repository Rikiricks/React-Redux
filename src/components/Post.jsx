import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost, deletePost } from "../actions/post/postActions";
import postService from "../services/postService";

class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTutorial = this.removeTutorial.bind(this);

    this.state = {
      currentPost: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
        currentPost: {
        ...prevState.currentPost,
        description: description,
      },
    }));
  }

  getPost(id) {
    postService.get(id)
      .then((response) => {
        this.setState({
            currentPost: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentPost.id,
      title: this.state.currentPost.title,
      description: this.state.currentPost.description,
      //published: status,
    };

    this.props
      .updatePost(this.state.currentPost.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
            currentPost: {
            ...prevState.currentPost,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
      let data = Object.assign({}, this.state.currentPost)
    this.props
      .updatePost(this.state.currentPost.id, this.state.currentPost)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The post was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeTutorial() {
    this.props
      .deletePost(this.state.currentPost.id)
      .then(() => {
        this.props.history.push("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPost.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPost.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatePost, deletePost })(Post);