export default function drawRouters(p5, routers) {
    p5.stroke(150, 150, 150);
    p5.strokeWeight(10);  
    // Tailing Lines
    function gradientLine(x1, y1, x2, y2) {
        var gradient = p5.drawingContext.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "rgb(140, 140, 140)");
        gradient.addColorStop(0.55, "rgb(200, 200, 200)");
        gradient.addColorStop(1, "transparent");    
        p5.drawingContext.strokeStyle = gradient;    
        p5.line(x1, y1, x2, y2);
    }
    
    gradientLine(routers[1].entrancePoint.x, routers[1].entrancePoint.y, routers[1].entrancePoint.x - 100, routers[1].entrancePoint.y - 100);
    gradientLine(routers[2].entrancePoint.x, routers[2].entrancePoint.y, routers[2].entrancePoint.x - 100, routers[2].entrancePoint.y - 100);
    gradientLine(routers[3].entrancePoint.x, routers[3].entrancePoint.y, routers[3].entrancePoint.x - 175, routers[3].entrancePoint.y);
    gradientLine(routers[13].entrancePoint.x, routers[13].entrancePoint.y, routers[13].entrancePoint.x - 125, routers[13].entrancePoint.y);
    gradientLine(routers[15].entrancePoint.x, routers[15].entrancePoint.y, routers[15].entrancePoint.x - 100, routers[15].entrancePoint.y + 100);
    gradientLine(routers[22].entrancePoint.x, routers[22].entrancePoint.y, routers[22].entrancePoint.x, routers[22].entrancePoint.y + 100);
    gradientLine(routers[23].entrancePoint.x, routers[23].entrancePoint.y, routers[23].entrancePoint.x, routers[23].entrancePoint.y + 175);
    gradientLine(routers[24].entrancePoint.x, routers[24].entrancePoint.y, routers[24].entrancePoint.x + 100, routers[24].entrancePoint.y - 100);
    gradientLine(routers[28].entrancePoint.x, routers[28].entrancePoint.y, routers[28].entrancePoint.x + 100, routers[28].entrancePoint.y + 100);
    gradientLine(routers[29].entrancePoint.x, routers[29].entrancePoint.y, routers[29].entrancePoint.x + 125, routers[29].entrancePoint.y);
    gradientLine(routers[30].entrancePoint.x, routers[30].entrancePoint.y, routers[30].entrancePoint.x + 135, routers[30].entrancePoint.y);
    gradientLine(routers[31].entrancePoint.x, routers[31].entrancePoint.y, routers[31].entrancePoint.x + 125, routers[31].entrancePoint.y - 185);
    
    // Draw Lines  
    p5.drawingContext.strokeStyle = "rgb(140, 140, 140)";    
    p5.line(routers[0].entrancePoint.x, routers[0].entrancePoint.y, routers[1].entrancePoint.x, routers[1].entrancePoint.y);
    p5.line(routers[0].entrancePoint.x, routers[0].entrancePoint.y, routers[6].entrancePoint.x, routers[6].entrancePoint.y);
    p5.line(routers[0].entrancePoint.x, routers[0].entrancePoint.y, routers[8].entrancePoint.x, routers[8].entrancePoint.y);
    p5.line(routers[0].entrancePoint.x, routers[0].entrancePoint.y, routers[24].entrancePoint.x, routers[24].entrancePoint.y);

    p5.line(routers[1].entrancePoint.x, routers[1].entrancePoint.y, routers[2].entrancePoint.x, routers[2].entrancePoint.y);
    p5.line(routers[1].entrancePoint.x, routers[1].entrancePoint.y, routers[5].entrancePoint.x, routers[5].entrancePoint.y);
    p5.line(routers[1].entrancePoint.x, routers[1].entrancePoint.y, routers[6].entrancePoint.x, routers[6].entrancePoint.y);
    
    p5.line(routers[2].entrancePoint.x, routers[2].entrancePoint.y, routers[3].entrancePoint.x, routers[3].entrancePoint.y);
    p5.line(routers[2].entrancePoint.x, routers[2].entrancePoint.y, routers[4].entrancePoint.x, routers[4].entrancePoint.y);
    p5.line(routers[2].entrancePoint.x, routers[2].entrancePoint.y, routers[5].entrancePoint.x, routers[5].entrancePoint.y);
    
    p5.line(routers[3].entrancePoint.x, routers[3].entrancePoint.y, routers[4].entrancePoint.x, routers[4].entrancePoint.y);
    p5.line(routers[3].entrancePoint.x, routers[3].entrancePoint.y, routers[11].entrancePoint.x, routers[11].entrancePoint.y);
    p5.line(routers[3].entrancePoint.x, routers[3].entrancePoint.y, routers[13].entrancePoint.x, routers[13].entrancePoint.y);

    p5.line(routers[4].entrancePoint.x, routers[4].entrancePoint.y, routers[5].entrancePoint.x, routers[5].entrancePoint.y);
    p5.line(routers[4].entrancePoint.x, routers[4].entrancePoint.y, routers[7].entrancePoint.x, routers[7].entrancePoint.y);
    p5.line(routers[4].entrancePoint.x, routers[4].entrancePoint.y, routers[10].entrancePoint.x, routers[10].entrancePoint.y);
    p5.line(routers[4].entrancePoint.x, routers[4].entrancePoint.y, routers[11].entrancePoint.x, routers[11].entrancePoint.y);
    
    p5.line(routers[5].entrancePoint.x, routers[5].entrancePoint.y, routers[6].entrancePoint.x, routers[6].entrancePoint.y);
    p5.line(routers[5].entrancePoint.x, routers[5].entrancePoint.y, routers[7].entrancePoint.x, routers[7].entrancePoint.y);

    p5.line(routers[6].entrancePoint.x, routers[6].entrancePoint.y, routers[7].entrancePoint.x, routers[7].entrancePoint.y);
    p5.line(routers[6].entrancePoint.x, routers[6].entrancePoint.y, routers[8].entrancePoint.x, routers[8].entrancePoint.y);

    p5.line(routers[7].entrancePoint.x, routers[7].entrancePoint.y, routers[8].entrancePoint.x, routers[8].entrancePoint.y);
    p5.line(routers[7].entrancePoint.x, routers[7].entrancePoint.y, routers[9].entrancePoint.x, routers[9].entrancePoint.y);
    p5.line(routers[7].entrancePoint.x, routers[7].entrancePoint.y, routers[10].entrancePoint.x, routers[10].entrancePoint.y);

    p5.line(routers[8].entrancePoint.x, routers[8].entrancePoint.y, routers[9].entrancePoint.x, routers[9].entrancePoint.y);
    p5.line(routers[8].entrancePoint.x, routers[8].entrancePoint.y, routers[19].entrancePoint.x, routers[19].entrancePoint.y);

    p5.line(routers[9].entrancePoint.x, routers[9].entrancePoint.y, routers[10].entrancePoint.x, routers[10].entrancePoint.y);
    p5.line(routers[9].entrancePoint.x, routers[9].entrancePoint.y, routers[12].entrancePoint.x, routers[12].entrancePoint.y);
    p5.line(routers[9].entrancePoint.x, routers[9].entrancePoint.y, routers[18].entrancePoint.x, routers[18].entrancePoint.y);
    p5.line(routers[9].entrancePoint.x, routers[9].entrancePoint.y, routers[19].entrancePoint.x, routers[19].entrancePoint.y);

    p5.line(routers[10].entrancePoint.x, routers[10].entrancePoint.y, routers[11].entrancePoint.x, routers[11].entrancePoint.y);
    p5.line(routers[10].entrancePoint.x, routers[10].entrancePoint.y, routers[12].entrancePoint.x, routers[12].entrancePoint.y);
    
    p5.line(routers[11].entrancePoint.x, routers[11].entrancePoint.y, routers[12].entrancePoint.x, routers[12].entrancePoint.y);
    p5.line(routers[11].entrancePoint.x, routers[11].entrancePoint.y, routers[13].entrancePoint.x, routers[13].entrancePoint.y);
    p5.line(routers[11].entrancePoint.x, routers[11].entrancePoint.y, routers[14].entrancePoint.x, routers[14].entrancePoint.y);

    p5.line(routers[12].entrancePoint.x, routers[12].entrancePoint.y, routers[14].entrancePoint.x, routers[14].entrancePoint.y);
    p5.line(routers[12].entrancePoint.x, routers[12].entrancePoint.y, routers[16].entrancePoint.x, routers[16].entrancePoint.y);
    p5.line(routers[12].entrancePoint.x, routers[12].entrancePoint.y, routers[18].entrancePoint.x, routers[18].entrancePoint.y);

    p5.line(routers[13].entrancePoint.x, routers[13].entrancePoint.y, routers[15].entrancePoint.x, routers[15].entrancePoint.y);
    p5.line(routers[13].entrancePoint.x, routers[13].entrancePoint.y, routers[14].entrancePoint.x, routers[14].entrancePoint.y);

    p5.line(routers[14].entrancePoint.x, routers[14].entrancePoint.y, routers[15].entrancePoint.x, routers[15].entrancePoint.y);
    p5.line(routers[14].entrancePoint.x, routers[14].entrancePoint.y, routers[16].entrancePoint.x, routers[16].entrancePoint.y);
    
    p5.line(routers[15].entrancePoint.x, routers[15].entrancePoint.y, routers[16].entrancePoint.x, routers[16].entrancePoint.y);
    p5.line(routers[15].entrancePoint.x, routers[15].entrancePoint.y, routers[22].entrancePoint.x, routers[22].entrancePoint.y);

    p5.line(routers[16].entrancePoint.x, routers[16].entrancePoint.y, routers[17].entrancePoint.x, routers[17].entrancePoint.y);
    p5.line(routers[16].entrancePoint.x, routers[16].entrancePoint.y, routers[22].entrancePoint.x, routers[22].entrancePoint.y);
    
    p5.line(routers[17].entrancePoint.x, routers[17].entrancePoint.y, routers[18].entrancePoint.x, routers[18].entrancePoint.y);
    p5.line(routers[17].entrancePoint.x, routers[17].entrancePoint.y, routers[19].entrancePoint.x, routers[19].entrancePoint.y);
    p5.line(routers[17].entrancePoint.x, routers[17].entrancePoint.y, routers[22].entrancePoint.x, routers[22].entrancePoint.y);
    p5.line(routers[17].entrancePoint.x, routers[17].entrancePoint.y, routers[23].entrancePoint.x, routers[23].entrancePoint.y);

    p5.line(routers[18].entrancePoint.x, routers[18].entrancePoint.y, routers[19].entrancePoint.x, routers[19].entrancePoint.y);

    p5.line(routers[19].entrancePoint.x, routers[19].entrancePoint.y, routers[20].entrancePoint.x, routers[20].entrancePoint.y);
    p5.line(routers[19].entrancePoint.x, routers[19].entrancePoint.y, routers[21].entrancePoint.x, routers[21].entrancePoint.y);
    p5.line(routers[19].entrancePoint.x, routers[19].entrancePoint.y, routers[23].entrancePoint.x, routers[23].entrancePoint.y);
    p5.line(routers[19].entrancePoint.x, routers[19].entrancePoint.y, routers[27].entrancePoint.x, routers[27].entrancePoint.y);

    p5.line(routers[20].entrancePoint.x, routers[20].entrancePoint.y, routers[0].entrancePoint.x, routers[0].entrancePoint.y);
    p5.line(routers[20].entrancePoint.x, routers[20].entrancePoint.y, routers[8].entrancePoint.x, routers[8].entrancePoint.y);
    p5.line(routers[20].entrancePoint.x, routers[20].entrancePoint.y, routers[21].entrancePoint.x, routers[21].entrancePoint.y);
    p5.line(routers[20].entrancePoint.x, routers[20].entrancePoint.y, routers[24].entrancePoint.x, routers[24].entrancePoint.y);

    p5.line(routers[21].entrancePoint.x, routers[21].entrancePoint.y, routers[25].entrancePoint.x, routers[25].entrancePoint.y);
    p5.line(routers[21].entrancePoint.x, routers[21].entrancePoint.y, routers[26].entrancePoint.x, routers[26].entrancePoint.y);

    p5.line(routers[22].entrancePoint.x, routers[22].entrancePoint.y, routers[23].entrancePoint.x, routers[23].entrancePoint.y);
    
    p5.line(routers[23].entrancePoint.x, routers[23].entrancePoint.y, routers[27].entrancePoint.x, routers[27].entrancePoint.y);
    p5.line(routers[23].entrancePoint.x, routers[23].entrancePoint.y, routers[28].entrancePoint.x, routers[28].entrancePoint.y);

    p5.line(routers[24].entrancePoint.x, routers[24].entrancePoint.y, routers[25].entrancePoint.x, routers[25].entrancePoint.y);
    p5.line(routers[24].entrancePoint.x, routers[24].entrancePoint.y, routers[31].entrancePoint.x, routers[31].entrancePoint.y);

    p5.line(routers[25].entrancePoint.x, routers[25].entrancePoint.y, routers[26].entrancePoint.x, routers[26].entrancePoint.y);
    p5.line(routers[25].entrancePoint.x, routers[25].entrancePoint.y, routers[30].entrancePoint.x, routers[30].entrancePoint.y);
    p5.line(routers[25].entrancePoint.x, routers[25].entrancePoint.y, routers[31].entrancePoint.x, routers[31].entrancePoint.y);

    p5.line(routers[26].entrancePoint.x, routers[26].entrancePoint.y, routers[27].entrancePoint.x, routers[27].entrancePoint.y);
    p5.line(routers[26].entrancePoint.x, routers[26].entrancePoint.y, routers[28].entrancePoint.x, routers[28].entrancePoint.y);
    p5.line(routers[26].entrancePoint.x, routers[26].entrancePoint.y, routers[29].entrancePoint.x, routers[29].entrancePoint.y);
    p5.line(routers[26].entrancePoint.x, routers[26].entrancePoint.y, routers[30].entrancePoint.x, routers[30].entrancePoint.y);

    p5.line(routers[27].entrancePoint.x, routers[27].entrancePoint.y, routers[28].entrancePoint.x, routers[28].entrancePoint.y);

    p5.line(routers[28].entrancePoint.x, routers[28].entrancePoint.y, routers[29].entrancePoint.x, routers[29].entrancePoint.y);

    p5.line(routers[29].entrancePoint.x, routers[29].entrancePoint.y, routers[30].entrancePoint.x, routers[30].entrancePoint.y);

    p5.line(routers[30].entrancePoint.x, routers[30].entrancePoint.y, routers[31].entrancePoint.x, routers[31].entrancePoint.y);
}