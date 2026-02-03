// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(220);
    
    // Light gray rectangle
    p.fill(200);
    p.rect(150, 150, 500, 300);
    
    // Suitcase icon on the left side
    p.fill(139, 90, 43); // Brown color
    // Main suitcase body
    p.rect(180, 265, 90, 70);
    // Suitcase lid
    p.rect(180, 265, 90, 20);
    p.fill(160, 110, 60); // Lighter brown for lid
    p.rect(180, 265, 90, 15);
    // Handle
    p.stroke(139, 90, 43);
    p.strokeWeight(3);
    p.noFill();
    p.arc(225, 265, 45, 45, p.PI, 0, p.OPEN);
    p.stroke(139, 90, 43);
    p.strokeWeight(1);
    p.fill(139, 90, 43);
    // Latch details
    p.circle(210, 285, 3);
    p.circle(240, 285, 3);
    p.noStroke();
    
    // Person icon on the right side
    p.fill(80);
    // Head
    p.circle(480, 245, 25);
    // Body
    p.rect(473, 275, 14, 40);
    // Set stroke for arms and legs
    p.stroke(80);
    p.strokeWeight(2);
    p.noFill();
    // Left arm
    p.line(473, 285, 450, 300);
    // Right arm
    p.line(487, 285, 510, 300);
    // Left leg
    p.line(477, 315, 470, 345);
    // Right leg
    p.line(483, 315, 490, 345);
    p.noStroke();
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
