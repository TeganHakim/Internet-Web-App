import React, { Component } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import VintCerf from "./assets/Images/Vint-Cerf.jpg";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";

let urls = {
  homeBrowser: { url: "https://en.wikipedia.org/wiki/Vint-Cerf", statusCode: "202" },
  goodLink: {
    url: "https://howstuffworks.com/the-web",
    statusCode: "202",
    underline: false
  },
  badLink: {
    url: "https://news.tk/free-wifi",
    statusCode: "404",
    underline: false
  }
};

let returnLinkUnderline = false;

let image;
let regularFont;
let boldFont;

export default class BrowserPage extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(this.fr);
    image = p5.loadImage(VintCerf);
    boldFont = p5.loadFont(BoldFont);
  };
  draw = (p5) => {
    // Regulate Text
    p5.textSize(12);
    p5.textFont(regularFont);
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

    // Address Bar
    p5.fill("rgba(0, 0, 0, 0.25)");
    p5.rect(
      screen.x,
      screen.y + screenBezel.vert,
      screen.w,
      screen.h - screenBezel.vert
    );
    p5.fill("rgba(0, 0, 0, 0.2)");
    p5.rect(
      screen.x + screenBezel.horz + 3,
      screen.y + screenBezel.vert + 13,
      screen.w - screenBezel.horz * 2,
      30,
      10
    );
    p5.fill("rgba(255,255,255, 0.75)");
    p5.rect(
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 10,
      screen.w - screenBezel.horz * 2,
      30,
      10
    );
    p5.fill("rgba(0, 0, 0, 0.75)");
    p5.textSize(13.5);
    p5.textFont(regularFont);
    p5.text(
      urls[this.props.currentBrowserPage].url,
      screen.x + screenBezel.horz + 5,
      screen.y + screenBezel.vert + 30
    );
    // Wiki Page
    if (this.props.currentBrowserPage === "homeBrowser") {
      this.homePage(p5, screen, screenBezel);
    } else if (this.props.currentBrowserPage === "goodLink") {
      this.goodPage(p5, screen, screenBezel);
    } else if (this.props.currentBrowserPage === "badLink") {
      this.brokenPage(p5, screen, screenBezel);
    }
  };

  homePage = (p5, screen, screenBezel) => {
    p5.image(
      image,
      screen.x + screenBezel.horz + (screen.w - screenBezel.horz * 2) / 2,
      screen.y + screenBezel.vert + 50,
      (screen.w - screenBezel.horz * 2) / 2,
      (screen.w - screenBezel.horz * 2) / 2
    );
    p5.fill("rgba(0, 0, 0, 0.2)");
    p5.rect(
      screen.x + screenBezel.horz + (screen.w - screenBezel.horz * 2) / 2,
      screen.y + screenBezel.vert + 50,
      (screen.w - screenBezel.horz * 2) / 2,
      (screen.w - screenBezel.horz * 2) / 2
    );
    p5.fill("rgba(0, 0, 0, 0.75)");
    p5.textSize(16);
    p5.textFont(boldFont);
    p5.noStroke();
    p5.text(
      "Vint Cerf",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 65
    );
    p5.textSize(12);
    p5.textFont(regularFont);
    p5.text(
      'Vinton Gray Cerf \n(born June 23, 1943) \nis recognized as one \nof "the fathers of the \nInternet", sharing this \ntitle with Bob Kahn.',
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 82,
      (screen.w - screenBezel.horz * 2) / 2 - 5
    );
    p5.textSize(16);
    p5.textFont(boldFont);
    p5.text(
      "Life and Career",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 180,
      screen.w - screenBezel.horz * 2
    );
    p5.textSize(12);
    p5.textFont(regularFont);
    p5.text(
      "Vinton Gray Cerf was born in New Haven, \nConnecticut. In high school, Cerf worked at \nRocketdyne on the Apollo program and \nhelped write statistical analysis software for \nthe non-destructive tests of the F-1 engines. \nCerf received a Bachelor of Science degree \nin mathematics from Stanford University. \nCerf attended graduate school at UCLA \nwhere he earned his M.S. degree in 1970 \nand his PhD in 1972. While at UCLA, Cerf \nwrote the first TCP protocol, called \nSpecification of Internet Transmission \nControl Program, published in 1974.",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert + 200,
      screen.w - screenBezel.horz * 2
    );
    p5.stroke(255, 255, 255);
    p5.line(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 120,
      screen.x + screen.w - screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 120
    );
    p5.noStroke();
    p5.fill("rgba(0, 0, 0, 0.75)");
    p5.textSize(16);
    p5.textFont(boldFont);
    p5.text(
      "References",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 100
    );
    p5.textSize(12.5);
    p5.textFont(regularFont);
    p5.text(
      "1. ",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 75
    );
    p5.text(
      "2. ",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 55
    );
    p5.fill(51, 102, 187);
    p5.text(
      urls["goodLink"].url,
      screen.x + screenBezel.horz + 18,
      screen.y + screen.h - screenBezel.vert - 75
    );
    p5.text(
      urls["badLink"].url,
      screen.x + screenBezel.horz + 18,
      screen.y + screen.h - screenBezel.vert - 55
    );
    if (urls["goodLink"].underline) {
      p5.stroke(51, 102, 187);
    } else {
      p5.noStroke();
    }
    p5.line(
      screen.x + screenBezel.horz + 18,
      screen.y + screen.h - screenBezel.vert - 73,
      screen.x + screenBezel.horz + 18 + p5.textWidth(urls["goodLink"].url),
      screen.y + screen.h - screenBezel.vert - 73
    );
    if (urls["badLink"].underline) {
      p5.stroke(51, 102, 187);
    } else {
      p5.noStroke();
    }
    p5.line(
      screen.x + screenBezel.horz + 18,
      screen.y + screen.h - screenBezel.vert - 53,
      screen.x + screenBezel.horz + 18 + p5.textWidth(urls["badLink"].url),
      screen.y + screen.h - screenBezel.vert - 53
    );
    if (
      p5.mouseX <
        screen.x + screenBezel.horz + 18 + p5.textWidth(urls["goodLink"].url) &&
      p5.mouseX > screen.x + screenBezel.horz + 18 &&
      p5.mouseY > screen.y + screen.h - screenBezel.vert - 85 &&
      p5.mouseY < screen.y + screen.h - screenBezel.vert - 72
    ) {
      p5.cursor(p5.HAND);
      urls["goodLink"].underline = true;
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleLinkClicked("goodLink");
          this.props.httpVisualize({status: 200, request: "GET", endpoint: "goodLink"});
        }
      }
    } else {
      urls["goodLink"].underline = false;
    }
    if (
      p5.mouseX <
        screen.x + screenBezel.horz + 18 + p5.textWidth(urls["badLink"].url) &&
      p5.mouseX > screen.x + screenBezel.horz + 18 &&
      p5.mouseY > screen.y + screen.h - screenBezel.vert - 65 &&
      p5.mouseY < screen.y + screen.h - screenBezel.vert - 52
    ) {
      p5.cursor(p5.HAND);
      urls["badLink"].underline = true;
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleLinkClicked("badLink");
          this.props.httpVisualize({status: 404, request: "GET", endpoint: "badLink"});
        }
      }
    } else {
      urls["badLink"].underline = false;
    }
    p5.stroke(255, 255, 255);
    p5.line(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 40,
      screen.x + screen.w - screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 40
    );
    p5.noStroke();
    p5.fill("rgba(0, 0, 0, 0.75)");
    const todaysDate = Date()
      .toLocaleString("default", { month: "long" })
      .split(" ");
    p5.text(
      `This page was last edited on ${
        todaysDate[2] + " " + todaysDate[1] + " " + todaysDate[3]
      }.`,
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 20
    );
    p5.text(
      "Wikipedia® is a non-profit organization.",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert - 0
    );
  };

  goodPage = (p5, screen, screenBezel) => {
    // Back Button
    p5.fill(51, 102, 187);
    p5.textSize(16);
    p5.text(
      "Return to Wiki",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert
    );
    if (returnLinkUnderline) {
      p5.stroke(51, 102, 187);
    } else {
      p5.noStroke();
    }
    p5.line(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert + 3,
      screen.x + screenBezel.horz + p5.textWidth("Return to Wiki"),
      screen.y + screen.h - screenBezel.vert + 3
    );
    if (
      p5.mouseX <
        screen.x + screenBezel.horz + p5.textWidth("Return to Wiki") &&
      p5.mouseX > screen.x + screenBezel.horz &&
      p5.mouseY > screen.y + screen.h - screenBezel.vert - 10 &&
      p5.mouseY < screen.y + screen.h - screenBezel.vert - 0
    ) {
      p5.cursor(p5.HAND);
      returnLinkUnderline = true;
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleLinkClicked("homeBrowser");
          this.props.httpVisualize({status: 200, request: "GET", endpoint: "homeBrowser"});
        }
      }
    } else {
      returnLinkUnderline = false;
    }
  };

  brokenPage = (p5, screen, screenBezel) => {
    p5.textAlign(p5.CENTER);
    p5.textSize(30);
    p5.textFont(boldFont);
    p5.text(
      "Error 404",
      screen.x + screen.w / 2,
      screen.y + screenBezel.vert + screen.h / 3 - 30
    );
    p5.textFont(regularFont);
    p5.textSize(14);
    p5.text(
      "Page not found :(",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2 + screen.h / 3 - 20,
      screen.w - screenBezel.horz * 2
    );
    p5.textSize(16);
    p5.text(
      'The server returned a "404 Not \nFound" because the requested \nURL cannot be found.',
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2 + screen.h / 3 + 30,
      screen.w - screenBezel.horz * 2
    );
    p5.textAlign(p5.LEFT);
    // Back Button
    p5.fill(51, 102, 187);
    p5.text(
      "Return to Wiki",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert
    );
    if (returnLinkUnderline) {
      p5.stroke(51, 102, 187);
    } else {
      p5.noStroke();
    }
    p5.line(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert + 3,
      screen.x + screenBezel.horz + p5.textWidth("Return to Wiki"),
      screen.y + screen.h - screenBezel.vert + 3
    );
    if (
      p5.mouseX <
        screen.x + screenBezel.horz + p5.textWidth("Return to Wiki") &&
      p5.mouseX > screen.x + screenBezel.horz &&
      p5.mouseY > screen.y + screen.h - screenBezel.vert - 10 &&
      p5.mouseY < screen.y + screen.h - screenBezel.vert - 0
    ) {
      p5.cursor(p5.HAND);
      returnLinkUnderline = true;
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleLinkClicked("homeBrowser");
          this.props.httpVisualize({status: 200, request: "GET", endpoint: "homeBrowser"});
        }
      }
    } else {
      returnLinkUnderline = false;
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
