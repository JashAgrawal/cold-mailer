import { IEmailTemplate } from '../../components/email/type';
import { db } from '../../config/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const COLLECTION_NAME = 'templates';
  
  // Get a single template
  export const getTemplate = async (id: string): Promise<IEmailTemplate | null> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return { ...docSnap.data(), id: docSnap.id } as IEmailTemplate;
    }
    return null;
  };
  
  // Update a template
  export const updateTemplate = async (id: string, data: Partial<IEmailTemplate>): Promise<void> => {
    console.log(id,data)
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    await docRef.set({
      ...data,
      updatedAt: Timestamp.now()
    });
  };
  
  // Update template stats
  export const updateTemplateStats = async (id: string, membersCount?: number, mailsSent?: number): Promise<void> => {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const updates: { membersCount?: number; mailsSent?: number } = {};
    
    if (membersCount !== undefined) updates.membersCount = membersCount;
    if (mailsSent !== undefined) updates.mailsSent = mailsSent;
    
    if (Object.keys(updates).length > 0) {
      await docRef.update(updates);
    }
  };

  // Get templates by user
  export const getTemplatesByUser = async (userId: string): Promise<IEmailTemplate[]> => {
    const query = db.collection(COLLECTION_NAME).where('userId', '==', userId);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IEmailTemplate[];
  };