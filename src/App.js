import React, { useEffect, useState } from "react";
import TemporaryDrawer from "./Drawer";
import DrawInfrastructure from "./DrawInfrastructure";
import VisualizeSignal from "./VisualizeSignal";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const handleAppClicked = (icon) => {
    setCurrentScreen(icon);
  };

  const [songs] = useState([
    {
      author: "Bradley Wray",
      title: "Console.log",
      url: "https://www.mboxdrive.com/Console Log.mp3",
      index: 0
    },
    {
      author: "Bradley Wray",
      title: "Star Wars Melody",
      url: "https://www.mboxdrive.com/Star Wars Melody.mp3",
      index: 1
    }
  ]);
  const [currentSong, setCurrentSong] = useState(0);
  const [audio, setAudio] = useState(new Audio(songs[currentSong].url));
  const [playMusic, setPlayMusic] = useState(false);
  const handleMusicPlayer = (playing) => {
    !playing ? audio.play() : audio.pause();
    setPlayMusic(!playMusic);
  };
  const handleSongChanged = (index, dir) => {
    if (dir === "left") {
      if (index > 0) {
        setCurrentSong(index - 1);
      } else {
        setCurrentSong(songs.length - 1);
      }
    } else if (dir === "right") {
      if (index < songs.length - 1) {
        setCurrentSong(index + 1);
      } else {
        setCurrentSong(0);
      }
    } else {
      setCurrentSong(0);
    }
    handleMusicPlayer(true);
    setPlayMusic(false);
  };
  useEffect(() => {
    setAudio(new Audio(songs[currentSong].url));
  }, [currentSong]);

  const [currentBrowserPage, setCurrentBrowserPage] = useState("home");
  const handleLinkClicked = (link) => {
    setCurrentBrowserPage(link);
  };

  const [chatHistory, setChatHistory] = useState([]);
  const clearChatHistory = () => {
    setChatHistory([]);
  };
  const handleMessageSent = (message) => {
    if (chatHistory.length <= 10) {
      setChatHistory([
        ...chatHistory,
        message,
        computerResponse(message.message)
      ]);
    }
  };
  const computerResponse = (message) => {
    let response = "";

    let Inputmessage = message
      .toLowerCase()
      .replace(/[^\w\s\d]/gi, "")
      .replace(/whats/g, "what is");

    let messageUnderstood = false;

    const greetings = {
      utterances: [
        "Hello",
        "Hi",
        "Hey",
        "Good morning",
        "Good evening",
        "What is up",
        "what is going on"
      ],
      answers: ["Hello!", "Hi there!", "Howdy!", "Good day!"]
    };

    const greetingQuestions = {
      utterances: [
        "How are you",
        "How is life",
        "How are things",
        "How is everything"
      ],
      answers: [
        "Im good, how are you?",
        "Fantasic, how are you today?",
        "Great, whats going on?"
      ]
    };

    const lifeQuestions = {
      utterances: [
        "What is up",
        "What are you doing",
        "What you doing",
        "What is going on"
      ],
      answers: [
        "Nothing much.",
        "Just chatting with you!",
        "Im not doing anything really."
      ]
    };

    const personalInputs = {
      utterances: ["Im", "I am"],
      answers: ["Good to hear that!", "What makes you feel that way?"]
    };

    const fallBackResponses = [
      "What do you mean by that?",
      "What are you saying?",
      "Huh?"
    ];

    greetings.utterances.forEach((greeting) => {
      if (Inputmessage.includes(greeting.toLowerCase())) {
        response =
          greetings.answers[
            Math.floor(Math.random() * greetings.answers.length)
          ];
        messageUnderstood = true;
      }
    });

    greetingQuestions.utterances.forEach((question) => {
      if (Inputmessage.includes(question.toLowerCase())) {
        response =
          greetingQuestions.answers[
            Math.floor(Math.random() * greetingQuestions.answers.length)
          ];
        messageUnderstood = true;
      }
    });

    lifeQuestions.utterances.forEach((question) => {
      if (Inputmessage.includes(question.toLowerCase())) {
        response =
          lifeQuestions.answers[
            Math.floor(Math.random() * lifeQuestions.answers.length)
          ];
        messageUnderstood = true;
      }
    });

    personalInputs.utterances.forEach((input) => {
      if (Inputmessage.includes(input.toLowerCase())) {
        response =
          personalInputs.answers[
            Math.floor(Math.random() * personalInputs.answers.length)
          ];
        messageUnderstood = true;
      }
    });

    if (messageUnderstood) {
      return { id: "computer", message: response };
    } else {
      return {
        id: "computer",
        message:
          fallBackResponses[
            Math.floor(Math.random() * fallBackResponses.length)
          ]
      };
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);
  const handleQuantityChange = (dir) => {
    if (dir === "add") {
      setQuantity(quantity + 1);
    } else if (dir === "sub") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const handleCartQuantityChange = (action) => {
    if (action === "increase") {
      setCartQuantity(cartQuantity + quantity);
      if (cartQuantity > 0) {
        setTimeout(() => setQuantity(1), 100);
      }
    } else if (action === "zero") {
      if (cartQuantity > 0) {
        setCartQuantity(0);
        setTimeout(() => setQuantity(1), 100);
      }
    }
  };

  const [playGif, setPlayGif] = useState(true);
  const handlePlayGif = (playGif) => {
    setPlayGif(!playGif);
  };
  const [follow, setFollow] = useState(false);
  const handleFollowButton = (follow) => {
    setFollow(!follow);
  };
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(
    Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000
  );
  const handleLikesChanged = (isLiked) => {
    setLiked(!isLiked);
    if (liked) {
      setNumLikes(numLikes - 1);
    } else {
      setNumLikes(numLikes + 1);
    }
  };
  const [comment, setComment] = useState(null);
  const handleCommentSent = (message, clear) => {
    if (clear) {
      setComment(null);
    } else if (comment === null) {
      setComment(message);
    }
  };

  const [httpSignal, sethttpSignal] = useState({status: "200", request: "GET", endpoint: "homeScreen"})
  const httpVisualize = (app) => {
    sethttpSignal({status: app.status, request: app.request, endpoint: app.endpoint})
  }

  const [percentage, setPercentage] = useState(null);
  useEffect(() => {
    setPercentage(Math.random() * 100);
  }, []);

  return (
    <div className="App" id="App">
      <TemporaryDrawer
        key={currentScreen}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        playMusic={playMusic}
        handleMusicPlayer={handleMusicPlayer}
        currentSong={songs[currentSong]}
        audioObj={audio}
        handleSongChanged={handleSongChanged}
        currentBrowserPage={currentBrowserPage}
        handleLinkClicked={handleLinkClicked}
        chatHistory={chatHistory}
        clearChatHistory={clearChatHistory}
        handleMessageSent={handleMessageSent}
        quantity={quantity}
        cartQuantity={cartQuantity}
        handleQuantityChange={handleQuantityChange}
        handleCartQuantityChange={handleCartQuantityChange}
        playGif={playGif}
        handlePlayGif={handlePlayGif}
        follow={follow}
        handleFollowButton={handleFollowButton}
        liked={liked}
        numLikes={numLikes}
        handleLikesChanged={handleLikesChanged}
        comment={comment}
        handleCommentSent={handleCommentSent}
        httpVisualize={httpVisualize}
      />
      <DrawInfrastructure
        httpSignal={httpSignal}
      />
      {/* <VisualizeSignal 
      /> */}
    </div>
  );
}
export default App;
