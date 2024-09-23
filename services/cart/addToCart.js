import { db } from "../firebase";
import { addDoc, collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
import { message } from "antd";

const addToCart = async (setIsCartSidebarOpen, user, product, router) => {
    if (!user) {
        message.warning("Please Sign in!");
        setTimeout(() => {
            router.push("/Signin");
        }, 2000);
        return;
    }
    const cartRef = collection(db, 'carts');
    const querySnapshot = await getDocs(query(cartRef, where('userId', '==', user.uid)));
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (cartDoc) => {
            const existingCartRef = doc(db, 'carts', cartDoc.id);
            const existingCartData = cartDoc.data();
            if (!existingCartData.Cart.some(cartItem => cartItem.id === product.id)) {
                const updatedCart = [...existingCartData.Cart, product];
                try {
                    await updateDoc(existingCartRef, { Cart: updatedCart });
                    message.success('Product added to cart!');
                    setIsCartSidebarOpen(true)
                } catch (error) {
                    message.error('Error adding product to cart:', error);
                }
            } else {
                message.warning('Product already in the cart!');
            }
        });
    } else {
        const payload = {
            Cart: [product],
            username: user.displayName,
            userId: user.uid
        };
        try {
            await addDoc(cartRef, payload);
            message.success('Product added to cart!');
        } catch (error) {
            message.error('Error adding product to cart:', error);
        }
    }

}

export default addToCart;