import { collection, query, where, onSnapshot } from 'firebase/firestore';

const getWishlistData = async (db, user, setWishlist) => {
    if (!user) {
        setWishlist([]);
        return;
    }
    try {
        if (!db) {
            console.error('Firestore is not initialized.');
            return;
        }
        const wishlistRef = collection(db, 'wishlists');
        if (!wishlistRef) {
            console.error('Wishlist collection does not exist.');
            return;
        }
        const q = query(wishlistRef, where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
            const wishlistData = [];
            snapshot.forEach((doc) => {
                wishlistData.push({ id: doc.id, ...doc.data() });
            });
            if (wishlistData.length > 0) {
                const { Products } = wishlistData?.[0];
                setWishlist(Products);
            } else {
                setWishlist([]);
            }
        });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
};

export default getWishlistData;