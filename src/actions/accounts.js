import { Firebase, FirebaseRef } from '../lib/firebase';

export default function getAccounts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef
    .child('accounts')
    .on('value', (snapshot) => {
      const accounts = snapshot.val() || [];

      return resolve(dispatch({
        type: 'ACCOUNTS_REPLACE',
        data: accounts,
      }));
    })).catch(e => console.log(e));
}
