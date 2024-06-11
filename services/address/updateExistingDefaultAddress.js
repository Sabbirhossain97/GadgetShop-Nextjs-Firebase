import { collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
import { message } from 'antd'
import { db } from "../firebase";

export const updateExistingDefaultAddress = async (userId) => {
    const addressRef = collection(db, 'addresses');
    const q = query(addressRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (addressDoc) => {
            const existingAddressRef = doc(db, 'addresses', addressDoc.id);
            const existingAddressData = addressDoc.data();
            let addressesUpdated = false;

            const updatedAddresses = existingAddressData.Addresses.map((address) => {
                if (address.isDefault === "yes") {
                    addressesUpdated = true;
                    return { ...address, isDefault: "no" };
                }
                return address;
            });

            if (addressesUpdated) {
                try {
                    await updateDoc(existingAddressRef, { Addresses: updatedAddresses });
                    message.success('Existing default address updated successfully!');
                } catch (error) {
                    message.error('Error updating default address:', error);
                }
            }
        });
    }
};