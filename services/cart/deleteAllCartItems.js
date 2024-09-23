import { db } from '../firebase';
import { collection, doc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

export const clearCart = async (user) => {
    if (!user) {
        return
    }
    try {
        const cartRef = collection(db, 'carts');
        const querySnapshot = await getDocs(query(cartRef, where('userId', '==', user.uid)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (cartDoc) => {
                const existingCartRef = doc(db, 'carts', cartDoc.id);
                try {
                    await updateDoc(existingCartRef, { Cart: [] });
                    message.success('Cart is cleared!');
                } catch (error) {
                    message.error('Error clearing cart!',);
                }
            });
        } else {
            message.error('Cart document not found for the user!');
        }
    } catch (error) {
        message.error('Error clearing cart!');
    }
};