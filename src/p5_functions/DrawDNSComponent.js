function getDNSBounds(DNSData, scaleFactor) {
  return {
    left: DNSData.x * scaleFactor, 
    right: (DNSData.x + DNSData.width) * scaleFactor, 
    top: DNSData.y * scaleFactor, 
    bottom: (DNSData.y + DNSData.height) * scaleFactor
  };
}

export default function drawDNSComponent(p5, phone, scaleFactor, boldFont, regularFont, toIP, fromIP, requestData, httpSignal, website, setDNSHover, hovering, setHovering, hoverElement, possibleHovers) {
  const DNSData = {
    x: phone.x + phone.w + 505,
    y: phone.y - 270,
    width: (phone.x + phone.w + 395) - (phone.x + phone.w / 2 + 205),
    height: 140
  }  
  p5.fill("rgba(0, 0, 0, 0.3)");
  p5.rect(
    DNSData.x,
    DNSData.y,
    DNSData.width,
    DNSData.height
  );

  p5.textSize(20);
  p5.fill(255, 255, 255);
  p5.noStroke();
  p5.text(
    "DNS",
    DNSData.x + ((DNSData.width - p5.textWidth("DNS")) / 2),
    DNSData.y + DNSData.height / 5
  );
  p5.text(
    "Domain Name System",
    DNSData.x + ((DNSData.width - p5.textWidth("Domain Name Systemr")) / 2),
    DNSData.y + DNSData.height / 2.5
  );
  p5.noFill();
  p5.stroke(255, 255, 255);
  p5.rect(
    DNSData.x + 10,
    DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) - 10,
    DNSData.width - 20,
    25
  );
  p5.rect(
    DNSData.x + 10,
    DNSData.y + (2 * (DNSData.height / 3)) + (25 / 2),
    DNSData.width - 20,
    25
  );
  p5.fill(255, 255, 255);
  p5.noStroke();
  p5.textFont(boldFont);
  p5.textSize(12);
  p5.text(
    "TO",
    DNSData.x + 20,
    DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) + 7,
  );
  p5.text(
    "FROM",
    DNSData.x + 20,
    DNSData.y + (2 * (DNSData.height / 3)) + 29
  );
  p5.textFont(regularFont);
  p5.textSize(20);
  p5.text(
    "|",
    DNSData.x + 58,
    DNSData.y + (2 * (DNSData.height / 3)) - 4,
  );
  p5.text(
    "|",
    DNSData.x + 58,
    DNSData.y + (2 * (DNSData.height / 3)) + 31,
  );
  p5.textSize(12);

  p5.text(
    toIP,
    DNSData .x + 58 + 10,
    DNSData.y + (2 * (DNSData.height / 3)) - (25 / 2) + 7
  );

  p5.text(
    fromIP,
    DNSData .x + 58 + 10,
    DNSData.y + (2 * (DNSData.height / 3)) + 29
  );
  
  let DNSBounds = getDNSBounds(DNSData, scaleFactor);
  if (
    p5.mouseX >= DNSBounds.left &&
    p5.mouseX <= DNSBounds.right &&
    p5.mouseY >= DNSBounds.top &&
    p5.mouseY <= DNSBounds.bottom
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