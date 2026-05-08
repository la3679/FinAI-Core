import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';

export const getTransactions = (userId: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, `users/${userId}/transactions`),
    orderBy('date', 'desc'),
    limit(100)
  );
  
  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(transactions);
  }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/transactions`));
};

export const getAccounts = (userId: string, callback: (data: any[]) => void) => {
  const q = collection(db, `users/${userId}/accounts`);
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${userId}/accounts`));
};

export const getBehavioralProfile = (userId: string, callback: (data: any) => void) => {
  const docRef = doc(db, `users/${userId}/behavioral_profile/main`);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() });
    } else {
      callback(null);
    }
  }, (err) => handleFirestoreError(err, OperationType.GET, `users/${userId}/behavioral_profile/main`));
};

export const addTransaction = async (userId: string, transaction: any) => {
  const path = `users/${userId}/transactions`;
  try {
    return await addDoc(collection(db, path), {
      ...transaction,
      createdAt: Timestamp.now()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
};
