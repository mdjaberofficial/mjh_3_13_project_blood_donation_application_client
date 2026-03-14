import { useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile 
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';
import axios from 'axios'; // 👈 Make sure to import axios

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            // --- 🚀 JWT IMPLEMENTATION 🚀 ---
            if (currentUser) {
                // Get token and store in local storage
                const userInfo = { email: currentUser.email };
                axios.post('https://mjh-3-13-project-blood-donation-app.vercel.app/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false); // Stop loading ONLY after token is saved
                        }
                    })
            } else {
                // Remove token if user is logged out
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
            console.log('Current user state:', currentUser?.email);
        });

        return () => {
            return unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;