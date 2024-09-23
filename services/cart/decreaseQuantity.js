import { db } from '../firebase';
import { collection, doc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

export const decreaseQuantity = async (user, cartItemId) => {
    if (!user) {
        return
    }
    try {
        const cartRef = collection(db, 'carts');
        const querySnapshot = await getDocs(query(cartRef, where('userId', '==', user.uid)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (cartDoc) => {
                const existingCartRef = doc(db, 'carts', cartDoc.id);
                const existingCartData = cartDoc.data();
                const updatedQuantity = existingCartData.Cart.map((item) =>
                    item.id === cartItemId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                try {
                    await updateDoc(existingCartRef, { Cart: updatedQuantity });
                } catch (error) {
                    message.error('Error updating quantity of cart item',);
                }
            });
        } else {
            message.error('Cart document not found for the user!');
        }
    } catch (error) {
        message.error('Error updating cart quantity!');
    }
};