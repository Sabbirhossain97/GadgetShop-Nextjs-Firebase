import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const getUserProvider = () => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const providerData = user.providerData;
                if (providerData.length > 0) {
                    resolve(providerData[0].providerId);
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    });
};