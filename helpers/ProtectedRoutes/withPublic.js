import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../services/firebase';

const withPublic = (WrappedComponent) => {
    return (props) => {
        const [authenticated, setAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setAuthenticated(true);
                    router.replace('/');
                }
            });

            return () => unsubscribe();
        }, [router]);

        if (authenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withPublic;