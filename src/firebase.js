import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyCqjR15XKYnKC8FZdfLSrkWdWqbVxldn4A",
  authDomain: "think-piece-9c32b.firebaseapp.com",
  databaseURL: "https://think-piece-9c32b.firebaseio.com",
  projectId: "think-piece-9c32b",
  storageBucket: "think-piece-9c32b.appspot.com",
  messagingSenderId: "717888754061",
  appId: "1:717888754061:web:b530287d22e5c98fdf2dc4"
};

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()

window.firebase = firebase

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`)

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user', error.message)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid)
  } catch (error) {
    console.error('Error fetching user', error.message)
  }
}

export default firebase