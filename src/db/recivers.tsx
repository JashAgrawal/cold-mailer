import { collection, addDoc, deleteDoc, doc, getDocs, query, where, getDoc,updateDoc } from 'firebase/firestore';
import { IReciver } from '../components/mailer/type';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'receivers';


// Create a new receiver
export const createReceiver = async (receiver: Omit<IReciver, 'id'>): Promise<IReciver> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), receiver);
  return { ...receiver, id: docRef.id };
};

// Get receivers by template ID
export const getReceiversByTemplate = async (templateId: string): Promise<IReciver[]> => {
  const q = query(collection(db, COLLECTION_NAME), where('templateId', '==', templateId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IReciver));
};

// Get reciver By ID
export const getReceiver = async (id: string): Promise<IReciver | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as IReciver;
  }
  return null;
};  

// Update a receiver
export const updateReceiver = async (id: string, data: Partial<IReciver>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

// Delete a receiver
export const deleteReceiver = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

// Update receiver status
export const updateReceiverStatus = async (id: string, status: IReciver['status']): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
};