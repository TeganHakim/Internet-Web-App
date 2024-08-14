import * as React from "react";
import Drawer from "@mui/material/Drawer"
import HomePage from "./HomePage";
import MusicPage from "./MusicPage";
import BrowserPage from "./BrowserPage";
import ChatPage from "./ChatPage";
import ShoppingPage from "./ShoppingPage";
import SocialMediaPage from "./SocialMediaPage";
import LoadingPage from "./LoadingPage";
import "./styles/drawer.css";

export default function TemporaryDrawer({
  dimensions,
  phone,
  screen,
  screenBezel,
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
  followed,
  follow,
  unfollow,
  liked,
  like,
  unlike,
  numLikes,
  handleLikesChanged,
  comment,
  handleCommentSent,
  httpVisualize,
  setPhoneScreen
}) {
  const [state, setState] = React.useState({
    left: true
  });
  
  const content = () =>
    currentScreen === "home" ? (
      <HomePage
        key={"home"}
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        currentBrowserPage={currentBrowserPage}
        httpVisualize={httpVisualize}
      />
    ) : currentScreen === "music" ? (
      <MusicPage
        key={playMusic && currentSong.title}
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
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
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
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
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
        chatHistory={chatHistory}
        clearChatHistory={clearChatHistory}
        handleMessageSent={handleMessageSent}
        httpVisualize={httpVisualize}
        setPhoneScreen={setPhoneScreen}
      />
    ) : currentScreen === "shopping" ? (
      <ShoppingPage
        key={quantity + cartQuantity}
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
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
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
        currentScreen={currentScreen}
        handleAppClicked={handleAppClicked}
        percentage={percentage}
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
        setPhoneScreen={setPhoneScreen}
      />
    ) : currentScreen === "Loading" ? (
      <LoadingPage 
        key={"loading"}
        dimensions={dimensions}
        phone={phone}
        screen={screen}
        screenBezel={screenBezel}
        currentScreen={currentScreen}
        percentage={percentage}
      />
    ) : (
      <div />
    );

  return (
    <div>      
        <React.Fragment>
          <Drawer
            anchor={"left"}
            open={state["left"]}
          >            
          {content()}
          </Drawer>          
        </React.Fragment>      
    </div>
  );
}