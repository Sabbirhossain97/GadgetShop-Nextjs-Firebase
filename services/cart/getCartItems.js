import { collection, query, where, onSnapshot } from 'firebase/firestore';

const getCartItems = async (db, user, setCartItems) => {
    if (!user) {
        setCartItems([]);
        return;
    }
    try {
        if (!db) {
            console.error('Firestore is not initialized.');
            return;
        }
        const cartRef = collection(db, 'carts');
        if (!cartRef) {
            console.error('cart collection does not exist.');
            return;
        }
        const q = query(cartRef, where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
            const cartData = [];
            snapshot.forEach((doc) => {
                cartData.push({ id: doc.id, ...doc.data() });
            });
            if (cartData.length > 0) {
                const { Cart } = cartData?.[0];
                setCartItems(Cart);
            } else {
                setCartItems([]);
            }
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

export default getCartItems;