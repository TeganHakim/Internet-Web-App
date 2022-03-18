import React, { Component, useEffect } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";
import { Router } from "./Router";
import drawRouters from "./DrawRouters";
import Background from "./assets/Images/Background-Map.png";

let background;

let width;
let height;
let phone;

let drawData = false;

let regularFont;
let boldFont;

let infrastructurePath;
let cellTowerPingColor = "rgb(0, 255, 0)";

let canChangeSpeed = true;
let internetSpeed = "medium";
let speeds = {
  slow: -6,
  medium: 0,
  fast: 10
}

let turtle;
let routerTurtle;
const turtleColors = { good: "rgb(0, 255, 0)", bad: "rgb(255, 0, 0)" };
let turtleColor;
let drawTurtle = false;
let turtlePath;
let originalTurtlePath;
let turtlePathMade = false;

let routers;
let possibleTargets;
let pathMade = false;
let routerPathMade = false;
let turtleReverse = false;
let reverseSignal = false;
let routerMovements = [];
let turtleMovements = [];
let routersReached = false;
let targetServer;
let pathFullyCompleted = false;

let httpSignalPos;
let previousSignalEndpoint = null;
let drawSignal = false;

let createIP = false;
const ipCharacters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "D",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let clientIP = "";

let toIP = "";
let fromIP = "";

let website = "internet-simulator.com";

let homeInfo = {url: "url@example.com", ip: generateIP()};
let musicInfo = {url: "url@example.com", ip: generateIP()};
let browserInfo = {url: "url@example.com", ip: generateIP()};
let chatInfo = {url: "url@example.com", ip: generateIP()};
let shoppingInfo = {url: "url@example.com", ip: generateIP()};
let socialInfo = {url: "url@example.com", ip: generateIP()};

let requestsIP = {
  homeScreen: homeInfo.ip,
  music: musicInfo.ip,
  browser: browserInfo.ip,
  homeBrowser: browserInfo.ip,
  badLink: browserInfo.ip,
  chat: chatInfo.ip,
  messageSent: chatInfo.ip,
  shopping: shoppingInfo.ip,
  cartQuantity: shoppingInfo.ip,
  social: socialInfo.ip,
  follow: socialInfo.ip,
  unfollow: socialInfo.ip,
  like: socialInfo.ip,
  unlike: socialInfo.ip,
  commentSent: socialInfo.ip,
  deleteComment: socialInfo.ip,
};

function generateHexCode() {
  let code = [];
  for (let i = 0; i < 4; i++) {
    code.push(ipCharacters[Math.floor(Math.random() * ipCharacters.length)]);
  }
  return code.join("");
}
function generateIP() {
  return (
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode() +
    ":" +
    generateHexCode()
  );
}

let hovering = null;
let possibleHovers = ["ISP", "DNS", "tower", "cable", "httpRequest"];

export default class DrawInfrastucture extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
    boldFont = p5.loadFont(BoldFont);
    background = p5.loadImage(Background);
  };
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(this.fr);
    width = this.props.dimensions.width;
    height = this.props.dimensions.height;

    phone = {
      x: 10,
      y: p5.windowHeight - 10 - height,
      w: width - 10 * 2,
      h: height,
      border: { tl: 10, tr: 10, bl: 10, br: 10 },
    };
    // CODE SHIFT HERE
    if (this.props.scaleFactor != 1) {
      phone.y += 60;
    }
    infrastructurePath = [
      { x: phone.x + phone.w / 2 / 2, y: phone.y - 100 },
      { x: phone.x + phone.w / 2 - 10, y: phone.y - 250 },
      { x: phone.x + phone.w / 2 + 10, y: phone.y - 250 },
      { x: phone.x + (phone.w / 2 + phone.w / 2 / 2), y: phone.y - 100 },
      { x: phone.x + phone.w / 2 / 2, y: phone.y - 100 },
      { x: phone.x + phone.w / 2 + phone.w / 2 / 3.5, y: phone.y - 175 },
      { x: phone.x + phone.w / 2.4, y: phone.y - 210 },
      {
        moveTo: {
          x: phone.x + (phone.w / 2 + phone.w / 2 / 2),
          y: phone.y - 100,
        },
      },
      { x: phone.x + (phone.w / 2 + phone.w / 2 / 2), y: phone.y - 100 },
      { x: phone.x + phone.w / 2.8, y: phone.y - 175 },
      { x: phone.x + phone.w / 2 + phone.w / 2 / 5.4, y: phone.y - 210 },
      { moveTo: { x: phone.x + phone.w / 2, y: phone.y - 250 } },
      { x: phone.x + phone.w / 2, y: phone.y - 250 },
      { x: phone.x + phone.w / 2, y: phone.y - 300, size: 20 },
      { x: phone.x + phone.w / 2, y: phone.y - 300 },
      {
        moveTo: {
          x: phone.x + (phone.w / 2 + phone.w / 2 / 2),
          y: phone.y - 100,
        },
      },
      { x: phone.x + (phone.w / 2 + phone.w / 2 / 2), y: phone.y - 100 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 200 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 275 },
      { x: phone.x + phone.w + 400, y: phone.y - 275 },
      { x: phone.x + phone.w + 400, y: phone.y - 125 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 125 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 200 },
      {
        moveTo: {
          x: phone.x + phone.w + 400,
          y: phone.y - (275 / 2 + 125 / 2),
        },
      },
      { x: phone.x + phone.w + 400, y: phone.y - (275 / 2 + 125 / 2) },
      { x: phone.x + phone.w + 500, y: phone.y - (275 / 2 + 125 / 2) },
      { x: phone.x + phone.w + 500, y: phone.y - 275 },
      { x: phone.x + phone.w + phone.w / 2 + 700, y: phone.y - 275 },
      { x: phone.x + phone.w + phone.w / 2 + 700, y: phone.y - 125 },
      { x: phone.x + phone.w + 500, y: phone.y - 125 },
      { x: phone.x + phone.w + 500, y: phone.y - (275 / 2 + 125 / 2) },
      {
        moveTo: {
          x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2),
          y: phone.y - 125,
        },
      },
      {
        x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2),
        y: phone.y - 125,
      },
      {
        x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2),
        y: phone.y - 25,
      },
    ];
    originalTurtlePath = [
      { x: phone.x + phone.w / 2, y: phone.y - 300 },
      { x: phone.x + phone.w / 2, y: phone.y - 250 },
      { x: phone.x + phone.w / 2 + 10, y: phone.y - 250 },
      { x: phone.x + (phone.w / 2 + phone.w / 2 / 2), y: phone.y - 100 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 200 },
      { x: phone.x + phone.w / 2 + 200, y: phone.y - 275 },
      { x: phone.x + phone.w + 400, y: phone.y - 275 },
      { x: phone.x + phone.w + 400, y: phone.y - (275 / 2 + 125 / 2) },
      { x: phone.x + phone.w + 500, y: phone.y - (275 / 2 + 125 / 2) },
      { x: phone.x + phone.w + 500, y: phone.y - 275 },
      { x: phone.x + phone.w + phone.w / 2 + 700, y: phone.y - 275 },
      { x: phone.x + phone.w + phone.w / 2 + 700, y: phone.y - 125 },
      {
        x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2),
        y: phone.y - 125,
      },
      {
        x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2),
        y: phone.y - 25,
      },
    ];
    turtlePath = originalTurtlePath;

    routers = [
      new Router(phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), phone.y - 25, 50, 50, [ // Router 0
          { x: phone.x + phone.w + 500, y: phone.y - 50 + 25, type: "router" },
          { x: phone.x + phone.w + 575, y: phone.y + 30 + 25, type: "router" },
          { x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + 100 / 2, type: "server" },
          { x: phone.x + phone.w + 750, y: phone.y + 50 + 25, type: "router" },
          { x: phone.x + phone.w + 850, y: phone.y - 25 + 25, type: "router" },
        ]),
      new Router(phone.x + phone.w + 500, phone.y - 50, 50, 50, [
        { x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), y: phone.y - 25 + 25, type: "router" },
        { x: phone.x + phone.w + 300, y: phone.y + 25, type: "router" },
        { x: phone.x + phone.w + 450, y: phone.y + 55 + 25, type: "router" },
        { x: phone.x + phone.w + 575, y: phone.y + 30 + 25, type: "router" },
      ]),
      new Router(phone.x + phone.w + 300, phone.y, 50, 50, [
        { x: phone.x + phone.w + 500, y: phone.y - 50 + 25, type: "router" },
        { x: phone.x + phone.w + 200, y: phone.y + 75 + (150 / 2), type: "server" },
        { x: phone.x + phone.w + 350, y: phone.y + 100 + 25, type: "router" },
        { x: phone.x + phone.w + 450, y: phone.y + 55 + 25, type: "router" },
      ]),
      new Router(phone.x + phone.w + 200, phone.y + 75, 100, 150),
      new Router(phone.x + phone.w + 350, phone.y + 100, 50, 50, [
        { x: phone.x + phone.w + 200, y: phone.y + 75 + (150 / 2), type: "server" },
        { x: phone.x + phone.w + 300, y: phone.y + 25, type: "router" },
        { x: phone.x + phone.w + 450, y: phone.y + 55 + 25, type: "router" },
        { x: phone.x + phone.w + 515, y: phone.y + 135 + 25, type: "router" },
        { x: phone.x + phone.w + 400, y: phone.y + 185 + 25, type: "router" },
        { x: phone.x + phone.w + 300, y: phone.y + 250 + 25, type: "router" },
      ]),
      new Router(phone.x + phone.w + 450, phone.y + 55, 50, 50, [
        { x: phone.x + phone.w + 350, y: phone.y + 100 + 25, type: "router" },
        { x: phone.x + phone.w + 575, y: phone.y + 30 + 25, type: "router" },
        { x: phone.x + phone.w + 500, y: phone.y - 50 + 25, type: "router" },
        { x: phone.x + phone.w + 300, y: phone.y + 25, type: "router" },
        { x: phone.x + phone.w + 515, y: phone.y + 135 + 25, type: "router" },
      ]),
      new Router(phone.x + phone.w + 575, phone.y + 30, 50, 50, [
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), y: phone.y - 25 + 25, type: "router"},
        {x: phone.x + phone.w + 500, y: phone.y - 50 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 55 + 25, type: "router"},
        {x: phone.x + phone.w + 515, y: phone.y + 135 + 25, type: "router"},
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + (100/2), type: "server"}
      ]),
      new Router(phone.x + phone.w + 515, phone.y + 135, 50, 50, [
        {x: phone.x + phone.w + 575, y: phone.y + 30 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 55 + 25, type: "router"},
        {x: phone.x + phone.w + 350, y: phone.y + 100 + 25, type: "router"},
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + (100/2), type: "server"},
        {x: phone.x + phone.w + 400, y: phone.y + 185 + 25, type: "router"},
        {x: phone.x + phone.w + 550, y: phone.y + 230 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), phone.y + 115, 125, 100),
      new Router(phone.x + phone.w + 550, phone.y + 230, 50, 50, [
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + (100/2), type: "server"},
        {x: phone.x + phone.w + 515, y: phone.y + 135 + 25, type: "router"},
        {x: phone.x + phone.w + 400, y: phone.y + 185 + 25, type: "router"},
        {x: phone.x + phone.w + 590, y: phone.y + 315 + 25, type: "router"},
        {x: phone.x + phone.w + 750, y: phone.y + 250 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 400, phone.y + 185, 50, 50, [ // Router 10
        {x: phone.x + phone.w + 515, y: phone.y + 135 + 25, router: "router"},
        {x: phone.x + phone.w + 350, y: phone.y + 100 + 25, type: "router"},
        {x: phone.x + phone.w + 300, y: phone.y + 250 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + 550, y: phone.y + 230 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 300, phone.y + 250, 50, 50, [
        {x: phone.x + phone.w + 400, y: phone.y + 185 + 25, type: "router"},
        {x: phone.x + phone.w + 350, y: phone.y + 100 + 25, type: "router"},
        {x: phone.x + phone.w + 200, y: phone.y + 75 + (150/2), type: "server"},
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + 150, y: phone.y + 300 + 25, type: "router"},
        {x: phone.x + phone.w + 300, y: phone.y + 400 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 450, phone.y + 300, 150, 100),
      new Router(phone.x + phone.w + 150, phone.y + 300, 50, 50, [
        {x: phone.x + phone.w + 200, y: phone.y + 75 + (150/2), type: "server"},
        {x: phone.x + phone.w + 300, y: phone.y + 250 + 25, type: "router"},
        {x: phone.x + phone.w + 300, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 200, y: phone.y + 475 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 300, phone.y + 400, 50, 50, [
        {x: phone.x + phone.w + 150, y: phone.y + 300 + 25, type: "router"},
        {x: phone.x + phone.w + 300, y: phone.y + 250 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + 200, y: phone.y + 475 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 450 + 25, type: "router"},
      ]),
      new Router(phone.x + phone.w + 200, phone.y + 475, 50, 50, [
        {x: phone.x + phone.w + 300, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 150, y: phone.y + 300 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 450 + 25, type: "router"},
        {x: phone.x + phone.w + 600, y: phone.y + 515 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 450, phone.y + 450, 50, 50, [
        {x: phone.x + phone.w + 200, y: phone.y + 475 + 25, type: "router"},
        {x: phone.x + phone.w + 300, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + 600, y: phone.y + 515 + 25, type: "router"},
        {x: phone.x + phone.w + 650, y: phone.y + 400 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 650, phone.y + 400, 50, 50, [
        {x: phone.x + phone.w + 450, y: phone.y + 450 + 25, type: "router"},
        {x: phone.x + phone.w + 590, y: phone.y + 315 + 25, type: "router"},
        {x: phone.x + phone.w + 750, y: phone.y + 250 + 25, type: "router"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 600, y: phone.y + 515 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 590, phone.y + 315, 50, 50, [
        {x: phone.x + phone.w + 650, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 750, y: phone.y + 250 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 300 + (100/2), type: "server"},
        {x: phone.x + phone.w + 550, y: phone.y + 230 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 750, phone.y + 250, 50, 50, [
        {x: phone.x + phone.w + 750, y: phone.y + 50 + 25, type: "router"},
        {x: phone.x + phone.w + 800, y: phone.y + 150 + 25, type: "router"},
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + (100/2), type: "server"},
        {x: phone.x + phone.w + 650, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 590, y: phone.y + 315 + 25, type: "router"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 550, y: phone.y + 230 + 25, type: "router"},
        {x: phone.x + phone.w + 900, y: phone.y + 400 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 750, phone.y + 50, 50, 50, [ // Router 20
        { x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), y: phone.y - 25 + 25, type: "router" },
        { x: phone.x + phone.w + 850, y: phone.y - 25 + 25, type: "router" },
        { x: phone.x + phone.w + 800, y: phone.y + 150 + 25, type: "router" },
        { x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 675) / 2), y: phone.y + 115 + (100/2), type: "server"}
      ]),
      new Router(phone.x + phone.w + 800, phone.y + 150, 50, 50, [
        {x: phone.x + phone.w + 750, y: phone.y + 50 + 25, type: "router"},
        {x: phone.x + phone.w + 900, y: phone.y + 75 + 25, type: "router"},
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"},
        {x: phone.x + phone.w + 750, y: phone.y + 250 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 600, phone.y + 515, 50, 50, [
        {x: phone.x + phone.w + 200, y: phone.y + 475 + 25, type: "router"},
        {x: phone.x + phone.w + 450, y: phone.y + 450 + 25, type: "router"},
        {x: phone.x + phone.w + 650, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"}
      ]),
      new Router(phone.x + phone.w + 775, phone.y + 400, 100, 150),
      new Router(phone.x + phone.w + 850, phone.y - 25, 50, 50, [
        {x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), y: phone.y - 25 + 25, type: "router"},
        {x: phone.x + phone.w + 1050, y: phone.y + (150/2), type: "server"},
        {x: phone.x + phone.w + 900, y: phone.y + 75 + 25, type: "router"},
        {x: phone.x + phone.w + 750, y: phone.y + 50 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 900, phone.y + 75, 50, 50, [
        {x: phone.x + phone.w + 850, y: phone.y - 25 + 25, type: "router"},
        {x: phone.x + phone.w + 800, y: phone.y + 150 + 25, type: "router"},
        {x: phone.x + phone.w + 1050, y: phone.y + (150/2), type: "server"},
        {x: phone.x + phone.w + 1050, y: phone.y + 200 + 25, type: "router"},
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"}
      ]),
      new Router(phone.x + phone.w + 920, phone.y + 225, 150, 100),
      new Router(phone.x + phone.w + 900, phone.y + 400, 50, 50, [
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 1000, y: phone.y + 500 + 25, type: "router"},
        {x: phone.x + phone.w + 750, y: phone.y + 250 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1000, phone.y + 500, 50, 50, [
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 900, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 1100, y: phone.y + 350 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1100, phone.y + 350, 50, 50, [
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"},
        {x: phone.x + phone.w + 1000, y: phone.y + 500 + 25, type: "router"},
        {x: phone.x + phone.w + 1050, y: phone.y + 200 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1050, phone.y + 200, 50, 50, [
        {x: phone.x + phone.w + 920, y: phone.y + 225 + (100/2), type: "server"},
        {x: phone.x + phone.w + 1050, y: phone.y + (150/2), type: "server"},
        {x: phone.x + phone.w + 900, y: phone.y + 75 + 25, type: "router"},
        {x: phone.x + phone.w + 1100, y: phone.y + 350 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1050, phone.y, 100, 150),
    ];

    let targetLocations = {shopping: routers[3], phone: routers[8], music: routers[12], chat: routers[23], browser: routers[26], social: routers[31]};

    possibleTargets = {
      homeScreen: targetLocations.phone,
      music: targetLocations.music,
      browser: targetLocations.browser,
      homeBrowser: targetLocations.browser,
      goodLink: targetLocations.browser,
      badLink: targetLocations.browser,
      chat: targetLocations.chat,
      messageSent: targetLocations.chat,
      shopping: targetLocations.shopping,
      cartQuantity: targetLocations.shopping,
      social: targetLocations.social,
      follow: targetLocations.social,
      unfollow: targetLocations.social,
      like: targetLocations.social,
      unlike: targetLocations.social,
      commentSent: targetLocations.social,
      deleteComment: targetLocations.social
    }
    turtle = {
      index: 1,
      x: turtlePath[0].x,
      y: turtlePath[0].y,
      speed: 20,
      stop: false,
      size: 10,
      distanceCheck: 3,
    };
    routerTurtle = {
      index: 0, 
      x: phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2), 
      y: phone.y - 25, 
      speed: 15,
      stop: false,
      draw: true,
      distanceCheck: 3,
    };

    httpSignalPos = {
      x: phone.x + phone.w / 2,
      y: phone.y,
      size: 0,
      opcaity: 1,
      stop: false,
      speed: 5,
    };
  };
  draw = (p5) => {
    p5.scale(this.props.scaleFactor, this.props.scaleFactor);       
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
      border: { tl: 5, tr: 5, bl: 5, br: 5 },
    };

    this.drawInfrastucture(p5);
    this.visualizeSignal(p5);
    this.router(p5);
    this.turtle(p5, turtlePath);
    this.internetSpeed(p5);
    
    let endpoints = {
    homeScreen: "home",
    music: "music",
    browser: "browser",
    chat: "chat",
    messageSent: "chat",
    shopping: "shopping",
    cartQuantity: "shopping",
    social: "social",
    follow: "social",
    unfollow: "social",
    like: "social",
    unlike: "social",
    commentSent: "social",
    deleteComment: "social"
    }

    if (pathFullyCompleted) {
      for (let endpoint of Object.keys(endpoints)) {
        if (this.props.httpSignal.endpoint.split("?")[0] === endpoint) {
          this.props.setPhoneScreen(endpoints[endpoint]);
        } else if (["badLink", "homeBrowser"].includes(this.props.httpSignal.endpoint)) {
          this.props.setPhoneScreen("browser");
          this.props.setBrowserScreen(this.props.httpSignal.endpoint)
        }
      }
      pathFullyCompleted = false;  
    } 
    
    if (hovering === null) {
      this.props.hoverElement(null);
    }
  };

  drawInfrastucture = (p5) => {
    p5.background(background);
    p5.stroke(150, 150, 150);
    for (let i = 0; i < infrastructurePath.length; i++) {
      p5.strokeWeight(10);
      if (this.props.pinged) {
        if (i === 13) {
          p5.stroke(cellTowerPingColor);
        } else {
          p5.stroke(150, 150, 150);
        }
      }
      if (i !== infrastructurePath.length - 1) {
        if (infrastructurePath[i].hasOwnProperty("size")) {
          p5.strokeWeight(infrastructurePath[i].size);
        }
        if (!infrastructurePath[i].hasOwnProperty("moveTo")) {
          p5.line(
            infrastructurePath[i].x,
            infrastructurePath[i].y,
            infrastructurePath[i + 1].x,
            infrastructurePath[i + 1].y
          );
        }
      }
    }
    this.props.setPing(false);
    p5.strokeWeight(1);

    // Text
    this.ispComponent(p5);
    this.dnsComponent(p5);

    if (p5.mouseX >= phone.x + phone.w / 2 / 2 - 5 &&
      p5.mouseX <= phone.x + phone.w / 2 / 2 - 5 + 150 &&
      p5.mouseY >= phone.y - 310 &&
      p5.mouseY <= phone.y - 310 + 225
      ) {
        p5.cursor(p5.HAND);
        hovering = "tower";
        this.props.hoverElement("tower");
      } else if (!possibleHovers.filter(function(e) {return e != "tower"}).includes(hovering)){
        hovering = null;
      }
  };

  ispComponent = (p5) => {
    p5.fill("rgba(0, 0, 0, 0.3)");
    p5.rect(phone.x + phone.w / 2 + 205, phone.y - 270, 330, 140);

    p5.textSize(20);
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.text(
      "ISP",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2,
      phone.y - (275 / 2 + 125 / 2) - 30
    );
    p5.text(
      "Internet Service Provider",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 90,
      phone.y - (275 / 2 + 125 / 2)
    );
    p5.noFill();
    p5.stroke(255, 255, 255);
    p5.rect(
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145,
      phone.y - (275 / 2 + 125 / 2) + 20,
      phone.w + 40,
      25
    );
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      "IPv6",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145 + 10,
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5
    );
    p5.textFont(regularFont);
    p5.textSize(20);
    p5.text(
      "|",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145 + 40,
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5 + 1.5
    );
    p5.textSize(12);

    if (p5.mouseX >= phone.x + phone.w / 2 + 200 &&
    p5.mouseX <= phone.x + phone.w + 400 &&
    p5.mouseY >= phone.y - 275 &&
    p5.mouseY <= phone.y - 125
    ) {
      hovering = "ISP";
      p5.cursor(p5.HAND);
      this.props.hoverElement("ISP");
    } else if (!possibleHovers.filter(function(e) {return e != "ISP"}).includes(hovering)){
      hovering = null;
    }

    if (createIP) {
      if (clientIP === "generating...") {
        clientIP = generateIP();
      }
    } else {
      clientIP = "generating...";
    }
    p5.text(
      clientIP,
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 -
        145 +
        25 +
        p5.textWidth("IPv6"),
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5
    );
  };

  dnsComponent = (p5) => {
    p5.fill("rgba(0, 0, 0, 0.3)");
    p5.rect(phone.x + phone.w + 505, phone.y - 270, 330, 140);

    p5.textSize(20);
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.text(
      "DNS",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 60,
      phone.y - (275 / 2 + 125 / 2) - 45
    );
    p5.text(
      "Domain Name System",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 140,
      phone.y - (275 / 2 + 125 / 2) - 20
    );
    p5.noFill();
    p5.stroke(255, 255, 255);
    p5.rect(
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210,
      phone.y - (275 / 2 + 125 / 2),
      phone.w + 40,
      25
    );
    p5.rect(
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210,
      phone.y - (275 / 2 + 125 / 2) + 35,
      phone.w + 40,
      25
    );
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      "TO",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 5,
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5
    );
    p5.text(
      "FROM",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 5,
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5
    );
    p5.textFont(regularFont);
    p5.textSize(20);
    p5.text(
      "|",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 40,
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5 + 1.5
    );
    p5.text(
      "|",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 40,
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5 + 1.5
    );
    p5.textSize(12);

    p5.text(
      toIP,
      phone.w +
        400 -
        phone.x +
        phone.w / 2 +
        200 -
        210 +
        25 +
        p5.textWidth("FRO"),
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5
    );

    p5.text(
      fromIP,
      phone.w +
        400 -
        phone.x +
        phone.w / 2 +
        200 -
        210 +
        25 +
        p5.textWidth("FRO"),
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5
    );
    
    if (p5.mouseX >= phone.x + phone.w + 500 &&
      p5.mouseX <= phone.x + phone.w + phone.w / 2 + 700 &&
      p5.mouseY >= phone.y - 275 &&
      p5.mouseY <= phone.y - 125
      ) {
        let toURL = "";
        hovering = "DNS";
        p5.cursor(p5.HAND);
        for (let i = 0; i < 6; i++) {
          let requestData = [homeInfo, musicInfo, browserInfo, chatInfo, shoppingInfo, socialInfo];
          if (toIP === requestData[i].ip) {
            toURL = requestData[i].url;
          }
        }
        this.props.setDNSHover(website + "/" + this.props.httpSignal.endpoint, toURL, toIP)
        this.props.hoverElement("DNS");
      } else if (!possibleHovers.filter(function(e) {return e != "DNS"}).includes(hovering)){
        hovering = null;
      }
  };

  visualizeSignal = (p5) => {
    if (this.props.httpSignal.endpoint != previousSignalEndpoint) {
      drawSignal = true;
   
      routerMovements = [];
      for (let router of routers) {
        router.visited = false;
        router.color = "rgba(255, 255, 255, 1)";
      }
      turtleColor = turtleColors.good;

      routerTurtle.index = 0;
      routerTurtle.x = phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2);
      routerTurtle.y = phone.y - 25;
      routerTurtle.draw = true;

      turtleReverse = false;
      
      if (httpSignalPos.y >= phone.y) {
        httpSignalPos.y = phone.y;
        httpSignalPos.size = 0;
        httpSignalPos.stop = false;
        reverseSignal = false;
      }      
    }
    
    if (drawSignal) {
      p5.noFill();
      p5.stroke(80, 190, 255);
      p5.strokeWeight(5);
      if (httpSignalPos.y <= 80 && reverseSignal === false) {
        httpSignalPos.stop = true;
        previousSignalEndpoint = this.props.httpSignal.endpoint;
      }
      if (httpSignalPos.stop === false) {
        if (reverseSignal === false) {
          for (let i = 0; i < 5; i++) {
            let tempY = httpSignalPos.y - i * 10;
            if (tempY < phone.y - 280) {
              tempY = phone.y - 280;
              this.props.setPing(true);
              createIP = true;
            }
            p5.arc(
              httpSignalPos.x,
              tempY,
              50,
              50,
              p5.PI + httpSignalPos.size + 0.04 * i,
              p5.PI * 2 - httpSignalPos.size - 0.04 * i
            );
          }
          httpSignalPos.y -= httpSignalPos.speed;
          httpSignalPos.size += 0.005 * httpSignalPos.speed;
        } else {
          for (let i = 0; i < 5; i++) {
            let tempY = httpSignalPos.y + i * 10;
            if (tempY >= phone.y + 25) {
              tempY = phone.y;
              pathFullyCompleted = true;
              break;
            }
            p5.arc(
              httpSignalPos.x,
              tempY,
              50,
              50,
              p5.PI + httpSignalPos.size + 0.04 * i,
              p5.PI * 2 - httpSignalPos.size - 0.04 * i
            );
          }
          httpSignalPos.y += httpSignalPos.speed;
          httpSignalPos.size += 0.005 * httpSignalPos.speed;
        }
        
      }
    }

    if (this.props.pinged) {
      drawTurtle = true;
      turtle.stop = false;
      turtlePath = originalTurtlePath;
      turtle.index = 1;
      turtle.x = turtlePath[0].x;
      turtle.y = turtlePath[0].y;

      cellTowerPingColor = "rgb(0, 255, 0)";
    }

    // Revert to normal
    p5.strokeWeight(1);
    p5.fill(255, 255, 255);

    // Request Text
    p5.fill("rgba(0, 0, 0, 0.3)");
    p5.stroke(255, 255, 255);
    p5.rect(phone.x + phone.w / 2 / 3, phone.y - 80, phone.w / 1.5, 25);
    if (this.props.httpSignal) {
      p5.fill(255, 255, 255);
      p5.noStroke();
      p5.textFont(boldFont);
      p5.textSize(12);
      p5.text(
        this.props.httpSignal.request,
        phone.x + phone.w / 2 / 3 + 10,
        phone.y - 80 + 25 / 1.5
      );
      p5.textFont(regularFont);
      p5.text(
        "/" + this.props.httpSignal.endpoint.split("?")[0],
        phone.x +
          phone.w / 2 / 3 +
          15 +
          p5.textWidth(this.props.httpSignal.request),
        phone.y - 80 + 25 / 1.5
      );
      p5.textSize(20);
      p5.text("|", phone.x + phone.w / 2 / 3 + 140, phone.y - 78.5 + 25 / 1.5);
      p5.textSize(12);
      p5.textFont(boldFont);
      p5.text(
        this.props.httpSignal.status,
        phone.x + phone.w / 2 / 3 + 155,
        phone.y - 80 + 25 / 1.5
      );
      p5.textFont(regularFont);
    }

    if (p5.mouseX >= phone.x + phone.w / 2 / 3 &&
      p5.mouseX <= phone.x + phone.w / 2 / 3 + phone.w / 1.5 &&
      p5.mouseY >= phone.y - 80 &&
      p5.mouseY <= phone.y - 80 + 25
      ) {
        hovering = "httpRequest";
        p5.cursor(p5.HAND);
        this.props.hoverElement("httpRequest");
      } else if (!possibleHovers.filter(function(e) {return e != "httpRequest"}).includes(hovering)){
        hovering = null;
      }

  };

  findAdjacentNearestTarget = (p5, currentRouter, allRouters, target) => {
    let adjacents = [];

    if (currentRouter.closestRouters !== []) {
      adjacents = currentRouter.closestRouters.filter (
        (router) => routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).visited === false 
        && (router.type === "router" || p5.dist(router.x, router.y, target.x, target.y) === 0)
      )
      // If the router has two or more closest routers that are not yet visited ***
      adjacents.filter((router) => {
        let counter = 0;
        if (routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).closestRouters.some((element)=>routers.find((e)=> e.entrancePoint.x === element.x && e.entrancePoint.y === element.y).visited === false))  {
          counter ++;
        }
        return counter >= 2
      })
    }
    
    let nearestToTarget = currentRouter;
    
    if (Math.random() <= 0.1) {
      let randomIndex = Math.floor(Math.random()*adjacents.length);
      nearestToTarget = routers.find((e)=> {        
        return e.entrancePoint.x === adjacents[randomIndex].x && e.entrancePoint.y === adjacents[randomIndex].y
      });
    } else {
      adjacents.forEach((adjacent) => {
        if (
          p5.dist(
            adjacent.x,
            adjacent.y,
            target.x,
            target.y
          ) <
          p5.dist(
            nearestToTarget.entrancePoint.x,
            nearestToTarget.entrancePoint.y,
            target.x,
            target.y
          )
        ) 
          nearestToTarget = routers.find((e)=> e.entrancePoint.x === adjacent.x && e.entrancePoint.y === adjacent.y);
      });
    }
    if (routerMovements.includes(routers[0]) === false) {
      routerMovements.push(routers[0]);
      routers[0].visited = true;
    }
    if (routerMovements.includes(nearestToTarget) === false) {
      routerMovements.push(nearestToTarget);
      nearestToTarget.visited = true;
    }
    if (
      nearestToTarget.entrancePoint.x === target.x &&
      nearestToTarget.entrancePoint.y === target.y
    ) {
      return true;
    } else {
      this.findAdjacentNearestTarget(p5, nearestToTarget, allRouters, target);
    }
  };

  router = (p5) => {
    drawRouters(p5, routers);
    
    for (let i = 0; i < routers.length; i++) {
      if (routers[i].w === 50 && routers[i].h === 50) {
        if (p5.mouseX >= routers[i].x &&
          p5.mouseX <= routers[i].x + routers[i].w &&
          p5.mouseY >= routers[i].y &&
          p5.mouseY <= routers[i].y + routers[i].h
        ) {
          hovering = "router"+i;
          p5.cursor(p5.HAND);
          this.props.hoverElement("router");
        }
      } else {
        if (p5.mouseX >= routers[i].x &&
          p5.mouseX <= routers[i].x + routers[i].w &&
          p5.mouseY >= routers[i].y &&
          p5.mouseY <= routers[i].y + routers[i].h
        ) {
          hovering = "server"+i;
          p5.cursor(p5.HAND);
          let serverLocs = {3: shoppingInfo, 8: homeInfo, 12: musicInfo, 23: chatInfo, 26: browserInfo, 31: socialInfo};
          let currentServer = {url: serverLocs[i].url, ip: serverLocs[i].ip};
          this.props.setServerHover(currentServer.url, currentServer.ip);
          this.props.hoverElement("server");
        }
      }
    }

    // Boxes
    for (let i = 0; i < routers.length; i++) {
      p5.fill(255, 255, 255);
      p5.stroke(150, 150, 150);
      p5.fill(routers[i].color);
      p5.rect(routers[i].x, routers[i].y, routers[i].w, routers[i].h, 5);
      p5.noStroke();
    }
    p5.strokeWeight(1);
    p5.noStroke();
    if (drawData) {
      for (let i=0; i<routers.length; i++) {
        p5.fill(255, 255, 255);
        p5.stroke(1);
        p5.rect(routers[i].entrancePoint.x - 52, routers[i].y - 23, 105, 20);
        p5.fill(255, 0, 0);
        p5.textAlign(p5.CENTER);
        p5.textFont(boldFont);
        p5.noStroke();
        p5.text(`${i}; x: ${routers[i].entrancePoint.x}; y: ${routers[i].entrancePoint.y}`, routers[i].entrancePoint.x, routers[i].y - 10);
      }
    }
    p5.strokeWeight(1);
    p5.noStroke();

    // Turtle
    if (routersReached && pathMade === false) {
      turtlePath = turtlePath.map((item,idx) => turtlePath[turtlePath.length-1-idx]);
      pathMade = this.findAdjacentNearestTarget(
        p5,
        routers[0],
        routers,
        targetServer
      );
    }
    if (routerMovements.length !== 0) {

      for (let router of routers) {
        router.visited = false;
      }
      turtlePathMade = true;
      routerTurtle.stop = false;
      routerPathMade = false;
      
      turtleMovements = routerMovements;

      for (let router of routerMovements) {
        if (drawData) {
          p5.fill(255, 0, 0);
          p5.ellipse (
            router.entrancePoint.x,
            router.entrancePoint.y,
            40,
            40
            );        
            p5.beginShape();
            p5.stroke(255, 0, 0);
            p5.noFill();
            for (let i=0; i<routerMovements.length; i++) {
              p5.vertex(routerMovements[i].entrancePoint.x, routerMovements[i].entrancePoint.y);
            }
            p5.endShape();
            p5.noStroke();
          }
        }
      }  
      
      // Server Text
      p5.fill(100, 100, 100);
      p5.textAlign(p5.CENTER);
      p5.textSize(18);
      p5.text("Shopping", possibleTargets["shopping"].entrancePoint.x, possibleTargets["shopping"].entrancePoint.y); 
      p5.text("Music", possibleTargets["music"].entrancePoint.x, possibleTargets["music"].entrancePoint.y); 
      p5.text("Chat", possibleTargets["chat"].entrancePoint.x, possibleTargets["chat"].entrancePoint.y); 
      p5.text("Browser", possibleTargets["browser"].entrancePoint.x, possibleTargets["browser"].entrancePoint.y); 
      p5.text("Social", possibleTargets["social"].entrancePoint.x, possibleTargets["social"].entrancePoint.y); 
      p5.text("Phone Cloud", possibleTargets["homeScreen"].entrancePoint.x, possibleTargets["homeScreen"].entrancePoint.y); 
  };

  turtle = (p5) => {
    if (drawTurtle) {
      if (turtle.stop === false) {
        for (let i = 0; i < turtle.speed; i++) {
          if (
            Math.abs(p5.dist(
              turtlePath[turtlePath.length - 1].x,
              turtlePath[turtlePath.length - 1].y,
              turtle.x,
              turtle.y
            )) <= turtle.distanceCheck
          ) {
            drawTurtle = false;
          }
          if (
            Math.abs(p5.dist(
              turtlePath[turtle.index].x,
              turtlePath[turtle.index].y,
              turtle.x,
              turtle.y
            )) <= turtle.distanceCheck
          ) {
            if (turtle.index === turtlePath.length - 1) {
              turtle.stop = true;
            } else {
              turtle.index += 1;
            }
          }
          if (turtlePath[turtle.index].hasOwnProperty("moveTo")) {
            turtle.x = turtlePath[turtle.index].moveTo["x"];
            turtle.y = turtlePath[turtle.index].moveTo["y"];
            turtle.index += 1;
          } else {
            if (
              Math.abs(turtlePath[turtle.index].x - turtle.x) >=
              turtle.distanceCheck
            ) {
              if (turtlePath[turtle.index].x > turtle.x) {
                turtle.x += 1;
                turtle.y +=
                  (turtlePath[turtle.index].y - turtle.y) /
                  (turtlePath[turtle.index].x - turtle.x);
              } else {
                turtle.x -= 1;
                turtle.y -=
                  (turtlePath[turtle.index].y - turtle.y) /
                  (turtlePath[turtle.index].x - turtle.x);
              }
            } else {
              if (turtlePath[turtle.index].y > turtle.y) {
                turtle.y += 1;
              } else {
                turtle.y -= 1;
              }
              turtle.x = turtlePath[turtle.index].x;
            }
          }          
          p5.fill(turtleColor);
          if (turtlePath[turtle.index].hasOwnProperty("size")) {
            p5.ellipse(turtle.x, turtle.y, turtlePath[turtle.index].size);
          } else {
            p5.ellipse(turtle.x, turtle.y, turtle.size);
          }

          // DNS Server Reached
          if (
            Math.abs(phone.x + phone.w + 500 - turtle.x) <= turtle.distanceCheck
          ) {
            toIP = requestsIP[this.props.httpSignal.endpoint.split("?")[0]];
            fromIP = clientIP;
          }

          // Routers Reached
          if (
            Math.abs(
              phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2) - turtle.x
            ) +
              Math.abs(phone.y - 25 - turtle.y) <=
            turtle.distanceCheck * 2
          ) {
            //Routers reached 
            turtle.stop = true; 
            drawTurtle = false;              
            
            routersReached = true;
            
            pathMade = false;
            targetServer = possibleTargets[this.props.httpSignal.endpoint.split("?")[0]].entrancePoint;  
          } else {
            routersReached = false;
          }

          if (turtleReverse) {
            if (p5.dist(turtle.x, turtle.y, phone.x + phone.w / 2, phone.y - 300) < turtle.distanceCheck) {
              drawTurtle = false;
              turtle.stop = true;
              turtleReverse = false;
              reverseSignal = true;
              drawSignal = true;
              httpSignalPos.stop = false;
              httpSignalPos.size = 0;
            }
          }
        }
      }
    } else {
      turtle.index = 1;
      turtle.x = turtlePath[0].x;
      turtle.y = turtlePath[0].y;
      turtle.stop = false;
      turtle.size = 10;
    }

    if (turtlePathMade) {
      if (routerTurtle.stop === false && !routerPathMade) {        
        for (let i = 0; i < routerTurtle.speed; i++) {
          if (
            Math.abs(p5.dist(
              turtleMovements[routerTurtle.index].entrancePoint.x,
              turtleMovements[routerTurtle.index].entrancePoint.y,
              routerTurtle.x,
              routerTurtle.y
            )) <= routerTurtle.distanceCheck
          ) {
            if (routerTurtle.index === turtleMovements.length - 1) {
              routerTurtle.stop = true;
            } else {
              routerTurtle.index += 1;
            }
          }
         
          if (
            Math.abs(turtleMovements[routerTurtle.index].entrancePoint.x - routerTurtle.x) >=
            routerTurtle.distanceCheck
          ) {
            if (turtleMovements[routerTurtle.index].entrancePoint.x > routerTurtle.x) {
              routerTurtle.x += 1;
              routerTurtle.y +=
                (turtleMovements[routerTurtle.index].entrancePoint.y - routerTurtle.y) /
                (turtleMovements[routerTurtle.index].entrancePoint.x - routerTurtle.x);
            } else {
              routerTurtle.x -= 1;
              routerTurtle.y -=
                (turtleMovements[routerTurtle.index].entrancePoint.y - routerTurtle.y) /
                (turtleMovements[routerTurtle.index].entrancePoint.x - routerTurtle.x);
            }
          } else {
            if (turtleMovements[routerTurtle.index].entrancePoint.y > routerTurtle.y) {
              routerTurtle.y += 0.5;
            } else {
              routerTurtle.y -= 0.5;
            }
            routerTurtle.x = turtleMovements[routerTurtle.index].entrancePoint.x;
          }
          }
          if (routerTurtle.draw) {
            if (!turtleReverse) {
              for (let movement of routerMovements) {
                if (p5.dist(routerTurtle.x, routerTurtle.y, movement.entrancePoint.x, movement.entrancePoint.y) < routerTurtle.distanceCheck * routerTurtle.speed) {
                  let router = routers.find((e)=> e.entrancePoint.x === movement.entrancePoint.x && e.entrancePoint.y === movement.entrancePoint.y);
                  router.color = "rgba(0, 255, 0, 1)";                  
                }  
              }
            }

            p5.fill(255, 255, 255);
            p5.ellipse(routerTurtle.x, routerTurtle.y, 30); 
            p5.fill(255, 255, 255);
            p5.ellipse(routerTurtle.x, routerTurtle.y, 25); 
            p5.fill(turtleColor);
            p5.ellipse(routerTurtle.x, routerTurtle.y, 20); 
          }
          
          if (targetServer) {
            if (p5.dist(routerTurtle.x, routerTurtle.y, targetServer.x, targetServer.y) < routerTurtle.distanceCheck) {
              turtleReverse = true;
              possibleTargets[this.props.httpSignal.endpoint.split("?")[0]].color = this.props.httpSignal.status == 200 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)";
              routerTurtle.index = 0;
              turtleMovements = turtleMovements.reverse();
              if (this.props.httpSignal.status == 200) {
                turtleColor = turtleColors.good;
              } else if (this.props.httpSignal.status == 404) {
                turtleColor = turtleColors.bad;
              } 
            }
          }
          if (turtleReverse) {
            if (p5.dist(routerTurtle.x, routerTurtle.y, routers[0].entrancePoint.x, routers[0].entrancePoint.y) < routerTurtle.distanceCheck) {
              routerTurtle.stop = true;
              routerTurtle.draw = false;      
              
              turtle.stop = false;
              drawTurtle = true;           
            }
          }

      }
      } else {
        routerTurtle.index = 0;
        routerTurtle.x = phone.x + phone.w + (500 / 2 + (phone.w / 2 + 700) / 2);
        routerTurtle.y = phone.y - 25;
        routerTurtle.draw = true;
      } 
  };

  internetSpeed = (p5) => {
    let internetSpeedText = internetSpeed[0].toUpperCase() + internetSpeed.slice(1);
    p5.fill("rgba(0, 0, 0, 0.4)");
    p5.rect(0, 0, 190, 30);
    
    p5.textSize(16);
    p5.textFont(regularFont);
    p5.fill(255, 255, 255);
    p5.text("Internet Speed: ", 60, 20);
    p5.textFont(boldFont);
    if (internetSpeed === "slow") {
      p5.fill(255, 0, 0);
    } else if (internetSpeed === "medium") {
      p5.fill(230, 180, 0);
    } else {
      p5.fill(0, 200, 0);
    }
    p5.textAlign(p5.LEFT);
    p5.text(internetSpeedText, p5.textWidth("Internet Speed:  "), 20);
    turtle.speed = 20 + speeds[internetSpeed];
    routerTurtle.speed = 15 + speeds[internetSpeed];
    httpSignalPos.speed = 5 + speeds[internetSpeed];
    if (httpSignalPos.speed < 0) {
      httpSignalPos.speed = 1;
    }

    if (p5.mouseX <= p5.textWidth("Internet Speed:  ") + p5.textWidth(internetSpeedText) &&
    p5.mouseX >= p5.textWidth("Internet Speed:  ") &&
    p5.mouseY <= 27 &&
    p5.mouseY >= 5
    ) {
      p5.cursor(p5.HAND);
      if (p5.mouseIsPressed) {
        if (canChangeSpeed){
          let possibleSpeeds = ["slow", "medium", "fast"];
          let index = possibleSpeeds.indexOf(internetSpeed);
          if (index < possibleSpeeds.length - 1) {
            index += 1;
          } else if (index === possibleSpeeds.length - 1) {
            index = 0;
          }
          internetSpeed = possibleSpeeds[index]; 
          canChangeSpeed = false;        
        }
      } else {
        canChangeSpeed = true;
      }
    }
  }

  render() {
    return (
      <div>
        <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}