import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";

let regularFont;

export default class HomePage extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(300, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(this.fr);
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

    // Apps
    let apps = [
      { x: 1, y: 1, w: 50, h: 50, border: 18, icon: "music" },
      { x: 2, y: 1, w: 50, h: 50, border: 18, icon: "browser" },
      { x: 3, y: 1, w: 50, h: 50, border: 18, icon: "chat" },
      { x: 1, y: 2, w: 50, h: 50, border: 18, icon: "shopping" },
      { x: 2, y: 2, w: 50, h: 50, border: 18, icon: "social" }
    ];
    for (let i = 0; i < apps.length; i++) {
      let scaledX = (screen.w / 3) * apps[i].x - apps[i].w;
      let scaledY =
        screen.y + screenBezel.horz + (screen.h / 9) * apps[i].y - apps[i].h;
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
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 10,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2 +
            10,
          10
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 + 10,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2 +
            10,
          10
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + 15,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            15,
          5,
          20,
          5
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + 35,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            15,
          5,
          20,
          5
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + 15,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
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
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2,
          30
        );
        p5.fill(255, 255, 255);
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + 14,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].w / 2 -
            1.5,
          22,
          3,
          15
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 1.5,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
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
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            25,
          12
        );
        p5.strokeWeight(4);
        p5.stroke(180, 180, 180);
        p5.line(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            25,
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 + 7,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            33
        );
        p5.stroke(255, 0, 0);
        p5.line(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2 - 7,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            18,
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            25
        );
        p5.fill(255, 255, 255);
        p5.noStroke();
        p5.strokeWeight(1);
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            25,
          5
        );
      } else if (apps[i].icon === "chat") {
        p5.fill(220, 180, 0);
        p5.noStroke();
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + 8,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            10,
          33,
          26,
          10
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w - 8,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2 +
            12,
          7
        );
        p5.fill(255, 255, 255);
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 3 - 1,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2,
          7
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x -
            apps[i].w +
            apps[i].w / 3 +
            apps[i].w / 3 / 2,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2,
          7
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x -
            apps[i].w +
            apps[i].w / 3 +
            apps[i].w / 3 +
            1,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 2,
          7
        );
      } else if (apps[i].icon === "shopping") {
        p5.fill(128, 128, 128);
        p5.noStroke();
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 - 3,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 4,
          10,
          3,
          20
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 4,
          3,
          20,
          20
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 4 +
            19,
          25,
          3,
          20
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 10,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 4 +
            28,
          7
        );
        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 25,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 4 +
            28,
          7
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 28,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 3,
          3,
          16,
          20
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 3,
          23,
          3,
          20
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 18,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 3,
          3,
          15,
          20
        );
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 5 + 6,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
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
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 4 - 3,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 1.5
        );
        p5.textFont(regularFont);
        p5.stroke(162, 40, 255);
        p5.strokeWeight(3);
        p5.noFill();
        p5.rect(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w / 1.5 / 4,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
            apps[i].h +
            apps[i].h / 1.5 / 4,
          apps[i].w / 1.5,
          apps[i].h / 1.5,
          5
        );
        p5.fill(162, 40, 255);
        p5.noStroke();

        p5.ellipse(
          (screen.w / 3) * apps[i].x - apps[i].w + apps[i].w - 15,
          screen.y +
            screenBezel.horz +
            (screen.h / 9) * apps[i].y -
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
        "Developers: Tegan Hakim & Bradley Wray",
        screen.x + 38,
        screen.y + screen.h - 5
      );
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
      <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}
