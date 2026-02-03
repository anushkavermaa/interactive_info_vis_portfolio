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
    
    // Light gray rectangle
    p.fill(200);
    p.rect(rectLeft, 150, 500, 300);
    
    // Calculate suitcase position (moves from left to center-left)
    let suitcaseX = 180 + (suitcaseEndX - 180) * progress;
    
    // Suitcase icon
    p.fill(139, 90, 43); // Brown color
    // Main suitcase body
    p.rect(suitcaseX, 265, 90, 70);
    // Suitcase lid
    p.rect(suitcaseX, 265, 90, 20);
    p.fill(160, 110, 60); // Lighter brown for lid
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
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
