// Boarding pass visualization
registerSketch('sk3', function (p) {
  let boardingPass;
  let boardingTime; // in minutes from midnight
  let hourInput, minuteInput;
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    boardingPass = {
      gate: "B7",
      flight: "UA 447",
      from: "SEA",
      to: "LAX",
      departure: "14:30",
      arrival: "16:45",
      date: "FEB 04 2026",
      barcode: "1234567890123"
    };
    
    // Create input controls for boarding time - positioned beside boarding pass
    let controlX = 40;
    let controlY = 200;
    
    p.createDiv('Set Boarding Time:').position(controlX, controlY).style('color', '#333').style('font-size', '14px');
    
    hourInput = p.createInput('14').position(controlX, controlY + 30).size(40, 25);
    hourInput.attribute('type', 'number');
    hourInput.attribute('min', '0');
    hourInput.attribute('max', '23');
    
    p.createSpan(' : ').position(controlX + 45, controlY + 30).style('color', '#333').style('font-size', '18px');
    
    minuteInput = p.createInput('30').position(controlX + 60, controlY + 30).size(40, 25);
    minuteInput.attribute('type', 'number');
    minuteInput.attribute('min', '0');
    minuteInput.attribute('max', '59');
    
    // Convert departure time to minutes
    updateDepartureTime();
  };
  
  function updateDepartureTime() {
    let hours = parseInt(hourInput.value()) || 14;
    let minutes = parseInt(minuteInput.value()) || 30;
    
    // Update display
    boardingPass.departure = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
    
    // Calculate in minutes from midnight
    boardingTime = hours * 60 + minutes;
  }
  
  p.draw = function () {
    p.background(240, 240, 245);
    
    // Update departure time from inputs
    updateDepartureTime();
    
    // Boarding pass outline - modern design
    let passWidth = p.min(550, p.width - 80);
    let passHeight = 500;
    let x = (p.width - passWidth) / 2;
    let y = (p.height - passHeight) / 2;
    
    // Main background with shadow effect
    p.fill(20);
    p.noStroke();
    p.rect(x + 5, y + 5, passWidth, passHeight, 8);
    
    p.fill(255);
    p.rect(x, y, passWidth, passHeight, 8);
    
    // Gradient-style top section
    p.fill(15, 45, 120);
    p.rect(x, y, passWidth, 80, 8, 8, 0, 0);
    
    // Header text
    p.fill(255);
    p.textSize(18);
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.text("BOARDING PASS", x + passWidth / 2, y + 35);
    
    p.textSize(11);
    p.textStyle(p.NORMAL);
    p.text("ELECTRONIC TICKET", x + passWidth / 2, y + 55);
    
    // DEPARTURE TIME - Prominent but elegant, centered
    let departureBoxWidth = 280;
    let departureBoxX = x + (passWidth - departureBoxWidth) / 2;
    
    p.fill(245, 245, 250);
    p.rect(departureBoxX, y + 105, departureBoxWidth, 95, 4);
    
    p.fill(15, 45, 120);
    p.textAlign(p.CENTER);
    p.textSize(13);
    p.textStyle(p.NORMAL);
    p.text("BOARDING TIME", x + passWidth / 2, y + 130);
    
    p.textSize(52);
    p.textStyle(p.BOLD);
    p.text(boardingPass.departure, x + passWidth / 2, y + 178);
    
    // Flight info
    p.fill(100);
    p.textAlign(p.LEFT);
    p.textSize(11);
    p.textStyle(p.NORMAL);
    p.text("FLIGHT", x + 40, y + 225);
    
    p.fill(0);
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.text(boardingPass.flight, x + 40, y + 250);
    
    // Gate - aligned with flight, right side
    p.fill(100);
    p.textAlign(p.RIGHT);
    p.textSize(11);
    p.textStyle(p.NORMAL);
    p.text("GATE", x + passWidth - 40, y + 225);
    
    p.fill(15, 45, 120);
    p.textSize(28);
    p.textStyle(p.BOLD);
    p.text(boardingPass.gate, x + passWidth - 40, y + 252);
    
    // Divider line
    p.stroke(220);
    p.strokeWeight(1);
    p.line(x + 40, y + 270, x + passWidth - 40, y + 270);
    
    // From and To - side by side with arrow
    p.noStroke();
    p.fill(100);
    p.textAlign(p.LEFT);
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("FROM", x + 40, y + 290);
    
    p.fill(0);
    p.textSize(22);
    p.textStyle(p.BOLD);
    p.text(boardingPass.from, x + 40, y + 315);
    
    // Arrow
    p.fill(15, 45, 120);
    p.textSize(20);
    p.text("→", x + 140, y + 312);
    
    p.fill(100);
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("TO", x + 180, y + 290);
    
    p.fill(0);
    p.textSize(22);
    p.textStyle(p.BOLD);
    p.text(boardingPass.to, x + 180, y + 315);
    
    // Arrival and Date
    p.fill(100);
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("ARRIVAL", x + 280, y + 290);
    
    p.fill(0);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.text(boardingPass.arrival, x + 280, y + 310);
    
    p.fill(100);
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("DATE", x + passWidth - 120, y + 290);
    
    p.fill(0);
    p.textSize(13);
    p.textStyle(p.BOLD);
    p.text(boardingPass.date, x + passWidth - 120, y + 308);
    
    // Barcode section with modern styling - darker and taller
    p.fill(235, 235, 240);
    p.rect(x, y + passHeight - 140, passWidth, 140, 0, 0, 8, 8);
    
    p.fill(15, 45, 120);
    p.textAlign(p.CENTER);
    p.textSize(11);
    p.textStyle(p.BOLD);
    p.text("BOARDING COUNTDOWN", x + passWidth / 2, y + passHeight - 125);
    p.textSize(9);
    p.textStyle(p.NORMAL);
    p.text("One bar appears every 5 minutes until boarding begins, starting 60 minutes prior", x + passWidth / 2, y + passHeight - 112);
    
    // Calculate minutes until boarding starts (using PST timezone)
    let now = new Date();
    let pstTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    let currentTime = pstTime.getHours() * 60 + pstTime.getMinutes();
    let minutesUntilBoarding = boardingTime - currentTime;
    
    // Calculate number of bars to show
    // Countdown starts 60 minutes before boarding, one bar every 5 minutes
    let totalBars = 12; // 60 minutes / 5 = 12 bars
    let barsToShow = 0;
    
    if (minutesUntilBoarding > 60) {
      // More than 1 hour before boarding - no bars yet
      barsToShow = 0;
    } else if (minutesUntilBoarding <= 0) {
      // Boarding has started - all bars shown
      barsToShow = totalBars;
    } else {
      // Between 60 min and boarding start - calculate bars
      let minutesIntoCountdown = 60 - minutesUntilBoarding;
      barsToShow = Math.floor(minutesIntoCountdown / 5);
    }
    
    // Show status message or barcode depending on boarding status
    p.textAlign(p.CENTER);
    p.noStroke();
    
    if (minutesUntilBoarding > 0) {
      // Draw barcode - centered with proper spacing
      let barcodeSpacing = 40;
      let totalBarcodeWidth = totalBars * barcodeSpacing;
      let barcodeX = x + (passWidth - totalBarcodeWidth) / 2;
      let barcodeY = y + passHeight - 90;
      let barcodeHeight = 50;
      
      for (let i = 0; i < totalBars; i++) {
        if (i < barsToShow) {
          // Filled bars
          p.stroke(0);
          p.strokeWeight(7);
          p.line(barcodeX + i * barcodeSpacing, barcodeY, barcodeX + i * barcodeSpacing, barcodeY + barcodeHeight);
        } else {
          // Empty bars - light gray
          p.stroke(220);
          p.strokeWeight(2);
          p.line(barcodeX + i * barcodeSpacing, barcodeY, barcodeX + i * barcodeSpacing, barcodeY + barcodeHeight);
        }
      }
      
      // Show time remaining below barcode
      p.noStroke();
      p.fill(15, 45, 120);
      p.textSize(16);
      p.textStyle(p.BOLD);
      p.text(minutesUntilBoarding + " MINUTES", x + passWidth / 2, y + passHeight - 22);
      
      p.fill(100);
      p.textSize(9);
      p.textStyle(p.NORMAL);
      p.text("until boarding begins", x + passWidth / 2, y + passHeight - 8);
    } else if (minutesUntilBoarding > -20) {
      // NOW BOARDING - clean centered message without barcode (boarding window is 20 minutes)
      p.fill(46, 125, 50);
      p.textSize(32);
      p.textStyle(p.BOLD);
      p.text("NOW BOARDING", x + passWidth / 2, y + passHeight - 60);
    } else {
      // DEPARTED
      p.fill(100);
      p.textSize(24);
      p.textStyle(p.BOLD);
      p.text("DEPARTED", x + passWidth / 2, y + passHeight - 60);
    }
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
