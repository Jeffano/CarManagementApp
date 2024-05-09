import React, { createContext, useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import app from "../firebase/firebase.config"

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    // Function to handle user sign in
    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    // Function to handle user sign out
    const signOutUser = () => {
        signOut(auth)
        .then(() => {
            setUser(null);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
