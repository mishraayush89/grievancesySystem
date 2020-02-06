import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { Timestamp } from "@firebase/firestore";

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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Types of categories
export const CATEGORY = {
  DEPTARTMENT_LEVEL: "department",
  INSTITUTE_LEVEL: "institute",
  UNIVERSITY_LEVEL: "university"
};

// Types of categories
export const SUBCATEGORY = {
  SUBCATEGORY_ADMISSION_LEVEL: "admission",
  SUBCATEGORY_FINANCE_LEVEL: "finance",
  SUBCATEGORY_EXAMINATION_LEVEL: "examination",
  SUBCATEGORY_PAPER_EVALUATION_LEVEL: "evaluation"
};

// Grievance = {
//   id: "",      // document id
//   title: "",   // title
//   email: "",   // email of student
//   usn: "",     // usn of student
//   message: "", // message
//   createdAt: Timestamp.now(), // time of creation
//   category: "",   // @see CATEGORY
//   subcategory: "" // @see SUBCATEGORY
// }

// returns promise without catching
export async function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// returns promise without catching
export async function signUp(username, email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (firebase.auth().currentUser !== undefined) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().uid)
          .set({ username, admin: false });
      }
    });
}

// returns boolean value
export function hasSignIn() {
  return firebase.auth().currentUser !== null;
}

export function getEmail() {
  return firebase.auth().currentUser.email;
}

// returns boolean value
export function isVerified() {
  if (
    firebase.auth().currentUser === undefined ||
    firebase.auth().currentUser === null
  )
    return false;
  return firebase.auth().currentUser.emailVerified;
}

// returns promise without catch or check ie. it doesn't check if user is
// already verified or not
export function sendVerificationLink() {
  return firebase.auth().currentUser.sendEmailVerification();
}

// create grievance
export function createGrievance(item) {
  const doc = firebase
    .firestore()
    .collection("grievance")
    .doc();
  const data = {
    id: doc.id,
    ...item,
    createdAt: Date.now()
  };
  return doc.set(data);
}

// Deletes a grievance by submitting document id
export function deleteGrievance(id) {
  return firebase
    .firestore()
    .collection("grievance")
    .doc(id)
    .delete();
}

// returns a promise
export function signOut() {
  return firebase.auth().signOut();
}

// return on snapshot function
export function listAllGrievance(last) {
  var ref = firebase.firestore().collection("grievance");
  if (last === undefined || last["createdAt"] === undefined) return undefined;
  else {
    return ref
      .orderBy("createdAt")
      .limit(20)
      .startAt(last["createdAt"])
      .get();
  }
}

async function getFirst() {
  var ref = firebase.firestore().collection("grievance");
  const doc = await ref
    .orderBy("createdAt")
    .limit(1)
    .get();
  return doc.docs[0].data();
}

export async function getItem() {
  return await getFirst().then(val => {
    return val;
  });
}
