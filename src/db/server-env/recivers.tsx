import { IReciver } from '../../components/mailer/type';
import { db } from '../../config/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const COLLECTION_NAME = 'receivers';

// Get receivers by template ID
export const getReceiversByTemplate = async (templateId: string): Promise<IReciver[]> => {
  const querySnapshot = await db.collection(COLLECTION_NAME).where('templateId', '==', templateId).get();
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IReciver));
};

// Get reciver By ID
export const getReceiver = async (id: string): Promise<IReciver | null> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    return { ...docSnap.data(), id: docSnap.id } as IReciver;
  }
  return null;
};

// Update receiver status
export const updateReceiverStatus = async (id: string, status: string): Promise<void> => {
  await db.collection(COLLECTION_NAME).doc(id).update({ status });
};

// Update a receiver
export const updateReceiver = async (id: string, data: Partial<IReciver>): Promise<void> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  await docRef.update({
    ...data,
    updatedAt: Timestamp.now()
  });
};

