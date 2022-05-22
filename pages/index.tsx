import SongForm from '../lib/SongForm'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import firebase from "../firebase/clientApp"
// Import the useAuthStateHook
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Home() {

  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());

  console.log("Loading:", loading, "|", "Current user:", user);

  const [songs, songsLoading, songsError] = useCollection(
      firebase.firestore().collection("songs"),
      {}
  );

  if (!songsLoading && songs) {
      songs.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <div className={styles.container}>
      <h1>出題目啦！</h1>
      <form>
          <input name="title" type="text" />
      </form>
    </div>
  )
}
