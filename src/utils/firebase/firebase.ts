/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
  CollectionReference,
  DocumentData,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTaPCuVxx5VnDq-a_wblxkw0hzKtZ-0kc",
  authDomain: "growmeorganicinternship.firebaseapp.com",
  projectId: "growmeorganicinternship",
  storageBucket: "growmeorganicinternship.appspot.com",
  messagingSenderId: "426300694327",
  appId: "1:426300694327:web:176c20f42677e7da8e44b2"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  { user }: UserCredential,
  additionalInformation: any = {}
) => {
  if (!user) return;

  const userDocRef = doc(db, 'users', user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
        phoneNumber: parseInt(additionalInformation.phoneNumber, 10), // Convert phoneNumber to an integer
      });
    } catch (error: any) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const fetchUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  return userData;
};