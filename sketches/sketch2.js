// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let startTime;
  let duration = 30000; // 30 seconds in milliseconds
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startTime = p.millis();
  };
  
  p.draw = function () {
    p.background(240, 240, 245);
    
    // Calculate elapsed time and progress (0 to 1)
    let elapsed = p.millis() - startTime;
    let progress = p.constrain(elapsed / duration, 0, 1);
    
    // Calculate centered position and scale (max 600x600, maintaining aspect ratio)
    let baseWidth = 500;
    let baseHeight = 300;
    let maxSize = 600;
    let scale = p.min(maxSize / baseWidth, maxSize / baseHeight);
    let rectWidth = baseWidth * scale;
    let rectHeight = baseHeight * scale;
    let rectLeft = (p.width - rectWidth) / 2;
    let rectTop = (p.height - rectHeight) / 2;
    
    // Darker gray rectangle (green when bags arrive)
    if (progress >= 1) {
      p.fill(152, 251, 152); // Light green background when complete
    } else {
      p.fill(160); // Gray during countdown
    }
    p.rect(rectLeft, rectTop, rectWidth, rectHeight);

    // Baggage-claim style conveyor belt (narrow) - scaled
    let beltHeight = 18 * scale; 
    let beltY = rectTop + 170 * scale; 
    // belt base (lighter, slightly transparent)
    p.fill(180, 200);
    p.rect(rectLeft + 10 * scale, beltY - beltHeight/2, rectWidth - 20 * scale, beltHeight, 4);
    // inner belt surface (slightly lighter, transparent)
    p.fill(200, 200);
    p.rect(rectLeft + 14 * scale, beltY - (beltHeight-6*scale)/2, rectWidth - 28 * scale, beltHeight-6*scale, 3);
    // edge rails (lighter, transparent)
    p.fill(190, 200);
    p.rect(rectLeft + 6 * scale, beltY - beltHeight/2 - 4*scale, 6 * scale, beltHeight + 8*scale);
    p.rect(rectLeft + rectWidth - 12 * scale, beltY - beltHeight/2 - 4*scale, 6 * scale, beltHeight + 8*scale);
    // repeating slats to suggest belt movement (darker, slightly transparent)
    p.fill(110, 220);
    let slatW = 20 * scale;
    let slatGap = 12 * scale;
    let slatStart = rectLeft + 20 * scale;
    for (let x = slatStart; x < rectLeft + rectWidth - 20 * scale; x += slatW + slatGap) {
      p.rect(x, beltY - 2 * scale, slatW, 6 * scale, 2);
    }
    
    // Calculate suitcase position (moves from left to center-left) - scaled
    let suitcaseStartX = rectLeft + 30 * scale;
    let suitcaseEndX = rectLeft + 170 * scale;
    let suitcaseX = suitcaseStartX + (suitcaseEndX - suitcaseStartX) * progress;
    
    // Suitcase icon - scaled
    p.fill(139, 90, 43); // Brown color
    // Main suitcase body
    p.rect(suitcaseX, rectTop + 115 * scale, 90 * scale, 70 * scale);
    // Suitcase lid
    p.rect(suitcaseX, rectTop + 115 * scale, 90 * scale, 20 * scale);
    p.fill(160, 110, 60); 
    p.rect(suitcaseX, rectTop + 115 * scale, 90 * scale, 15 * scale);
    // Handle
    p.stroke(139, 90, 43);
    p.strokeWeight(3 * scale);
    p.noFill();
    p.arc(suitcaseX + 45 * scale, rectTop + 115 * scale, 45 * scale, 45 * scale, p.PI, 0, p.OPEN);
    p.stroke(139, 90, 43);
    p.strokeWeight(1 * scale);
    p.fill(139, 90, 43);
    // Latch details
    p.circle(suitcaseX + 30 * scale, rectTop + 135 * scale, 3 * scale);
    p.circle(suitcaseX + 60 * scale, rectTop + 135 * scale, 3 * scale);
    p.noStroke();
    
    // Calculate person position (moves from right to center-right) - scaled
    let personStartX = rectLeft + rectWidth - 60 * scale;
    let personEndX = rectLeft + 290 * scale;
    let personX = personStartX - (personStartX - personEndX) * progress;
    
    // Person icon - scaled
    p.fill(80);
    // Head
    p.circle(personX, rectTop + 95 * scale, 25 * scale);
    // Body
    p.rect(personX - 7 * scale, rectTop + 125 * scale, 14 * scale, 40 * scale);
    // Left arm
    p.push();
    p.translate(personX - 7 * scale, rectTop + 135 * scale);
    p.rotate(3 * p.PI / 4);
    p.rect(0, -4 * scale, 40 * scale, 8 * scale);
    p.pop();
    // Right arm
    p.push();
    p.translate(personX + 7 * scale, rectTop + 135 * scale);
    p.rotate(-p.PI / 4);
    p.rect(0, -4 * scale, 40 * scale, 8 * scale);
    p.pop();
    // Left leg
    p.rect(personX - 10 * scale, rectTop + 165 * scale, 8 * scale, 30 * scale);
    // Right leg
    p.rect(personX + 3 * scale, rectTop + 165 * scale, 8 * scale, 30 * scale);
    p.noStroke();
    
    // Display status text - scaled
    p.fill(0);
    p.textSize(20 * scale);
    p.textAlign(p.CENTER, p.TOP);
    if (progress < 1) {
      p.text("Your bags are on the way!", rectLeft + rectWidth / 2, rectTop + 30 * scale);
    } else {
      p.text("Your bags are here!", rectLeft + rectWidth / 2, rectTop + 30 * scale);
    }

    // Countdown timer display (mm:ss) - scaled
    let remaining = Math.max(0, duration - elapsed);
    let secs = Math.floor(remaining / 1000);
    let mins = Math.floor(secs / 60);
    let s = secs % 60;
    let timeStr = (mins < 10 ? '0' + mins : '' + mins) + ':' + (s < 10 ? '0' + s : '' + s);
    p.textSize(24 * scale);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text(timeStr, rectLeft + rectWidth / 2, rectTop + rectHeight - 35 * scale);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
