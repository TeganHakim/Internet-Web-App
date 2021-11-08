import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import CodeProfile from "./assets/Images/Code-Profile.jpg";
import CatTyping from "./assets/Images/Cat_Typing.gif";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";

let gif;
let profile;
let followButton = { stroke: "rgb(50, 170, 255)", fill: "rgb(255, 255, 255)" };

let messageText = [];
let allowMessageEdit = true;

let regularFont;
let boldFont;

export default class SocialMediaPage extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(300, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(this.fr);
    profile = p5.loadImage(CodeProfile);
    gif = p5.loadImage(CatTyping);
    boldFont = p5.loadFont(BoldFont);
  };
  draw = (p5) => {
    // Regulate Text
    p5.textSize(12);
    p5.textFont(regularFont);
    p5.textAlign(p5.LEFT);

    // Cursor
    p5.cursor(p5.ARROW);

    // Screen variables
    let width = 300;
    let height = 600;
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

    // Social Media
    p5.fill(0, 0, 0);
    p5.rect(screen.x, screen.y + 23, screen.w, 2);

    // Post Title
    p5.fill("rgba(0, 0, 0, 0.5)");
    profile.resize(45, 45);
    p5.image(
      profile,
      screen.x + screenBezel.horz - 3,
      screen.y + screenBezel.vert + 13
    );
    p5.fill(0, 0, 0);
    p5.textSize(18);
    p5.textFont(boldFont);
    p5.text(
      "Coder Guy",
      screen.x + screenBezel.horz + 45,
      screen.y + screenBezel.vert + 30
    );
    p5.textSize(13);
    p5.textFont(regularFont);
    p5.fill("rgba(0, 0, 0, 0.6)");
    p5.text(
      "@coder_guy2021",
      screen.x + screenBezel.horz + 45,
      screen.y + screenBezel.vert + 50
    );
    if (this.props.follow) {
      p5.fill(followButton.stroke);
      p5.stroke(followButton.stroke);
    } else {
      p5.fill(followButton.fill);
      p5.stroke(followButton.stroke);
    }
    p5.strokeWeight(3);
    p5.rect(
      screen.x + screen.w - 85,
      screen.y + screenBezel.vert + 25,
      70,
      20,
      10
    );
    p5.strokeWeight(1);
    p5.textFont(boldFont);
    if (this.props.follow) {
      p5.fill(followButton.fill);
      p5.noStroke();
    } else {
      p5.fill(followButton.stroke);
      p5.noStroke();
    }
    p5.textAlign(p5.CENTER);
    p5.textFont(boldFont);
    if (this.props.follow) {
      p5.text(
        "Following",
        screen.x + screen.w - 85 + 35,
        screen.y + screenBezel.vert + 39
      );
    } else {
      p5.text(
        "Follow",
        screen.x + screen.w - 85 + 35,
        screen.y + screenBezel.vert + 39
      );
    }
    if (
      p5.mouseX <= screen.x + screen.w - 85 + 70 &&
      p5.mouseX >= screen.x + screen.w - 85 &&
      p5.mouseY <= screen.y + screenBezel.vert + 25 + 20 &&
      p5.mouseY >= screen.y + screenBezel.vert + 25
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleFollowButton(this.props.follow);
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
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 85,
      screen.w - screenBezel.horz * 2
    );

    // Post Image
    p5.image(
      gif,
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 125,
      screen.w - screenBezel.horz * 2,
      215
    );
    if (this.props.playGif) {
      gif.play();
    } else {
      gif.pause();
      p5.fill("rgba(0, 0, 0, 0.5)");
      p5.rect(
        screen.x +
          screenBezel.horz +
          (screen.w - screenBezel.horz * 2) / 2 -
          10,
        screen.y + screenBezel.vert + 125 + 250 / 2 - 25,
        10,
        50,
        5
      );
      p5.rect(
        screen.x +
          screenBezel.horz +
          (screen.w - screenBezel.horz * 2) / 2 +
          10,
        screen.y + screenBezel.vert + 125 + 250 / 2 - 25,
        10,
        50,
        5
      );
    }
    if (
      p5.mouseX <=
        screen.x + screenBezel.horz + screen.w - screenBezel.horz * 2 &&
      p5.mouseX >= screen.x + screenBezel.horz &&
      p5.mouseY <= screen.y + screenBezel.vert + 125 + 215 &&
      p5.mouseY >= screen.y + screenBezel.vert + 125
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
      screen.x + screenBezel.horz,
      screen.y + screen.h - 185
    );
    p5.fill("rgba(0, 0, 0, 1)");
    p5.textSize(35);
    p5.textFont("Helvetica");
    if (this.props.liked) {
      p5.fill(255, 0, 0);
      p5.text(
        "♡",
        screen.x + screenBezel.horz,
        screen.y + screen.h - 180,
        screen.w - screenBezel.horz * 2
      );
      p5.rect(
        screen.x + screenBezel.horz + 2,
        screen.y + screen.h - 180 + 6,
        10,
        10,
        11
      );
      p5.rect(
        screen.x + screenBezel.horz + 12,
        screen.y + screen.h - 180 + 5,
        10,
        10,
        11
      );
      p5.rect(
        screen.x + screenBezel.horz + 7,
        screen.y + screen.h - 180 + 11,
        10,
        10,
        11
      );
      p5.rect(
        screen.x + screenBezel.horz + 4,
        screen.y + screen.h - 180 + 13,
        5,
        5,
        11
      );
      p5.rect(
        screen.x + screenBezel.horz + 15,
        screen.y + screen.h - 180 + 13,
        5,
        5,
        11
      );
      p5.rect(
        screen.x + screenBezel.horz + 10,
        screen.y + screen.h - 180 + 20,
        3,
        3,
        11
      );
      p5.fill(0, 0, 0);
    } else {
      p5.fill(0, 0, 0);
      p5.text(
        "♡",
        screen.x + screenBezel.horz,
        screen.y + screen.h - 180,
        screen.w - screenBezel.horz * 2
      );
    }
    p5.textFont(regularFont);
    p5.textSize(16);
    p5.text(
      `${this.props.numLikes.toLocaleString()}`,
      screen.x + screenBezel.horz + 27,
      screen.y + screen.h - 160,
      screen.w - screenBezel.horz * 2
    );
    if (
      p5.mouseX <= screen.x + screenBezel.horz + 25 &&
      p5.mouseX >= screen.x + screenBezel.horz &&
      p5.mouseY <= screen.y + screen.h - 180 + 25 &&
      p5.mouseY >= screen.y + screen.h - 180
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleLikesChanged(this.props.liked);
        }
      }
    }
    p5.fill("rgba(0, 0, 0, 0.2)");
    p5.rect(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 125,
      screen.w - screenBezel.horz * 2,
      1
    );

    // Comments
    p5.fill("rgba(0, 0, 0, 1)");
    p5.text(
      "Comments:",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 100
    );
    p5.fill("rgba(0, 0, 0, 0.5)");
    p5.ellipse(
      screen.x + screenBezel.horz + 15,
      screen.y + screen.h - screenBezel.vert - 75,
      30
    );
    p5.fill(255, 255, 255);
    p5.stroke(255, 255, 255);
    p5.text(
      "VC",
      screen.x + screenBezel.horz + 5,
      screen.y + screen.h - screenBezel.vert - 70
    );
    p5.noStroke();
    p5.fill("rgba(0, 0, 0, 1)");
    p5.textFont(boldFont);
    p5.textSize(15);
    p5.text(
      "vint_cerf1943",
      screen.x + screenBezel.horz + 35,
      screen.y + screen.h - screenBezel.vert - 80
    );
    p5.textFont(regularFont);
    p5.text(
      "\t\t\t\t\t\t\t\t\t\t\t\t\t Haha! This \nis so relatable!",
      screen.x + screenBezel.horz + 35,
      screen.y + screen.h - screenBezel.vert - 80
    );
    if (this.props.comment !== null) {
      p5.fill("rgba(0, 0, 0, 0.5)");
      p5.ellipse(
        screen.x + screenBezel.horz + 15,
        screen.y + screen.h - screenBezel.vert - 75 + 35,
        30
      );
      p5.fill(255, 255, 255);
      p5.stroke(255, 255, 255);
      p5.text(
        "AM",
        screen.x + screenBezel.horz + 4,
        screen.y + screen.h - screenBezel.vert - 70 + 35
      );
      p5.noStroke();
      p5.fill("rgba(0, 0, 0, 1)");
      p5.textFont(boldFont);
      p5.textSize(15);
      p5.text(
        "anonymous",
        screen.x + screenBezel.horz + 35,
        screen.y + screen.h - screenBezel.vert - 80 + 35
      );
      p5.textFont(regularFont);
      p5.text(
        `\t\t\t\t\t\t\t\t\t\t\t ${this.props.comment}`,
        screen.x + screenBezel.horz + 35,
        screen.y + screen.h - screenBezel.vert - 45,
        screen.w - 55
      );
      if (
        p5.mouseX <= screen.x + screenBezel.horz + screen.w - 20 &&
        p5.mouseX >= screen.x + screenBezel.horz &&
        p5.mouseY <= screen.y + screen.h - screenBezel.vert - 90 + 35 + 30 &&
        p5.mouseY >= screen.y + screen.h - screenBezel.vert - 90 + 35
      ) {
        p5.cursor(p5.HAND);
        p5.stroke(0, 0, 0);
        p5.fill(255, 255, 255);
        p5.rect(
          screen.x + screenBezel.horz + screen.w - 65,
          screen.y + screen.h - screenBezel.vert - 90 + 31,
          55,
          35
        );
        p5.stroke(255, 0, 0);
        p5.strokeWeight(3);
        p5.line(
          screen.x + screenBezel.horz + screen.w - 50,
          screen.y + screen.h - screenBezel.vert - 90 + 40,
          screen.x + screenBezel.horz + screen.w - 25,
          screen.y + screen.h - screenBezel.vert - 90 + 55
        );
        p5.line(
          screen.x + screenBezel.horz + screen.w - 50,
          screen.y + screen.h - screenBezel.vert - 90 + 55,
          screen.x + screenBezel.horz + screen.w - 25,
          screen.y + screen.h - screenBezel.vert - 90 + 40
        );
        p5.noStroke();
        p5.strokeWeight(1);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleCommentSent(null, true);
          }
        }
      }
    }
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
    p5.textSize(14);
    p5.textAlign(p5.LEFT);
    p5.textFont(regularFont);
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
        "Enter a comment",
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
  };

  drawPhone = (p5) => {
    // Phone
    let width = 300;
    let height = 600;

    let phone = {
      x: 10,
      y: p5.windowHeight - 10 - height,
      w: width - 10 * 2,
      h: height,
      border: { tl: 10, tr: 10, bl: 10, br: 10 }
    };
    p5.fill(0, 0, 0);
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
    p5.fill(128, 128, 128);
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
        this.props.handleAppClicked("home");
      }
    }
    // Camera
    let camera = {
      x: phone.x + phone.w / 3,
      y: phone.y + screenBezel.vert / 2,
      r: 10
    };
    p5.fill(128, 128, 128);
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
        }}
      />
    );
  }
}
