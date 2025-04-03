import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { IEmailTemplate } from "../components/email/type";
import { db } from "../config/firebase";

const COLLECTION_NAME = "emailTemplates";

// Create a new email template
export const createTemplate = async (
  template: Omit<IEmailTemplate, "id" | "createdAt" | "updatedAt">
): Promise<IEmailTemplate> => {
  const now = Timestamp.now();
  const templateWithDates = {
    ...template,
    createdAt: now,
    updatedAt: now,
    mailsSent: 0,
    membersCount: 0,
  };
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME),
    templateWithDates
  );
  return {
    ...templateWithDates,
    id: docRef.id,
    createdAt: now.toDate(),
    updatedAt: now.toDate(),
  } as IEmailTemplate;
};

// Get all templates for a user
export const getTemplatesByUser = async (
  userId: string
): Promise<IEmailTemplate[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as IEmailTemplate)
  );
};

// Get a single template
export const getTemplate = async (
  id: string
): Promise<IEmailTemplate | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return {
    ...docSnap.data(),
    id: docSnap.id,
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as IEmailTemplate;
};

// Update a template
export const updateTemplate = async (
  id: string,
  data: Partial<IEmailTemplate>
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// Delete a template
export const deleteTemplate = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

// Update template stats
export const updateTemplateStats = async (
  id: string,
  membersCount?: number,
  mailsSent?: number
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const updates: { membersCount?: number; mailsSent?: number } = {};

  if (membersCount !== undefined) updates.membersCount = membersCount;
  if (mailsSent !== undefined) updates.mailsSent = mailsSent;

  if (Object.keys(updates).length > 0) {
    await updateDoc(docRef, updates);
  }
};
