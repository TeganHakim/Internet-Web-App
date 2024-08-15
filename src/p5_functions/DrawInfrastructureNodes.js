import drawISPComponent from "./DrawISPComponent";
import drawDNSComponent from "./DrawDNSComponent";

function getTowerBounds(towerData, scaleFactor) {
  return {
    left: towerData.x * scaleFactor, 
    right: (towerData.x + towerData.width) * scaleFactor, 
    top: towerData.y * scaleFactor, 
    bottom: (towerData.y + towerData.height) * scaleFactor
  };
}

export default function drawInfrastructureNodes(p5, phone, scaleFactor, boldFont, regularFont, infrastructurePath, cellTowerPingColor, httpSignal, createIP, clientIP, setClientIP, generateIP, toIP, fromIP, website, requestData, setDNSHover, pinged, setPing, hovering, setHovering, hoverElement, possibleHovers) {
    p5.stroke(150, 150, 150);
    for (let i = 0; i < infrastructurePath.length; i++) {
      p5.strokeWeight(10);
      if (pinged) {
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
    setPing(false);
    p5.strokeWeight(1);

    // Text
    drawISPComponent(p5, phone, scaleFactor, boldFont, regularFont, createIP, clientIP, setClientIP, generateIP, hovering, setHovering, hoverElement, possibleHovers);
    drawDNSComponent(p5, phone, scaleFactor, boldFont, regularFont, toIP, fromIP, requestData, httpSignal, website, setDNSHover, hovering, setHovering, hoverElement, possibleHovers);
    const towerData = {
      x: ((phone.x + phone.w) / 2) / 2 - 5,
      y: phone.y - 310,
      width: 150,
      height: 225
    }
    let towerBounds = getTowerBounds(towerData, scaleFactor);
    if (p5.mouseX >= towerBounds.left &&
      p5.mouseX <= towerBounds.right &&
      p5.mouseY >= towerBounds.top &&
      p5.mouseY <= towerBounds.bottom 
    ) {
      p5.cursor(p5.HAND);
      setHovering("tower");
      hoverElement("tower");
    } else if (!possibleHovers.filter(function(e) {return e != "tower"}).includes(hovering)) {
      setHovering(null);
    }
}