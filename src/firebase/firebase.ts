
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);