// Boarding pass visualization
registerSketch('sk3', function (p) {
  let boardingPass;
  
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
  };
  
  p.draw = function () {
    p.background(240, 240, 245);
    
    // Boarding pass outline - modern design
    let passWidth = p.min(550, p.width - 80);
    let passHeight = 400;
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
    p.rect(x + 30, y + 105, 220, 95, 4);
    
    p.fill(15, 45, 120);
    p.textAlign(p.CENTER);
    p.textSize(13);
    p.textStyle(p.NORMAL);
    p.text("DEPARTURE TIME", x + 140, y + 130);
    
    p.textSize(52);
    p.textStyle(p.BOLD);
    p.text(boardingPass.departure, x + 140, y + 178);
    
    // Gate - prominent on right
    p.fill(100);
    p.textAlign(p.CENTER);
    p.textSize(11);
    p.textStyle(p.NORMAL);
    p.text("GATE", x + passWidth - 90, y + 115);
    
    p.fill(15, 45, 120);
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.text(boardingPass.gate, x + passWidth - 90, y + 165);
    
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
    
    // Barcode section with modern styling
    p.fill(250, 250, 255);
    p.rect(x, y + passHeight - 70, passWidth, 70, 0, 0, 8, 8);
    
    p.fill(180);
    p.textAlign(p.CENTER);
    p.textSize(9);
    p.textStyle(p.NORMAL);
    p.text("SCAN BARCODE", x + passWidth / 2, y + passHeight - 53);
    
    // Barcode
    p.stroke(0);
    let barcodeX = x + (passWidth - 200) / 2;
    let barcodeY = y + passHeight - 40;
    
    for (let i = 0; i < boardingPass.barcode.length; i++) {
      let barThickness = (parseInt(boardingPass.barcode[i]) % 3) + 1;
      p.strokeWeight(barThickness);
      p.line(barcodeX + i * 15, barcodeY, barcodeX + i * 15, barcodeY + 28);
    }
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
