import { useEffect, useState } from 'react';

const CLIENT_ID = '214199973499-9eg3n87ctp152r9q0cg51eelusrk5tc8.apps.googleusercontent.com'; // Replace with your Google Client ID
const SCOPE = 'mayank3290@gmail.com';

const useGoogleSSO = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadGoogleAPI = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: CLIENT_ID,
                    scope: SCOPE,
                }).then(() => {
                    const authInstance = window.gapi.auth2.getAuthInstance();
                    if (authInstance.isSignedIn.get()) {
                        setUser(authInstance.currentUser.get().getBasicProfile());
                    }
                });
            });
        };

        loadGoogleAPI();
    }, []);

    const login = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signIn().then((googleUser) => {
            setUser(googleUser.getBasicProfile());
        }).catch((err) => {
            setError(err);
        });
    };

    const logout = () => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signOut().then(() => {
            setUser(null);
        }).catch((err) => {
            setError(err);
        });
    };

    return { user, error, login, logout };
};

export default useGoogleSSO;