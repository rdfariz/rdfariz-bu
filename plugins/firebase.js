import app from 'firebase'
import 'firebase/app'
import 'firebase/firestore'

try {
  const config = {
    apiKey: 'AIzaSyDyfOiP4muV38cWTPoq3ztHM6eLctsSIRI',
    authDomain: 'rdfariz-data.firebaseapp.com',
    databaseURL: 'https://rdfariz-data.firebaseio.com',
    projectId: 'rdfariz-data',
    storageBucket: 'rdfariz-data.appspot.com',
    messagingSenderId: '418992693682',
    appId: '1:418992693682:web:89692e4085ca9198ad04ab',
    measurementId: 'G-VGGY9XM72G'
  }
  app.initializeApp(config)
} catch (err) {
}

export const firebase = app
export const firestore = app.firestore()
