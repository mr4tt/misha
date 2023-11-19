import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

/** @type {import('firebase/app').FirebaseOptions} */
const config = {
    // ...
    apiKey: 'AIzaSyBuyxUIkvRzk8zBzEzjgRc8nn19_PGQtC4',
    authDomain: 'misha-23f13.firebaseapp.com',
    projectId: 'misha-23f13',
    storageBucket: 'misha-23f13.appspot.com',
    messagingSenderId: '499886641911',
    appId: '1:499886641911:web:eb32d94a281222fbccb9f2',
    measurementId: 'G-FB3SB5D7H7',
}

const RTDB_URL = 'https://misha-23f13-default-rtdb.fiorebaseio.com'

/**
 * the firebase app
 */
export const app = initializeApp(config)

export function get_db() {
    return getDatabase(app)
}