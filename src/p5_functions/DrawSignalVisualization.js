import drawTurtlePath from "./DrawTurtlePath";

function getHeaderBounds(headerData, scaleFactor) {
  return {
    left: headerData.x * scaleFactor, 
    right: (headerData.x + headerData.width) * scaleFactor, 
    top: headerData.y * scaleFactor, 
    bottom: (headerData.y + headerData.height) * scaleFactor
  };
}

export default function drawSignalVisualization(p5, scaleFactor, boldFont, regularFont, phone, httpSignal, httpSignalPos, getPreviousSignalEndpoint, setPreviousSignalEndpoint, getDrawSignal, setDrawSignal, reverseSignal, turtle, turtlePath, originalTurtlePath, turtleMovements, drawTurtle, turtleReverse, setTurtleColor, turtleColor, turtleColors, setCellTowerPingColor, routers, routersReached, routerPathMade, pathMade, turtlePathMade, routerTurtle, routerMovements, setRouterMovements, setToIP, setFromIP, clientIP, requestsIP, setCreateIP, targetServer, possibleTargets, setPathFullyCompleted, pinged, setPing, setHovering, hoverElement) {
  if (httpSignal.endpoint != getPreviousSignalEndpoint()) {
    setDrawSignal(true);
  
    setRouterMovements([]);
    for (let router of routers) {
      router.setVisited(false);
      router.setColor("rgba(255, 255, 255, 1)");
    }
    setTurtleColor(turtleColors.good);

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
    
  if (getDrawSignal()) {
    p5.noFill();
    p5.stroke(80, 190, 255);
    p5.strokeWeight(5);
    if (httpSignalPos.y <= phone.y - 280 && reverseSignal === false) {
      httpSignalPos.stop = true;
      setPreviousSignalEndpoint(httpSignal.endpoint);
    }
    if (httpSignalPos.stop === false) {
      if (reverseSignal === false) {
        for (let i = 0; i < 5; i++) {
          let tempY = httpSignalPos.y - i * 10;
          if (tempY < phone.y - 280) {
            tempY = phone.y - 280;
            setPing(true);
            setCreateIP(true);
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
            setPathFullyCompleted(true);
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

  if (pinged) {
    drawTurtle = true;
    turtle.stop = false;
    turtlePath = originalTurtlePath;
    turtle.index = 1;
    turtle.x = turtlePath[0].x;
    turtle.y = turtlePath[0].y;

    setCellTowerPingColor("rgb(0, 255, 0)");
  }

  // Revert to normal
  p5.strokeWeight(1);
  p5.fill(255, 255, 255);

  // Request Text
  p5.fill("rgba(0, 0, 0, 0.3)");
  p5.stroke(255, 255, 255);
  p5.rect(phone.x + phone.w / 2 / 3, phone.y - 80, phone.w / 1.5, 25);
  if (httpSignal) {
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      httpSignal.request,
      phone.x + phone.w / 2 / 3 + 10,
      phone.y - 80 + 25 / 1.5
    );
    p5.textFont(regularFont);
    p5.text(
      "/" + httpSignal.endpoint.split("?")[0],
      phone.x +
        phone.w / 2 / 3 +
        15 +
        p5.textWidth(httpSignal.request),
      phone.y - 80 + 25 / 1.5
    );
    p5.textSize(20);
    p5.text("|", phone.x + phone.w / 2 / 3 + 140, phone.y - 78.5 + 25 / 1.5);
    p5.textSize(12);
    p5.textFont(boldFont);
    p5.text(
      httpSignal.status,
      phone.x + phone.w / 2 / 3 + 155,
      phone.y - 80 + 25 / 1.5
    );
    p5.textFont(regularFont);
  }
  let headerData = {
    x: phone.x + phone.w / 2 / 3,
    y: phone.y - 80,
    width: phone.w / 1.5,
    height: 25
  };
  let headerBounds = getHeaderBounds(headerData, scaleFactor);
  if (p5.mouseX >= headerBounds.left &&
    p5.mouseX <= headerBounds.right &&
    p5.mouseY >= headerBounds.top &&
    p5.mouseY <= headerBounds.bottom
  ) {
    p5.cursor(p5.HAND);
    setHovering("httpRequest");
    hoverElement("httpRequest");
  } 
}