import { db } from "../firebase";
import { addDoc, collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
import { message } from "antd";

const addToWishlist = async (user, product, router) => {
    if (!user) {
        message.warning("Please Sign in!");
        setTimeout(() => {
            router.push("/Signin");
        }, 2000);
        return;
    }
    const wishlistRef = collection(db, 'wishlists');
    const querySnapshot = await getDocs(query(wishlistRef, where('userId', '==', user.uid)));
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (wishlistDoc) => {
            const existingWishlistRef = doc(db, 'wishlists', wishlistDoc.id);
            const existingWishlistData = wishlistDoc.data();
            if (!existingWishlistData.Products.some(productItem => productItem.id === product.id)) {
                const updatedProducts = [...existingWishlistData.Products, product];
                try {
                    await updateDoc(existingWishlistRef, { Products: updatedProducts });
                    message.success('Product added to wishlist!');
                } catch (error) {
                    message.error('Error adding product to wishlist:', error);
                }
            }
        });
    } else {
        const payload = {
            Products: [product],
            username: user.displayName,
            userId: user.uid
        };
        try {
            await addDoc(wishlistRef, payload);
            message.success('Product added to wishlist!');
        } catch (error) {
            message.error('Error adding product to wishlist:', error);
        }
    }

}

export default addToWishlist;