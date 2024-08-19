function getInternetSpeedBounds(internetSpeedTextData, scaleFactor) {
  return {
    left: internetSpeedTextData.x * scaleFactor, 
    right: (internetSpeedTextData.x + internetSpeedTextData.w) * scaleFactor, 
    top: internetSpeedTextData.y * scaleFactor, 
    bottom: (internetSpeedTextData.y + internetSpeedTextData.h) * scaleFactor
  };
}

export default function drawInternetSpeed(p5, scaleFactor, boldFont, regularFont, getInternetSpeed, setInternetSpeed, speeds, getCanChangeSpeed, setCanChangeSpeed, possibleSpeeds, setTurtle, setRouterTurtle, getHttpSignalPos, setHttpSignalPos) {
  // Declare sizing and positioning for the internet speed component
  const internetSpeedData = {
    x: 0,
    y: 0,
    width: 190,
    height: 30
  }
  // Text to be displayed
  const internetSpeedText = getInternetSpeed()[0].toUpperCase() + getInternetSpeed().slice(1);

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
  if (getInternetSpeed() === "slow") {
    p5.fill(255, 0, 0);
  } else if (getInternetSpeed() === "medium") {
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
  setTurtle("speed", 20 + speeds[getInternetSpeed()]);
  setRouterTurtle("speed", 15 + speeds[getInternetSpeed()]);
  setHttpSignalPos("speed", 5 + speeds[getInternetSpeed()]);
  if (getHttpSignalPos().speed < 0) {
    setHttpSignalPos("speed", 1);
  }

  // Handle interaction with user's mouse
  let internetSpeedBounds = getInternetSpeedBounds(internetSpeedTextData, scaleFactor);
  if (p5.mouseX >= internetSpeedBounds.left &&
  p5.mouseX <= internetSpeedBounds.right &&
  p5.mouseY >= internetSpeedBounds.top &&
  p5.mouseY <= internetSpeedBounds.bottom
  ) {
    p5.cursor(p5.HAND);
    // If pressed, iterate through possible speeds
    if (p5.mouseIsPressed) {
      if (getCanChangeSpeed()){
        let index = possibleSpeeds.indexOf(getInternetSpeed());
        if (index < possibleSpeeds.length - 1) {
          index += 1;
        } else if (index === possibleSpeeds.length - 1) {
          index = 0;
        }
        setInternetSpeed(possibleSpeeds[index]); 
        setCanChangeSpeed(false);        
      }
    } else {
      setCanChangeSpeed(true);
    }
  }
}