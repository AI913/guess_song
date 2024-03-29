import React from "react";
import { useLyrics } from "../contexts/LyricsContext";

export default function Row({ guess, currentGuess }) {
  const { lyrics1, lyrics2, setLyrics1, setLyrics2 } = useLyrics();

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <div key={i} className={l.color}>
            {l.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    console.log(letters);
    console.log("total");

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(lyrics2.length - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(lyrics2.length)].map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
}
