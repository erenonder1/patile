import Store from '../store/posts';


export const initialState = Store;

export default function postsReducer(state = initialState, action) {

  switch (action.type) {
    case'POSTS_REPLACE': {

      return{
        ...state,
        posts: action.data,
      }
    }
    default:
      return state;
  }
}
