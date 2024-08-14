export default function drawSignalVisualization(p5, boldFont, regularFont, phone, httpSignal, httpSignalPos, previousSignalEndpoint, drawSignal, reverseSignal, turtle, turtlePath, originalTurtlePath, drawTurtle, turtleReverse, turtleColor, turtleColors, cellTowerPingColor, routers, routerTurtle, routerMovements, createIP, pathFullyCompleted, pinged, setPing, hovering, setHovering, hoverElement, possibleHovers) {
    if (httpSignal.endpoint != previousSignalEndpoint) {
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
          previousSignalEndpoint = httpSignal.endpoint;
        }
        if (httpSignalPos.stop === false) {
          if (reverseSignal === false) {
            for (let i = 0; i < 5; i++) {
              let tempY = httpSignalPos.y - i * 10;
              if (tempY < phone.y - 280) {
                tempY = phone.y - 280;
                setPing(true);
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
  
      if (pinged) {
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
  
      if (p5.mouseX >= phone.x + phone.w / 2 / 3 &&
        p5.mouseX <= phone.x + phone.w / 2 / 3 + phone.w / 1.5 &&
        p5.mouseY >= phone.y - 80 &&
        p5.mouseY <= phone.y - 80 + 25
        ) {
          setHovering("httpRequest");
          p5.cursor(p5.HAND);
          hoverElement("httpRequest");
        } else if (!possibleHovers.filter(function(e) {return e != "httpRequest"}).includes(hovering)){
          setHovering(null);
        }  
}