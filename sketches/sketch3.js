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
    p.background(245);
    
    // Draw boarding pass - square dimensions
    let passSize = p.min(400, p.width - 40, p.height - 40);
    let x = (p.width - passSize) / 2;
    let y = (p.height - passSize) / 2;
    
    // Main background
    p.fill(255);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y, passSize, passSize);
    
    // Top stripe
    p.fill(25, 65, 140);
    p.noStroke();
    p.rect(x, y, passSize, 50);
    
    // Header
    p.fill(255);
    p.textSize(14);
    p.textAlign(p.LEFT);
    p.text("BOARDING PASS", x + 20, y + 30);
    
    // Flight number
    p.fill(0);
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("Flight", x + 20, y + 80);
    p.textSize(18);
    p.textStyle(p.BOLD);
    p.text(boardingPass.flight, x + 20, y + 100);
    
    // Gate
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("Gate", x + passSize - 80, y + 80);
    p.textSize(22);
    p.textStyle(p.BOLD);
    p.text(boardingPass.gate, x + passSize - 80, y + 105);
    
    // From
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("FROM", x + 20, y + 140);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.text(boardingPass.from, x + 20, y + 160);
    
    // To
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("TO", x + 120, y + 140);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.text(boardingPass.to, x + 120, y + 160);
    
    // Departure
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("DEPARTURE", x + 20, y + 200);
    p.textSize(14);
    p.textStyle(p.BOLD);
    p.text(boardingPass.departure, x + 20, y + 220);
    
    // Arrival
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("ARRIVAL", x + 120, y + 200);
    p.textSize(14);
    p.textStyle(p.BOLD);
    p.text(boardingPass.arrival, x + 120, y + 220);
    
    // Date
    p.textSize(10);
    p.textStyle(p.NORMAL);
    p.text("DATE", x + 20, y + 260);
    p.textSize(12);
    p.textStyle(p.BOLD);
    p.text(boardingPass.date, x + 20, y + 278);
    
    // Barcode at bottom
    p.fill(0);
    p.rect(x, y + passSize - 60, passSize, 60);
    
    p.stroke(255);
    p.strokeWeight(1);
    let barcodeX = x + 20;
    let barcodeY = y + passSize - 48;
    
    for (let i = 0; i < boardingPass.barcode.length; i++) {
      let barThickness = (parseInt(boardingPass.barcode[i]) % 3) + 1;
      p.stroke(255);
      p.strokeWeight(barThickness);
      p.line(barcodeX + i * 10, barcodeY, barcodeX + i * 10, barcodeY + 35);
    }
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
