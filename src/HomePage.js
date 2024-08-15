// React
import React, { Component } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
// p5 Custom Functions
import drawPhone from "./p5_functions/DrawPhone";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
// Styles
import "./styles/style.css";

// Regular Font
let regularFont;

function getAppBounds(appData, scaledX, scaledY) {
  return {
    left: scaledX, 
    right: (scaledX + appData.width), 
    top: scaledY, 
    bottom: (scaledY + appData.height) 
  };
}

export default class HomePage extends Component {
  // p5.js sketch function
  sketch = (p5) => {
    // Function that executes only once, prior to load
    p5.preload = () => {
      // Load the regular font
      regularFont = p5.loadFont(RegularFont);
    };
    // Function that executes only once, after preload
    p5.setup = (canvasParentRef) => {
      // Initialize canvas
      p5.createCanvas(this.props.phoneDimensions.width, this.props.phoneDimensions.canvasHeight).parent(canvasParentRef);
      // Set frame rate
      p5.frameRate(this.fr);
    };
    // Function that executes every frame (draw loop)
    p5.draw = () => {
      // Clear the canvas each frame to create animation effect
      p5.background('rgba(255, 255, 255, 0)')

      // Regulate Text
      p5.textSize(12);
      p5.textStyle(p5.NORMAL);
      p5.textAlign(p5.LEFT);
      p5.textFont(regularFont);
  
      // Cursor
      p5.cursor(p5.ARROW);
  
      // Phone
      drawPhone(p5, this.props.phone, this.props.screen, this.props.screenBezel, this.props.handleAppClicked, this.props.httpVisualize, this.props.percentage);
  
      // App information
      let maxRows = 8;
      let maxCols = 3;
      // App size
      let appData = {
        width: 50,
        height: 50,
      }
      // Grid of apps
      let apps = [
        {x: 1, y: 0, border: 18, icon: "browser"},
        {x: 0, y: 0, border: 18, icon: "music"},
        {x: 2, y: 0, border: 18, icon: "chat"},
        {x: 0, y: 1, border: 18, icon: "shopping"},
        {x: 1, y: 1, border: 18, icon: "social"}
      ];
      // Space between apps
      let appSpacing = {
        x: this.props.screen.w / maxCols,
        y: this.props.screen.h / maxRows
      }
      // Offset for app placement
      let appOffset = {
        x: this.props.screen.x + (appSpacing.x / 2) - (appData.width / 2),
        y: this.props.screen.y + (this.props.screenBezel.horz * 2) + (appSpacing.y / 2) - (appData.height / 2)
      }

      for (let i = 0; i < apps.length; i++) {
        // Scale app position
        let scaledX = appOffset.x + (appSpacing.x * apps[i].x);
        let scaledY = appOffset.y + (appSpacing.y * apps[i].y);
        // Check for mouse hover and/or interaction with app
        const appBounds = getAppBounds(appData, scaledX, scaledY);
        if (
          p5.mouseX >= appBounds.left &&
          p5.mouseX <= appBounds.right &&
          p5.mouseY >= appBounds.top &&
          p5.mouseY <= appBounds.bottom
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
        // Drawing apps
        p5.fill(0, 0, 0);
        p5.noStroke();
        p5.rect(scaledX, scaledY, appData.width, appData.height, apps[i].border);
        if (apps[i].icon === "music") {
          let iconData = {
            width: appData.width / 2.3,
            height: appData.height / 2.3,
            border: 5
          }
          p5.fill(100, 255, 100);
          p5.noStroke();
          let diameter = 10;
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2) + iconData.height,
            diameter
          );
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + iconData.width,
            scaledY + ((appData.height - iconData.height) / 2) + iconData.height,
            diameter
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2),
            5,
            25,
            5
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + iconData.width,
            scaledY + ((appData.height - iconData.height) / 2),
            5,
            25,
            5
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2),
            25,
            5,
            5
          );
        } else if (apps[i].icon === "browser") {
          let iconData = {
            width: 30,
            height: 30,
            border: 15
          }
          p5.fill(75, 125, 255);
          p5.noStroke();
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2),
            iconData.width
          );
          p5.fill(255, 255, 255);
          let lineWidth = 22;
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + ((iconData.width - lineWidth) / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) - 1.5,
            lineWidth,
            3,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2) - 1.5,
            scaledY + ((appData.height - iconData.height) / 2) + ((iconData.width - lineWidth) / 2),
            3,
            lineWidth,
            iconData.border
          );
          p5.fill(75, 125, 255);
          p5.stroke(255, 255, 255);
          p5.strokeWeight(3);
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2),
            (iconData.width / 2) - 3
          );
          p5.strokeWeight(4);
          p5.stroke(180, 180, 180);
          p5.line(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2) + 7,
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) + 7,
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2)
          );
          p5.stroke(255, 0, 0);
          p5.line(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2),
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2) - 7,
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) - 7
          );
          p5.fill(255, 255, 255);
          p5.noStroke();
          p5.strokeWeight(1);
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2),
            5
          );
        } else if (apps[i].icon === "chat") {
          let iconData = {
            width: 33,
            height: 33,
            border: 10
          }
          p5.fill(220, 180, 0);
          p5.noStroke();
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2),
            iconData.width,
            26,
            iconData.border
          );
          let diameter = 7;
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + iconData.width,
            scaledY + ((appData.height - iconData.height) / 2) + iconData.height - (diameter / 2),
            diameter
          );
          p5.fill(255, 255, 255);
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2) - 10,
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) - (diameter / 2),
            diameter
          );
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2),
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) - (diameter / 2),
            diameter
          );
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width / 2) + 10,
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) - (diameter / 2),
            diameter
          );
        } else if (apps[i].icon === "shopping") {
          let iconData = {
            width: appData.width / 1.5,
            height: appData.height / 1.5,
            border: 20
          }
          p5.fill(128, 128, 128);
          p5.noStroke();
          let cartLength = 10;
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2),
            cartLength,
            3,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength - 2,
            scaledY + ((appData.height - iconData.height) / 2) + 3,
            3,
            20,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength - 2,
            scaledY + ((appData.height - iconData.height) / 2) + 3,
            25,
            3,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength * 2,
            scaledY + ((appData.height - iconData.height) / 2) + 3,
            3,
            20,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength - 2,
            scaledY + ((appData.height - iconData.height) / 2) + 12,
            25,
            3,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength + 22,
            scaledY + ((appData.height - iconData.height) / 2) + 3,
            3,
            20,
            iconData.border
          );
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2) + cartLength - 2,
            scaledY + ((appData.height - iconData.height) / 2) + 20,
            25,
            3,
            iconData.border
          );
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + 15,
            scaledY + ((appData.height - iconData.height) / 2) + 30,
            7
          );
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + 28,
            scaledY + ((appData.height - iconData.height) / 2) + 30,
            7
          );
        } else if (apps[i].icon === "social") {
          // Social Media App
          let iconData = {
            width: appData.width / 1.5,
            height: appData.height / 1.5,
            border: 5
          }
          let fontSize = 20;
          p5.textSize(fontSize);
          p5.textFont("Helvetica");
          p5.text(
            "😆",
            scaledX + ((appData.width - iconData.width) / 2) + 1,
            scaledY + ((appData.height - iconData.height) / 2) + (iconData.height / 2) + (fontSize / 2),
          );
          p5.textFont(regularFont);
          p5.stroke(162, 40, 255);
          p5.strokeWeight(3);
          p5.noFill();
          p5.rect(
            scaledX + ((appData.width - iconData.width) / 2),
            scaledY + ((appData.height - iconData.height) / 2),
            iconData.width,
            iconData.height,
            iconData.border
          );
          p5.fill(162, 40, 255);
          p5.noStroke();
          
          let diameter = 7;
          p5.ellipse(
            scaledX + ((appData.width - iconData.width) / 2) + (iconData.width - 7),
            scaledY + ((appData.height - iconData.height) / 2) + diameter,
            diameter
          );
          p5.strokeWeight(1);
        }
        p5.textSize(12);
        p5.fill("rgba(0, 0, 0, 0.2)");
        p5.noStroke();
        p5.text(
          "©Tegan Hakim " + new Date().getFullYear(),
          this.props.screen.x + 5,
          this.props.screen.y + this.props.screen.h - 5
        );
      }
    };
  }

  render() {
    return <ReactP5Wrapper id="canvas" sketch={this.sketch} />
  }
}
