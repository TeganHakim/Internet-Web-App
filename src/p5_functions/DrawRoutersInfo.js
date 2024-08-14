import drawRouters from "./DrawRouters";
import findAdjacentNearestTarget from "./FindAdjacentNearestTarget";

function getMouseLoc(p5) {
  return {
    x: p5.mouseX, 
    y: p5.mouseY
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


export default function drawRoutersInfo(p5, boldFont, scaleFactor, drawData, routers, serverLocs, routersReached, routerMovements, routerTurtle, turtlePath, routerPathMade, pathMade, turtlePathMade, targetServer, possibleTargets, setServerHover, setHovering, hoverElement) {
    drawRouters(p5, routers);
    
    for (let i = 0; i < routers.length; i++) {
      let routerBounds = getRouterBounds(routers[i], scaleFactor);
      if (routers[i].w === 50 && routers[i].h === 50) {
        if (getMouseLoc(p5).x >= routerBounds.left &&
          getMouseLoc(p5).x <= routerBounds.right &&
          getMouseLoc(p5).y >= routerBounds.top &&
          getMouseLoc(p5).y <= routerBounds.bottom
        ) {
          setHovering("router"+i);
          p5.cursor(p5.HAND);
          hoverElement("router");
        }
      } else {
        if (getMouseLoc(p5).x >= routerBounds.left &&
          getMouseLoc(p5).x <= routerBounds.right &&
          getMouseLoc(p5).y >= routerBounds.top &&
          getMouseLoc(p5).y <= routerBounds.bottom
        ) {
          setHovering("server"+i);
          p5.cursor(p5.HAND);
          let currentServer = {url: serverLocs[i].url, ip: serverLocs[i].ip};
          setServerHover(currentServer.url, currentServer.ip);
          hoverElement("server");
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
      pathMade = findAdjacentNearestTarget(
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