import { db } from "../firebase";
import { addDoc, collection, updateDoc, getDocs, query, where, doc } from "firebase/firestore";
// import { message } from "antd";

const addOrder = async (user, order) => {
 
    const orderRef = collection(db, 'orders');
    const querySnapshot = await getDocs(query(orderRef, where('userId', '==', user.uid)));
    if (!querySnapshot.empty) {
        querySnapshot.forEach(async (orderDoc) => {
            const existingOrdersRef = doc(db, 'orders', orderDoc.id);
            const existingOrderData = existingOrdersRef.data();
            if (!existingOrderData.orders.some(orderItem => orderItem.id === order.orderId)) {
                const updatedOrders = [...existingOrderData.orders, order];
                try {
                    await updateDoc(existingOrdersRef, { orders: updatedOrders });
                    // message.success('Product added to wishlist!');
                } catch (error) {
                    // message.error('Error adding product to wishlist:', error);
                }
            }
        });
    } else {
        const payload = {
            orders: [order],
            userId: user.uid
        };
        try {
            await addDoc(orderRef, payload);
            // message.success('Product added to wishlist!');
        } catch (error) {
            // message.error('Error adding product to wishlist:', error);
        }
    }

}

export default addOrder;