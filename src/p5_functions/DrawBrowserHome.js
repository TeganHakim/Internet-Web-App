export default function browserHome(p5) {
    p5.image(
        image,
        screen.x + screenBezel.horz + (screen.w - screenBezel.horz * 2) / 2,
        screen.y + screenBezel.vert + 50,
        (screen.w - screenBezel.horz * 2) / 2,
        (screen.w - screenBezel.horz * 2) / 2
      );
      p5.fill("rgba(0, 0, 0, 0.2)");
      p5.rect(
        screen.x + screenBezel.horz + (screen.w - screenBezel.horz * 2) / 2,
        screen.y + screenBezel.vert + 50,
        (screen.w - screenBezel.horz * 2) / 2,
        (screen.w - screenBezel.horz * 2) / 2
      );
      p5.fill("rgba(0, 0, 0, 0.75)");
      p5.textSize(16);
      p5.textFont(boldFont);
      p5.noStroke();
      p5.text(
        "Vint Cerf",
        screen.x + screenBezel.horz,
        screen.y + screenBezel.vert + 65
      );
      p5.textSize(12);
      p5.textFont(regularFont);
      p5.text(
        'Vinton Gray Cerf \n(born June 23, 1943) \nis recognized as one \nof "the fathers of the \nInternet", sharing this \ntitle with Bob Kahn.',
        screen.x + screenBezel.horz,
        screen.y + screenBezel.vert + 82,
        (screen.w - screenBezel.horz * 2) / 2 - 5
      );
      p5.textSize(16);
      p5.textFont(boldFont);
      p5.text(
        "Life and Career",
        screen.x + screenBezel.horz,
        screen.y + screenBezel.vert + 180,
        screen.w - screenBezel.horz * 2
      );
      p5.textSize(12);
      p5.textFont(regularFont);
      p5.text(
        "Vinton Gray Cerf was born in New Haven, \nConnecticut. In high school, Cerf worked at \nRocketdyne on the Apollo program and \nhelped write statistical analysis software for \nthe non-destructive tests of the F-1 engines. \nCerf received a Bachelor of Science degree \nin mathematics from Stanford University. \nCerf attended graduate school at UCLA \nwhere he earned his M.S. degree in 1970 \nand his PhD in 1972. While at UCLA, Cerf \nwrote the first TCP protocol, called \nSpecification of Internet Transmission \nControl Program, published in 1974.",
        screen.x + screenBezel.horz,
        screen.y + screenBezel.vert + 200,
        screen.w - screenBezel.horz * 2
      );
      p5.stroke(255, 255, 255);
      p5.line(
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 120,
        screen.x + screen.w - screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 120
      );
      p5.noStroke();
      p5.fill("rgba(0, 0, 0, 0.75)");
      p5.textSize(16);
      p5.textFont(boldFont);
      p5.text(
        "References",
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 100
      );
      p5.textSize(12.5);
      p5.textFont(regularFont);
     
      p5.text(
        " - ",
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 75
      );
      p5.fill(51, 102, 187);
    
      p5.text(
        urls["badLink"].url,
        screen.x + screenBezel.horz + 18,
        screen.y + screen.h - screenBezel.vert - 75
      );
     
      if (urls["badLink"].underline) {
        p5.stroke(51, 102, 187);
      } else {
        p5.noStroke();
      }
      p5.line(
        screen.x + screenBezel.horz + 18,
        screen.y + screen.h - screenBezel.vert - 73,
        screen.x + screenBezel.horz + 18 + p5.textWidth(urls["badLink"].url),
        screen.y + screen.h - screenBezel.vert - 73
      );
    
      if (
        p5.mouseX <
          screen.x + screenBezel.horz + 18 + p5.textWidth(urls["badLink"].url) &&
        p5.mouseX > screen.x + screenBezel.horz + 18 &&
        p5.mouseY > screen.y + screen.h - screenBezel.vert - 85 &&
        p5.mouseY < screen.y + screen.h - screenBezel.vert - 72
      ) {
        p5.cursor(p5.HAND);
        urls["badLink"].underline = true;
        if (p5.mouseIsPressed) {
          if (p5.mouseButton === p5.LEFT) {
            this.props.handleLinkClicked("badLink");
            this.props.httpVisualize({status: 404, request: "GET", endpoint: "badLink"});
          }
        }
      } else {
        urls["badLink"].underline = false;
      }
      p5.stroke(255, 255, 255);
      p5.line(
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 55,
        screen.x + screen.w - screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 55
      );
      p5.line(
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 45,
        screen.x + screen.w - screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 45
      );
      p5.noStroke();
      p5.fill("rgba(0, 0, 0, 0.75)");
      const todaysDate = Date()
        .toLocaleString("default", { month: "long" })
        .split(" ");
      p5.text(
        `This page was last edited on ${
          todaysDate[2] + " " + todaysDate[1] + " " + todaysDate[3]
        }.`,
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 20
      );
      p5.text(
        "Wikipedia® is a non-profit organization.",
        screen.x + screenBezel.horz,
        screen.y + screen.h - screenBezel.vert - 0
      );
};