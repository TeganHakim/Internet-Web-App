import React, { useEffect, useState } from "react";
import TemporaryDrawer from "./Drawer";
import InfoWindow from "./InfoWindow";
import DrawInfrastructure from "./DrawInfrastructure";

function App() { 
  
  let scaleFactor = 1;
  if (window.innerHeight < 969) {
    scaleFactor = window.innerHeight/969;
    // dimensions.height = window.innerHeight / (969/600);
  }

  const yOffset = 10;
  const phoneDimensions = {
    width: 300, 
    height: 600 * scaleFactor,
    canvasHeight: window.innerHeight - yOffset
  };

  
  // Screen Variables
  let phone = {
    x: 10,
    y: window.innerHeight - 10 - phoneDimensions.height,
    w: phoneDimensions.width - 10 * 2,
    h: phoneDimensions.height,
    border: {tl: 10, tr: 10, bl: 10, br: 10}
  };
  let screenBezel = {vert: 20, horz: 10};
  let screen = {
    x: phone.x + screenBezel.horz,
    y: phone.y + screenBezel.vert,
    w: phone.w - screenBezel.horz * 2,
    h: phone.h - screenBezel.vert * 2,
    border: { tl: 5, tr: 5, bl: 5, br: 5 }
  };

  const [currentScreen, setCurrentScreen] = useState("home");
  const handleAppClicked = (icon) => {
    setCurrentScreen("loading"); 
    // setTimeout(() => setCurrentScreen(icon), 1000);   
  };
  const setPhoneScreen = (screen) => {
    setCurrentScreen(screen);
  }
  
  const [songs] = useState([
    {
      author: "Bradley Wray",
      title: "Console.log",
      url: "https://teganhakim.github.io/Internet-Web-App/music/console_log.mp3",
      index: 0
    },
    {
      author: "Bradley Wray",
      title: "Train Struttin",
      url: "https://teganhakim.github.io/Internet-Web-App/music/train_struttin.mp3",
      index: 1
    },
    {
      author: "Bradley Wray",
      title: "On The Way To Koh Lipe",
      url: "https://teganhakim.github.io/Internet-Web-App/music/on_the_way_to_koh_lipe.mp3",
      index: 2
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

  const [currentBrowserPage, setCurrentBrowserPage] = useState("homeBrowser");
  const handleLinkClicked = () => {
    setCurrentScreen("loading");
  };
  
  const setBrowserScreen = (link) => {
    setCurrentScreen("browser");
    setCurrentBrowserPage(link);
  }
  
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
  const [followed, setFollowed] = useState(false);
  const follow = () => {
    setFollowed(true);
  };
  const unfollow = () => {
    setFollowed(false);
  }

  const [liked, setLiked] = useState(false);
  const like = () => {
    setLiked(true)
  }
  const unlike = () => {
    setLiked(false)
  }

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

  const [pinged, setPinged] = useState(false);
  const setPing = (state) => {
    setPinged(state);
  }

  const [percentage, setPercentage] = useState(null);
  useEffect(() => {
    let percent = (Math.random() * (80 - 20 + 1) + 20)
    setPercentage(percent);
  }, []);

  const [hoverState, setHoverState] = useState(null);
  const hoverElement = (element) => {
    setHoverState(element);
  }

  const [serverInfo, setServerInfo] = useState(null);
  const setServerHover = (url, ip) => {
    setServerInfo({url: url, ip: ip});
  }

  const [DNSInfo, setDNSInfo] = useState(null);
  const setDNSHover = (webURL, toURL, toIP) => {
    setDNSInfo({webURL: webURL, toURL: toURL, toIP: toIP});
  }

  return (
    <div className="App" id="App">
      <TemporaryDrawer
        key={currentScreen}
        phoneDimensions={phoneDimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
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
        followed={followed}
        follow={follow}
        unfollow={unfollow}
        liked={liked}
        like={like}
        unlike={unlike}
        numLikes={numLikes}
        handleLikesChanged={handleLikesChanged}
        comment={comment}
        handleCommentSent={handleCommentSent}
        httpVisualize={httpVisualize}
        pinged={pinged}
        setPhoneScreen={setPhoneScreen}
      />
      <DrawInfrastructure
        phoneDimensions={phoneDimensions}
        phone={phone}
        screen={screen}
        scaleFactor={scaleFactor}
        handleAppClicked={handleAppClicked}
        httpSignal={httpSignal}
        pinged={pinged}
        setPing={setPing}
        setPhoneScreen={setPhoneScreen}
        setBrowserScreen={setBrowserScreen}
        hoverElement={hoverElement}
        hoverState={hoverState}
        setServerHover={setServerHover}
        setDNSHover={setDNSHover}
      />
      <InfoWindow 
        hoverState={hoverState}
        serverInfo={serverInfo}
        DNSInfo={DNSInfo}
      />
    </div>
  );
}
export default App;