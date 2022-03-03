import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";

let arcRotation = 0;

export default class LoadingPage extends Component {
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(15);
  };
  draw = (p5) => {
    // Regulate Text
    p5.textSize(12);
    p5.textAlign(p5.LEFT);

    // Cursor
    p5.cursor(p5.ARROW);

    // Screen Variables
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

    // Loading Animation
    p5.noFill();
    p5.stroke(0)
    p5.arc(phone.x + phone.w / 2, phone.y + phone.h / 2, 50, 50, 0 + arcRotation, p5.PI + arcRotation);
    p5.arc(phone.x + phone.w / 2, phone.y + phone.h / 2, 30, 30, 0 - arcRotation, p5.PI - arcRotation);

    if (this.props.currentScreen === "Loading") {
        arcRotation++;
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
    p5.fill(120, 120, 120);
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
    p5.fill(190, 190, 190);
    p5.noStroke();
    p5.ellipse(homeButton.x, homeButton.y, homeButton.r);
    
    // Camera
    let camera = {
      x: phone.x + phone.w / 3,
      y: phone.y + screenBezel.vert / 2,
      r: 10
    };
    p5.fill(190, 190, 190);
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