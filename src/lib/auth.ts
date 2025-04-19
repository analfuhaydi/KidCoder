// Authentication helper functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// User interface
export interface UserData {
  uid: string;
  email: string;
  name?: string;
  age?: number;
}

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  age: number
): Promise<UserData> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get user from credential
    const user = userCredential.user;

    // Create user data
    const userData: UserData = {
      uid: user.uid,
      email: user.email || email,
      name,
      age,
    };

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Logout user
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get current user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
