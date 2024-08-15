export default function drawDNSComponent(p5, phone, scaleFactor, boldFont, regularFont, toIP, fromIP, requestData, httpSignal, website, setDNSHover, hovering, setHovering, hoverElement, possibleHovers) {
    p5.fill("rgba(0, 0, 0, 0.3)");
    p5.rect(phone.x + phone.w + 505, phone.y - 270, 330, 140);

    p5.textSize(20);
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.text(
      "DNS",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 60,
      phone.y - (275 / 2 + 125 / 2) - 45
    );
    p5.text(
      "Domain Name System",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 140,
      phone.y - (275 / 2 + 125 / 2) - 20
    );
    p5.noFill();
    p5.stroke(255, 255, 255);
    p5.rect(
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210,
      phone.y - (275 / 2 + 125 / 2),
      phone.w + 40,
      25
    );
    p5.rect(
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210,
      phone.y - (275 / 2 + 125 / 2) + 35,
      phone.w + 40,
      25
    );
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      "TO",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 5,
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5
    );
    p5.text(
      "FROM",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 5,
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5
    );
    p5.textFont(regularFont);
    p5.textSize(20);
    p5.text(
      "|",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 40,
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5 + 1.5
    );
    p5.text(
      "|",
      phone.w + 400 - phone.x + phone.w / 2 + 200 - 210 + 40,
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5 + 1.5
    );
    p5.textSize(12);

    p5.text(
      toIP,
      phone.w +
        400 -
        phone.x +
        phone.w / 2 +
        200 -
        210 +
        25 +
        p5.textWidth("FRO"),
      phone.y - (275 / 2 + 125 / 2) + 25 / 1.5
    );

    p5.text(
      fromIP,
      phone.w +
        400 -
        phone.x +
        phone.w / 2 +
        200 -
        210 +
        25 +
        p5.textWidth("FRO"),
      phone.y - (275 / 2 + 125 / 2) + 35 + 25 / 1.5
    );
    
    if (p5.mouseX >= phone.x + phone.w + 500 &&
      p5.mouseX <= phone.x + phone.w + phone.w / 2 + 700 &&
      p5.mouseY >= phone.y - 275 &&
      p5.mouseY <= phone.y - 125
      ) {
        let toURL = "";
        setHovering("DNS");
        p5.cursor(p5.HAND);
        for (let i = 0; i < 6; i++) {
          if (toIP === requestData[i].ip) {
            toURL = requestData[i].url;
          }
        }
        setDNSHover(website + "/" + httpSignal.endpoint, toURL, toIP)
        hoverElement("DNS");
      } else if (!possibleHovers.filter(function(e) {return e != "DNS"}).includes(hovering)){
        setHovering(null);
      }
}