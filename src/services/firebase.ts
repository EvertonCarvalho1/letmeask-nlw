import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCvKxV5outcQ0WHAHKQdpTLlfb-UcmRM6k",
    authDomain: "letmeask-c9f00.firebaseapp.com",
    databaseURL: "https://letmeask-c9f00-default-rtdb.firebaseio.com",
    projectId: "letmeask-c9f00",
    storageBucket: "letmeask-c9f00.appspot.com",
    messagingSenderId: "912051906196",
    appId: "1:912051906196:web:848ee832c3a61b794c7681"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();