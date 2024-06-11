import { collection, query, where, onSnapshot } from 'firebase/firestore';

const getAddressData = async (db, user, setAddressData) => {
    if (!user) {
        setAddressData([]);
        return;
    }
    try {
        if (!db) {
            console.error('Firestore is not initialized.');
            return;
        }
        const addressRef = collection(db, 'addresses');
        if (!addressRef) {
            console.error('Address collection does not exist.');
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
                setAddressData(Addresses);
            } else {
                setAddressData([]);
            }
        });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
};

export default getAddressData;