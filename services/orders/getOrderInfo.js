import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getOrderInfo = async (user, setOrderInfo, oid) => {
    if (!user) {
        setOrderInfo(null)
        return
    }
    try {
        if (!db) {
            console.error('Firestore is not initialized.');
            return;
        }
        const orderRef = collection(db, 'orders');
        if (!orderRef) {
            console.error('Order does not exist.');
            return;
        }
        const q = query(orderRef, where('userId', '==', user.uid));
        onSnapshot(q, (snapshot) => {
            const orderData = [];
            snapshot.forEach((doc) => {
                orderData.push({ id: doc.id, ...doc.data() });
            });
            if (orderData.length > 0) {
                const { orders } = orderData?.[0];
                const [currentOrderInfo] = orders.filter((item) => item.orderId === oid);
                setOrderInfo(currentOrderInfo)

            } else {
                setOrderInfo(null)
            }
        });
    } catch (error) {
        console.error('Error fetching Orders:', error);
    }
};