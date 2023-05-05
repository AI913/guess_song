import SongForm from "../lib/SongForm";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { read } from "fs";
import Wordle from "../lib/Wordle";

export default function Home() {
  const db = firebase.firestore();

  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth() as any);

  console.log("Loading:", loading, "|", "Current user:", user);

  const [randomLyrics1, setRandomLyrics1] = useState(null);
  const [randomLyrics2, setRandomLyrics2] = useState(null);

  useEffect(() => {
    const collectionRef = db.collection("songs");

    const randomId = collectionRef.doc().id;

    collectionRef
      .orderBy("__name__")
      .startAt(randomId)
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          const data = doc.data();
          setRandomLyrics1(data.lyrics1);
          setRandomLyrics2(data.lyrics2);
          console.log(randomId);
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>{randomLyrics1}</h1>
      {randomLyrics2 && <Wordle solution={randomLyrics2} />}
    </div>
  );
}
