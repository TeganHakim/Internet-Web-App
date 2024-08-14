export default function drawISPComponent(p5, phone, boldFont, regularFont, createIP, clientIP, generateIP, hovering, setHovering, hoverElement, possibleHovers) {
    p5.fill("rgba(0, 0, 0, 0.3)");
    p5.rect(phone.x + phone.w / 2 + 205, phone.y - 270, 330, 140);

    p5.textSize(20);
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.text(
      "ISP",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2,
      phone.y - (275 / 2 + 125 / 2) - 30
    );
    p5.text(
      "Internet Service Provider",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 90,
      phone.y - (275 / 2 + 125 / 2)
    );
    p5.noFill();
    p5.stroke(255, 255, 255);
    p5.rect(
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145,
      phone.y - (275 / 2 + 125 / 2) + 20,
      phone.w + 40,
      25
    );
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      "IPv6",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145 + 10,
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5
    );
    p5.textFont(regularFont);
    p5.textSize(20);
    p5.text(
      "|",
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 - 145 + 40,
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5 + 1.5
    );
    p5.textSize(12);

    if (p5.mouseX >= phone.x + phone.w / 2 + 200 &&
    p5.mouseX <= phone.x + phone.w + 400 &&
    p5.mouseY >= phone.y - 275 &&
    p5.mouseY <= phone.y - 125
    ) {
      setHovering("ISP");
      p5.cursor(p5.HAND);
      hoverElement("ISP");
    } else if (!possibleHovers.filter(function(e) {return e != "ISP"}).includes(hovering)){
      setHovering(null);
    }

    if (createIP) {
      if (clientIP === "generating...") {
        clientIP = generateIP();
      }
    } else {
      clientIP = "generating...";
    }
    p5.text(
      clientIP,
      (phone.w + 400 - phone.x + phone.w / 2 + 200) / 2 -
        145 +
        25 +
        p5.textWidth("IPv6"),
      phone.y - (275 / 2 + 125 / 2) + 20 + 25 / 1.5
    );
}