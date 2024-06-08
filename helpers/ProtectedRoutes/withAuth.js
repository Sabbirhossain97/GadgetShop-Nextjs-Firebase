import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../services/firebase';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setAuthenticated(true);
                } else {
                    router.replace('/Signin');
                }
            });

            return () => unsubscribe();
        }, [router]);

        if (!authenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;