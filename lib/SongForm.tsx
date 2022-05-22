import { delBasePath } from "next/dist/shared/lib/router/router";
import firebase from "../firebase/clientApp"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { setSyntheticLeadingComments } from "typescript";

export default function SongForm() {    
    // Firestore
    const db = firebase.firestore();

    const [title, setTitle] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [lyricist, setLyricist] = useState('');
    const [arranger, setArranger] = useState('');
    const [singer, setSinger] = useState('');
    const [composer, setComposer] = useState('');

    const userCollectionRef = collection(db, "songs");

    const addSong = async (event) => {
                event.preventDefault();

        await addDoc(userCollectionRef, { title: title, composer: composer, singer: singer, arranger: arranger, lyrics: lyrics, lyricist: lyricist });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const form = new FormData(event.target);
        // const formData = Object.fromEntries(form.entries());
        const song = { title, lyrics, lyricist, arranger, singer, composer };
        console.log(song);

        // const res = await fetch('/api/songs', {
        //     body: JSON.stringify(formData),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     method: 'POST',
        // });

        // Create document function
        
            // await db.collection("songs").doc(user.uid).set({
            //     title,
            //     lyrics,
            //     lyricist,
            //     arranger,
            //     singer,
            //     composer
            // });
        // };

        // const result = await res.json();
     };

    // Destructure user, loading, and error out of the hook.
    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <div>
            <form onSubmit={addSong}>
            <label>歌名：</label>
            <input 
                name="title" 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label>歌詞：</label>
            <input 
                name="lyrics" 
                type="text" 
                value={lyrics} 
                onChange={(e) => setLyrics(e.target.value)}
                required
            />
            <label>歌手：</label>
            <input name="singer" type="text" value={singer} onChange={(e) => setSinger(e.target.value)}/>
            <label>作曲：</label>
            <input name="composer" type="text" value={composer} onChange={(e) => setComposer(e.target.value)}/>
            <label>作詞：</label>
            <input name="lyricist" type="text" value={lyricist} onChange={(e) => setLyricist(e.target.value)}/>
            <label>編曲：</label>
            <input name="arranger" type="text" value={arranger} onChange={(e) => setArranger(e.target.value)}/>

            <button type="submit">Create a song</button>
        </form>
        </div>
        
    );
}