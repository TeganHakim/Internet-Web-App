import React, { Component, useEffect } from "react";
import Sketch from "react-p5";
import "./styles/style.css";
import RegularFont from "./assets/Fonts/Roboto-Regular.ttf";
import BoldFont from "./assets/Fonts/Roboto-Bold.ttf";
import { Router } from "./Router";
import drawRouters from "./DrawRouters";
import { touchRippleClasses } from "@mui/material";

let width;
let height;
let phone;

let drawData = false;

let regularFont;
let boldFont;

let infrastructurePath;
let cellTowerPingColor = "rgb(0, 255, 0)";

let turtle;
const turtleColors = { good: "rgb(0, 255, 0)", bad: "rgb(255, 0, 0)" };
let drawTurtle = false;
let turtlePath;
let currentTurtlePath;

let routers;
let possibleTargets;
let pathMade = false;
let routerMovements = [];
let routersReached = false;
let targetServer;

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

let requestsIP = {
  homeScreen: generateIP(),
  music: generateIP(),
  browser: generateIP(),
  goodLink: generateIP(),
  badLink: generateIP(),
  chat: generateIP(),
  messageSent: generateIP(),
  shopping: generateIP(),
  cartQuantity: generateIP(),
  social: generateIP(),
  follow: generateIP(),
  like: generateIP(),
  unlike: generateIP(),
  commentSent: generateIP(),
  deleteComment: generateIP(),
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

export default class DrawInfrastucture extends Component {
  preload = (p5) => {
    regularFont = p5.loadFont(RegularFont);
    boldFont = p5.loadFont(BoldFont);
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
    turtlePath = [
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
    currentTurtlePath = turtlePath;

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
        {x: phone.x + phone.w + 550, y: phone.y + 230 + 25, type: "router"}
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
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"},
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
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"}
      ]),
      new Router(phone.x + phone.w + 900, phone.y + 250, 150, 100),
      new Router(phone.x + phone.w + 900, phone.y + 400, 50, 50, [
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 1000, y: phone.y + 500 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1000, phone.y + 500, 50, 50, [
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"},
        {x: phone.x + phone.w + 775, y: phone.y + 400 + (150/2), type: "server"},
        {x: phone.x + phone.w + 900, y: phone.y + 400 + 25, type: "router"},
        {x: phone.x + phone.w + 1100, y: phone.y + 350 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1100, phone.y + 350, 50, 50, [
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"},
        {x: phone.x + phone.w + 1000, y: phone.y + 500 + 25, type: "router"},
        {x: phone.x + phone.w + 1050, y: phone.y + 200 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1050, phone.y + 200, 50, 50, [
        {x: phone.x + phone.w + 900, y: phone.y + 250 + (100/2), type: "server"},
        {x: phone.x + phone.w + 1050, y: phone.y + (150/2), type: "server"},
        {x: phone.x + phone.w + 900, y: phone.y + 75 + 25, type: "router"}
      ]),
      new Router(phone.x + phone.w + 1050, phone.y, 100, 150),
    ];

    let targetLocations = {shopping: routers[3], phone: routers[8], music: routers[12], chat: routers[23], browser: routers[26], social: routers[31]}
    possibleTargets = {
      homeScreen: targetLocations.phone,
      music: targetLocations.music,
      browser: targetLocations.browser,
      goodLink: targetLocations.browser,
      badLink: targetLocations.browser,
      chat: targetLocations.chat,
      messageSent: targetLocations.chat,
      shopping: targetLocations.shopping,
      cartQuantity: targetLocations.shopping,
      social: targetLocations.social,
      follow: targetLocations.social,
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
  };

  drawInfrastucture = (p5) => {
    p5.background("rgba(255, 255, 255, 1)");
    p5.stroke(0, 0, 0);
    for (let i = 0; i < infrastructurePath.length; i++) {
      p5.strokeWeight(10);
      if (this.props.pinged) {
        if (i === 13) {
          p5.stroke(cellTowerPingColor);
        } else {
          p5.stroke(0, 0, 0);
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
  };

  ispComponent = (p5) => {
    p5.textSize(20);
    p5.fill(0, 0, 0);
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
    p5.stroke(0, 0, 0);
    p5.rect(
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145,
      phone.y - (275 / 2 + 125 / 2) + 20,
      phone.w + 40,
      25
    );
    p5.fill(0, 0, 0);
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
        p5.textWidth("IPv4"),
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5
    );
  };

  dnsComponent = (p5) => {
    p5.textSize(20);
    p5.fill(0, 0, 0);
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
    p5.stroke(0, 0, 0);
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
    p5.fill(0, 0, 0);
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
  };

  visualizeSignal = (p5) => {
    if (this.props.httpSignal.endpoint != previousSignalEndpoint) {
      drawSignal = true;
      routerMovements = [];
      for (let router of routers) {
        router.visited = false;
      }
      if (httpSignalPos.y <= 80 && httpSignalPos.stop === true) {
        httpSignalPos.y = phone.y;
        httpSignalPos.size = 0;
        httpSignalPos.stop = false;
      }
    }

    if (drawSignal) {
      p5.noFill();
      p5.stroke(80, 190, 255);
      p5.strokeWeight(5);
      if (httpSignalPos.y <= 80) {
        httpSignalPos.stop = true;
        previousSignalEndpoint = this.props.httpSignal.endpoint;
      }
      if (httpSignalPos.stop === false) {
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
      }
    }

    if (this.props.pinged) {
      cellTowerPingColor = "rgb(0, 255, 0)";
      drawTurtle = true;
    }

    // Revert to normal
    p5.strokeWeight(1);
    p5.fill(0, 0, 0);

    // Request Text
    p5.noFill();
    p5.stroke(0, 0, 0);
    p5.rect(phone.x + phone.w / 2 / 3, phone.y - 80, phone.w / 1.5, 25);
    if (this.props.httpSignal) {
      p5.fill(0, 0, 0);
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
      p5.text(
        this.props.httpSignal.status,
        phone.x + phone.w / 2 / 3 + 155,
        phone.y - 80 + 25 / 1.5
      );
    }
  };

  findAdjacentNearestTarget = (p5, currentRouter, allRouters, target) => {
    let adjacents = [];

    if (currentRouter.closestRouters !== []) {
      adjacents = currentRouter.closestRouters.filter (
        (router) => routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).visited === false && (router.type === "router" || p5.dist(router.x,
          router.y,
          target.x,
          target.y) === 0))
    }
    // console.log(adjacents.length, currentRouter);
    // for (let router of routers){
    //   console.log(router.closestRouters.length, router)
    // }
    let nearestToTarget = currentRouter;
    
    if (Math.random() <= 0.5) {
      let randomIndex = Math.floor(Math.random()*adjacents.length);
      nearestToTarget = routers.find((e)=> e.entrancePoint.x === adjacents[randomIndex].x && e.entrancePoint.y === adjacents[randomIndex].y);
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
    // Boxes
    for (let i = 0; i < routers.length; i++) {
      p5.fill(255, 255, 255);
      p5.stroke(0, 0, 0);
      p5.rect(routers[i].x, routers[i].y, routers[i].w, routers[i].h, 5);
      p5.noStroke();
    }
    p5.strokeWeight(1);
    p5.noStroke();
    if (drawData) {
      for (let i=0; i<routers.length; i++) {
        p5.fill(255, 255, 255);
        p5.stroke(1);
        p5.rect(routers[i].entrancePoint.x - 50, routers[i].y - 23, 100, 20);
        p5.fill(255, 0, 0);
        p5.textAlign(p5.CENTER);
        p5.textFont(boldFont);
        p5.noStroke();
        p5.text(`${i}; x: ${routers[i].entrancePoint.x}; y:${routers[i].entrancePoint.y}`, routers[i].entrancePoint.x, routers[i].y - 10);
      }
    }
    p5.strokeWeight(1);
    p5.noStroke();

    // Turtle
    if (routersReached && pathMade === false) {
      pathMade = this.findAdjacentNearestTarget(
        p5,
        routers[0],
        routers,
        targetServer
      );
    }
    if (routerMovements !== []) {
      for (let router of routerMovements) {
        p5.fill(255, 0, 0);
        p5.ellipse (
          router.entrancePoint.x,
          router.entrancePoint.y,
          40,
          40
        );        
        currentTurtlePath = [];
        currentTurtlePath.push({x: router.entrancePoint.x, y: router.entrancePoint.y});
        if (drawData) {
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
    } else {
      currentTurtlePath = turtlePath;
    }    
    
    // Server Text
    p5.fill(255, 0, 0);
    p5.textAlign(p5.CENTER);
    p5.textSize(18)
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
            p5.dist(
              turtlePath[turtlePath.length - 1].x,
              turtlePath[turtlePath.length - 1].y,
              turtle.x,
              turtle.y
            ) <= turtle.distanceCheck
          ) {
            drawTurtle = false;
          }
          if (
            p5.dist(
              turtlePath[turtle.index].x,
              turtlePath[turtle.index].y,
              turtle.x,
              turtle.y
            ) <= turtle.distanceCheck
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
          if (this.props.httpSignal.status == 200) {
            p5.fill(turtleColors.good);
          } else if (this.props.httpSignal.status == 404) {
            p5.fill(turtleColors.bad);
          } else {
            p5.fill("rgb(200, 200, 0)");
          }
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
            routersReached = true;
            targetServer = possibleTargets[this.props.httpSignal.endpoint.split("?")[0]].entrancePoint;
            pathMade = false;
            routerMovements = [];
          } else {
            routersReached = false;
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
  };
  render() {
    return (
      <Sketch preload={this.preload} setup={this.setup} draw={this.draw} />
    );
  }
}