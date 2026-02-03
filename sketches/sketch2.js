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
    p.rect(180, 240, 90, 70);
    // Suitcase lid
    p.rect(180, 240, 90, 20);
    p.fill(160, 110, 60); // Lighter brown for lid
    p.rect(180, 240, 90, 15);
    // Handle
    p.stroke(139, 90, 43);
    p.strokeWeight(3);
    p.noFill();
    p.arc(225, 240, 45, 45, p.PI, 0, p.OPEN);
    p.stroke(139, 90, 43);
    p.strokeWeight(1);
    p.fill(139, 90, 43);
    // Latch details
    p.circle(210, 260, 3);
    p.circle(240, 260, 3);
    p.noStroke();
    
    // Person icon on the right side
    p.fill(80);
    // Head
    p.circle(480, 210, 30);
    // Body
    p.rect(470, 245, 20, 50);
    // Left arm
    p.line(470, 255, 450, 275);
    // Right arm
    p.line(490, 255, 510, 275);
    // Left leg
    p.line(475, 295, 465, 330);
    // Right leg
    p.line(485, 295, 495, 330);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
