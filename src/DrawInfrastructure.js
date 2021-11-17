import React, { Component, useEffect } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";
import { rgbToHex } from "@mui/material";

let regularFont;
let boldFont;


let path; 
let cellTowerPingColor = "rgb(0, 255, 0)";
let pinged = false;

let httpSignalPos;
let previousSignal = null;
let drawSignal = false;

let width = 300;
let height = 600;
let phone; 


export default class DrawInfrastucture extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
    boldFont = p5.loadFont(BoldFont);
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
    path = [{x: phone.x + (phone.w/2)/2, y: phone.y - 100}, 
      {x: phone.x + phone.w/2 - 10, y: phone.y - 250}, 
      {x: phone.x + phone.w/2 + 10, y: phone.y - 250}, 
      {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100}, 
      {x: phone.x + (phone.w/2)/2, y: phone.y - 100},
      {x: phone.x + (phone.w/2) + (phone.w/2)/3.5, y: phone.y - 175}, 
      {x: phone.x + (phone.w/2.4), y: phone.y - 210},
      {moveTo: {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100}},
      {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100},
      {x: phone.x + (phone.w/2.8), y: phone.y - 175},
      {x: phone.x + (phone.w/2) + (phone.w/2)/5.4, y: phone.y - 210}, 
      {moveTo: {x: phone.x + phone.w/2, y: phone.y - 250}}, 
      {x: phone.x + phone.w/2, y: phone.y - 250}, 
      {x: phone.x + phone.w/2, y: phone.y - 300, size: 20},
      {x: phone.x + phone.w/2, y: phone.y - 300,},
      {moveTo: {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100}},
      {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100},
      {x: phone.x + phone.w/2 + 200, y: phone.y - 150}
    ];
    
    httpSignalPos = {x: phone.x + phone.w/2, y: phone.y, size: 0, opcaity: 1, stop: false, speed: 5};
  };
  draw = (p5) => {
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
    
    this.drawInfrastucture(p5);
    this.visualizeSignal(p5);    
  }
  drawInfrastucture = (p5) => {
    p5.background('rgba(255, 255, 255, 1)');
    p5.stroke(0, 0, 0)
    for (let i=0; i<path.length; i++) {
      p5.strokeWeight(10);
      if (pinged) {
        if (i === 13) {
          p5.stroke(cellTowerPingColor);
        } else {
          p5.stroke(0, 0, 0);         
        }
      }
      if (i !== path.length - 1) {
        if (path[i].hasOwnProperty('size')) {
          p5.strokeWeight(path[i].size);
        }
        if (!path[i].hasOwnProperty('moveTo')) {
          p5.line(path[i].x, path[i].y, path[i+1].x, path[i+1].y);       
        }
      }
    }
    pinged = false;
    p5.strokeWeight(1);
  }
  
  visualizeSignal = (p5) => {
    if (this.props.httpSignal !== previousSignal) {
      drawSignal = true;
      if (httpSignalPos.y <= 80 && httpSignalPos.stop === true) {
        httpSignalPos.y = phone.y;
        httpSignalPos.size = 0;
        httpSignalPos.stop = false;
      }
    } 

    if (drawSignal) {  
      p5.noFill();
      p5.stroke(80, 190, 255);
      p5.strokeWeight(5);
      if (httpSignalPos.y <= 80) {
        httpSignalPos.stop = true;
        previousSignal = this.props.httpSignal;
      }
      if (httpSignalPos.stop === false) {
        for (let i=0; i<5; i++) {
          let tempY = httpSignalPos.y-(i*10)
          if (tempY < phone.y - 280) {
            tempY = phone.y - 280;
            pinged = true;
          } 
          p5.arc(httpSignalPos.x, tempY, 50, 50, p5.PI + httpSignalPos.size + (0.04 * i), p5.PI*2 - httpSignalPos.size - (0.04 * i));
        }
        httpSignalPos.y -= httpSignalPos.speed;
        httpSignalPos.size += 0.005 * httpSignalPos.speed;
      } 
    }
    
    if (pinged) {
      cellTowerPingColor = "rgb(0, 255, 0)";
    }

    // Revert to normal
    p5.strokeWeight(1);
    p5.fill(0, 0, 0);


    // Request Text
    p5.noFill();
    p5.stroke(0, 0, 0);
    p5.rect(phone.x + (phone.w/2)/3, phone.y - 80, phone.w / 1.5, 25);
    if (this.props.httpSignal) {
      p5.fill(0, 0, 0);
      p5.noStroke();
      p5.textFont(boldFont);
      p5.textSize(12);
      p5.text(this.props.httpSignal.request, phone.x + (phone.w/2)/3 + 10, phone.y - 80 + (25/1.5))
      p5.textFont(regularFont);
      p5.text("/" + this.props.httpSignal.endpoint, phone.x + (phone.w/2)/3 + 15 + p5.textWidth(this.props.httpSignal.request), phone.y - 80 + (25/1.5))
      p5.textSize(20);
      p5.text("|", phone.x + (phone.w/2)/3 + 140, phone.y - 78.5 + (25/1.5))
      p5.textSize(12);
      p5.text(this.props.httpSignal.status, phone.x + (phone.w/2)/3 + 155, phone.y - 80 + (25/1.5))
    }
  }
  render() {
    return (
        <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}