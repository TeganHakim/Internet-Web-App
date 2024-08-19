export default function drawTurtlePath(p5, drawTurtle, turtle, turtlePath, turtleReverse, turtleMovements, reverseSignal, turtleColor, turtleColors, setToIP, setFromIP, clientIP, requestsIP, httpSignal, httpSignalPos, phone, routersReached, routerTurtle, routerMovements, routerPathMade, pathMade, turtlePathMade, targetServer, possibleTargets) {
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
                }
                turtle.y -= 1;
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
              setToIP(requestsIP[httpSignal.endpoint.split("?")[0]]);
              setFromIP(clientIP);
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
              targetServer = possibleTargets[httpSignal.endpoint.split("?")[0]].entrancePoint;  
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
                possibleTargets[httpSignal.endpoint.split("?")[0]].color = httpSignal.status == 200 ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)";
                routerTurtle.index = 0;
                turtleMovements = turtleMovements.reverse();
                if (httpSignal.status == 200) {
                  turtleColor = turtleColors.good;
                } else if (httpSignal.status == 404) {
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
}