import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./styles/style.css";
import drawPhone from "./p5_functions/DrawPhone";
import browserHome from "./p5_functions/DrawBrowserHome";
import browserBroken from "./p5_functions/DrawBrowserBroken";
import VintCerf from "./assets/Images/Vint-Cerf.jpg";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";

let urls = {
  homeBrowser: { url: "https://en.wikipedia.org/wiki/Vint-Cerf", statusCode: "202" },
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
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.phoneDimensions.width, this.props.phoneDimensions.canvasHeight).parent(canvasParentRef);
      p5.frameRate(this.fr);
      image = p5.loadImage(VintCerf);
      boldFont = p5.loadFont(BoldFont);
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
  
      // Address Bar
      p5.fill("rgba(0, 0, 0, 0.25)");
      p5.rect(
        this.props.screen.x,
        this.props.screen.y + this.props.screenBezel.vert,
        this.props.screen.w,
        this.props.screen.h - this.props.screenBezel.vert
      );
      p5.fill("rgba(0, 0, 0, 0.2)");
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz + 3,
        this.props.screen.y + this.props.screenBezel.vert + 13,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        30,
        10
      );
      p5.fill("rgba(255,255,255, 0.75)");
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert + 10,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        30,
        10
      );
      p5.fill("rgba(0, 0, 0, 0.75)");
      p5.textSize(13.5);
      p5.textFont(regularFont);
      p5.text(
        urls[this.props.currentBrowserPage].url,
        this.props.screen.x + this.props.screenBezel.horz + 5,
        this.props.screen.y + this.props.screenBezel.vert + 30
      );
      // Wiki Page
      if (this.props.currentBrowserPage === "homeBrowser") {
        browserHome(p5, boldFont, regularFont, image, this.props.screen, this.props.screenBezel, urls, this.props.handleLinkClicked, this.props.httpVisualize);
      } else if (this.props.currentBrowserPage === "badLink") {
        browserBroken(p5, boldFont, regularFont, this.props.screen, this.props.screenBezel, this.props.handleLinkClicked, this.props.httpVisualize);
      }
    };
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}
