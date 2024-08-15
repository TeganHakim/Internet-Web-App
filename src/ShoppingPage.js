import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import drawPhone from "./p5_functions/DrawPhone";
import "./styles/style.css";
import EthernetCable from "./assets/Images/Ethernet-Cable.jpg";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";

let image;
let cartButtonColor = "rgb(255, 216, 20)";
let addButtonColor = "rgb(255, 255, 255)";
let subtractButtonColor = "rgb(255, 255, 255)";

let regularFont;
let boldFont;

export default class ChatPage extends Component {
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(this.props.phoneDimensions.width, this.props.phoneDimensions.canvasHeight).parent(canvasParentRef);
      p5.frameRate(this.fr);
      image = p5.loadImage(EthernetCable);
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
      // Shopping Cart
      p5.image(
        image,
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert * 2,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        150
      );
      p5.noFill();
      p5.stroke(0, 0, 0);
      p5.strokeWeight(4);
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screenBezel.vert * 2,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        150,
        10
      );
      p5.strokeWeight(1);
      p5.fill("rgba(0, 0, 0, 1)");
      p5.noStroke();
      p5.textAlign(p5.CENTER);
      p5.textSize(18);
      p5.text(
        "Cat 8 Ethernet Cables | 20ft | 10-Pack | Heavy Duty & High Speed",
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + 220,
        this.props.screen.w - this.props.screenBezel.horz * 2
      );
      p5.fill("rgb(255, 193, 3)");
      p5.textSize(30);
      p5.textFont("Helvetica");
      p5.text("★", this.props.screen.x + this.props.screen.w / 2 - 60, this.props.screen.y + 300);
      p5.text("★", this.props.screen.x + this.props.screen.w / 2 - 30, this.props.screen.y + 300);
      p5.text("★", this.props.screen.x + this.props.screen.w / 2, this.props.screen.y + 300);
      p5.text("★", this.props.screen.x + this.props.screen.w / 2 + 30, this.props.screen.y + 300);
      p5.text("☆", this.props.screen.x + this.props.screen.w / 2 + 60, this.props.screen.y + 300);
      p5.textFont(regularFont);
      p5.fill(0, 0, 0);
      p5.textSize(15);
      p5.text("4 out of 5 stars", this.props.screen.x + this.props.screen.w / 2, this.props.screen.y + 320);
      p5.stroke("rgba(0, 0, 0, 0.75)");
      p5.line(
        this.props.screen.x,
        this.props.screen.y + this.props.screen.h / 1.7,
        this.props.screen.x + this.props.screen.w,
        this.props.screen.y + this.props.screen.h / 1.7
      );
  
      p5.textAlign(p5.LEFT);
      p5.textSize(19);
      p5.noStroke();
      p5.fill(60, 140, 50);
      p5.text("In Stock", this.props.screen.x + this.props.screenBezel.horz, this.props.screen.y + 350);
      p5.textSize(16);
      p5.fill(0, 0, 0);
      p5.text("List Price: $29.99", this.props.screen.x + this.props.screenBezel.horz, this.props.screen.y + 380);
      p5.stroke(0, 0, 0);
      p5.strokeWeight(1.2);
      p5.line(
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List Price: "),
        this.props.screen.y + 375,
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth("List Price: ") +
          p5.textWidth("$29.99"),
        this.props.screen.y + 375
      );
      p5.strokeWeight(1);
      p5.noStroke();
      p5.text(
        "Price: ",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List "),
        this.props.screen.y + 400
      );
      p5.fill(186, 49, 51);
      p5.text(
        "$19.99",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List Price: "),
        this.props.screen.y + 400
      );
      p5.fill(0, 0, 0);
      p5.text(
        "&",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List Price: $19.99 "),
        this.props.screen.y + 400
      );
      p5.textFont(boldFont);
      p5.text(
        "FREE Returns",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List Price: $19.99 &") - 1,
        this.props.screen.y + 400
      );
      p5.textFont(regularFont);
  
      p5.text(
        "You Save: ",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth(""),
        this.props.screen.y + 420
      );
  
      p5.fill(186, 49, 51);
      p5.text(
        "$10.00 (33%)",
        this.props.screen.x + this.props.screenBezel.horz + p5.textWidth("List Price: "),
        this.props.screen.y + 420
      );
  
      p5.fill("rgba(0, 0, 0, 0.2)");
      p5.noStroke();
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz + 3,
        this.props.screen.y + 456,
        p5.textWidth(` Quantity: ${this.props.quantity}`) + 20,
        25,
        5
      );
      p5.fill(255, 255, 255);
      p5.stroke(0, 0, 0);
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + 452,
        p5.textWidth(` Quantity: ${this.props.quantity}`) + 20,
        25,
        5
      );
      p5.fill(0, 0, 0);
      p5.noStroke();
      p5.textSize(18);
      p5.text(
        ` Quantity: ${this.props.quantity}`,
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + 470
      );
  
      p5.fill(addButtonColor);
      p5.stroke(0, 0, 0);
      p5.rect(
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          20,
        this.props.screen.y + 452,
        25,
        25,
        100
      );
      p5.fill(subtractButtonColor);
      p5.rect(
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          55,
        this.props.screen.y + 452,
        25,
        25,
        100
      );
  
      p5.noFill();
      p5.stroke(0, 0, 0);
      p5.line(
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          32,
        this.props.screen.y + 458,
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          32,
        this.props.screen.y + 470
      );
      p5.line(
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          26,
        this.props.screen.y + 464,
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          38,
        this.props.screen.y + 464
      );
      p5.line(
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          61,
        this.props.screen.y + 464,
        this.props.screen.x +
          this.props.screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          73,
        this.props.screen.y + 464
      );
  
      if (
        p5.mouseX <=
          this.props.screen.x +
            this.props.screenBezel.horz +
            p5.textWidth(` Quantity: ${this.props.quantity}`) +
            15 +
            25 &&
        p5.mouseX >=
          this.props.screen.x +
            this.props.screenBezel.horz +
            p5.textWidth(` Quantity: ${this.props.quantity}`) +
            15 &&
        p5.mouseY <= this.props.screen.y + 452 + 25 &&
        p5.mouseY >= this.props.screen.y + 452
      ) {
        p5.cursor(p5.HAND);
        addButtonColor = "rgba(0, 0, 0, 0.1)";
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleQuantityChange("add");
          }
        }
      } else {
        addButtonColor = "rgb(255, 255, 255)";
      }
      if (
        p5.mouseX <=
          this.props.screen.x +
            this.props.screenBezel.horz +
            p5.textWidth(` Quantity: ${this.props.quantity}`) +
            50 +
            25 &&
        p5.mouseX >=
          this.props.screen.x +
            this.props.screenBezel.horz +
            p5.textWidth(` Quantity: ${this.props.quantity}`) +
            50 &&
        p5.mouseY <= this.props.screen.y + 452 + 25 &&
        p5.mouseY >= this.props.screen.y + 452
      ) {
        p5.cursor(p5.HAND);
        subtractButtonColor = "rgba(0, 0, 0, 0.1)";
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleQuantityChange("sub");
          }
        }
      } else {
        subtractButtonColor = "rgb(255, 255, 255)";
      }
  
      // Add to cart button
      p5.noStroke();
      p5.textSize(15);
      p5.fill(cartButtonColor);
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz,
        this.props.screen.y + this.props.screen.h - 50,
        this.props.screen.w - this.props.screenBezel.horz * 2,
        35,
        20
      );
      p5.textAlign(p5.CENTER);
      p5.fill(0, 0, 0);
      p5.text("Add to Cart", this.props.screen.x + this.props.screen.w / 2, this.props.screen.y + this.props.screen.h - 27);
  
      if (
        p5.mouseX <=
          this.props.screen.x + this.props.screenBezel.horz + this.props.screen.w - this.props.screenBezel.horz * 2 &&
        p5.mouseX >= this.props.screen.x + this.props.screenBezel.horz &&
        p5.mouseY <= this.props.screen.y + this.props.screen.h - 50 + 35 &&
        p5.mouseY >= this.props.screen.y + this.props.screen.h - 50
      ) {
        p5.cursor(p5.HAND);
        cartButtonColor = "rgb(235, 200, 0)";
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleCartQuantityChange("increase");
            this.props.httpVisualize({status: 200, request: "POST", endpoint: "cartQuantity"});
          }
        }
      } else {
        cartButtonColor = "rgb(255, 216, 20)";
      }
  
      p5.rect(this.props.screen.x + this.props.screenBezel.horz + 195, this.props.screen.y + 452, 10, 3, 3);
      p5.rect(this.props.screen.x + this.props.screenBezel.horz + 202, this.props.screen.y + 453, 3, 20, 3);
      p5.rect(
        this.props.screen.x + this.props.screenBezel.horz + 202,
        this.props.screen.y + 470,
        25 + (p5.textWidth(this.props.cartQuantity) > 20 ? 8 : 0),
        3,
        3
      );
      p5.rect(
        this.props.screen.x +
          this.props.screenBezel.horz +
          202 +
          24 +
          (p5.textWidth(this.props.cartQuantity) > 20 ? 8 : 0),
        this.props.screen.y + 458,
        3,
        15,
        3
      );
      p5.ellipse(
        this.props.screen.x +
          this.props.screenBezel.horz +
          209 +
          (p5.textWidth(this.props.cartQuantity) > 20 ? 5 : 0),
        this.props.screen.y + 477,
        5
      );
      p5.ellipse(
        this.props.screen.x +
          this.props.screenBezel.horz +
          219 +
          (p5.textWidth(this.props.cartQuantity) > 20 ? 7 : 0),
        this.props.screen.y + 477,
        5
      );
      p5.textFont(boldFont);
      p5.fill(250, 160, 20);
      p5.text(
        this.props.cartQuantity,
        this.props.screen.x +
          this.props.screenBezel.horz +
          215 +
          (p5.textWidth(this.props.cartQuantity) > 20 ? 4 : 0),
        this.props.screen.y + 465
      );
  
      if (
        p5.mouseX <= this.props.screen.x + this.props.screenBezel.horz + 202 + 24 + 3 &&
        p5.mouseX >= this.props.screen.x + this.props.screenBezel.horz + 195 &&
        p5.mouseY <= this.props.screen.y + 477 + 5 &&
        p5.mouseY >= this.props.screen.y + 452
      ) {
        p5.cursor(p5.HAND);
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleCartQuantityChange("zero");
            this.props.httpVisualize({status: 200, request: "POST", endpoint: "cartQuantity"});
          }
        }
      }
    };
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}
