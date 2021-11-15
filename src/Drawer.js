import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import HomePage from "./HomePage";
import MusicPage from "./MusicPage";
import BrowserPage from "./BrowserPage";
import ChatPage from "./ChatPage";
import ShoppingPage from "./ShoppingPage";
import SocialMediaPage from "./SocialMediaPage";
import "./styles/drawer.css";

export default function TemporaryDrawer({
  currentScreen,
  handleAppClicked,
  percentage,
  handleMusicPlayer,
  playMusic,
  currentSong,
  audioObj,
  handleSongChanged,
  currentBrowserPage,
  handleLinkClicked,
  chatHistory,
  clearChatHistory,
  handleMessageSent,
  quantity,
  cartQuantity,
  handleQuantityChange,
  handleCartQuantityChange,
  playGif,
  handlePlayGif,
  follow,
  handleFollowButton,
  liked,
  numLikes,
  handleLikesChanged,
  comment,
  handleCommentSent,
  httpVisualize
}) {
  const [state, setState] = React.useState({
    left: true
  });

  React.useEffect(()=>{
    if (state["left"] === true){
      document.getElementById('burger').classList.add('hide')
    } else {
      document.getElementById('burger').classList.remove('hide')
    }
  }, [state["left"]]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const content = (anchor) =>
    currentScreen === "home" ? (
      <HomePage
        key={"home"}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "music" ? (
      <MusicPage
        key={playMusic && currentSong.title}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        handleMusicPlayer={handleMusicPlayer}
        playMusic={playMusic}
        currentSong={currentSong}
        audioObj={audioObj}
        handleSongChanged={handleSongChanged}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "browser" ? (
      <BrowserPage
        key={currentBrowserPage}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        currentBrowserPage={currentBrowserPage}
        handleLinkClicked={handleLinkClicked}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "chat" ? (
      <ChatPage
        key={chatHistory}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        chatHistory={chatHistory}
        clearChatHistory={clearChatHistory}
        handleMessageSent={handleMessageSent}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "shopping" ? (
      <ShoppingPage
        key={quantity + cartQuantity}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        quantity={quantity}
        cartQuantity={cartQuantity}
        handleQuantityChange={handleQuantityChange}
        handleCartQuantityChange={handleCartQuantityChange}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "social" ? (
      <SocialMediaPage
        key={playGif + follow + liked}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
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
    ) : (
      <div />
    );

  return (
    <div>      
        <Button className="burger hide" id="burger" onClick={toggleDrawer("left", true)}>
          <div></div>
          <div></div>
          <div></div>
        </Button>
        <React.Fragment>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >            
            {content("left")}
          </Drawer>          
        </React.Fragment>      
    </div>
  );
}
