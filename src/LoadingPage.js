import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import drawPhone from "./p5_functions/DrawPhone";
import "./styles/style.css";

let arcRotation = 0;

export default class LoadingPage extends Component {
  sketch = (p5) => {
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.dimensions.width, p5.windowHeight - 10).parent(canvasParentRef);
      p5.frameRate(15);
    };
    p5.draw = () => {
      // Regulate Text
      p5.textSize(12);
      p5.textAlign(p5.LEFT);
  
      // Cursor
      p5.cursor(p5.ARROW);
  
      // Phone
      drawPhone(p5, this.props.phone, this.props.screen, this.props.screenBezel, this.props.handleAppClicked, this.props.httpVisualize, this.props.percentage);
  
      // Loading Animation
      p5.noFill();
      p5.stroke(0)
      p5.arc(this.props.phone.x + this.props.phone.w / 2, this.props.phone.y + this.props.phone.h / 2, 50, 50, 0 + arcRotation, p5.PI + arcRotation);
      p5.arc(this.props.phone.x + this.props.phone.w / 2, this.props.phone.y + this.props.phone.h / 2, 30, 30, 0 - arcRotation, p5.PI - arcRotation);
  
      if (this.props.currentScreen === "Loading") {
          arcRotation++;
      }
    };
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}