import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;


let path;
let turtle = {index: 1, x: path[0].x, y: path[0].y, speed: 0.1, stroke: "rgb(255, 0, 0)", strokeWeight: 2};


export default class Workspace extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(this.fr);

    let width = 300;
    let height = 600;
    let phone = {
      x: 10,
      y: p5.windowHeight - 10 - height,
      w: width - 10 * 2,
      h: height,
      border: { tl: 10, tr: 10, bl: 10, br: 10 }
    };
    path = [{x: phone.x + phone.w/2, y: phone.y}, {x: phone.x + phone.w/2, y: phone.y - 150}, {x: phone.x + phone.w/2 + 100, y: phone.y - 150}];
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

    //Turtle
    

    p5.stroke(turtle.stroke);
    p5.strokeWeight(turtle.strokeWeight);
    p5.frameRate(2);
    // for (let i=1; i < path.length; i++) {
    //     if (p5.dist(turtle.x, turtle.y, path[i].x, path[i].y) > 5) {
    //         if (p5.dist(turtle.x, turtle.y, path[i].x, path[i].y) < 5){
    //             break
    //         }
    //         if (turtle.x < path[i].x) {
    //             turtle.x += turtle.speed;
    //         } else {
    //             turtle.x -= turtle.speed;
    //         }
    //         if (turtle.y < path[i].y) {
    //             turtle.y += turtle.speed;
    //         } else {
    //             turtle.y -= turtle.speed;
    //         }
    //         p5.ellipse(turtle.x, turtle.y, 10);
    //     }
    // }  

    if (p5.dist(turtle.x, turtle.y, path[turtle.index].x, path[turtle.index].y) < 1){
        turtle.index ++;
    }
    console.log(turtle.x + " " +  turtle.y + " | " + path[turtle.index].x + " " + path[turtle.index].y)
    if (turtle.x < path[turtle.index].x) {
        turtle.x += turtle.speed;
    } else {
        turtle.x -= turtle.speed;
    }
    if (turtle.y < path[turtle.index].y) {
        turtle.y += turtle.speed;
    } else {
        turtle.y -= turtle.speed;
    }
    p5.ellipse(turtle.x, turtle.y, 10);


    // Revert to normal
    p5.fill(0, 0, 0);
    p5.strokeWeight(1);
  }
  render() {
    return (
        <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}