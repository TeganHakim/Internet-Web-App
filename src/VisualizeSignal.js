import React, { Component, useEffect } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;

let width = 300;
let height = 600;
let phone; 

let httpSignalPos;

export default class VisualizeSignal extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(this.fr);
    phone = {
        x: 10,
        y: p5.windowHeight - 10 - height,
        w: width - 10 * 2,
        h: height,
        border: { tl: 10, tr: 10, bl: 10, br: 10 }
    };
    httpSignalPos = {x: phone.x + phone.w/2, y: phone.y, size: 0, stop: false};
  };
  draw = (p5) => {
    p5.background('rgba(255, 255, 255, 0)')
    // Regulate Text
    p5.textSize(12);
    p5.textStyle(p5.NORMAL);
    p5.textFont(regularFont);
    p5.textAlign(p5.LEFT);
    // Cursor
    p5.cursor(p5.ARROW);

    // Screen Variables
    
    let screenBezel = { vert: 20, horz: 10 };
    let screen = {
      x: phone.x + screenBezel.horz,
      y: phone.y + screenBezel.vert,
      w: phone.w - screenBezel.horz * 2,
      h: phone.h - screenBezel.vert * 2,
      border: { tl: 5, tr: 5, bl: 5, br: 5 }
    };
    
    if (this.props.httpsSignal !== null) {
      p5.noFill();
      p5.stroke(80, 190, 255);
      if (httpSignalPos.y <= 80) {
        httpSignalPos.stop = true;
      }
      if (httpSignalPos.stop === false) {
        p5.arc(httpSignalPos.x, httpSignalPos.y, 50, 50, p5.PI + httpSignalPos.size, p5.PI*2 - httpSignalPos.size);
        httpSignalPos.y -= 1;
        httpSignalPos.size += 0.005;
  
      }
    }

    // Revert to normal
    p5.fill(0, 0, 0);
  }
  render() {
    return (
        <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}