import React, { Component } from "react";
import Sketch from "react-p5";
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
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(300, p5.windowHeight - 10).parent(canvasParentRef);
    p5.frameRate(this.fr);
    image = p5.loadImage(EthernetCable);
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
    let width = 300;
    let height = 600;
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
    // Shopping Cart
    p5.image(
      image,
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2,
      screen.w - screenBezel.horz * 2,
      150
    );
    p5.noFill();
    p5.stroke(0, 0, 0);
    p5.strokeWeight(4);
    p5.rect(
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2,
      screen.w - screenBezel.horz * 2,
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
      screen.x + screenBezel.horz,
      screen.y + 220,
      screen.w - screenBezel.horz * 2
    );
    p5.fill("rgb(255, 193, 3)");
    p5.textSize(30);
    p5.textFont("Helvetica");
    p5.text("★", screen.x + screen.w / 2 - 60, screen.y + 300);
    p5.text("★", screen.x + screen.w / 2 - 30, screen.y + 300);
    p5.text("★", screen.x + screen.w / 2, screen.y + 300);
    p5.text("★", screen.x + screen.w / 2 + 30, screen.y + 300);
    p5.text("☆", screen.x + screen.w / 2 + 60, screen.y + 300);
    p5.textFont(regularFont);
    p5.fill(0, 0, 0);
    p5.textSize(15);
    p5.text("4 out of 5 stars", screen.x + screen.w / 2, screen.y + 320);
    p5.stroke("rgba(0, 0, 0, 0.75)");
    p5.line(
      screen.x,
      screen.y + screen.h / 1.7,
      screen.x + screen.w,
      screen.y + screen.h / 1.7
    );

    p5.textAlign(p5.LEFT);
    p5.textSize(19);
    p5.noStroke();
    p5.fill(60, 140, 50);
    p5.text("In Stock", screen.x + screenBezel.horz, screen.y + 350);
    p5.textSize(16);
    p5.fill(0, 0, 0);
    p5.text("List Price: $29.99", screen.x + screenBezel.horz, screen.y + 380);
    p5.stroke(0, 0, 0);
    p5.strokeWeight(1.2);
    p5.line(
      screen.x + screenBezel.horz + p5.textWidth("List Price: "),
      screen.y + 375,
      screen.x +
        screenBezel.horz +
        p5.textWidth("List Price: ") +
        p5.textWidth("$29.99"),
      screen.y + 375
    );
    p5.strokeWeight(1);
    p5.noStroke();
    p5.text(
      "Price: ",
      screen.x + screenBezel.horz + p5.textWidth("List "),
      screen.y + 400
    );
    p5.fill(186, 49, 51);
    p5.text(
      "$19.99",
      screen.x + screenBezel.horz + p5.textWidth("List Price: "),
      screen.y + 400
    );
    p5.fill(0, 0, 0);
    p5.text(
      "&",
      screen.x + screenBezel.horz + p5.textWidth("List Price: $19.99 "),
      screen.y + 400
    );
    p5.textFont(boldFont);
    p5.text(
      "FREE Returns",
      screen.x + screenBezel.horz + p5.textWidth("List Price: $19.99 &") - 1,
      screen.y + 400
    );
    p5.textFont(regularFont);

    p5.text(
      "You Save: ",
      screen.x + screenBezel.horz + p5.textWidth(""),
      screen.y + 420
    );

    p5.fill(186, 49, 51);
    p5.text(
      "$10.00 (33%)",
      screen.x + screenBezel.horz + p5.textWidth("List Price: "),
      screen.y + 420
    );

    p5.fill("rgba(0, 0, 0, 0.2)");
    p5.noStroke();
    p5.rect(
      screen.x + screenBezel.horz + 3,
      screen.y + 456,
      p5.textWidth(` Quantity: ${this.props.quantity}`) + 20,
      25,
      5
    );
    p5.fill(255, 255, 255);
    p5.stroke(0, 0, 0);
    p5.rect(
      screen.x + screenBezel.horz,
      screen.y + 452,
      p5.textWidth(` Quantity: ${this.props.quantity}`) + 20,
      25,
      5
    );
    p5.fill(0, 0, 0);
    p5.noStroke();
    p5.textSize(18);
    p5.text(
      ` Quantity: ${this.props.quantity}`,
      screen.x + screenBezel.horz,
      screen.y + 470
    );

    p5.fill(addButtonColor);
    p5.stroke(0, 0, 0);
    p5.rect(
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        20,
      screen.y + 452,
      25,
      25,
      100
    );
    p5.fill(subtractButtonColor);
    p5.rect(
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        55,
      screen.y + 452,
      25,
      25,
      100
    );

    p5.noFill();
    p5.stroke(0, 0, 0);
    p5.line(
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        32,
      screen.y + 458,
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        32,
      screen.y + 470
    );
    p5.line(
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        26,
      screen.y + 464,
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        38,
      screen.y + 464
    );
    p5.line(
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        61,
      screen.y + 464,
      screen.x +
        screenBezel.horz +
        p5.textWidth(` Quantity: ${this.props.quantity}`) +
        73,
      screen.y + 464
    );

    if (
      p5.mouseX <=
        screen.x +
          screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          15 +
          25 &&
      p5.mouseX >=
        screen.x +
          screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          15 &&
      p5.mouseY <= screen.y + 452 + 25 &&
      p5.mouseY >= screen.y + 452
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
        screen.x +
          screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          50 +
          25 &&
      p5.mouseX >=
        screen.x +
          screenBezel.horz +
          p5.textWidth(` Quantity: ${this.props.quantity}`) +
          50 &&
      p5.mouseY <= screen.y + 452 + 25 &&
      p5.mouseY >= screen.y + 452
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
      screen.x + screenBezel.horz,
      screen.y + screen.h - 50,
      screen.w - screenBezel.horz * 2,
      35,
      20
    );
    p5.textAlign(p5.CENTER);
    p5.fill(0, 0, 0);
    p5.text("Add to Cart", screen.x + screen.w / 2, screen.y + screen.h - 27);

    if (
      p5.mouseX <=
        screen.x + screenBezel.horz + screen.w - screenBezel.horz * 2 &&
      p5.mouseX >= screen.x + screenBezel.horz &&
      p5.mouseY <= screen.y + screen.h - 50 + 35 &&
      p5.mouseY >= screen.y + screen.h - 50
    ) {
      p5.cursor(p5.HAND);
      cartButtonColor = "rgb(235, 200, 0)";
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleCartQuantityChange("increase");
        }
      }
    } else {
      cartButtonColor = "rgb(255, 216, 20)";
    }

    p5.rect(screen.x + screenBezel.horz + 195, screen.y + 452, 10, 3, 3);
    p5.rect(screen.x + screenBezel.horz + 202, screen.y + 453, 3, 20, 3);
    p5.rect(
      screen.x + screenBezel.horz + 202,
      screen.y + 470,
      25 + (p5.textWidth(this.props.cartQuantity) > 20 ? 8 : 0),
      3,
      3
    );
    p5.rect(
      screen.x +
        screenBezel.horz +
        202 +
        24 +
        (p5.textWidth(this.props.cartQuantity) > 20 ? 8 : 0),
      screen.y + 458,
      3,
      15,
      3
    );
    p5.ellipse(
      screen.x +
        screenBezel.horz +
        209 +
        (p5.textWidth(this.props.cartQuantity) > 20 ? 5 : 0),
      screen.y + 477,
      5
    );
    p5.ellipse(
      screen.x +
        screenBezel.horz +
        219 +
        (p5.textWidth(this.props.cartQuantity) > 20 ? 7 : 0),
      screen.y + 477,
      5
    );
    p5.textFont(boldFont);
    p5.fill(250, 160, 20);
    p5.text(
      this.props.cartQuantity,
      screen.x +
        screenBezel.horz +
        215 +
        (p5.textWidth(this.props.cartQuantity) > 20 ? 4 : 0),
      screen.y + 465
    );

    if (
      p5.mouseX <= screen.x + screenBezel.horz + 202 + 24 + 3 &&
      p5.mouseX >= screen.x + screenBezel.horz + 195 &&
      p5.mouseY <= screen.y + 477 + 5 &&
      p5.mouseY >= screen.y + 452
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleCartQuantityChange("zero");
        }
      }
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
        if (p5.mouseButton === p5.LEFT) {
          this.props.handleAppClicked("home");
        }
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
