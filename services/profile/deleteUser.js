import { db } from "../firebase";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { message } from "antd";

async function getUserDocIdByUid(uid) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    let docId = null;
    querySnapshot.forEach((doc) => {
        docId = doc.id;  
    });
    return docId;
}

export async function deleteUserData(userId) {
    try {
        const userDocId = await getUserDocIdByUid(userId);
        if (userDocId) {
            const userDocRef = doc(db, 'users', userDocId);
            await deleteDoc(userDocRef);
            message.success('Account Deleted Successfully!')
        } else {
            console.error('No user document found with the provided UID.');
        }
    } catch (error) {
        console.error('Error deleting user data:', error.code, error.message);
    }
}