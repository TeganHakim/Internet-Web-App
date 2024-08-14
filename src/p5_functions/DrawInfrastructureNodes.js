import drawISPComponent from "./DrawISPComponent";
import drawDNSComponent from "./DrawDNSComponent";

export default function drawInfrastructureNodes(p5, phone, boldFont, regularFont, infrastructurePath, cellTowerPingColor, httpSignal, createIP, clientIP, generateIP, toIP, fromIP, website, requestData, setDNSHover, pinged, setPing, hovering, setHovering, hoverElement, possibleHovers) {
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
    drawISPComponent(p5, phone, boldFont, regularFont, createIP, clientIP, generateIP, hovering, setHovering, hoverElement, possibleHovers);
    drawDNSComponent(p5, phone, boldFont, regularFont, toIP, fromIP, requestData, httpSignal, website, setDNSHover, hovering, setHovering, hoverElement, possibleHovers);

    if (p5.mouseX >= phone.x + phone.w / 2 / 2 - 5 &&
      p5.mouseX <= phone.x + phone.w / 2 / 2 - 5 + 150 &&
      p5.mouseY >= phone.y - 310 &&
      p5.mouseY <= phone.y - 310 + 225
      ) {
        p5.cursor(p5.HAND);
        setHovering("tower");
        hoverElement("tower");
      } else if (!possibleHovers.filter(function(e) {return e != "tower"}).includes(hovering)){
        setHovering(null);
      }
}