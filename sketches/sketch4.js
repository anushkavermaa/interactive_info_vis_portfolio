// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  const MAX_SIZE = 600;
  let boardingProgress = 0; // 0 to 1 (0% to 100%)
  let boardingGroups = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'];
  let currentGroup = 0;
  let groupStartTime = 0;
  let timePerGroup = 7 * 60 * 1000; // 7 minutes in milliseconds
  
  p.setup = function () {
    let canvasSize = p.min(MAX_SIZE, p.min(p.windowWidth, p.windowHeight));
    let canvas = p.createCanvas(canvasSize, canvasSize);
    canvas.style('display', 'block');
    canvas.style('margin', 'auto');
    groupStartTime = p.millis();
  };
  
  p.draw = function () {
    p.background(240, 240, 245);

    let uiScale = p.width / 800;
    let frameMargin = 10 * uiScale;
    let innerMargin = 20 * uiScale;
    
    // Auto-advance boarding groups
    let timeRemaining = 0;
    if (currentGroup < boardingGroups.length) {
      let elapsedTime = p.millis() - groupStartTime;
      
      // Smooth progress within current group
      let groupProgress = p.constrain(elapsedTime / timePerGroup, 0, 1);
      boardingProgress = (currentGroup + groupProgress) / boardingGroups.length;
      
      // Calculate time remaining
      timeRemaining = p.max(0, timePerGroup - elapsedTime);
      
      // Advance to next group when time is up
      if (elapsedTime >= timePerGroup) {
        currentGroup++;
        groupStartTime = p.millis();
      }
    } else {
      // Ensure progress is complete
      boardingProgress = 1;
    }
    
    // Simple dark frame like a display board
    p.fill(25, 30, 40);
    p.noStroke();
    p.rect(frameMargin, frameMargin, p.width - frameMargin * 2, p.height - frameMargin * 2, 5 * uiScale);
    
    // Inner display area with subtle blue-tinted background
    p.fill(235, 240, 250);
    p.rect(frameMargin + innerMargin, frameMargin + innerMargin, p.width - (frameMargin + innerMargin) * 2, p.height - (frameMargin + innerMargin) * 2, 3 * uiScale);
    
    // Center the plane with slight upward offset and scale
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.scale(0.97 * uiScale); // Scale down for better proportion
    p.rotate(-p.PI / 4); // Diagonal orientation
    
    // Draw plane outline
    drawPlaneOutline();
    
    // Draw boarding progress gradient inside plane
    drawBoardingProgress();
    
    p.pop();
    
    // Display boarding group info - airport style
    // Dark background banner - larger and more prominent
    p.fill(15, 45, 120);
    p.noStroke();
    let bannerWidth = 700 * uiScale;
    let bannerHeight = 55 * uiScale;
    let bannerX = (p.width - bannerWidth) / 2;
    let bannerY = 40 * uiScale;
    p.rect(bannerX, bannerY, bannerWidth, bannerHeight, 8 * uiScale);
    
    // White text on dark background
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24 * uiScale);
    p.textStyle(p.BOLD);
    if (currentGroup < boardingGroups.length) {
      p.text('NOW BOARDING: ' + boardingGroups[currentGroup].toUpperCase(), p.width / 2, bannerY + bannerHeight / 2);
    } else {
      p.text('BOARDING COMPLETE', p.width / 2, bannerY + bannerHeight / 2);
    }
    p.textStyle(p.NORMAL);
    
    // Time remaining indicator below boarding group
    if (currentGroup < boardingGroups.length) {
      p.fill(220, 240, 255);
      let timeBoxWidth = 300 * uiScale;
      let timeBoxHeight = 35 * uiScale;
      let timeBoxX = (p.width - timeBoxWidth) / 2;
      let timeBoxY = 105 * uiScale;
      p.rect(timeBoxX, timeBoxY, timeBoxWidth, timeBoxHeight, 5 * uiScale);
      p.fill(15, 45, 120);
      p.textSize(18 * uiScale);
      p.textStyle(p.BOLD);
      let minutes = p.floor(timeRemaining / 60000);
      let seconds = p.floor((timeRemaining % 60000) / 1000);
      let timeStr = p.nf(minutes, 1) + ':' + p.nf(seconds, 2);
      p.text('TIME REMAINING: ' + timeStr, p.width / 2, timeBoxY + timeBoxHeight / 2);
      p.textStyle(p.NORMAL);
    }
    
    // Boarding progress percentage at bottom - larger and more prominent
    p.fill(15, 45, 120);
    let bottomBannerY = p.height - 95 * uiScale;
    p.rect(bannerX, bottomBannerY, bannerWidth, bannerHeight, 8 * uiScale);
    p.fill(255);
    p.textSize(24 * uiScale);
    p.textStyle(p.BOLD);
    p.text(Math.floor(boardingProgress * 100) + '% COMPLETE', p.width / 2, bottomBannerY + bannerHeight / 2);
    p.textStyle(p.NORMAL);
  };
  
  function drawPlaneOutline() {
    // Aerial/top-down view of plane
    p.stroke(15, 45, 120);
    p.strokeWeight(4);
    p.noFill();
    
    // Main fuselage (body)
    p.beginShape();
    // Pointed nose
    p.vertex(0, -280);
    
    // Right side - gradual widening
    p.bezierVertex(10, -270, 20, -250, 25, -200);
    p.vertex(25, 150);
    
    // Right tail taper
    p.bezierVertex(25, 170, 20, 185, 12, 195);
    
    // Connect to center tail
    p.bezierVertex(8, 198, 4, 200, 0, 200);
    
    // Left tail taper
    p.bezierVertex(-4, 200, -8, 198, -12, 195);
    p.bezierVertex(-20, 185, -25, 170, -25, 150);
    
    // Left side
    p.vertex(-25, -200);
    p.bezierVertex(-20, -250, -10, -270, 0, -280);
    p.endShape(p.CLOSE);
    
    // Right wing
    p.beginShape();
    p.vertex(25, -60);
    p.bezierVertex(35, -65, 50, -70, 80, -75);
    p.bezierVertex(100, -78, 120, -80, 140, -80);
    p.bezierVertex(145, -78, 148, -75, 148, -70);
    p.bezierVertex(140, -68, 120, -65, 100, -60);
    p.bezierVertex(70, -50, 45, -40, 25, -35);
    p.endShape(p.CLOSE);
    
    // Left wing
    p.beginShape();
    p.vertex(-25, -60);
    p.bezierVertex(-35, -65, -50, -70, -80, -75);
    p.bezierVertex(-100, -78, -120, -80, -140, -80);
    p.bezierVertex(-145, -78, -148, -75, -148, -70);
    p.bezierVertex(-140, -68, -120, -65, -100, -60);
    p.bezierVertex(-70, -50, -45, -40, -25, -35);
    p.endShape(p.CLOSE);
    
    // Right horizontal stabilizer
    p.beginShape();
    p.vertex(8, 195);
    p.bezierVertex(18, 197, 32, 200, 48, 202);
    p.bezierVertex(56, 203, 63, 204, 68, 204);
    p.bezierVertex(70, 206, 70, 209, 68, 211);
    p.bezierVertex(63, 211, 56, 212, 48, 213);
    p.bezierVertex(32, 215, 18, 217, 8, 218);
    p.endShape(p.CLOSE);
    
    // Left horizontal stabilizer
    p.beginShape();
    p.vertex(-8, 195);
    p.bezierVertex(-18, 197, -32, 200, -48, 202);
    p.bezierVertex(-56, 203, -63, 204, -68, 204);
    p.bezierVertex(-70, 206, -70, 209, -68, 211);
    p.bezierVertex(-63, 211, -56, 212, -48, 213);
    p.bezierVertex(-32, 215, -18, 217, -8, 218);
    p.endShape(p.CLOSE);
    
    // Vertical stabilizer (tail fin)
    p.beginShape();
    p.vertex(-5, 198);
    p.vertex(-5, 228);
    p.bezierVertex(-5, 234, -3, 238, 0, 238);
    p.bezierVertex(3, 238, 5, 234, 5, 228);
    p.vertex(5, 198);
    p.endShape(p.CLOSE);
    
    // Cockpit window
    p.strokeWeight(2);
    p.ellipse(0, -250, 15, 20);
  }
  
  function drawBoardingProgress() {
    // Create gradient fill based on boarding progress
    p.noStroke();
    
    // Fill from tail to nose (tail extends to y=218)
    let fillY = 218 - (498 * boardingProgress); // 218 (tail end) to -280 (nose)
    
    for (let y = 218; y >= fillY; y -= 2) {
      let amt = p.map(y, 218, -280, 0, 1);
      let c = p.lerpColor(p.color(100, 150, 220, 180), p.color(15, 45, 120, 200), amt);
      p.fill(c);
      
      // Calculate fuselage width
      let w = 25;
      if (y < -200) {
        w = p.map(y, -280, -200, 0, 25);
      } else if (y > 150) {
        w = p.map(y, 150, 200, 25, 0);
      }
      
      // Draw fuselage slice
      p.rect(-w, y, w * 2, 2);
      
      // Add wing fills when in wing region (y between -80 and -35)
      if (y >= -80 && y <= -35) {
        // Calculate wing extension based on y position
        let wingProgress = p.map(y, -80, -35, 0, 1);
        
        // Right wing
        let rightWingStart = 25;
        let rightWingEnd = p.map(y, -80, -35, 140, 25);
        if (rightWingEnd > rightWingStart) {
          p.rect(rightWingStart, y, rightWingEnd - rightWingStart, 2);
        }
        
        // Left wing
        let leftWingStart = -25;
        let leftWingEnd = p.map(y, -80, -35, -140, -25);
        if (leftWingEnd < leftWingStart) {
          p.rect(leftWingEnd, y, leftWingStart - leftWingEnd, 2);
        }
      }
      
      // Add horizontal stabilizer fills when in tail region (y between 195 and 218)
      if (y >= 195 && y <= 218) {
        // Use linear interpolation along the bezier path for right wing
        let t = (y - 195) / (218 - 195);
        let rightWidth, leftWidth;
        
        // Right stabilizer: starts at (8,195), goes through bezier to (8,218)
        // Top edge expands from x=8 to x=68 at around y=204
        // Bottom edge contracts back from x=68 to x=8
        if (y <= 204) {
          // Top bezier: (8,195) -> (18,197) -> (32,200) -> (48,202) -> (56,203) -> (63,204) -> (68,204)
          if (y < 197) {
            rightWidth = p.map(y, 195, 197, 8, 18);
          } else if (y < 200) {
            rightWidth = p.map(y, 197, 200, 18, 32);
          } else if (y < 202) {
            rightWidth = p.map(y, 200, 202, 32, 48);
          } else if (y < 203) {
            rightWidth = p.map(y, 202, 203, 48, 56);
          } else if (y < 204) {
            rightWidth = p.map(y, 203, 204, 56, 63);
          } else {
            rightWidth = 68;
          }
        } else {
          // Bottom bezier: (68,204) -> (70,206) -> (70,209) -> (68,211) -> (63,211) -> (56,212) -> (48,213) -> (32,215) -> (18,217) -> (8,218)
          if (y < 206) {
            rightWidth = p.map(y, 204, 206, 68, 70);
          } else if (y < 209) {
            rightWidth = 70;
          } else if (y < 211) {
            rightWidth = p.map(y, 209, 211, 70, 68);
          } else if (y < 212) {
            rightWidth = p.map(y, 211, 212, 68, 56);
          } else if (y < 213) {
            rightWidth = p.map(y, 212, 213, 56, 48);
          } else if (y < 215) {
            rightWidth = p.map(y, 213, 215, 48, 32);
          } else if (y < 217) {
            rightWidth = p.map(y, 215, 217, 32, 18);
          } else {
            rightWidth = p.map(y, 217, 218, 18, 8);
          }
        }
        
        // Fill right stabilizer
        p.rect(8, y, rightWidth - 8, 2);
        
        // Fill left stabilizer (mirror)
        leftWidth = -rightWidth;
        p.rect(leftWidth, y, -8 - leftWidth, 2);
      }
      
      // Add vertical stabilizer fill (y between 198 and 238)
      if (y >= 198 && y <= 238) {
        let vertWidth = 5;
        if (y > 228) {
          vertWidth = p.map(y, 228, 238, 5, 0);
        }
        // This overlaps with fuselage so just ensure it's filled
      }
    }
  }
  
  // Click to skip to next boarding group
  p.mousePressed = function () {
    if (currentGroup < boardingGroups.length) {
      currentGroup++;
      groupStartTime = p.millis(); // Reset timer for new group
      if (currentGroup >= boardingGroups.length) {
        boardingProgress = 1;
      }
    }
  };
  
  p.windowResized = function () { 
    let canvasSize = p.min(MAX_SIZE, p.min(p.windowWidth, p.windowHeight));
    p.resizeCanvas(canvasSize, canvasSize); 
  };
});
