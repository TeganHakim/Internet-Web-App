import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./styles/style.css";
import drawPhone from "./p5_functions/DrawPhone";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;

export default class HomePage extends Component {
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
      p5.frameRate(this.fr);
    };
    p5.draw = () => {
      p5.background('rgba(255, 255, 255, 0)')
      // Regulate Text
      p5.textSize(12);
      p5.textStyle(p5.NORMAL);
      p5.textFont(regularFont);
      p5.textAlign(p5.LEFT);
  
      // Cursor
      p5.cursor(p5.ARROW);
  
      // Phone
      drawPhone(p5, this.props.phone, this.props.screen, this.props.screenBezel, this.props.handleAppClicked, this.props.httpVisualize, this.props.percentage);
  
      // Apps
      let apps = [
        { x: 1, y: 1, w: 50, h: 50, border: 18, icon: "music" },
        { x: 2, y: 1, w: 50, h: 50, border: 18, icon: "browser" },
        { x: 3, y: 1, w: 50, h: 50, border: 18, icon: "chat" },
        { x: 1, y: 2, w: 50, h: 50, border: 18, icon: "shopping" },
        { x: 2, y: 2, w: 50, h: 50, border: 18, icon: "social" }
      ];
      for (let i = 0; i < apps.length; i++) {
        let scaledX = (this.props.screen.w / 3) * apps[i].x - apps[i].w;
        let scaledY =
          this.props.screen.y + this.props.screenBezel.horz + (this.props.screen.h / 9) * apps[i].y - apps[i].h;
          if (
          p5.mouseX <= scaledX + apps[i].w &&
          p5.mouseX >= scaledX &&
          p5.mouseY <= scaledY + apps[i].h &&
          p5.mouseY >= scaledY
        ) {
          p5.cursor(p5.HAND);
          apps[i].border = 12;
          if (p5.mouseIsPressed) {
            if (p5.mouseButton === p5.LEFT) {
              this.props.handleAppClicked(apps[i].icon);
              if (apps[i].icon === "browser"){
                if (this.props.currentBrowserPage === "badLink") {
                  this.props.httpVisualize({status: 404, request: "GET", endpoint: "badLink"});
                } else if (this.props.currentBrowserPage === "goodLink") {
                  this.props.httpVisualize({status: 200, request: "GET", endpoint: "goodLink"});                
                } else {
                  this.props.httpVisualize({status: 200, request: "GET", endpoint: apps[i].icon});
                }
              } else {
                this.props.httpVisualize({status: 200, request: "GET", endpoint: apps[i].icon});
              }
            }
          }
        }
        p5.fill(0, 0, 0);
        p5.noStroke();
        p5.rect(scaledX, scaledY, apps[i].w, apps[i].h, apps[i].border);
        if (apps[i].icon === "music") {
          p5.fill(100, 255, 100);
          p5.noStroke();
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 10,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2 +
              10,
            10
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 + 10,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2 +
              10,
            10
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + 15,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              15,
            5,
            20,
            5
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + 35,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              15,
            5,
            20,
            5
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + 15,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              15,
            24,
            5,
            5
          );
        } else if (apps[i].icon === "browser") {
          p5.fill(75, 125, 255);
          p5.noStroke();
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2,
            30
          );
          p5.fill(255, 255, 255);
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + 14,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].w / 2 -
              1.5,
            22,
            3,
            15
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 1.5,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              14,
            3,
            22,
            15
          );
          p5.fill(75, 125, 255);
          p5.stroke(255, 255, 255);
          p5.strokeWeight(3);
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              25,
            12
          );
          p5.strokeWeight(4);
          p5.stroke(180, 180, 180);
          p5.line(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              25,
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 + 7,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              33
          );
          p5.stroke(255, 0, 0);
          p5.line(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 7,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              18,
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              25
          );
          p5.fill(255, 255, 255);
          p5.noStroke();
          p5.strokeWeight(1);
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              25,
            5
          );
        } else if (apps[i].icon === "chat") {
          p5.fill(220, 180, 0);
          p5.noStroke();
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + 8,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              10,
            33,
            26,
            10
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w - 8,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2 +
              12,
            7
          );
          p5.fill(255, 255, 255);
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 3 - 1,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2,
            7
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x -
              apps[i].w +
              apps[i].w / 3 +
              apps[i].w / 3 / 2,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2,
            7
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x -
              apps[i].w +
              apps[i].w / 3 +
              apps[i].w / 3 +
              1,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 2,
            7
          );
        } else if (apps[i].icon === "shopping") {
          p5.fill(128, 128, 128);
          p5.noStroke();
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 - 3,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4,
            10,
            3,
            20
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4,
            3,
            20,
            20
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4 +
              19,
            25,
            3,
            20
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 10,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4 +
              28,
            7
          );
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 25,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4 +
              28,
            7
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 28,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 3,
            3,
            16,
            20
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 3,
            23,
            3,
            20
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 18,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 3,
            3,
            15,
            20
          );
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 3 +
              7,
            23,
            3,
            20
          );
        } else if (apps[i].icon === "social") {
          // Social Media App
          p5.textSize(20);
          p5.textFont("Helvetica");
          p5.text(
            "😆",
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 4 - 3,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 1.5
          );
          p5.textFont(regularFont);
          p5.stroke(162, 40, 255);
          p5.strokeWeight(3);
          p5.noFill();
          p5.rect(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 1.5 / 4,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 1.5 / 4,
            apps[i].w / 1.5,
            apps[i].h / 1.5,
            5
          );
          p5.fill(162, 40, 255);
          p5.noStroke();
  
          p5.ellipse(
            (this.props.screen.w / 3) * apps[i].x - apps[i].w + apps[i].w - 15,
            this.props.screen.y +
              this.props.screenBezel.horz +
              (this.props.screen.h / 9) * apps[i].y -
              apps[i].h +
              apps[i].h / 4 +
              2,
            7
          );
          p5.strokeWeight(1);
        }
        p5.textSize(12);
        p5.fill("rgba(0, 0, 0, 0.2)");
        p5.noStroke();
        p5.text(
          "©Tegan Hakim " + new Date().getFullYear(),
          this.props.screen.x + 145,
          this.props.screen.y + this.props.screen.h - 5
        );
      }
    };
  }

  render() {
    return <ReactP5Wrapper id="canvas" sketch={this.sketch} />
  }
}
