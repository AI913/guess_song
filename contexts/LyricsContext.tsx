import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getDocs, addDoc, collection } from "firebase/firestore";

interface LyricsContextType {
  lyrics1: string | null;
  lyrics2: string | null;
  setLyrics1: React.Dispatch<React.SetStateAction<string | null>>;
  setLyrics2: React.Dispatch<React.SetStateAction<string | null>>;
}

// Default value is an object with both data and a setter
const LyricsContext = React.createContext<LyricsContextType>({
  lyrics1: null,
  lyrics2: null,
  setLyrics1: () => {},
  setLyrics2: () => {},
});

export function LyricsProvider({ children }) {
  const db = firebase.firestore();
  const [lyrics1, setLyrics1] = useState(null);
  const [lyrics2, setLyrics2] = useState(null);

  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth() as any);

  console.log("Loading:", loading, "|", "Current user:", user);

  useEffect(() => {
    // Your fetch logic here
    const collectionRef = db.collection("songs");
    const randomId = collectionRef.doc().id;

    collectionRef
      .orderBy("__name__")
      .startAt(randomId)
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          setLyrics1(data.lyrics1);
          setLyrics2(data.lyrics2);
        });
      });
  }, []);

  return (
    <LyricsContext.Provider
      value={{ lyrics1, lyrics2, setLyrics1, setLyrics2 }}
    >
      {children}
    </LyricsContext.Provider>
  );
}

export function useLyrics() {
  return useContext(LyricsContext);
}
