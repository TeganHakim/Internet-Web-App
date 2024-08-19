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
// import findAdjacentNearestTarget from "./p5_functions/FindAdjacentNearestTarget";
import drawTurtlePath from "./p5_functions/DrawTurtlePath";
import drawRouters from "./p5_functions/DrawRouters";
import drawInternetSpeed from "./p5_functions/DrawInternetSpeed";
import Background from "./assets/Images/Background-Map.png";
import drawISPComponent from "./p5_functions/DrawISPComponent";
import drawDNSComponent from "./p5_functions/DrawDNSComponent";

function getBounds(data, scaleFactor) {
  return {
    left: data.x * scaleFactor, 
    right: (data.x + data.width) * scaleFactor, 
    top: data.y * scaleFactor, 
    bottom: (data.y + data.height) * scaleFactor
  };
}

function getRouterBounds(router, scaleFactor) {
  return {
    left: router.x * scaleFactor, 
    right: (router.x + router.w) * scaleFactor, 
    top: router.y * scaleFactor, 
    bottom: (router.y + router.h) * scaleFactor
  };
}

let background;

// let width;
// let height;
// let phone;

let drawData = false;

let regularFont;
let boldFont;

let infrastructurePath;
let cellTowerPingColor = "rgb(0, 255, 0)";
const setCellTowerPingColor = (color) => {
  cellTowerPingColor = color;
}

let canChangeSpeed = true;
const getCanChangeSpeed = () => {
  return canChangeSpeed;
}
const setCanChangeSpeed = (change) => {
  canChangeSpeed = change;
}
let internetSpeed = "medium";
const getInternetSpeed = () => {
  return internetSpeed;
}
const setInternetSpeed = (speed) => {
  internetSpeed = speed;
}
let speeds = {
  slow: -6,
  medium: 0,
  fast: 10
}

let turtle;
const setTurtle = (attr, value) => {
  turtle[attr] = value;
}
let routerTurtle;
const setRouterTurtle = (attr, value) => {
  routerTurtle[attr] = value;
}
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
const setPathFullyCompleted = (completed) => {
  pathFullyCompleted = completed;
}

let httpSignalPos;
const getHttpSignalPos = () => {
  return httpSignalPos;
}
const setHttpSignalPos = (attr, value) => {
  httpSignalPos[attr] = value;
}
let previousSignalEndpoint = null;
const getPreviousSignalEndpoint = () => {
  return previousSignalEndpoint;
}
const setPreviousSignalEndpoint = (endpoint) => {
  previousSignalEndpoint = endpoint;
}
let drawSignal = false;
const getDrawSignal = () => {
  return drawSignal;
}
const setDrawSignal = (draw) => {
  drawSignal = draw;
}

let createIP = false;
const getCreateIP = () => {
  return createIP;
}
const setCreateIP = (create) => {
  createIP = create;
}
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
const getClientIP = () => {
  return clientIP;
}
const setClientIP = (ip) => {
  clientIP = ip;
}

let toIP = "";
const getToIP = () => {
  return toIP;
}
const setToIP = (ip) => {
  toIP = ip;
}
let fromIP = "";
const getFromIP = () => {
  return fromIP;
}
const setFromIP = (ip) => {
  fromIP = ip;
}

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
// const getHovering = () => {
//   return hovering;
// }
const setHovering = (hover) => {
  hovering = hover;
}
// let possibleHovers = ["ISP", "DNS", "tower", "cable", "httpRequest", "router", "server"];

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
  
      // drawInfrastructureNodes(p5, this.props.phone, this.props.scaleFactor, boldFont, regularFont, infrastructurePath, cellTowerPingColor, this.props.httpSignal, getCreateIP, getClientIP, setClientIP, generateIP, getToIP, getFromIP, website, requestData, this.props.setDNSHover, this.props.pinged, this.props.setPing, setHovering, this.props.hoverElement);
      this.drawInfrastructureNodes(p5);
      // drawSignalVisualization(p5, this.props.scaleFactor, boldFont, regularFont, this.props.phone, this.props.httpSignal, httpSignalPos, getPreviousSignalEndpoint, setPreviousSignalEndpoint, getDrawSignal, setDrawSignal, reverseSignal, turtle, turtlePath, originalTurtlePath, turtleMovements, drawTurtle, turtleReverse, setTurtleColor, turtleColor, turtleColors, setCellTowerPingColor, routers, routersReached, routerPathMade, pathMade, turtlePathMade, routerTurtle, routerMovements, setRouterMovements, setToIP, setFromIP, clientIP, requestsIP, setCreateIP, targetServer, possibleTargets, setPathFullyCompleted, this.props.pinged, this.props.setPing, setHovering, this.props.hoverElement);
      this.drawSignalVisualization(p5);
      this.drawTurtlePath(p5);
      // drawRoutersInfo(p5, boldFont, this.props.scaleFactor, drawData, routers, serverLocs, routersReached, routerMovements, routerTurtle, turtlePath, routerPathMade, pathMade, turtlePathMade, targetServer, possibleTargets, this.props.setServerHover, setHovering, this.props.hoverElement);
      this.drawRoutersInfo(p5);
      // drawInternetSpeed(p5, this.props.scaleFactor, boldFont, regularFont, getInternetSpeed, setInternetSpeed, speeds, getCanChangeSpeed, setCanChangeSpeed, possibleSpeeds, setTurtle, setRouterTurtle, getHttpSignalPos, setHttpSignalPos);
      this.drawInternetSpeed(p5);

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

    this.drawInfrastructureNodes = (p5) => {
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
      this.drawISPComponent(p5);
      this.drawDNSComponent(p5);
      const towerData = {
        x: ((this.props.phone.x + this.props.phone.w) / 2) / 2 - 5,
        y: this.props.phone.y - 310,
        width: 150,
        height: 225
      }
      let towerBounds = getBounds(towerData, this.props.scaleFactor);
      if (p5.mouseX >= towerBounds.left &&
        p5.mouseX <= towerBounds.right &&
        p5.mouseY >= towerBounds.top &&
        p5.mouseY <= towerBounds.bottom 
      ) {
        p5.cursor(p5.HAND);
        hovering = "tower";
        this.props.hoverElement("tower");
      } 
    };
    this.drawISPComponent = (p5) => {
      const ISPData = {
        x: this.props.phone.x + this.props.phone.w / 2 + 205,
        y: this.props.phone.y - 270,
        width: (this.props.phone.x + this.props.phone.w + 395) - (this.props.phone.x + this.props.phone.w / 2 + 205),
        height: 140
      }  
      p5.fill("rgba(0, 0, 0, 0.3)");
      p5.rect(
        ISPData.x,
        ISPData.y,
        ISPData.width,
        ISPData.height
      );
  
      p5.textSize(20);
      p5.fill(255, 255, 255);
      p5.noStroke();
      p5.text(
        "ISP",
        ISPData.x + ((ISPData.width - p5.textWidth("ISP")) / 2),
        ISPData.y + ISPData.height / 4
      );
      p5.text(
        "Internet Service Provider",
        ISPData.x + ((ISPData.width - p5.textWidth("Internet Service Provider")) / 2),
        ISPData.y + ISPData.height / 2
      );
      p5.noFill();
      p5.stroke(255, 255, 255);
      p5.rect(
        ISPData.x + 10,
        ISPData.y + (2 * (ISPData.height / 3)),
        ISPData.width - 20,
        25
      );
      p5.fill(255, 255, 255);
      p5.noStroke();
      p5.textFont(boldFont);
      p5.textSize(12);
      p5.text(
        "IPv6",
        ISPData.x + 20,
        ISPData.y + (2 * (ISPData.height / 3)) + 16,
      );
      p5.textFont(regularFont);
      p5.textSize(20);
      p5.text(
        "|",
        ISPData.x + 10 + p5.textWidth("IPv6"),
        ISPData.y + (2 * (ISPData.height / 3)) + 18,
      );
      p5.textSize(12);
  
      let ISPBounds = getBounds(ISPData, this.props.scaleFactor);
      if (
        p5.mouseX >= ISPBounds.left &&
        p5.mouseX <= ISPBounds.right &&
        p5.mouseY >= ISPBounds.top &&
        p5.mouseY <= ISPBounds.bottom
      ) {
        p5.cursor(p5.HAND);
        hovering = "ISP";
        this.props.hoverElement("ISP");
      } 
      else {
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
        ISPData.x + 35 + p5.textWidth("IPv6"),
        ISPData.y + (2 * (ISPData.height / 3)) + 15,
      );
    };
    this.drawDNSComponent = (p5) => {
      const DNSData = {
        x: this.props.phone.x + this.props.phone.w + 505,
        y: this.props.phone.y - 270,
        width: (this.props.phone.x + this.props.phone.w + 395) - (this.props.phone.x + this.props.phone.w / 2 + 205),
        height: 140
      }  
      p5.fill("rgba(0, 0, 0, 0.3)");
      p5.rect(
        DNSData.x,
        DNSData.y,
        DNSData.width,
        DNSData.height
      );
    
      p5.textSize(20);
      p5.fill(255, 255, 255);
      p5.noStroke();
      p5.text(
        "DNS",
        DNSData.x + ((DNSData.width - p5.textWidth("DNS")) / 2),
        DNSData.y + DNSData.height / 5
      );
      p5.text(
        "Domain Name System",
        DNSData.x + ((DNSData.width - p5.textWidth("Domain Name Systemr")) / 2),
        DNSData.y + DNSData.height / 2.5
      );
      p5.noFill();
      p5.stroke(255, 255, 255);
      p5.rect(
        DNSData.x + 10,
        DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) - 10,
        DNSData.width - 20,
        25
      );
      p5.rect(
        DNSData.x + 10,
        DNSData.y + (2 * (DNSData.height / 3)) + (25 / 2),
        DNSData.width - 20,
        25
      );
      p5.fill(255, 255, 255);
      p5.noStroke();
      p5.textFont(boldFont);
      p5.textSize(12);
      p5.text(
        "TO",
        DNSData.x + 20,
        DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) + 7,
      );
      p5.text(
        "FROM",
        DNSData.x + 20,
        DNSData.y + (2 * (DNSData.height / 3)) + 29
      );
      p5.textFont(regularFont);
      p5.textSize(20);
      p5.text(
        "|",
        DNSData.x + 58,
        DNSData.y + (2 * (DNSData.height / 3)) - 4,
      );
      p5.text(
        "|",
        DNSData.x + 58,
        DNSData.y + (2 * (DNSData.height / 3)) + 31,
      );
      p5.textSize(12);
    
      p5.text(
        toIP,
        DNSData .x + 58 + 10,
        DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) + 7
      );
    
      p5.text(
        fromIP,
        DNSData .x + 58 + 10,
        DNSData.y + (2 * (DNSData.height / 3)) + 29
      );
      
      let DNSBounds = getBounds(DNSData, this.props.scaleFactor);
      if (
        p5.mouseX >= DNSBounds.left &&
        p5.mouseX <= DNSBounds.right &&
        p5.mouseY >= DNSBounds.top &&
        p5.mouseY <= DNSBounds.bottom
      ) {
        p5.cursor(p5.HAND);
        hovering = "DNS";
        let toURL = "";
        for (let i = 0; i < 6; i++) {
          if (toIP === requestData[i].ip) {
            toURL = requestData[i].url;
          }
        }
        this.props.setDNSHover(website + "/" + this.props.httpSignal.endpoint, toURL, toIP)
        this.props.hoverElement("DNS");
      }
    };
    this.drawSignalVisualization = (p5) => {
      if (this.props.httpSignal.endpoint != previousSignalEndpoint) {
        drawSignal = true;
      
        routerMovements = [];
        for (let router of routers) {
          router.visited = false;
          router.color = "rgba(255, 255, 255, 1)";
        }
        turtleColor = turtleColors.good;
    
        routerTurtle.index = 0;
        routerTurtle.x = this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2);
        routerTurtle.y = this.props.phone.y - 25;
        routerTurtle.draw = true;
    
        turtleReverse = false;
        
        if (httpSignalPos.y >= this.props.phone.y) {
          httpSignalPos.y = this.props.phone.y;
          httpSignalPos.size = 0;
          httpSignalPos.stop = false;
          reverseSignal = false;
        }      
      }
        
      if (drawSignal) {
        p5.noFill();
        p5.stroke(80, 190, 255);
        p5.strokeWeight(5);
        if (httpSignalPos.y <= this.props.phone.y - 280 && reverseSignal === false) {
          httpSignalPos.stop = true;
          previousSignalEndpoint = this.props.httpSignal.endpoint;
        }
        if (httpSignalPos.stop === false) {
          if (reverseSignal === false) {
            for (let i = 0; i < 5; i++) {
              let tempY = httpSignalPos.y - i * 10;
              if (tempY < this.props.phone.y - 280) {
                tempY = this.props.phone.y - 280;
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
              if (tempY >= this.props.phone.y + 25) {
                tempY = this.props.phone.y;
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
      p5.rect(this.props.phone.x + this.props.phone.w / 2 / 3, this.props.phone.y - 80, this.props.phone.w / 1.5, 25);
      if (this.props.httpSignal) {
        p5.fill(255, 255, 255);
        p5.noStroke();
        p5.textFont(boldFont);
        p5.textSize(12);
        p5.text(
          this.props.httpSignal.request,
          this.props.phone.x + this.props.phone.w / 2 / 3 + 10,
          this.props.phone.y - 80 + 25 / 1.5
        );
        p5.textFont(regularFont);
        p5.text(
          "/" + this.props.httpSignal.endpoint.split("?")[0],
          this.props.phone.x +
            this.props.phone.w / 2 / 3 +
            15 +
            p5.textWidth(this.props.httpSignal.request),
          this.props.phone.y - 80 + 25 / 1.5
        );
        p5.textSize(20);
        p5.text("|", this.props.phone.x + this.props.phone.w / 2 / 3 + 140, this.props.phone.y - 78.5 + 25 / 1.5);
        p5.textSize(12);
        p5.textFont(boldFont);
        p5.text(
          this.props.httpSignal.status,
          this.props.phone.x + this.props.phone.w / 2 / 3 + 155,
          this.props.phone.y - 80 + 25 / 1.5
        );
        p5.textFont(regularFont);
      }
      let headerData = {
        x: this.props.phone.x + this.props.phone.w / 2 / 3,
        y: this.props.phone.y - 80,
        width: this.props.phone.w / 1.5,
        height: 25
      };
      let headerBounds = getBounds(headerData, this.props.scaleFactor);
      if (p5.mouseX >= headerBounds.left &&
        p5.mouseX <= headerBounds.right &&
        p5.mouseY >= headerBounds.top &&
        p5.mouseY <= headerBounds.bottom
      ) {
        p5.cursor(p5.HAND);
        hovering = "httpRequest";
        this.props.hoverElement("httpRequest");
      } 
    };
    this.drawTurtlePath = (p5) => {
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
              Math.abs(this.props.phone.x + this.props.phone.w + 500 - turtle.x) <= turtle.distanceCheck
            ) {
              toIP = requestsIP[this.props.httpSignal.endpoint.split("?")[0]];
              fromIP = clientIP;
            }
  
            // Routers Reached
            if (
              Math.abs(
                this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2) - turtle.x
              ) +
                Math.abs(this.props.phone.y - 25 - turtle.y) <=
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
              if (p5.dist(turtle.x, turtle.y, this.props.phone.x + this.props.phone.w / 2, this.props.phone.y - 300) < turtle.distanceCheck) {
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
          routerTurtle.x = this.props.phone.x + this.props.phone.w + (500 / 2 + (this.props.phone.w / 2 + 700) / 2);
          routerTurtle.y = this.props.phone.y - 25;
          routerTurtle.draw = true;
        } 
    };
    this.drawRoutersInfo = (p5) => {
      drawRouters(p5, routers);
      for (let i = 0; i < routers.length; i++) {
        let routerBounds = getRouterBounds(routers[i], this.props.scaleFactor);
        if (p5.mouseX >= routerBounds.left &&
          p5.mouseX <= routerBounds.right &&
          p5.mouseY >= routerBounds.top &&
          p5.mouseY <= routerBounds.bottom) {
            p5.cursor(p5.HAND);
            if (routers[i].w === 50 && routers[i].h === 50) {
              hovering = "router";
              this.props.hoverElement("router");
            } else {
              let currentServer = {url: serverLocs[i].url, ip: serverLocs[i].ip};
              hovering = "server";
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
        turtlePath = turtlePath.map((item,idx) => turtlePath[turtlePath.length - 1 - idx]);
        pathMade = this.findAdjacentNearestTarget(p5, routers[0]);
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
    this.drawInternetSpeed = (p5) => {
      // Declare sizing and positioning for the internet speed component
      const internetSpeedData = {
        x: 0,
        y: 0,
        width: 190,
        height: 30
      }
      // Text to be displayed
      const internetSpeedText = internetSpeed[0].toUpperCase() + internetSpeed.slice(1);

      // Draw the internet speed component
      p5.fill("rgba(0, 0, 0, 0.5)");
      p5.rect(
        internetSpeedData.x,
        internetSpeedData.y,
        internetSpeedData.width,
        internetSpeedData.height
      );

      // Label text
      const textY = 20;
      p5.textSize(16);
      p5.textFont(regularFont);
      p5.fill(255, 255, 255);
      p5.text(
        "Internet Speed: ", 
        60, 
        textY
      );
      // Clickable text
      const internetSpeedTextData = {
        x: p5.textWidth("Internet Speed:  "),
        y: 5,
        w: p5.textWidth(internetSpeedText),
        h: 27
      }
      p5.textFont(boldFont);
      if (internetSpeed === "slow") {
        p5.fill(255, 0, 0);
      } else if (internetSpeed === "medium") {
        p5.fill(230, 180, 0);
      } else {
        p5.fill(0, 200, 0);
      }
      p5.textAlign(p5.LEFT);
      p5.text(
        internetSpeedText, 
        p5.textWidth("Internet Speed:  "),
        textY
      );
      // Set speed based on internet speed (user input)
      turtle.speed = 20 + speeds[internetSpeed];
      routerTurtle.speed = 15 + speeds[internetSpeed];
      httpSignalPos.speed = 5 + speeds[internetSpeed];
      if (httpSignalPos.speed < 0) {
        httpSignalPos.speed = 1;
      }

      // Handle interaction with user's mouse
      let internetSpeedBounds = getBounds(internetSpeedTextData, this.props.scaleFactor);
      if (p5.mouseX >= internetSpeedBounds.left &&
      p5.mouseX <= internetSpeedBounds.right &&
      p5.mouseY >= internetSpeedBounds.top &&
      p5.mouseY <= internetSpeedBounds.bottom
      ) {
        p5.cursor(p5.HAND);
        // If pressed, iterate through possible speeds
        if (p5.mouseIsPressed) {
          if (canChangeSpeed){
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
    };
    this.findAdjacentNearestTarget = (p5, currentRouter) => {
      let adjacents = [];
      // console.log(currentRouter.closestRouters);
      if (currentRouter.closestRouters.length != 0) {
        adjacents = currentRouter.closestRouters.filter (
          (router) => routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).visited === false 
          && (router.type === "router" || p5.dist(router.x, router.y, targetServer.x, targetServer.y) === 0)
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
              targetServer.x,
              targetServer.y
            ) <
            p5.dist(
              nearestToTarget.entrancePoint.x,
              nearestToTarget.entrancePoint.y,
              targetServer.x,
              targetServer.y
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
        nearestToTarget.entrancePoint.x === targetServer.x &&
        nearestToTarget.entrancePoint.y === targetServer.y
      ) {
        return true;
      } else {
        this.findAdjacentNearestTarget(p5, nearestToTarget);
      }
    }
  }

  render() {
    return <ReactP5Wrapper sketch={this.sketch} />
  }
}