import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { ActionCodeSettings, UserCredential } from "@firebase/auth-types/index"
import { DocumentData, Query } from "@firebase/firestore-types/index"
import { Timestamp } from "@google-cloud/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY9RZjoprqLvxqZalH8iMzVRyqrtjmV7w",
  authDomain: "sihhack.firebaseapp.com",
  databaseURL: "https://sihhack.firebaseio.com",
  projectId: "sihhack",
  storageBucket: "sihhack.appspot.com",
  messagingSenderId: "995953696847",
  appId: "1:995953696847:web:f06d18192ad3c9f7720a3a"
};

/**
 * structure of db
 * |
 * + grievance
 *   - name 
 *   - usn
 *   - message
 *   - additional field
 */

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Types of categories
export const CATEGORY = {
  DEPTARTMENT_LEVEL: "department",
  INSTITUTE_LEVEL: "institute",
  UNIVERSITY_LEVEL: "university"
}

// Types of categories
export const SUBCATEGORY = {
  SUBCATEGORY_ADMISSION_LEVEL: "admission",
  SUBCATEGORY_FINANCE_LEVEL: "finance",
  SUBCATEGORY_EXAMINATION_LEVEL: "examination",
  SUBCATEGORY_PAPER_EVALUATION_LEVEL: "evaluation"
}

export let Grievance: {
  id: string,
  title: string,
  email: string,
  usn: string,
  createdAt?: Timestamp
  message: string,
  category: string,
  subcategory: string
};

Grievance = {
  id: "",      // document id
  title: "",   // title
  email: "",   // email of student
  usn: "",     // usn of student
  message: "", // message 
  createdAt: Timestamp.now(), // time of creation
  category: "",   // @see CATEGORY
  subcategory: "" // @see SUBCATEGORY
}
// returns promise without catching
export async function signIn(email: string, password: string): Promise<UserCredential> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
}

// returns promise without catching
export async function signUp(email: string, password: string): Promise<UserCredential> {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// returns boolean value
export function hasSignIn() {
  return firebase.auth().currentUser !== null;
}

// returns boolean value
export function isVerified() {
  return firebase.auth().currentUser.emailVerified;
}

// returns promise without catch or check ie. it doesn't check if user is
// already verified or not 
export function sendVerificationLink(email: string): Promise<void> {
  var obj: ActionCodeSettings = {
    android: null,
    handleCodeInApp: false,
    iOS: null,
    url: "",
    dynamicLinkDomain: null
  }
  return firebase.auth().sendSignInLinkToEmail(email, obj)
}

// create grievance 
export function createGrievance(item: typeof Grievance): Promise<void> {
  const doc = firebase.firestore().collection("grievance").doc()
  const data: DocumentData = {
    id: doc.id,
    usn: item.usn,
    title: item.title,
    email: item.email,
    message: item.message,
    createdAt: Timestamp.now()
  }
  return doc.set(data)
}

// Deletes a grievance by submitting document id
export function deleteGrievance(id: string): Promise<void> {
  return firebase.firestore().collection("grievance").doc(id).delete()
}


export function search(cateogry?: string, subcateogry?: string, keyword?: string) : typeof Function {
  if (keyword === undefined || keyword === null) return
  var items: Query<DocumentData> = undefined
  if (cateogry !== null) {
    items = firebase.firestore().collection("grievance")
    .where('cateogry', 'in', cateogry)
    .orderBy('createdAt', 'desc')
  } else if (cateogry !== null && subcateogry !== null) {
    items = firebase.firestore().collection("grievance")
    .where('cateogry', 'in', cateogry)
    .where('subcateogry', 'in', subcateogry)
    .orderBy('createdAt', 'desc')
  }else{
    items = firebase.firestore().collection("grievance").orderBy('createdAt', 'desc')  
  }
}
