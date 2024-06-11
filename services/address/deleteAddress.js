import { db } from '../firebase';
import { collection, doc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

export const handleDeleteAddress = async (user, addressid) => {
    if (!user) {
        return
    }
    try {
        const addressRef = collection(db, 'addresses');
        const querySnapshot = await getDocs(query(addressRef, where('userId', '==', user.uid)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (addressDoc) => {
                const existingAddressRef = doc(db, 'addresses', addressDoc.id);
                const existingAddressData = addressDoc.data();
                const filteredProducts = existingAddressData.Addresses.filter((address) => address.id !== addressid);
                try {
                    await updateDoc(existingAddressRef, { Addresses: filteredProducts });
                    message.success('Address deleted successfully');
                } catch (error) {
                    message.error('Error deleting address from list',);
                }
            });
        } else {
            message.error('Address document not found for the user!');
        }
    } catch (error) {
        message.error('Error removing address from list');
    }
};