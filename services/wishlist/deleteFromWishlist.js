import { db } from '../firebase';
import { collection, doc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

export const handleDeleteItem = async (user, wishlistItemId) => {
    if (!user) {
        return
    }
    try {
        const wishlistRef = collection(db, 'wishlists');
        const querySnapshot = await getDocs(query(wishlistRef, where('userId', '==', user.uid)));
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (wishlistDoc) => {
                const existingWishlistRef = doc(db, 'wishlists', wishlistDoc.id);
                const existingWishlistData = wishlistDoc.data();
                const filteredProducts = existingWishlistData.Products.filter((product) => product.id !== wishlistItemId);
                try {
                    await updateDoc(existingWishlistRef, { Products: filteredProducts });
                    message.success('Product deleted successfully');
                } catch (error) {
                    message.error('Error deleting product from wishlist',);
                }
            });
        } else {
            message.error('Wishlist document not found for the user!');
        }
    } catch (error) {
        message.error('Error removing product from wishlist');
    }
};