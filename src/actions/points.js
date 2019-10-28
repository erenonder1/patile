import { Firebase, FirebaseRef } from '../lib/firebase';

export function getPoints() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(async (resolve, reject) => {
    return FirebaseRef.child('users')
      .on('value', (snapshot) => {
        const points = [];
        console.log('action');
        console.log(snapshot);
        snapshot.forEach((user) => {
          points.push({ userName: user.val().firstName, highScore: user.val().patiPoints ? user.val().patiPoints : 0 });
        });
        return resolve(dispatch({
          type: 'LEADERBOARD_REPLACE',
          data: points,
        }));
      });
  }).catch(e => console.log(e));
}
