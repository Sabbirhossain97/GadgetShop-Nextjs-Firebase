import { db } from "../firebase";
import { addDoc, collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
import { message } from "antd";

const addNewAddress = async (user, address, router) => {
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
            if (!existingAddressData.Addresses.some(addressItem => addressItem.id === address.id)) {
                const updatedAddress = [...existingAddressData.Addresses, address];
                try {
                    await updateDoc(existingAddressRef, { Addresses: updatedAddress });
                    message.success('Address added successfully!');
                } catch (error) {
                    message.error('Error adding address:', error);
                }
            }
        });
    } else {
        const payload = {
            Addresses: [address],
            username: user.displayName,
            userId: user.uid
        };
        try {
            await addDoc(addressRef, payload);
            message.success('Address added successfully!');
        } catch (error) {
            message.error('Error adding address:', error);
        }
    }

}

export default addNewAddress;