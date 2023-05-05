import { delBasePath } from "next/dist/shared/lib/router/router";
import firebase from "../firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { setSyntheticLeadingComments } from "typescript";

export default function SongForm() {
  // Firestore
  const db = firebase.firestore();

  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [lyricist, setLyricist] = useState("");
  const [arranger, setArranger] = useState("");
  const [singer, setSinger] = useState("");
  const [composer, setComposer] = useState("");

  const userCollectionRef = collection(db, "songs");

  const addSong = async (event) => {
    event.preventDefault();

    await addDoc(userCollectionRef, {
      title: title,
      composer: composer,
      singer: singer,
      arranger: arranger,
      lyrics: lyrics,
      lyricist: lyricist,
    });
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
  const [user, loading, error] = useAuthState(firebase.auth() as any);

  console.log("Loading:", loading, "|", "Current user:", user);

  return (
    <form onSubmit={addSong}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12"></div>

        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            歌名
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="擱淺"
                required
              />
            </div>
          </div>
        </div>
        <br />

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            歌詞
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="lyrics"
                type="text"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="我只能永遠讀着對白"
                required
              />
            </div>
          </div>
        </div>
        <br />

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            歌手
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="singer"
                type="text"
                className="rounded block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="周杰倫"
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            作曲
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="composer"
                type="text"
                value={composer}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={(e) => setComposer(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            作詞
          </label>

          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="lyricist"
                type="text"
                value={lyricist}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={(e) => setLyricist(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            編曲
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                name="arranger"
                type="text"
                value={arranger}
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                onChange={(e) => setArranger(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />

        <button
          type="submit"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          儲存
        </button>
      </div>
    </form>
  );
}
