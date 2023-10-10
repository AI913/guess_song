import React, { CompositionEvent, useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

// components
import Grid from "./Grid";
// import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleCompositionStart,
    handleCompositionEnd,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    let isComposing = false;
    let text = "";

    // window.addEventListener("input", (event: CompositionEvent) => {
    //   if (event.target !== document.body) {
    //     return;
    //   }

    //   if (isComposing) {
    //     text = event.data;
    //   } else {
    //     text += event.data;
    //   }
    // });

    // window.addEventListener("compositionstart", () => {
    //   isComposing = true;
    // });

    // window.addEventListener("compositionend", () => {
    //   isComposing = false;
    //   console.log(`You typed: ${text}`);
    //   text = "";
    // });

    window.addEventListener("keyup", handleKeyup);

    const inputElement = document.getElementById("hidden-input");

    // Autofocus the hidden input on page load
    inputElement.focus();

    inputElement.addEventListener("compositionstart", handleCompositionStart);
    inputElement.addEventListener("compositionend", handleCompositionEnd);

    return () => {
      inputElement.removeEventListener(
        "compositionstart",
        handleCompositionStart
      );
      inputElement.removeEventListener("compositionend", handleCompositionEnd);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [
    handleKeyup,
    handleCompositionStart,
    handleCompositionEnd,
    isCorrect,
    turn,
  ]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      {/* <Keypad usedKeys={usedKeys} /> */}
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
      {/* <input id="whatever" type="text" /> */}
      <input
        id="hidden-input"
        style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
      />
    </div>
  );
}
