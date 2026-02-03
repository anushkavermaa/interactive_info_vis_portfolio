// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let startTime;
  let duration = 30000; // 30 seconds in milliseconds
  let rectLeft = 150;
  let rectRight = 650;
  let suitcaseEndX = 320;
  let personEndX = 440;
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startTime = p.millis();
  };
  
  p.draw = function () {
    p.background(220);
    
    // Calculate elapsed time and progress (0 to 1)
    let elapsed = p.millis() - startTime;
    let progress = p.constrain(elapsed / duration, 0, 1);
    
    // Darker gray rectangle
    p.fill(160);
    p.rect(rectLeft, 150, 500, 300);

    // Baggage-claim style conveyor belt (narrow)
    let beltHeight = 18; 
    let beltY = 150 + 170; 
    // belt base (lighter, slightly transparent)
    p.fill(180, 200);
    p.rect(rectLeft + 10, beltY - beltHeight/2, 500 - 20, beltHeight, 4);
    // inner belt surface (slightly lighter, transparent)
    p.fill(200, 200);
    p.rect(rectLeft + 14, beltY - (beltHeight-6)/2, 500 - 28, beltHeight-6, 3);
    // edge rails (lighter, transparent)
    p.fill(190, 200);
    p.rect(rectLeft + 6, beltY - beltHeight/2 - 4, 6, beltHeight + 8);
    p.rect(rectLeft + 500 - 12, beltY - beltHeight/2 - 4, 6, beltHeight + 8);
    // repeating slats to suggest belt movement (darker, slightly transparent)
    p.fill(110, 220);
    let slatW = 20;
    let slatGap = 12;
    let slatStart = rectLeft + 20;
    for (let x = slatStart; x < rectLeft + 500 - 20; x += slatW + slatGap) {
      p.rect(x, beltY - 2, slatW, 6, 2);
    }
    
    // Calculate suitcase position (moves from left to center-left)
    let suitcaseX = 180 + (suitcaseEndX - 180) * progress;
    
    // Suitcase icon
    p.fill(139, 90, 43); // Brown color
    // Main suitcase body
    p.rect(suitcaseX, 265, 90, 70);
    // Suitcase lid
    p.rect(suitcaseX, 265, 90, 20);
    p.fill(160, 110, 60); 
    p.rect(suitcaseX, 265, 90, 15);
    // Handle
    p.stroke(139, 90, 43);
    p.strokeWeight(3);
    p.noFill();
    p.arc(suitcaseX + 45, 265, 45, 45, p.PI, 0, p.OPEN);
    p.stroke(139, 90, 43);
    p.strokeWeight(1);
    p.fill(139, 90, 43);
    // Latch details
    p.circle(suitcaseX + 30, 285, 3);
    p.circle(suitcaseX + 60, 285, 3);
    p.noStroke();
    
    // Calculate person position (moves from right to center-right)
    let personX = 590 - (590 - personEndX) * progress;
    
    // Person icon
    p.fill(80);
    // Head
    p.circle(personX, 245, 25);
    // Body
    p.rect(personX - 7, 275, 14, 40);
    // Left arm
    p.push();
    p.translate(personX - 7, 285);
    p.rotate(3 * p.PI / 4);
    p.rect(0, -4, 40, 8);
    p.pop();
    // Right arm
    p.push();
    p.translate(personX + 7, 285);
    p.rotate(-p.PI / 4);
    p.rect(0, -4, 40, 8);
    p.pop();
    // Left leg
    p.rect(personX - 10, 315, 8, 30);
    // Right leg
    p.rect(personX + 3, 315, 8, 30);
    p.noStroke();
    
    // Display status text
    p.fill(0);
    p.textSize(20);
    p.textAlign(p.CENTER, p.TOP);
    if (progress < 1) {
      p.text("Your bags are on the way!", 400, 180);
    } else {
      p.text("Your bags are here!", 400, 180);
    }

    // Countdown timer display (mm:ss) inside the dark rectangle, top-right
    let remaining = Math.max(0, duration - elapsed);
    // use floor so it shows countdown accurately (00:00 at end)
    let secs = Math.floor(remaining / 1000);
    let mins = Math.floor(secs / 60);
    let s = secs % 60;
    let timeStr = (mins < 10 ? '0' + mins : '' + mins) + ':' + (s < 10 ? '0' + s : '' + s);
    p.textSize(18);
    // place countdown at bottom-center of the dark rectangle
    p.textAlign(p.CENTER, p.BOTTOM);
    // rectangle top=150, height=300 -> bottom = 150+300 = 450
    // move timer a little higher
    p.text(timeStr, rectLeft + 250, 430);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
