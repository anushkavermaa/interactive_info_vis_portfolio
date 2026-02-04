// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  let boardingProgress = 0; // 0 to 1 (0% to 100%)
  let boardingGroups = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'];
  let currentGroup = 0;
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  
  p.draw = function () {
    p.background(240, 240, 245);
    
    // Center the plane
    p.push();
    p.translate(p.width / 2, p.height / 2);
    
    // Draw plane outline
    drawPlaneOutline();
    
    // Draw boarding progress gradient inside plane
    drawBoardingProgress();
    
    p.pop();
    
    // Display boarding group info
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(20);
    if (currentGroup < boardingGroups.length) {
      p.text('Now Boarding: ' + boardingGroups[currentGroup], p.width / 2, 100);
    } else {
      p.text('Boarding Complete', p.width / 2, 100);
    }
    p.textSize(14);
    p.text(Math.floor(boardingProgress * 100) + '% Full', p.width / 2, 130);
  };
  
  function drawPlaneOutline() {
    // Plane body (fuselage)
    p.stroke(15, 45, 120);
    p.strokeWeight(4);
    p.noFill();
    
    // Main fuselage - rounded rectangle
    p.beginShape();
    // Nose (front, rounded)
    p.vertex(-250, 0);
    p.bezierVertex(-280, 0, -290, -15, -290, -25);
    p.bezierVertex(-290, -35, -280, -50, -250, -50);
    
    // Top of fuselage
    p.vertex(200, -50);
    
    // Tail section
    p.bezierVertex(220, -50, 240, -55, 250, -65);
    p.vertex(250, -65);
    
    // Vertical stabilizer (tail fin)
    p.vertex(270, -80);
    p.vertex(250, -80);
    p.vertex(250, -65);
    
    // Back to bottom of tail
    p.vertex(250, -65);
    p.bezierVertex(240, -60, 230, -58, 220, -58);
    
    // Bottom of fuselage back section
    p.vertex(200, -58);
    p.vertex(200, 8);
    
    // Bottom of tail
    p.bezierVertex(230, 8, 240, 10, 250, 15);
    p.vertex(250, 15);
    p.vertex(270, 30);
    p.vertex(250, 30);
    p.vertex(250, 15);
    p.bezierVertex(240, 5, 220, 0, 200, 0);
    
    // Bottom of main fuselage
    p.vertex(-250, 0);
    
    p.endShape(p.CLOSE);
    
    // Wings
    p.beginShape();
    // Left wing
    p.vertex(-50, -50);
    p.vertex(-100, -120);
    p.vertex(-80, -125);
    p.vertex(-30, -58);
    p.endShape(p.CLOSE);
    
    p.beginShape();
    // Right wing
    p.vertex(-50, 8);
    p.vertex(-100, 70);
    p.vertex(-80, 75);
    p.vertex(-30, 16);
    p.endShape(p.CLOSE);
  }
  
  function drawBoardingProgress() {
    // Create gradient fill based on boarding progress
    p.noStroke();
    
    // Calculate how much of the plane to fill
    let fillHeight = -50 + (58 * boardingProgress);
    
    // Draw gradient from bottom to top as boarding progresses
    for (let y = 8; y >= fillHeight; y -= 2) {
      let amt = p.map(y, 8, -50, 0, 1);
      let c = p.lerpColor(p.color(100, 180, 255, 150), p.color(15, 45, 120, 180), amt);
      p.fill(c);
      
      // Draw horizontal slice of the plane body
      if (y > -50) {
        let leftX = -250;
        let rightX = 200;
        
        // Adjust for nose curve
        if (leftX < -250) {
          leftX = -250;
        }
        
        p.rect(leftX, y, rightX - leftX, 2);
      }
    }
  }
  
  // Click to advance boarding groups
  p.mousePressed = function () {
    if (currentGroup < boardingGroups.length) {
      currentGroup++;
      boardingProgress = currentGroup / boardingGroups.length;
    }
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
