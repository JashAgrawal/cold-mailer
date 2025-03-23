import { db } from "@/config/firebase-admin";
import { ISender } from "@/components/sender/type";

const COLLECTION_NAME = "senders";
const sendersCollection = db.collection(COLLECTION_NAME);

// Create a new sender
export const createSender = async (sender: Omit<ISender, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newSender = {
        ...sender,
        createdAt: now,
        updatedAt: now
    };
    const docRef = await sendersCollection.add(newSender);
    return { id: docRef.id, ...newSender };
};

// Get all senders for a user
export const getSendersByUserId = async (userId: string): Promise<ISender[]> => {
    const snapshot = await sendersCollection.where("userId", "==", userId).get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as ISender));
};

// Update a sender
export const updateSender = async (id: string, updates: Partial<Omit<ISender, "id" | "createdAt" | "updatedAt">>): Promise<void> => {
    const senderRef = sendersCollection.doc(id);
    await senderRef.update({
        ...updates,
        updatedAt: new Date().toISOString()
    });
};

// Delete a sender
export const deleteSender = async (id: string): Promise<void> => {
    const senderRef = sendersCollection.doc(id);
    await senderRef.delete();
};