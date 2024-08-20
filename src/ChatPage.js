import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import drawPhone from "./p5_functions/DrawPhone";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let messageText = [];
let chatId = 0;
let allowMessageEdit = true;
let previousChar = null;

let regularFont;

export default class ChatPage extends Component {
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.phoneDimensions.width, this.props.phoneDimensions.canvasHeight).parent(canvasParentRef);
      p5.frameRate(this.fr);
    };
    p5.draw = () => {
      // Regulate Text
      p5.textSize(12);
      p5.textFont(regularFont);
      p5.textAlign(p5.LEFT);
  
      // Cursor
      p5.cursor(p5.ARROW);
  
      // Phone
      drawPhone(p5, this.props.phone, this.props.screen, this.props.screenBezel, this.props.handleAppClicked, this.props.httpVisualize, this.props.percentage);
      // Message Box
      p5.fill("rgba(0, 0, 0, 0.1)");
      p5.rect(
        this.props.screen.x,
        this.props.screen.y + this.props.screenBezel.vert,
        this.props.screen.w,
        this.props.screenBezel.vert * 4
      );
      p5.fill("rgba(0, 0, 0, 0.35)");
      p5.ellipse(
        this.props.screen.x + this.props.screen.w / 2,
        this.props.screen.y + this.props.screenBezel.vert * 2 + this.props.screenBezel.vert / 2,
        50
      );
      p5.stroke(255, 255, 255);
      p5.fill(255, 255, 255);
      p5.textSize(20);
      p5.textAlign(p5.CENTER);
      p5.text(
        "BF",
        this.props.screen.x + this.props.screen.w / 2,
        this.props.screen.y + this.props.screenBezel.vert * 2 + this.props.screenBezel.vert / 2 + 7
      );
      p5.textAlign(p5.LEFT);
  
      p5.noStroke();
      p5.textSize(35);
      p5.fill("rgba(0, 0, 0, 0.50)");
      p5.textFont("Helvetica");
      p5.text(
        "🗑",
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert * 2 + this.props.screenBezel.vert / 2 + 15
      );
      p5.textFont(regularFont);
      p5.textSize(14);
      p5.text(
        "Clear",
        this.props.screen.x + this.props.screenBezel.horz - 5,
        this.props.screen.y + this.props.screenBezel.vert * 2 + this.props.screenBezel.vert / 2 + 35
      );
      if (
        p5.mouseX > this.props.screen.x + this.props.screenBezel.horz - 5 &&
        p5.mouseX <= this.props.screen.x + this.props.screenBezel.horz - 5 + p5.textWidth("Clear") &&
        p5.mouseY >= this.props.screen.y + this.props.screenBezel.vert * 1.5 &&
        p5.mouseY <= this.props.screen.y + this.props.screenBezel.vert * 2 + this.props.screenBezel.vert / 2 + 45
      ) {
        p5.cursor(p5.HAND);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.clearChatHistory();
          }
        }
      }
      p5.textAlign(p5.CENTER);
      p5.textSize(14);
      p5.fill("rgba(0, 0, 0, 0.5)");
      p5.text(
        "Best Friend",
        this.props.screen.x + this.props.screen.w / 2,
        this.props.screen.y + this.props.screenBezel.vert * 4 + 10
      );
      p5.fill("rgba(0, 0, 0, 0.05)");
      p5.stroke(0, 0, 0);
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert * 2,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        30,
        10
      );
      p5.noStroke();
      p5.fill("rgba(0, 0, 0, 0.65)");
      p5.textSize(15);
      p5.textAlign(p5.LEFT);
      let formattedMessage =
        messageText.join("").charAt(0).toUpperCase() +
        messageText.join("").slice(1);
      if (formattedMessage !== "") {
        p5.text(
          formattedMessage,
          this.props.screen.x + this.props.screenBezel.horz + 10,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert * 2 + 20
        );
      } else {
        p5.text(
          "Enter a message",
          this.props.screen.x + this.props.screenBezel.horz + 10,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert * 2 + 20
        );
      }
      p5.stroke(0, 0, 0);
      p5.line(
        this.props.screen.x + this.props.screenBezel.horz + 10 + p5.textWidth(formattedMessage),
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert * 2 + 20 - 15,
        this.props.screen.x + this.props.screenBezel.horz + 10 + p5.textWidth(formattedMessage),
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert * 2 + 20 + 5
      );
  
      if (
        this.props.screen.x + this.props.screenBezel.horz + 10 + p5.textWidth(formattedMessage) >
        255
      ) {
        allowMessageEdit = false;
      } else {
        allowMessageEdit = true;
      }
      p5.noStroke();
  
      this.props.chatHistory.map((messageObj, index) => {
        p5.textSize(15);
        if (messageObj.id === "user") {
          p5.fill("rgba(12, 130, 254, 0.65)");
          p5.rect(
            this.props.screen.x +
              this.props.screen.w -
              p5.textWidth(messageObj.message) -
              this.props.screenBezel.horz -
              20,
            this.props.screen.y + this.props.screenBezel.vert * 6 + index * 20 * 1.5,
            p5.textWidth(messageObj.message) + 20,
            22,
            20,
            20,
            0,
            20
          );
          p5.fill("rgba(255, 255, 255, 1)");
          p5.text(
            messageObj.message,
            this.props.screen.x +
              this.props.screen.w -
              p5.textWidth(messageObj.message) -
              this.props.screenBezel.horz -
              10,
            this.props.screen.y + this.props.screenBezel.vert * 6 + index * 20 * 1.5 + 3,
            p5.textWidth(messageObj.message) + 20,
            20,
            20
          );
        } else {
          p5.fill("rgba(230, 229, 235, 1)");
          p5.rect(
            this.props.screen.x + this.props.screenBezel.horz,
            this.props.screen.y + this.props.screenBezel.vert * 6 + index * 20 * 1.5,
            p5.textWidth(messageObj.message) + 20,
            20,
            20,
            20,
            20,
            0
          );
          p5.fill("rgba(0, 0, 0, 0.8)");
          p5.text(
            messageObj.message,
            this.props.screen.x + this.props.screenBezel.horz + 10,
            this.props.screen.y + this.props.screenBezel.vert * 6 + index * 20 * 1.5 + 3,
            p5.textWidth(messageObj.message) + 20,
            20,
            20
          );
        }
        return false;
      });
    };
    p5.keyPressed = (e) => {
      if (e.key === "Enter") {
        chatId += 1;
        this.props.setPhoneScreen("Loading");
        this.props.httpVisualize({status: 200, request: "POST", endpoint: "messageSent"+ "?" + chatId});
        this.props.handleMessageSent({
          id: "user",
          message:
            messageText.join("").charAt(0).toUpperCase() +
            messageText.join("").slice(1)
        });
        messageText = [];
      } else if (e.key === "Backspace" && e.key !== previousChar) {
        messageText.pop();
        previousChar = e.key;
      } else if (
        (e.keyCode > 8 && e.keyCode <= 46) ||
        (e.keyCode >= 91 && e.keyCode <= 93) ||
        (e.keyCode >= 112) & (e.keyCode <= 123) ||
        (e.keyCode >= 144 && e.keyCode <= 145)
      ) {
        if (allowMessageEdit && e.keyCode === 32 && e.key !== previousChar) {
          messageText.push(" ");
          previousChar = e.key;
        }
      } else {
        if (allowMessageEdit && e.key !== previousChar) {
          messageText.push(e.key);
          previousChar = e.key;
        }
      }
      return false;
    };
    p5.keyReleased = () => {
      previousChar = null;
    }
  }
  
  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}
