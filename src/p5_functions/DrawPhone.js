function getHomeButtonBounds(homeButton) {
  return {
    left: (homeButton.x - (homeButton.r / 2)), 
    right: (homeButton.x + (homeButton.r / 2)), 
    top: (homeButton.y - (homeButton.r / 2)), 
    bottom: (homeButton.y + (homeButton.r / 2)), 
  };
}

export default function drawPhone(p5, phone, screen, screenBezel, handleAppClicked, httpVisualize, phonePercentage) {
  // Phone
  p5.fill(120, 120, 120);
  p5.noStroke();
  p5.rect(
    phone.x,
    phone.y,
    phone.w,
    phone.h,
    phone.border.tl,
    phone.border.tr,
    phone.border.br,
    phone.border.bl
  );
  // Screen
  p5.fill(255, 255, 255);
  p5.noStroke();
  p5.rect(
    screen.x,
    screen.y,
    screen.w,
    screen.h,
    screen.border.tl,
    screen.border.tr,
    screen.border.br,
    screen.border.bl
  );
  // Home Button
  let homeButton = {
    x: phone.x + phone.w / 2,
    y: phone.y + (phone.h - screenBezel.vert / 2),
    r: 15
  };
  p5.fill(190, 190, 190);
  p5.noStroke();
  p5.ellipse(homeButton.x, homeButton.y, homeButton.r);
  let homeButtonBounds = getHomeButtonBounds(homeButton);
  if (
    p5.mouseX >= homeButtonBounds.left &&
    p5.mouseX <= homeButtonBounds.right &&
    p5.mouseY >= homeButtonBounds.top &&
    p5.mouseY <= homeButtonBounds.bottom
  ) {
    p5.cursor(p5.HAND);
    if (p5.mouseIsPressed) {
      handleAppClicked("home");
      httpVisualize({status: 200, request: "GET", endpoint: "homeScreen"});
    }
  }
  // Camera
  let camera = {
    x: phone.x + phone.w / 3,
    y: phone.y + screenBezel.vert / 2,
    r: 10
  };
  p5.fill(190, 190, 190);
  p5.noStroke();
  p5.ellipse(camera.x, camera.y, camera.r);
  // Speaker
  let speaker = {
    x: camera.x + screenBezel.vert,
    y: camera.y - camera.r / 2,
    w: phone.w / 3,
    h: camera.r,
    border: 5
  };
  p5.rect(speaker.x, speaker.y, speaker.w, speaker.h, speaker.border);
  // Battery
  let percentage = parseInt(phonePercentage, 10);
  p5.fill(255, 255, 255);
  p5.stroke(0, 0, 0);
  p5.rect(screen.x + screen.w - 40, screen.y + 5, 35, 10, 4);
  if (percentage <= 20) {
    p5.fill(255, 0, 0);
  } else if (percentage < 50) {
    p5.fill(255, 125, 0);
  } else {
    p5.fill(0, 255, 0);
  }
  p5.noStroke();
  p5.rect(
    screen.x + screen.w - 39,
    screen.y + 6,
    parseInt(p5.map(percentage, 0, 100, 0, 34), 10),
    8,
    2
  );
  p5.fill(0, 0, 0);
  p5.textSize(12);
  p5.text(
    percentage + "%",
    screen.x + screen.w - (percentage < 100 ? 67 : 72),
    screen.y + 14
  );
  // Wifi
  p5.rect(screen.x + 5, screen.y + 9, 4, 6);
  p5.rect(screen.x + 10, screen.y + 7, 4, 8);
  p5.rect(screen.x + 15, screen.y + 5, 4, 10);
  p5.fill(0, 0, 0);
  p5.textSize(12);
  p5.text("5G", screen.x + 25, screen.y + 14);
};    