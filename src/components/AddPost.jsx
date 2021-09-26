import React, {Component} from 'react';
import {addPost} from '../actions/post/postActions';
import {connect} from 'react-redux';

class AddPost extends Component {
    constructor(props) {
      super(props);

       this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
       this.savePost = this.savePost.bind(this);
       this.newPost = this.newPost.bind(this);
  
      this.state = {
        id: null,
        title: "",
        description: "",
        published: false,
  
        submitted: false,
      };
    }
  
    onChangeTitle(e) {
      this.setState({
        title: e.target.value,
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value,
      });
    }

    handleChange = (e) =>{
        
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
  
    savePost() {
      const { title, description } = this.state;
      const objData = Object.assign({},this.state);
      this.props
        .addPost(objData)
        .then((data) => {            
          this.setState({
            id: data.id,
            title: data.title,
            description: data.description, 
            submitted: true,
          });
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    newPost() {
      this.setState({
        id: null,
        title: "",
        description: "",
        published: false,
  
        submitted: false,
      });
    }
  
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newPost}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                    name="title"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                    name="description"
                  />
                </div>
    
                <button onClick={this.savePost} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
  }



  export default connect(null,{addPost})(AddPost);