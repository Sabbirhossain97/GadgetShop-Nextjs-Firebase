import { db } from '../firebase';
import { collection, doc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

export const deleteCartItem = async (user, cartItemId) => {
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
                const filteredProducts = existingCartData.Cart.filter((cart) => cart.id !== cartItemId);
                try {
                    await updateDoc(existingCartRef, { Cart: filteredProducts });
                    message.success('Cart item deleted successfully!');
                } catch (error) {
                    message.error('Error deleting cart item',);
                }
            });
        } else {
            message.error('Cart document not found for the user!');
        }
    } catch (error) {
        message.error('Error removing cart!');
    }
};