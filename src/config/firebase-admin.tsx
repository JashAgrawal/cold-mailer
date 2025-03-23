import { cert, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as string);
const appName = "cold-mailer";
if (!serviceAccount || !serviceAccount.project_id) {
  throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT is not defined");
}



const app = getApp(appName) ? getApp(appName) : initializeApp({
  credential: cert(serviceAccount),
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
}, appName);

const db = getFirestore(app);

export { db };
