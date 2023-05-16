import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const SignIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth ,currentUser=>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            if(currentUser && currentUser.email){
                const loggedUserEmail = {
                    email: currentUser.email
                  }
                fetch('https://car-doctor-server-nine-ivory.vercel.app/jwt', {
        method: 'POST',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(loggedUserEmail)
      })
      .then(res => res.json())
      .then(data => {
        console.log('jwt response', data)
        // set access tolet to local storage
        localStorage.setItem('car-access-token', data.token);
        
      })
            }
            else{
                localStorage.removeItem('car-access-token');
            }
        });
        return ()=>{
            return unsubscribe();
        }
    },[])
    const authInfo = {
        user, loading, createUser, SignIn, logOut, googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;