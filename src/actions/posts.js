import {Firebase, FirebaseRef} from '../lib/firebase';

export default function getPosts () {
  if (Firebase === null) return() => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef
      .child('posts')
      .on('value', (snapshot) => {
        const posts = snapshot.val() || [];
        return resolve (dispatch({
          type: 'POSTS_REPLACE',
          data: posts,
        }));
      })).catch(e => console.log(e));
}
