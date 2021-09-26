import postService from '../../services/postService';
import {ADD_POST, UPDATE_POST, GET_POSTS, DELETE_POST} from './postTypes';

export const getPosts = () => async (dispatch) => {
    try {
        debugger;
        var posts = await postService.getAll();

        dispatch({
            type: GET_POSTS,
            payload: posts.data
        });

        return Promise.resolve(posts.data);
    }
    catch (err) {
        return Promise.reject(err);
    };
}

export const addPost = (data) => async (dispatch) =>{
    try{

        const post = await postService.add(data);

        dispatch({
            type: ADD_POST,
            payload: post.data
        });

        return Promise.resolve(post.data);

    }
    catch(err){
        return Promise.reject(err);
    }
}

export const updatePost = (id,data) => async (dispatch) =>{
    try{

        const post = await postService.update(id,data);

        dispatch({
            type: UPDATE_POST,
            payload: post.data
        });

        return Promise.resolve(post.data);

    }
    catch(err){
        return Promise.reject(err);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try{

        const post = await postService.delete(id);

        dispatch({
            type: DELETE_POST,
            payload: post.data
        });

        return Promise.resolve(post.data);

    }
    catch(err){
        return Promise.reject(err);
    }
}

export const findPostByTitle = (title) => async (dispatch) => {
    try {
      const res = await postService.findByTitle(title);
  
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };