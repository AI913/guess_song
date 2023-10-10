import { useState } from "react";
import { useLyrics } from "../contexts/LyricsContext";
import { useToast } from "@chakra-ui/react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(7)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc
  const { lyrics1, lyrics2, setLyrics1, setLyrics2 } = useLyrics();
  const toast = useToast();

  let isComposing = false;

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    const nonCharacterKeys = [
      "Shift",
      "Control",
      "Alt",
      "Meta",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      // ... Add any other non-character keys you want to ignore
    ];

    if (nonCharacterKeys.includes(key)) {
      return; // Ignore the key
    }
    const composedText = key;
    console.log(composedText);
    if (!isComposing) {
      if (key === "Enter") {
        // only add guess if turn is less than 5
        if (turn > 5) {
          console.log("you used all your guesses!");
          return;
        }
        // do not allow duplicate words
        if (history.includes(currentGuess)) {
          console.log("you already tried that word.");
          return;
        }
        // check word is 5 chars
        if (currentGuess.length !== lyrics2.length) {
          console.log("word must be 5 chars.");
          toast({
            title: "字數不足",
            description: `請輸入 ${lyrics2.length} 個字的答案`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
        const formatted = formatGuess();
        addNewGuess(formatted);
      }
      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }
      // if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }

    // }
  };

  const handleCompositionStart = (event) => {
    isComposing = true;
    const composedText = event.data;
    console.log("start");
  };

  const handleCompositionEnd = (event) => {
    isComposing = false;

    const composedText = event.data;
    console.log(composedText);
    console.log("end");

    if (currentGuess.length < lyrics2.length) {
      setCurrentGuess((prev) => prev + composedText);
    }
    // const formatted = formatGuess();
    // addNewGuess(formatted);
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    handleCompositionStart,
    handleCompositionEnd,
  };
};

export default useWordle;
