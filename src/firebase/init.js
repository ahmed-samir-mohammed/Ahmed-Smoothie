import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyChit7NHkpucSh5mTac85zmFoKsxvAwYxU",
    authDomain: "ahmed-smoothies.firebaseapp.com",
    databaseURL: "https://ahmed-smoothies.firebaseio.com",
    projectId: "ahmed-smoothies",
    storageBucket: "ahmed-smoothies.appspot.com",
    messagingSenderId: "1040793174002",
    appId: "1:1040793174002:web:650fe4a239917f82f8b56b"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// Export Firebase Database
export default firebaseApp.firestore()