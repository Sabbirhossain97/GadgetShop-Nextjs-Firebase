import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getAddressInfo = async (user, setAddressInfo, addressId) => {
    if (!user) {
        setAddressInfo(null)
        return
    }
    try {
        if (!db) {
            console.error('Firestore is not initialized.');
            return;
        }
        const addressRef = collection(db, 'addresses');
        if (!addressRef) {
            console.error('Address does not exist.');
            return;
        }
        const q = query(addressRef, where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
            const addressData = [];
            snapshot.forEach((doc) => {
                addressData.push({ id: doc.id, ...doc.data() });
            });
            if (addressData.length > 0) {
                const { Addresses } = addressData?.[0];
                const [currentAddressInfo] = Addresses.filter((item) => item.id === addressId);
                setAddressInfo(currentAddressInfo)
            } else {
                setAddressInfo(null)
            }
        });
    } catch (error) {
        console.error('Error fetching Orders:', error);
    }
};