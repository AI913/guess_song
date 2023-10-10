import { LyricsProvider, useLyrics } from "../contexts/LyricsContext";

import SongForm from "../lib/SongForm";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import firebase from "../firebase/clientApp";

// Import the useAuthStateHook
import { read } from "fs";
import Wordle from "../lib/Wordle";

export default function Home() {
  const { lyrics1, lyrics2 } = useLyrics();
  console.log(lyrics1);
  console.log(lyrics2);

  return (
    <div className={styles.container}>
      <h1>{lyrics1}</h1>
      {lyrics2 && <Wordle solution={lyrics2} />}
    </div>
  );
}
