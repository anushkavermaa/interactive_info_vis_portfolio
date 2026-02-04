// Boarding pass visualization
registerSketch('sk3', function (p) {
  let boardingPass;
  let departureTime; // in minutes from midnight
  let boardingStartTime; // boarding starts 45 minutes before departure
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
    
    // Create input controls for departure time
    let controlY = 60;
    
    p.createDiv('Set Departure Time:').position(20, controlY).style('color', '#333').style('font-size', '14px');
    
    hourInput = p.createInput('14').position(150, controlY).size(40, 25);
    hourInput.attribute('type', 'number');
    hourInput.attribute('min', '0');
    hourInput.attribute('max', '23');
    
    p.createSpan(' : ').position(195, controlY).style('color', '#333').style('font-size', '18px');
    
    minuteInput = p.createInput('30').position(210, controlY).size(40, 25);
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
    departureTime = hours * 60 + minutes;
    boardingStartTime = departureTime - 45; // 45 minutes before
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
    
    // DEPARTURE TIME - Prominent but elegant
    p.fill(245, 245, 250);
    p.rect(x + 30, y + 105, 280, 95, 4);
    
    p.fill(15, 45, 120);
    p.textAlign(p.CENTER);
    p.textSize(13);
    p.textStyle(p.NORMAL);
    p.text("DEPARTURE TIME", x + 170, y + 130);
    
    p.textSize(52);
    p.textStyle(p.BOLD);
    p.text(boardingPass.departure, x + 170, y + 178);
    
    // Gate - prominent on right
    p.fill(100);
    p.textAlign(p.CENTER);
    p.textSize(11);
    p.textStyle(p.NORMAL);
    p.text("GATE", x + passWidth - 100, y + 115);
    
    p.fill(15, 45, 120);
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.text(boardingPass.gate, x + passWidth - 100, y + 165);
    
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
    
    // Barcode section with modern styling - BIGGER
    p.fill(250, 250, 255);
    p.rect(x, y + passHeight - 100, passWidth, 100, 0, 0, 8, 8);
    
    p.fill(180);
    p.textAlign(p.CENTER);
    p.textSize(11);
    p.textStyle(p.BOLD);
    p.text("BOARDING COUNTDOWN", x + passWidth / 2, y + passHeight - 80);
    p.textSize(9);
    p.textStyle(p.NORMAL);
    p.text("One bar appears every 5 minutes (starts 1 hour before departure)", x + passWidth / 2, y + passHeight - 66);
    
    // Calculate minutes until departure
    let currentTime = p.hour() * 60 + p.minute();
    let minutesUntilDeparture = departureTime - currentTime;
    
    // Calculate number of bars to show
    // Countdown starts 60 minutes before, one bar every 5 minutes
    let totalBars = 12; // 60 minutes / 5 = 12 bars
    let barsToShow = 0;
    
    if (minutesUntilDeparture > 60) {
      // More than 1 hour before departure - no bars yet
      barsToShow = 0;
    } else if (minutesUntilDeparture <= 0) {
      // At or past departure - all bars shown
      barsToShow = totalBars;
    } else {
      // Between 60 min and departure - calculate bars
      let minutesIntoCountdown = 60 - minutesUntilDeparture;
      barsToShow = Math.floor(minutesIntoCountdown / 5);
    }
    
    // Draw barcode
    let barcodeSpacing = 30;
    let totalBarcodeWidth = totalBars * barcodeSpacing;
    let barcodeX = x + (passWidth - totalBarcodeWidth) / 2;
    let barcodeY = y + passHeight - 50;
    let barcodeHeight = 38;
    
    for (let i = 0; i < totalBars; i++) {
      if (i < barsToShow) {
        // Filled bars
        p.stroke(0);
        p.strokeWeight(5);
        p.line(barcodeX + i * barcodeSpacing, barcodeY, barcodeX + i * barcodeSpacing, barcodeY + barcodeHeight);
      } else {
        // Empty bars - light gray
        p.stroke(220);
        p.strokeWeight(2);
        p.line(barcodeX + i * barcodeSpacing, barcodeY, barcodeX + i * barcodeSpacing, barcodeY + barcodeHeight);
      }
    }
    
    // Show time remaining
    p.fill(15, 45, 120);
    p.textSize(11);
    p.textStyle(p.BOLD);
    if (minutesUntilDeparture > 0) {
      p.text(minutesUntilDeparture + " min until departure | " + barsToShow + "/" + totalBars + " bars", x + passWidth / 2, y + passHeight - 5);
    } else {
      p.fill(200, 50, 50);
      p.text("DEPARTED", x + passWidth / 2, y + passHeight - 5);
    }
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
