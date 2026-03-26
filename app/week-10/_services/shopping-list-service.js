import { db } from "../_utils/firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export const getItems = async (userId) => {
  const itemsRef = collection(db, "users", userId, "items");
  const itemsQuery = query(itemsRef);
  const querySnapshot = await getDocs(itemsQuery);

  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
};

export const addItem = async (userId, item) => {
  const itemsRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsRef, item);
  return docRef.id;
};
