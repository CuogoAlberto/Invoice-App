import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCve7ZcQLYi5rpDr9YVuTWRDfWEt97BsWg",
    authDomain: "invoice-app-d6716.firebaseapp.com",
    projectId: "invoice-app-d6716",
    storageBucket: "invoice-app-d6716.appspot.com",
    messagingSenderId: "716058560296",
    appId: "1:716058560296:web:641ed261d3ab706d6ab21d"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export default db