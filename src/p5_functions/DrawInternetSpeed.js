export default function drawInternetSpeed(p5, boldFont, regularFont, internetSpeed, speeds, canChangeSpeed, possibleSpeeds, turtle, routerTurtle, httpSignalPos) {
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