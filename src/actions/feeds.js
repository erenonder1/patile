import ErrorMessages from '../constants/errors';
import { Firebase, FirebaseRef } from '../lib/firebase';

export function addFeed(formData) {
  const {
    grams,
    latitude,
    longitude,
  } = formData;

  return () => new Promise(async (resolve, reject) => {
    // Kullanıcıyı doğrula
    const UID = Firebase.auth().currentUser && Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingLogin });

    // Form Doğrulamaları

    if (!grams) {
      console.log('gram bulunamadı');
      return reject({ message: ErrorMessages.missingGrams });
    }

    if (!latitude) {
      console.log('latitude bulunamadı');
      return reject({ message: ErrorMessages.missingFeed });
    }
    if (!longitude) {
      console.log('longitude bulunamadı');
      return reject({ message: ErrorMessages.missingFeed });
    }

    const increase = 10;
    FirebaseRef.child(`users/${UID}`).child('patiPoints').transaction(function(patiPoints) {
      if (patiPoints) {
        patiPoints = patiPoints + increase;
      }
      return (patiPoints || increase);
    });

    return FirebaseRef.child('feeds')
      .push({
        user: UID,
        grams,
        latitude,
        longitude,
        time: new Date().getTime(),
      })
      .then((data) => { resolve({feed: data.key}) });
  }).catch((err) => {
    throw err.message;
  });
}

export function getFeeds() {
  console.log("action: yem noktaları alınıyor");
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(async (resolve, reject) => {
    // Kullanıcıyı doğrula
    const UID = Firebase.auth().currentUser && Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingLogin });

    return FirebaseRef.child('feeds')
      .on('value', (snapshot) => {
        const feeds = [];
        snapshot.forEach((feed) => {
          feeds.push(feed.val());
        });
        console.log("action: yemler alındı");
        console.log(feeds);
        return resolve(dispatch({
          type: 'FEEDS_REPLACE',
          data: feeds,
        }));
      });
  }).catch(e => console.log(e));
}
