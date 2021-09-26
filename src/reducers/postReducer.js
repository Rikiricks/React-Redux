import {ADD_POST,UPDATE_POST,GET_POSTS,DELETE_POST} from '../actions/post/postTypes';

const initialState = [];

function postReducer(state = initialState, action){
    const {type,payload} = action;
    switch(type){

        case GET_POSTS:
            return payload;
           
        case ADD_POST:
            return [...state, payload ];

        case UPDATE_POST:{
        debugger;
        let index = state.findIndex(s=>s.id == payload.id);
        let newData = [...state];
        newData[index] = payload;
        
        return {...state,...newData};
        }

        case DELETE_POST:
            return state.filter(({id})=> id !== payload.id );

        default:
            return state;
    }
}

export default postReducer;