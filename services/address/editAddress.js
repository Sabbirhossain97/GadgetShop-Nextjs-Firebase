import { db } from "../firebase";
import { addDoc, collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
import { message } from "antd";

const editAddress = async (user, address, router) => {
    if (!user) {
        message.warning("Please Sign in!");
        setTimeout(() => {
            router.push("/Signin");
        }, 2000);
        return;
    }
    const addressRef = collection(db, 'addresses');
    const querySnapshot = await getDocs(query(addressRef, where('userId', '==', user.uid)));
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (addressDoc) => {
            const existingAddressRef = doc(db, 'addresses', addressDoc.id);
            const existingAddressData = addressDoc.data();
            const updatedAddresses = existingAddressData.Addresses.map(addressItem => {
                if (addressItem.id === address.id) {
                    return { ...addressItem, ...address };
                }
                return addressItem;
            });
            try {
                await updateDoc(existingAddressRef, { Addresses: updatedAddresses });
                message.success('Address updated successfully!');
            } catch (error) {
                message.error('Error updating address:', error);
            }
        });
    }
}

export default editAddress;