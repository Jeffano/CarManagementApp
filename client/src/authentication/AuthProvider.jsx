import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Function to handle user sign in
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Function to handle user sign out
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signOutUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;