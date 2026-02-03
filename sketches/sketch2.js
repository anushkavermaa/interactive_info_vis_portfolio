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
    p.fill(80);
    // Main suitcase body
    p.rect(200, 220, 80, 60);
    // Handle
    p.arc(240, 220, 35, 35, p.PI, 0, p.OPEN);
    p.stroke(80);
    p.strokeWeight(2);
    p.line(220, 220, 260, 220);
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
