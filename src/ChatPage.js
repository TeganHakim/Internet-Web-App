import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let messageText = [];
let chatId = 0;
let allowMessageEdit = true;

let regularFont;

export default class ChatPage extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(this.fr);
  };
  draw = (p5) => {
    // Regulate Text
    p5.textSize(12);
    p5.textFont(regularFont);
    p5.textAlign(p5.LEFT);

    // Cursor
    p5.cursor(p5.ARROW);

    // Screen Variables
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;
    let phone = {
      x: 10,
      y: p5.windowHeight - 10 - height,
      w: width - 10 * 2,
      h: height,
      border: { tl: 10, tr: 10, bl: 10, br: 10 }
    };
    let screenBezel = { vert: 20, horz: 10 };
    let screen = {
      x: phone.x + screenBezel.horz,
      y: phone.y + screenBezel.vert,
      w: phone.w - screenBezel.horz * 2,
      h: phone.h - screenBezel.vert * 2,
      border: { tl: 5, tr: 5, bl: 5, br: 5 }
    };
    // Phone
    this.drawPhone(p5);
    // Message Box
    p5.fill("rgba(0, 0, 0, 0.1)");
    p5.rect(
      screen.x,
      screen.y + screenBezel.vert,
      screen.w,
      screenBezel.vert * 4
    );
    p5.fill("rgba(0, 0, 0, 0.35)");
    p5.ellipse(
      screen.x + screen.w / 2,
      screen.y + screenBezel.vert * 2 + screenBezel.vert / 2,
      50
    );
    p5.stroke(255, 255, 255);
    p5.fill(255, 255, 255);
    p5.textSize(20);
    p5.textAlign(p5.CENTER);
    p5.text(
      "BF",
      screen.x + screen.w / 2,
      screen.y + screenBezel.vert * 2 + screenBezel.vert / 2 + 7
    );
    p5.textAlign(p5.LEFT);

    p5.noStroke();
    p5.textSize(35);
    p5.fill("rgba(0, 0, 0, 0.50)");
    p5.textFont("Helvetica");
    p5.text(
      "🗑",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2 + screenBezel.vert / 2 + 15
    );
    p5.textFont(regularFont);
    p5.textSize(14);
    p5.text(
      "Clear",
      screen.x + screenBezel.horz - 5,
      screen.y + screenBezel.vert * 2 + screenBezel.vert / 2 + 35
    );
    if (
      p5.mouseX > screen.x + screenBezel.horz - 5 &&
      p5.mouseX <= screen.x + screenBezel.horz - 5 + p5.textWidth("Clear") &&
      p5.mouseY >= screen.y + screenBezel.vert * 1.5 &&
      p5.mouseY <= screen.y + screenBezel.vert * 2 + screenBezel.vert / 2 + 45
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
      screen.x + screen.w / 2,
      screen.y + screenBezel.vert * 4 + 10
    );
    p5.fill("rgba(0, 0, 0, 0.05)");
    p5.stroke(0, 0, 0);
    p5.rect(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert * 2,
      screen.w - screenBezel.horz * 2,
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
        screen.x + screenBezel.horz + 10,
        screen.y + screen.h - screenBezel.vert * 2 + 20
      );
    } else {
      p5.text(
        "Enter a message",
        screen.x + screenBezel.horz + 10,
        screen.y + screen.h - screenBezel.vert * 2 + 20
      );
    }
    p5.stroke(0, 0, 0);
    p5.line(
      screen.x + screenBezel.horz + 10 + p5.textWidth(formattedMessage),
      screen.y + screen.h - screenBezel.vert * 2 + 20 - 15,
      screen.x + screenBezel.horz + 10 + p5.textWidth(formattedMessage),
      screen.y + screen.h - screenBezel.vert * 2 + 20 + 5
    );

    if (
      screen.x + screenBezel.horz + 10 + p5.textWidth(formattedMessage) >
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
          screen.x +
            screen.w -
            p5.textWidth(messageObj.message) -
            screenBezel.horz -
            20,
          screen.y + screenBezel.vert * 6 + index * 20 * 1.5,
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
          screen.x +
            screen.w -
            p5.textWidth(messageObj.message) -
            screenBezel.horz -
            10,
          screen.y + screenBezel.vert * 6 + index * 20 * 1.5 + 3,
          p5.textWidth(messageObj.message) + 20,
          20,
          20
        );
      } else {
        p5.fill("rgba(230, 229, 235, 1)");
        p5.rect(
          screen.x + screenBezel.horz,
          screen.y + screenBezel.vert * 6 + index * 20 * 1.5,
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
          screen.x + screenBezel.horz + 10,
          screen.y + screenBezel.vert * 6 + index * 20 * 1.5 + 3,
          p5.textWidth(messageObj.message) + 20,
          20,
          20
        );
      }
      return false;
    });
  };

  drawPhone = (p5) => {
    // Phone
    let width = this.props.dimensions.width;
    let height = this.props.dimensions.height;

    let phone = {
      x: 10,
      y: p5.windowHeight - 10 - height,
      w: width - 10 * 2,
      h: height,
      border: { tl: 10, tr: 10, bl: 10, br: 10 }
    };
    p5.fill(120, 120, 120);
    p5.noStroke();
    p5.rect(
      phone.x,
      phone.y,
      phone.w,
      phone.h,
      phone.border.tl,
      phone.border.tr,
      phone.border.br,
      phone.border.bl
    );
    // Screen
    let screenBezel = { vert: 20, horz: 10 };
    let screen = {
      x: phone.x + screenBezel.horz,
      y: phone.y + screenBezel.vert,
      w: phone.w - screenBezel.horz * 2,
      h: phone.h - screenBezel.vert * 2,
      border: { tl: 5, tr: 5, bl: 5, br: 5 }
    };
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(
      screen.x,
      screen.y,
      screen.w,
      screen.h,
      screen.border.tl,
      screen.border.tr,
      screen.border.br,
      screen.border.bl
    );
    // Home Button
    let homeButton = {
      x: phone.x + phone.w / 2,
      y: phone.y + (phone.h - screenBezel.vert / 2),
      r: 15
    };
    p5.fill(190, 190, 190);
    p5.noStroke();
    p5.ellipse(homeButton.x, homeButton.y, homeButton.r);
    if (
      p5.mouseX <= homeButton.x + homeButton.r / 2 &&
      p5.mouseX >= homeButton.x - homeButton.r / 2 &&
      p5.mouseY <= homeButton.y + homeButton.r / 2 &&
      p5.mouseY >= homeButton.y - homeButton.r / 2
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleAppClicked("home");
          this.props.httpVisualize({status: 200, request: "GET", endpoint: "homeScreen"});
        }
      }
    }
    // Camera
    let camera = {
      x: phone.x + phone.w / 3,
      y: phone.y + screenBezel.vert / 2,
      r: 10
    };
    p5.fill(190, 190, 190);
    p5.noStroke();
    p5.ellipse(camera.x, camera.y, camera.r);
    // Speaker
    let speaker = {
      x: camera.x + screenBezel.vert,
      y: camera.y - camera.r / 2,
      w: phone.w / 3,
      h: camera.r,
      border: 5
    };
    p5.rect(speaker.x, speaker.y, speaker.w, speaker.h, speaker.border);
    // Battery
    let percentage = parseInt(this.props.percentage, 10);
    p5.fill(255, 255, 255);
    p5.stroke(0, 0, 0);
    p5.rect(screen.x + screen.w - 40, screen.y + 5, 35, 10, 4);
    if (percentage <= 20) {
      p5.fill(255, 0, 0);
    } else if (percentage < 50) {
      p5.fill(255, 125, 0);
    } else {
      p5.fill(0, 255, 0);
    }
    p5.noStroke();
    p5.rect(
      screen.x + screen.w - 39,
      screen.y + 6,
      parseInt(p5.map(percentage, 0, 100, 0, 34), 10),
      8,
      2
    );
    p5.fill(0, 0, 0);
    p5.textSize(12);
    p5.text(
      percentage + "%",
      screen.x + screen.w - (percentage < 100 ? 67 : 72),
      screen.y + 14
    );
    // Wifi
    p5.rect(screen.x + 5, screen.y + 9, 4, 6);
    p5.rect(screen.x + 10, screen.y + 7, 4, 8);
    p5.rect(screen.x + 15, screen.y + 5, 4, 10);
    p5.fill(0, 0, 0);
    p5.textSize(12);
    p5.text("WiFi", screen.x + 25, screen.y + 14);
  };

  render() {
    return (
      <Sketch
        preload={this.preload}
        setup={this.setup}
        draw={this.draw}
        keyPressed={(e) => {
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
          } else if (e.key === "Backspace") {
            messageText.pop();
          } else if (
            (e.keyCode > 8 && e.keyCode <= 46) ||
            (e.keyCode >= 91 && e.keyCode <= 93) ||
            (e.keyCode >= 112) & (e.keyCode <= 123) ||
            (e.keyCode >= 144 && e.keyCode <= 145)
          ) {
            if (e.keyCode === 32 && allowMessageEdit) {
              messageText.push(" ");
            } else {
              return;
            }
          } else {
            if (allowMessageEdit) {
              messageText.push(e.key);
            }
          }
        }}
      />
    );
  }
}
