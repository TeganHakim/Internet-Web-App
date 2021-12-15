import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;

export default class MusicPage extends Component {
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

    // Screen variables
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

    // Music icon
    p5.fill(0, 0, 0);
    p5.ellipse(screen.x + screen.w / 2, screen.y + screen.h / 6, 100);
    p5.fill(100, 255, 100);
    p5.ellipse(screen.x + screen.w / 2 - 20, screen.y + screen.h / 6 + 20, 20);
    p5.ellipse(screen.x + screen.w / 2 + 20, screen.y + screen.h / 6 + 20, 20);
    p5.rect(screen.x + screen.w / 2 - 20, screen.y + screen.h / 8, 10, 50, 5);
    p5.rect(screen.x + screen.w / 2 + 20, screen.y + screen.h / 8, 10, 50, 5);
    p5.rect(screen.x + screen.w / 2 - 20, screen.y + screen.h / 8, 50, 10, 5);
    // Music content
    p5.fill(0, 0, 0);
    p5.rect(
      screen.x + screen.w / 2 - 110,
      screen.y + screen.h / 2.5,
      220,
      150,
      15
    );
    p5.fill(255, 255, 255);
    p5.textAlign(p5.CENTER);
    p5.textSize(18);
    p5.textFont("Courier New");
    p5.textStyle(p5.BOLD);
    p5.text(
      `${this.props.currentSong.title}`,
      screen.x + screen.w / 2 - 100,
      screen.y + screen.h / 2.5 + 15,
      200,
      20
    );
    p5.textSize(14);
    p5.textStyle(p5.ITALIC);
    p5.text(
      `${this.props.currentSong.author}`,
      screen.x + screen.w / 2 - 100,
      screen.y + screen.h / 2.5 + 38,
      200,
      20
    );
    p5.textStyle(p5.NORMAL);
    p5.textSize(12);
    p5.rect(
      screen.x + screen.w / 2 - 90,
      screen.y + screen.h / 2.5 + 110,
      5,
      20,
      15
    );
    p5.triangle(
      screen.x + screen.w / 2 - 90,
      screen.y + screen.h / 2.5 + 120,
      screen.x + screen.w / 2 - 75,
      screen.y + screen.h / 2.5 + 110,
      screen.x + screen.w / 2 - 75,
      screen.y + screen.h / 2.5 + 130
    );
    if (
      p5.mouseX <= screen.x + screen.w / 2 - 75 &&
      p5.mouseX >= screen.x + screen.w / 2 - 90 &&
      p5.mouseY <= screen.y + screen.h / 2.5 + 130 &&
      p5.mouseY >= screen.y + screen.h / 2.5 + 110
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleSongChanged(this.props.currentSong.index, "left");
          // this.props.httpVisualize({status: 200, request: "GET", endpoint: "switchSong"});
        }
      }
    }
    p5.rect(
      screen.x + screen.w / 2 + 90,
      screen.y + screen.h / 2.5 + 110,
      5,
      20,
      15
    );
    p5.triangle(
      screen.x + screen.w / 2 + 90,
      screen.y + screen.h / 2.5 + 120,
      screen.x + screen.w / 2 + 75,
      screen.y + screen.h / 2.5 + 110,
      screen.x + screen.w / 2 + 75,
      screen.y + screen.h / 2.5 + 130
    );
    if (
      p5.mouseX <= screen.x + screen.w / 2 + 95 &&
      p5.mouseX >= screen.x + screen.w / 2 + 75 &&
      p5.mouseY <= screen.y + screen.h / 2.5 + 130 &&
      p5.mouseY >= screen.y + screen.h / 2.5 + 110
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleSongChanged(this.props.currentSong.index, "right");
          // this.props.httpVisualize({status: 200, request: "GET", endpoint: "switchSong"});
        }
      }
    }
    p5.rect(
      screen.x + screen.w / 2 - 85,
      screen.y + screen.h / 2.5 + 80,
      175,
      5,
      10
    );
    p5.fill(255, 0, 0);
    p5.rect(
      screen.x + screen.w / 2 - 85,
      screen.y + screen.h / 2.5 + 80,
      p5.map(
        this.props.audioObj.currentTime,
        0,
        this.props.audioObj.duration,
        0,
        175
      ),
      5,
      10
    );
    p5.ellipse(
      screen.x +
        screen.w / 2 -
        85 +
        p5.map(
          this.props.audioObj.currentTime,
          0,
          this.props.audioObj.duration,
          0,
          175
        ),
      screen.y + screen.h / 2.5 + 82.5,
      12
    );
    p5.fill(255, 255, 255);
    const playButton = {
      x1: screen.x + screen.w / 2 + 15,
      y1: screen.y + screen.h / 2.5 + 120,
      x2: screen.x + screen.w / 2 - 10,
      y2: screen.y + screen.h / 2.5 + 110,
      x3: screen.x + screen.w / 2 - 10,
      y3: screen.y + screen.h / 2.5 + 130
    };
    if (
      p5.mouseX <= playButton.x1 &&
      p5.mouseX >= playButton.x2 &&
      p5.mouseY <= playButton.y3 &&
      p5.mouseY >= playButton.y2
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleMusicPlayer(this.props.playMusic);
          // this.props.httpVisualize({status: 200, request: "GET", endpoint: "playPauseSong"});
        }
      }
    }
    if (this.props.playMusic === false) {
      p5.triangle(
        playButton.x1,
        playButton.y1,
        playButton.x2,
        playButton.y2,
        playButton.x3,
        playButton.y3
      );
    } else {
      p5.rect(
        screen.x + screen.w / 2 - 7,
        screen.y + screen.h / 2.5 + 110,
        5,
        20,
        15
      );
      p5.rect(
        screen.x + screen.w / 2 + 2.5,
        screen.y + screen.h / 2.5 + 110,
        5,
        20,
        15
      );
    }
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
        this.props.httpVisualize({status: 200, request: "GET", endpoint: "homeScreen"});
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
      <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}
