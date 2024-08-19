function getISPBounds(ISPData, scaleFactor) {
  return {
    left: ISPData.x * scaleFactor, 
    right: (ISPData.x + ISPData.width) * scaleFactor, 
    top: ISPData.y * scaleFactor, 
    bottom: (ISPData.y + ISPData.height) * scaleFactor
  };
}

export default function drawISPComponent(p5, phone, scaleFactor, boldFont, regularFont, getCreateIP, getClientIP, setClientIP, generateIP, setHovering, hoverElement) {
  const ISPData = {
    x: phone.x + phone.w / 2 + 205,
    y: phone.y - 270,
    width: (phone.x + phone.w + 395) - (phone.x + phone.w / 2 + 205),
    height: 140
  }  
  p5.fill("rgba(0, 0, 0, 0.3)");
    p5.rect(
      ISPData.x,
      ISPData.y,
      ISPData.width,
      ISPData.height
    );

    p5.textSize(20);
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.text(
      "ISP",
      ISPData.x + ((ISPData.width - p5.textWidth("ISP")) / 2),
      ISPData.y + ISPData.height / 4
    );
    p5.text(
      "Internet Service Provider",
      ISPData.x + ((ISPData.width - p5.textWidth("Internet Service Provider")) / 2),
      ISPData.y + ISPData.height / 2
    );
    p5.noFill();
    p5.stroke(255, 255, 255);
    p5.rect(
      ISPData.x + 10,
      ISPData.y + (2 * (ISPData.height / 3)),
      ISPData.width - 20,
      25
    );
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.textFont(boldFont);
    p5.textSize(12);
    p5.text(
      "IPv6",
      ISPData.x + 20,
      ISPData.y + (2 * (ISPData.height / 3)) + 16,
    );
    p5.textFont(regularFont);
    p5.textSize(20);
    p5.text(
      "|",
      ISPData.x + 10 + p5.textWidth("IPv6"),
      ISPData.y + (2 * (ISPData.height / 3)) + 18,
    );
    p5.textSize(12);

    let ISPBounds = getISPBounds(ISPData, scaleFactor);
    if (
      p5.mouseX >= ISPBounds.left &&
      p5.mouseX <= ISPBounds.right &&
      p5.mouseY >= ISPBounds.top &&
      p5.mouseY <= ISPBounds.bottom
    ) {
      p5.cursor(p5.HAND);
      setHovering("ISP");
      hoverElement("ISP");
    } 
    else {
      setHovering(null);
    }

    if (getCreateIP()) {
      if (getClientIP() === "generating...") {
        setClientIP(generateIP());
      }
    } else {
      setClientIP("generating...");
    }
    p5.text(
      getClientIP(),
      ISPData.x + 35 + p5.textWidth("IPv6"),
      ISPData.y + (2 * (ISPData.height / 3)) + 15,
    );
}