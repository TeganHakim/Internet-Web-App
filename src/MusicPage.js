import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import drawPhone from "./p5_functions/DrawPhone";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;

export default class MusicPage extends Component {
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
  
      // Music icon
      p5.fill(0, 0, 0);
      p5.ellipse(this.props.screen.x + this.props.screen.w / 2, this.props.screen.y + this.props.screen.h / 6, 100);
      p5.fill(100, 255, 100);
      p5.ellipse(this.props.screen.x + this.props.screen.w / 2 - 20, this.props.screen.y + this.props.screen.h / 6 + 20, 20);
      p5.ellipse(this.props.screen.x + this.props.screen.w / 2 + 20, this.props.screen.y + this.props.screen.h / 6 + 20, 20);
      p5.rect(this.props.screen.x + this.props.screen.w / 2 - 20, this.props.screen.y + this.props.screen.h / 8, 10, 50, 5);
      p5.rect(this.props.screen.x + this.props.screen.w / 2 + 20, this.props.screen.y + this.props.screen.h / 8, 10, 50, 5);
      p5.rect(this.props.screen.x + this.props.screen.w / 2 - 20, this.props.screen.y + this.props.screen.h / 8, 50, 10, 5);
      // Music content
      p5.fill(0, 0, 0);
      p5.rect(
        this.props.screen.x + this.props.screen.w / 2 - 110,
        this.props.screen.y + this.props.screen.h / 2.5,
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
        this.props.screen.x + this.props.screen.w / 2 - 100,
        this.props.screen.y + this.props.screen.h / 2.5 + 15,
        200,
        20
      );
      p5.textSize(14);
      p5.textStyle(p5.ITALIC);
      p5.text(
        `${this.props.currentSong.author}`,
        this.props.screen.x + this.props.screen.w / 2 - 100,
        this.props.screen.y + this.props.screen.h / 2.5 + 38,
        200,
        20
      );
      p5.textStyle(p5.NORMAL);
      p5.textSize(12);
      p5.rect(
        this.props.screen.x + this.props.screen.w / 2 - 90,
        this.props.screen.y + this.props.screen.h / 2.5 + 110,
        5,
        20,
        15
      );
      p5.triangle(
        this.props.screen.x + this.props.screen.w / 2 - 90,
        this.props.screen.y + this.props.screen.h / 2.5 + 120,
        this.props.screen.x + this.props.screen.w / 2 - 75,
        this.props.screen.y + this.props.screen.h / 2.5 + 110,
        this.props.screen.x + this.props.screen.w / 2 - 75,
        this.props.screen.y + this.props.screen.h / 2.5 + 130
      );
      if (
        p5.mouseX <= this.props.screen.x + this.props.screen.w / 2 - 75 &&
        p5.mouseX >= this.props.screen.x + this.props.screen.w / 2 - 90 &&
        p5.mouseY <= this.props.screen.y + this.props.screen.h / 2.5 + 130 &&
        p5.mouseY >= this.props.screen.y + this.props.screen.h / 2.5 + 110
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
        this.props.screen.x + this.props.screen.w / 2 + 90,
        this.props.screen.y + this.props.screen.h / 2.5 + 110,
        5,
        20,
        15
      );
      p5.triangle(
        this.props.screen.x + this.props.screen.w / 2 + 90,
        this.props.screen.y + this.props.screen.h / 2.5 + 120,
        this.props.screen.x + this.props.screen.w / 2 + 75,
        this.props.screen.y + this.props.screen.h / 2.5 + 110,
        this.props.screen.x + this.props.screen.w / 2 + 75,
        this.props.screen.y + this.props.screen.h / 2.5 + 130
      );
      if (
        p5.mouseX <= this.props.screen.x + this.props.screen.w / 2 + 95 &&
        p5.mouseX >= this.props.screen.x + this.props.screen.w / 2 + 75 &&
        p5.mouseY <= this.props.screen.y + this.props.screen.h / 2.5 + 130 &&
        p5.mouseY >= this.props.screen.y + this.props.screen.h / 2.5 + 110
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
        this.props.screen.x + this.props.screen.w / 2 - 85,
        this.props.screen.y + this.props.screen.h / 2.5 + 80,
        175,
        5,
        10
      );
      p5.fill(255, 0, 0);
      p5.rect(
        this.props.screen.x + this.props.screen.w / 2 - 85,
        this.props.screen.y + this.props.screen.h / 2.5 + 80,
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
        this.props.screen.x +
          this.props.screen.w / 2 -
          85 +
          p5.map(
            this.props.audioObj.currentTime,
            0,
            this.props.audioObj.duration,
            0,
            175
          ),
        this.props.screen.y + this.props.screen.h / 2.5 + 82.5,
        12
      );
      p5.fill(255, 255, 255);
      const playButton = {
        x1: this.props.screen.x + this.props.screen.w / 2 + 15,
        y1: this.props.screen.y + this.props.screen.h / 2.5 + 120,
        x2: this.props.screen.x + this.props.screen.w / 2 - 10,
        y2: this.props.screen.y + this.props.screen.h / 2.5 + 110,
        x3: this.props.screen.x + this.props.screen.w / 2 - 10,
        y3: this.props.screen.y + this.props.screen.h / 2.5 + 130
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
          this.props.screen.x + this.props.screen.w / 2 - 7,
          this.props.screen.y + this.props.screen.h / 2.5 + 110,
          5,
          20,
          15
        );
        p5.rect(
          this.props.screen.x + this.props.screen.w / 2 + 2.5,
          this.props.screen.y + this.props.screen.h / 2.5 + 110,
          5,
          20,
          15
        );
      }
    };
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}
