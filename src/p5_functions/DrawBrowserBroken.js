export default function browserBroken(p5, boldFont, regularFont, screen, screenBezel, handleLinkClicked, httpVisualize, returnLinkUnderline) {
    p5.textAlign(p5.CENTER);
    p5.textSize(30);
    p5.textFont(boldFont);
    p5.text(
      "Error 404",
      screen.x + screen.w / 2,
      screen.y + screenBezel.vert + screen.h / 3 - 30
    );
    p5.textFont(regularFont);
    p5.textSize(14);
    p5.text(
      "Page not found :(",
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2 + screen.h / 3 - 20,
      screen.w - screenBezel.horz * 2
    );
    p5.textSize(16);
    p5.text(
      'The server returned a "404 Not \nFound" because the requested \nURL cannot be found.',
      screen.x + screenBezel.horz,
      screen.y + screenBezel.vert * 2 + screen.h / 3 + 30,
      screen.w - screenBezel.horz * 2
    );
    p5.textAlign(p5.LEFT);
    // Back Button
    p5.fill(51, 102, 187);
    p5.text(
      "Return to Wiki",
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert
    );
    if (returnLinkUnderline) {
      p5.stroke(51, 102, 187);
    } else {
      p5.noStroke();
    }
    p5.line(
      screen.x + screenBezel.horz,
      screen.y + screen.h - screenBezel.vert + 3,
      screen.x + screenBezel.horz + p5.textWidth("Return to Wiki"),
      screen.y + screen.h - screenBezel.vert + 3
    );
    if (
      p5.mouseX <
        screen.x + screenBezel.horz + p5.textWidth("Return to Wiki") &&
      p5.mouseX > screen.x + screenBezel.horz &&
      p5.mouseY > screen.y + screen.h - screenBezel.vert - 10 &&
      p5.mouseY < screen.y + screen.h - screenBezel.vert - 0
    ) {
      p5.cursor(p5.HAND);
      returnLinkUnderline = true;
      if (p5.mouseIsPressed) {
        if (p5.mouseButton === p5.LEFT) {
          handleLinkClicked("homeBrowser");
          httpVisualize({status: 200, request: "GET", endpoint: "homeBrowser"});
        }
      }
    } else {
      returnLinkUnderline = false;
    }
}