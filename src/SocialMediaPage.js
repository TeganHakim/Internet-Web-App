import React, { Component } from "react";
// import Sketch from "react-p5";
import drawPhone from "./p5_functions/DrawPhone";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./styles/style.css";
import CodeProfile from "./assets/Images/Code-Profile.jpg";
import CatTyping from "./assets/Images/Cat-Typing.gif";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";
import HeartFilled from "./assets/Images/Heart-Filled.png";
import HeartOutline from "./assets/Images/Heart-Outline.png";

let gif;
let profile;
let heartFilled;
let heartOutline;
let followButton = { stroke: "rgb(50, 170, 255)", fill: "rgb(255, 255, 255)" };

let messageText = [];
let allowMessageEdit = true;

let regularFont;
let boldFont;

export default class SocialMediaPage extends Component {
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
      p5.frameRate(this.fr);
      profile = p5.loadImage(CodeProfile);
      gif = p5.loadImage(CatTyping);
      heartFilled = p5.loadImage(HeartFilled);
      heartOutline = p5.loadImage(HeartOutline);
      boldFont = p5.loadFont(BoldFont);
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
  
      // Social Media
      p5.fill(0, 0, 0);
      p5.rect(this.props.screen.x, this.props.screen.y + 23, this.props.screen.w, 2);
  
      // Post Title
      p5.fill("rgba(0, 0, 0, 0.5)");
      profile.resize(45, 45);
      p5.image(
        profile,
        this.props.screen.x + this.props.screenBezel.horz - 3,
        this.props.screen.y + this.props.screenBezel.vert + 13
      );
      p5.fill(0, 0, 0);
      p5.textSize(18);
      p5.textFont(boldFont);
      p5.text(
        "Coder Guy",
        this.props.screen.x + this.props.screenBezel.horz + 45,
        this.props.screen.y + this.props.screenBezel.vert + 30
      );
      p5.textSize(13);
      p5.textFont(regularFont);
      p5.fill("rgba(0, 0, 0, 0.6)");
      p5.text(
        "@coder_guy2021",
        this.props.screen.x + this.props.screenBezel.horz + 45,
        this.props.screen.y + this.props.screenBezel.vert + 50
      );
      if (this.props.followed) {
        p5.fill(followButton.stroke);
        p5.stroke(followButton.stroke);
      } else {
        p5.fill(followButton.fill);
        p5.stroke(followButton.stroke);
      }
      p5.strokeWeight(3);
      p5.rect(
        this.props.screen.x + this.props.screen.w - 85,
        this.props.screen.y + this.props.screenBezel.vert + 25,
        70,
        20,
        10
      );
      p5.strokeWeight(1);
      p5.textFont(boldFont);
      if (this.props.followed) {
        p5.fill(followButton.fill);
        p5.noStroke();
      } else {
        p5.fill(followButton.stroke);
        p5.noStroke();
      }
      p5.textAlign(p5.CENTER);
      p5.textFont(boldFont);
      if (this.props.followed) {
        p5.text(
          "Following",
          this.props.screen.x + this.props.screen.w - 85 + 35,
          this.props.screen.y + this.props.screenBezel.vert + 39
        );
      } else {
        p5.text(
          "Follow",
          this.props.screen.x + this.props.screen.w - 85 + 35,
          this.props.screen.y + this.props.screenBezel.vert + 39
        );
      }
      if (
        p5.mouseX <= this.props.screen.x + this.props.screen.w - 85 + 70 &&
        p5.mouseX >= this.props.screen.x + this.props.screen.w - 85 &&
        p5.mouseY <= this.props.screen.y + this.props.screenBezel.vert + 25 + 20 &&
        p5.mouseY >= this.props.screen.y + this.props.screenBezel.vert + 25
      ) {
        p5.cursor(p5.HAND);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            if (this.props.followed) {
              this.props.setPhonethis.props.Screen("Loading");
              this.props.httpVisualize({status: 200, request: "POST", endpoint: "unfollow"});
              this.props.unfollow();
            } else {
              this.props.setPhonethis.props.Screen("Loading");
              this.props.httpVisualize({status: 200, request: "POST", endpoint: "follow"});
              this.props.follow();
            }
          }
        }
      }
  
      // Post Caption
      p5.textAlign(p5.LEFT);
      p5.fill(0, 0, 0);
      p5.noStroke();
      p5.textFont(regularFont);
      p5.textSize(18);
      p5.text(
        "Me at 3:00 am trying to fix the bug I found last night.",
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert + 85,
        this.props.screen.w - this.props.screenBezel.horz * 2
      );
  
      // Post Image
      p5.image(
        gif,
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert + 125,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        215
      );
      if (this.props.playGif) {
        gif.play();
      } else {
        gif.pause(); 
        p5.fill("rgba(0, 0, 0, 0.5)");
        p5.rect(
          this.props.screen.x +
          this.props.screenBezel.horz +
          (this.props.screen.w - this.props.screenBezel.horz * 2) / 2 -
          10,
          this.props.screen.y + this.props.screenBezel.vert + 125 + 250 / 2 - 25,
          10,
          50,
          5
          );
          p5.rect(
            this.props.screen.x +
            this.props.screenBezel.horz +
            (this.props.screen.w - this.props.screenBezel.horz * 2) / 2 +
            10,
            this.props.screen.y + this.props.screenBezel.vert + 125 + 250 / 2 - 25,
            10,
            50,
            5
            );
      }
      if (
        p5.mouseX <=
          this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - this.props.screenBezel.horz * 2 &&
        p5.mouseX >= this.props.screen.x + this.props.screenBezel.horz &&
        p5.mouseY <= this.props.screen.y + this.props.screenBezel.vert + 125 + 215 &&
        p5.mouseY >= this.props.screen.y + this.props.screenBezel.vert + 125
      ) {
        p5.cursor(p5.HAND);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handlePlayGif(this.props.playGif);
          }
        }
      }
      // Post Utilities
      const todaysDate = Date()
        .toLocaleString("default", { month: "long" })
        .split(" ");
      p5.textSize(12);
      p5.fill("rgba(0, 0, 0, 0.6)");
      p5.text(
        `3:01 AM • ${todaysDate[2] + " " + todaysDate[1] + " " + todaysDate[3]}`,
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screen.h - 185
      );
      p5.fill("rgba(0, 0, 0, 1)");
      p5.textSize(43);
      p5.textFont("Helvetica");
      
      if (this.props.liked) {
        p5.image(heartFilled, this.props.screen.x + this.props.screenBezel.horz,
          this.props.screen.y + this.props.screen.h - 180, 24, 27);
      } else {
        p5.image(heartOutline, this.props.screen.x + this.props.screenBezel.horz,
          this.props.screen.y + this.props.screen.h - 180, 24, 27);
      }
      p5.fill(0, 0, 0);
      p5.stroke(0, 0, 0);
      p5.text(
        "♡",
        this.props.screen.x + this.props.screenBezel.horz-2,
        this.props.screen.y + this.props.screen.h - 185,
        this.props.screen.w - this.props.screenBezel.horz * 2
        );
      p5.noStroke();
      p5.textFont(regularFont);
      p5.textSize(16);
      p5.text(
        ` ${this.props.numLikes.toLocaleString()}`,
        this.props.screen.x + this.props.screenBezel.horz + 27,
        this.props.screen.y + this.props.screen.h - 160,
        this.props.screen.w - this.props.screenBezel.horz * 2
      );
      if (
        p5.mouseX <= this.props.screen.x + this.props.screenBezel.horz + 25 &&
        p5.mouseX >= this.props.screen.x + this.props.screenBezel.horz &&
        p5.mouseY <= this.props.screen.y + this.props.screen.h - 180 + 25 &&
        p5.mouseY >= this.props.screen.y + this.props.screen.h - 180
      ) {
        p5.cursor(p5.HAND);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            if (this.props.liked) {
              this.props.setPhonethis.props.Screen("Loading");
              this.props.httpVisualize({status: 200, request: "POST", endpoint: "unlike"});
              this.props.unlike();
            } else {
              this.props.setPhonethis.props.Screen("Loading");
              this.props.httpVisualize({status: 200, request: "POST", endpoint: "like"});
              this.props.like();
            }
            this.props.handleLikesChanged(this.props.liked)
          }
        }
      }
      p5.fill("rgba(0, 0, 0, 0.2)");
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 125,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        1
      );
  
      // Comments
      p5.fill("rgba(0, 0, 0, 1)");
      p5.text(
        "Comments:",
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 100
      );
      p5.fill("rgba(0, 0, 0, 0.5)");
      p5.ellipse(
        this.props.screen.x + this.props.screenBezel.horz + 15,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 75,
        30
      );
      p5.fill(255, 255, 255);
      p5.stroke(255, 255, 255);
      p5.text(
        "VC",
        this.props.screen.x + this.props.screenBezel.horz + 5,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 70
      );
      p5.noStroke();
      p5.fill("rgba(0, 0, 0, 1)");
      p5.textFont(boldFont);
      p5.textSize(15);
      p5.text(
        "vint_cerf1943",
        this.props.screen.x + this.props.screenBezel.horz + 35,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 80
      );
      p5.textFont(regularFont);
      p5.text(
        "\t\t\t\t\t\t\t\t\t\t\t\t\t Haha! This \nis so relatable!",
        this.props.screen.x + this.props.screenBezel.horz + 35,
        this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 80
      );
      if (this.props.comment !== null) {
        p5.fill("rgba(0, 0, 0, 0.5)");
        p5.ellipse(
          this.props.screen.x + this.props.screenBezel.horz + 15,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 75 + 35,
          30
        );
        p5.fill(255, 255, 255);
        p5.stroke(255, 255, 255);
        p5.text(
          "AM",
          this.props.screen.x + this.props.screenBezel.horz + 4,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 70 + 35
        );
        p5.noStroke();
        p5.fill("rgba(0, 0, 0, 1)");
        p5.textFont(boldFont);
        p5.textSize(15);
        p5.text(
          "anonymous",
          this.props.screen.x + this.props.screenBezel.horz + 35,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 80 + 35
        );
        p5.textFont(regularFont);
        p5.text(
          `\t\t\t\t\t\t\t\t\t\t\t ${this.props.comment}`,
          this.props.screen.x + this.props.screenBezel.horz + 35,
          this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 45,
          this.props.screen.w - 55
        );
        if (
          p5.mouseX <= this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 20 &&
          p5.mouseX >= this.props.screen.x + this.props.screenBezel.horz &&
          p5.mouseY <= this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 35 + 30 &&
          p5.mouseY >= this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 35
        ) {
          p5.cursor(p5.HAND);
          p5.stroke(0, 0, 0);
          p5.fill(255, 255, 255);
          p5.rect(
            this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 65,
            this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 31,
            55,
            35
          );
          p5.stroke(255, 0, 0);
          p5.strokeWeight(3);
          p5.line(
            this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 50,
            this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 40,
            this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 25,
            this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 55
          );
          p5.line(
            this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 50,
            this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 55,
            this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - 25,
            this.props.screen.y + this.props.screen.h - this.props.screenBezel.vert - 90 + 40
          );
          p5.noStroke();
          p5.strokeWeight(1);
          if (p5.mouseIsPressed) {
            if (p5.mouseButton === p5.LEFT) {
              this.props.setPhonethis.props.Screen("Loading");
              this.props.httpVisualize({status: 200, request: "DEL", endpoint: "deleteComment"});
              this.props.handleCommentSent(null, true);
            }
          }
        }
      }
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
      p5.textSize(14);
      p5.textAlign(p5.LEFT);
      p5.textFont(regularFont);
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
          "Enter a comment",
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
    };
  
    keyPressed = (e) => {
      if (e.key === "Enter") {
        this.props.setPhonethis.props.Screen("Loading");
        this.props.httpVisualize({status: 200, request: "POST", endpoint: "commentSent"});
        this.props.handleCommentSent(
          messageText.join("").charAt(0).toUpperCase() +
            messageText.join("").slice(1),
          false
        );
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
    };
  }
  
  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}
