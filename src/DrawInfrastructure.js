import React, { Component, useEffect } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;


let path;
let turtle; 

let httpSignalPos;
let previousSignal = null;
let drawSignal = false;

let width = 300;
let height = 600;
let phone; 


export default class DrawInfrastucture extends Component {
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
      {x: phone.x + phone.w/2, y: phone.y - 300},
      {x: phone.x + phone.w/2, y: phone.y - 300, size: 20},
      {moveTo: {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100}},
      {x: phone.x + (phone.w/2 + (phone.w/2)/2), y: phone.y - 100},
      {x: phone.x + phone.w/2 + 200, y: phone.y - 150}
    ];
    turtle = {index: 1, x: path[0].x, y: path[0].y, speed: 10, stop: false, fill: "rgba(0, 0, 0, 1)", size: 10};
    httpSignalPos = {x: phone.x + phone.w/2, y: phone.y, size: 0, opcaity: 1, stop: false, speed: 5};
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

    this.drawInfrastucture(p5);
    this.visualizeSignal(p5);
  }
  drawInfrastucture = (p5) => {
    //Turtle
    
    p5.fill(turtle.fill);
    p5.noStroke();

    if (turtle.stop === false) {
      for (let i=0; i<turtle.speed; i++) {
        if (p5.dist(turtle.x, turtle.y, path[turtle.index].x, path[turtle.index].y) <= 1){
            if (turtle.index === path.length - 1) {
              turtle.stop = true;
            } else {
              turtle.index += 1;
            }
        }
        if (path[turtle.index].hasOwnProperty("moveTo")) {
          turtle.x = path[turtle.index].moveTo["x"];
          turtle.y = path[turtle.index].moveTo["y"];
          turtle.index += 1;
        } else {
          if (path[turtle.index].x > turtle.x || path[turtle.index].x < turtle.x) {
            if (path[turtle.index].x > turtle.x) {
              turtle.x += 1;      
              turtle.y += ((path[turtle.index].y - turtle.y) / (path[turtle.index].x - turtle.x));
            } else {
              turtle.x -= 1;     
              turtle.y -= ((path[turtle.index].y - turtle.y) / (path[turtle.index].x - turtle.x));
            }      
          } else if (path[turtle.index].x === turtle.x) {
            if (path[turtle.index].y > turtle.y) {
              turtle.y += 1;      
            } else {
              turtle.y -= 1;     
            }
            turtle.x = path[turtle.index].x;           
          }
        }
      
        if (path[turtle.index].hasOwnProperty("size")) {
          p5.ellipse(turtle.x, turtle.y, path[turtle.index].size);
        } else {
          p5.ellipse(turtle.x, turtle.y, turtle.size);
        }
      }
    }

    // Revert to normal
    p5.fill(0, 0, 0);
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
      p5.stroke(`rgba(80, 190, 255, 1)`);
      if (httpSignalPos.y <= 80) {
        httpSignalPos.stop = true;
        previousSignal = this.props.httpSignal;
      }
      if (httpSignalPos.stop === false) {
        p5.arc(httpSignalPos.x, httpSignalPos.y, 50, 50, p5.PI + httpSignalPos.size, p5.PI*2 - httpSignalPos.size);
        httpSignalPos.y -= httpSignalPos.speed;
        httpSignalPos.size += 0.005 * httpSignalPos.speed;
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