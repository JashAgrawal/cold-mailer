import { db } from "@/config/firebase";
import { ISender } from "@/components/sender/type";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const COLLECTION_NAME = "senders";
const sendersCollection = collection(db, COLLECTION_NAME);

// Create a new sender
export const createSender = async (sender: Omit<ISender, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newSender = {
        ...sender,
        createdAt: now,
        updatedAt: now
    };
    const docRef = await addDoc(sendersCollection, newSender);
    return { id: docRef.id, ...newSender };
};

// Get all senders for a user
export const getSendersByUserId = async (userId: string): Promise<ISender[]> => {
    const q = query(sendersCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ISender));
};

// Update a sender
export const updateSender = async (id: string, updates: Partial<Omit<ISender, "id" | "createdAt" | "updatedAt">>): Promise<void> => {
    const senderRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(senderRef, {
        ...updates,
        updatedAt: new Date().toISOString()
    });
};

// Delete a sender
export const deleteSender = async (id: string): Promise<void> => {
    const senderRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(senderRef);
};