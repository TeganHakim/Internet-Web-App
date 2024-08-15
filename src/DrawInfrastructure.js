import React, { Component } from "react";
// import Sketch from "react-p5";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";
import { Router } from "./Router";
import drawInfrastructureNodes from "./p5_functions/DrawInfrastructureNodes";
import drawSignalVisualization from "./p5_functions/DrawSignalVisualization";
import drawRoutersInfo from "./p5_functions/DrawRoutersInfo";
import drawTurtlePath from "./p5_functions/DrawTurtlePath";
import drawInternetSpeed from "./p5_functions/DrawInternetSpeed";
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
const setCanChangeSpeed = (change) => {
  canChangeSpeed = change;
}
let internetSpeed = "medium";
const setInternetSpeed = (speed) => {
  internetSpeed = speed;
}
let speeds = {
  slow: -6,
  medium: 0,
  fast: 10
}

let turtle;
let routerTurtle;
const turtleColors = { good: "rgb(0, 255, 0)", bad: "rgb(255, 0, 0)" };
let turtleColor;
const setTurtleColor = (color) => {
  turtleColor = color;
}
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
const setRouterMovements = (movements) => {
  routerMovements = movements;
}
let turtleMovements = [];
let routersReached = false;
let targetServer;
let pathFullyCompleted = false;

let httpSignalPos;
let previousSignalEndpoint = null;
let drawSignal = false;
const setDrawSignal = (draw) => {
  drawSignal = draw;
}

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
const setClientIP = (ip) => {
  clientIP = ip;
}

let toIP = "";
let fromIP = "";

let website = "internet-simulator.com";

let homeInfo = {url: "www.your-phone.com", ip: generateIP()};
let musicInfo = {url: "www.prime-music.org", ip: generateIP()};
let browserInfo = {url: "www.info-browser.com", ip: generateIP()};
let chatInfo = {url: "www.chat-room.com", ip: generateIP()};
let shoppingInfo = {url: "www.shop-online.org", ip: generateIP()};
let socialInfo = {url: "www.friend-central.com", ip: generateIP()};

let requestData = [homeInfo, musicInfo, browserInfo, chatInfo, shoppingInfo, socialInfo];
let serverLocs = {3: shoppingInfo, 8: homeInfo, 12: musicInfo, 23: chatInfo, 26: browserInfo, 31: socialInfo};

let possibleSpeeds = ["slow", "medium", "fast"];

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
const setHovering = (hover) => {
  hovering = hover;
}
let possibleHovers = ["ISP", "DNS", "tower", "cable", "httpRequest", "router", "server"];

export default class DrawInfrastucture extends Component {
  sketch = (p5) => {
    p5.preload = () => {
      regularFont = p5.loadFont(RegularFont);
      boldFont = p5.loadFont(BoldFont);
      background = p5.loadImage(Background);
    };
    p5.setup = (canvasParentRef) => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
      p5.frameRate(this.fr);
      
      infrastructurePath = [
        { x: this.props.phone.x + this.props.phone.w / 2 / 2, y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2 - 10, y: this.props.phone.y - 250 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 10, y: this.props.phone.y - 250 },
        { x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2), y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2 / 2, y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2 + this.props.phone.w / 2 / 3.5, y: this.props.phone.y - 175 },
        { x: this.props.phone.x + this.props.phone.w / 2.4, y: this.props.phone.y - 210 },
        {
          moveTo: {
            x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2),
            y: this.props.phone.y - 100,
          },
        },
        { x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2), y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2.8, y: this.props.phone.y - 175 },
        { x: this.props.phone.x + this.props.phone.w / 2 + this.props.phone.w / 2 / 5.4, y: this.props.phone.y - 210 },
        { moveTo: {
           x: this.props.phone.x + this.props.phone.w / 2, 
           y: this.props.phone.y - 250 
          } 
        },
        { x: this.props.phone.x + this.props.phone.w / 2, y: this.props.phone.y - 250 },
        { x: this.props.phone.x + this.props.phone.w / 2, y: this.props.phone.y - 300, size: 20 },
        { x: this.props.phone.x + this.props.phone.w / 2, y: this.props.phone.y - 300 },
        {
          moveTo: {
            x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2),
            y: this.props.phone.y - 100,
          },
        },
        { x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2), y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 200 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y - 125 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 125 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 200 },
        {
          moveTo: {
            x: this.props.phone.x + this.props.phone.w + 400,
            y: this.props.phone.y - (275 / 2 + 125 / 2),
          },
        },
        { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y - (275 / 2 + 125 / 2) },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - (275 / 2 + 125 / 2) },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + this.props.phone.w / 2 + 700, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + this.props.phone.w / 2 + 700, y: this.props.phone.y - 125 },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 125 },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - (275 / 2 + 125 / 2) },
        {
          moveTo: {
            x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2),
            y: this.props.phone.y - 125,
          },
        },
        { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 125 },
        { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 25 },
      ];
      originalTurtlePath = [
        { x: this.props.phone.x + this.props.phone.w / 2, y: this.props.phone.y - 300 },
        { x: this.props.phone.x + this.props.phone.w / 2, y: this.props.phone.y - 250 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 10, y: this.props.phone.y - 250 },
        { x: this.props.phone.x + (this.props.phone.w / 2 + this.props.phone.w / 2 / 2), y: this.props.phone.y - 100 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 200 },
        { x: this.props.phone.x + this.props.phone.w / 2 + 200, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y - (275 / 2 + 125 / 2) },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - (275 / 2 + 125 / 2) },
        { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + this.props.phone.w / 2 + 700, y: this.props.phone.y - 275 },
        { x: this.props.phone.x + this.props.phone.w + this.props.phone.w / 2 + 700, y: this.props.phone.y - 125 },
        {
          x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2),
          y: this.props.phone.y - 125,
        },
        {
          x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2),
          y: this.props.phone.y - 25,
        },
      ];
      turtlePath = originalTurtlePath;
  
      routers = [
        new Router(this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), this.props.phone.y - 25, 50, 50, [ // Router 0
            { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 50 + 25, type: "router" },
            { x: this.props.phone.x + this.props.phone.w + 575, y: this.props.phone.y + 30 + 25, type: "router" },
            { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + 100 / 2, type: "server" },
            { x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 50 + 25, type: "router" },
            { x: this.props.phone.x + this.props.phone.w + 850, y: this.props.phone.y - 25 + 25, type: "router" },
          ]),
        new Router(this.props.phone.x + this.props.phone.w + 500, this.props.phone.y - 50, 50, 50, [
          { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 25 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 55 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 575, y: this.props.phone.y + 30 + 25, type: "router" },
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 300, this.props.phone.y, 50, 50, [
          { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 50 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 75 + (150 / 2), type: "server" },
          { x: this.props.phone.x + this.props.phone.w + 350, y: this.props.phone.y + 100 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 55 + 25, type: "router" },
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 200, this.props.phone.y + 75, 100, 150),
        new Router(this.props.phone.x + this.props.phone.w + 350, this.props.phone.y + 100, 50, 50, [
          { x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 75 + (150 / 2), type: "server" },
          { x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 55 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 515, y: this.props.phone.y + 135 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y + 185 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 250 + 25, type: "router" },
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 450, this.props.phone.y + 55, 50, 50, [
          { x: this.props.phone.x + this.props.phone.w + 350, y: this.props.phone.y + 100 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 575, y: this.props.phone.y + 30 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 50 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 515, y: this.props.phone.y + 135 + 25, type: "router" },
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 575, this.props.phone.y + 30, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 25 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 500, y: this.props.phone.y - 50 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 55 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 515, y: this.props.phone.y + 135 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + (100/2), type: "server"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 515, this.props.phone.y + 135, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 575, y: this.props.phone.y + 30 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 55 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 350, y: this.props.phone.y + 100 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y + 185 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 550, y: this.props.phone.y + 230 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), this.props.phone.y + 115, 125, 100),
        new Router(this.props.phone.x + this.props.phone.w + 550, this.props.phone.y + 230, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 515, y: this.props.phone.y + 135 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y + 185 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 590, y: this.props.phone.y + 315 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 250 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 400, this.props.phone.y + 185, 50, 50, [ // Router 10
          {x: this.props.phone.x + this.props.phone.w + 515, y: this.props.phone.y + 135 + 25, router: "router"},
          {x: this.props.phone.x + this.props.phone.w + 350, y: this.props.phone.y + 100 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 250 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 550, y: this.props.phone.y + 230 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 300, this.props.phone.y + 250, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 400, y: this.props.phone.y + 185 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 350, y: this.props.phone.y + 100 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 75 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 150, y: this.props.phone.y + 300 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 400 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 450, this.props.phone.y + 300, 150, 100),
        new Router(this.props.phone.x + this.props.phone.w + 150, this.props.phone.y + 300, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 75 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 250 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 475 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 300, this.props.phone.y + 400, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 150, y: this.props.phone.y + 300 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 250 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 475 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 450 + 25, type: "router"},
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 200, this.props.phone.y + 475, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 150, y: this.props.phone.y + 300 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 450 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 600, y: this.props.phone.y + 515 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 450, this.props.phone.y + 450, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 475 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 300, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 600, y: this.props.phone.y + 515 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 650, y: this.props.phone.y + 400 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 650, this.props.phone.y + 400, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 450 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 590, y: this.props.phone.y + 315 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 250 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 775, y: this.props.phone.y + 400 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 600, y: this.props.phone.y + 515 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 590, this.props.phone.y + 315, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 650, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 250 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 300 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 550, y: this.props.phone.y + 230 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 750, this.props.phone.y + 250, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 50 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 800, y: this.props.phone.y + 150 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 650, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 590, y: this.props.phone.y + 315 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 775, y: this.props.phone.y + 400 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 550, y: this.props.phone.y + 230 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 900, y: this.props.phone.y + 400 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 750, this.props.phone.y + 50, 50, 50, [ // Router 20
          { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 25 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 850, y: this.props.phone.y - 25 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + 800, y: this.props.phone.y + 150 + 25, type: "router" },
          { x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 675) / 2), y: this.props.phone.y + 115 + (100/2), type: "server"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 800, this.props.phone.y + 150, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 50 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 900, y: this.props.phone.y + 75 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 250 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 600, this.props.phone.y + 515, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 200, y: this.props.phone.y + 475 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 450, y: this.props.phone.y + 450 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 650, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 775, y: this.props.phone.y + 400 + (150/2), type: "server"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 775, this.props.phone.y + 400, 100, 150),
        new Router(this.props.phone.x + this.props.phone.w + 850, this.props.phone.y - 25, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), y: this.props.phone.y - 25 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 1050, y: this.props.phone.y + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 900, y: this.props.phone.y + 75 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 50 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 900, this.props.phone.y + 75, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 850, y: this.props.phone.y - 25 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 800, y: this.props.phone.y + 150 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 1050, y: this.props.phone.y + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 1050, y: this.props.phone.y + 200 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 920, this.props.phone.y + 225, 150, 100),
        new Router(this.props.phone.x + this.props.phone.w + 900, this.props.phone.y + 400, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 775, y: this.props.phone.y + 400 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 1000, y: this.props.phone.y + 500 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 750, y: this.props.phone.y + 250 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 1000, this.props.phone.y + 500, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 775, y: this.props.phone.y + 400 + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 900, y: this.props.phone.y + 400 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 1100, y: this.props.phone.y + 350 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 1100, this.props.phone.y + 350, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 1000, y: this.props.phone.y + 500 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 1050, y: this.props.phone.y + 200 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 1050, this.props.phone.y + 200, 50, 50, [
          {x: this.props.phone.x + this.props.phone.w + 920, y: this.props.phone.y + 225 + (100/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 1050, y: this.props.phone.y + (150/2), type: "server"},
          {x: this.props.phone.x + this.props.phone.w + 900, y: this.props.phone.y + 75 + 25, type: "router"},
          {x: this.props.phone.x + this.props.phone.w + 1100, y: this.props.phone.y + 350 + 25, type: "router"}
        ]),
        new Router(this.props.phone.x + this.props.phone.w + 1050, this.props.phone.y, 100, 150),
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
        x: this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2), 
        y: this.props.phone.y - 25, 
        speed: 15,
        stop: false,
        draw: true,
        distanceCheck: 3,
      };
  
      httpSignalPos = {
        x: this.props.phone.x + this.props.phone.w / 2,
        y: this.props.phone.y,
        size: 0,
        opcaity: 1,
        stop: false,
        speed: 5,
      };
    };
    p5.draw = () => {
      p5.scale(this.props.scaleFactor, this.props.scaleFactor);
      p5.background(background);       
      // Regulate Text
      p5.textSize(12);
      p5.textStyle(p5.NORMAL);
      p5.textFont(regularFont);
      p5.textAlign(p5.LEFT);
      // Cursor
      p5.cursor(p5.ARROW);
  
      drawInfrastructureNodes(p5, this.props.phone, this.props.scaleFactor, boldFont, regularFont, infrastructurePath, cellTowerPingColor, this.props.httpSignal, createIP, clientIP, setClientIP, generateIP, toIP, fromIP, website, requestData, this.props.setDNSHover, this.props.pinged, this.props.setPing, hovering, setHovering, this.props.hoverElement, possibleHovers);
      drawSignalVisualization(p5, this.props.scaleFactor, boldFont, regularFont, this.props.phone, this.props.httpSignal, httpSignalPos, previousSignalEndpoint, drawSignal, setDrawSignal, reverseSignal, turtle, turtlePath, originalTurtlePath, drawTurtle, turtleReverse, setTurtleColor, turtleColors, cellTowerPingColor, routers, routerTurtle, setRouterMovements, createIP, pathFullyCompleted, this.props.pinged, this.props.setPing, hovering, setHovering, this.props.hoverElement, possibleHovers);
      drawRoutersInfo(p5, boldFont, this.props.scaleFactor, drawData, routers, serverLocs, routersReached, routerMovements, routerTurtle, turtlePath, routerPathMade, pathMade, turtlePathMade, targetServer, possibleTargets, this.props.setServerHover, setHovering, this.props.hoverElement);
      drawTurtlePath(p5, drawTurtle, turtle, turtlePath, turtleReverse, turtleMovements, reverseSignal, turtleColor, turtleColors, toIP, fromIP, clientIP, requestsIP, this.props.httpSignal, httpSignalPos, this.props.phone, routersReached, routerTurtle, routerMovements, routerPathMade, pathMade, turtlePathMade, targetServer, possibleTargets);
      drawInternetSpeed(p5, this.props.scaleFactor, boldFont, regularFont, internetSpeed, setInternetSpeed, speeds, canChangeSpeed, setCanChangeSpeed, possibleSpeeds, turtle, routerTurtle, httpSignalPos);
      
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
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}