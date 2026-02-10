// Example 2
registerSketch('sk5', function (p) {
  let table;
  const CANVAS_SIZE = 1080;

  const COL = {
    score_home: "score_home",
    score_away: "score_away",
    total_yards_home: "total_yards_home",
    total_yards_away: "total_yards_away",
  };

  const X_DOMAIN = [-600, 600];
  const Y_DOMAIN = [-50, 50];

  // Parse numbers safely; return NaN if invalid
  function getNumSafe(row, col) {
    const raw = table.getString(row, col);
    if (raw == null) return NaN;

    const cleaned = raw
      .toString()
      .trim()
      .replace(/,/g, "");

    if (cleaned === "" || cleaned.toLowerCase() === "nan") return NaN;

    const val = parseFloat(cleaned);
    return Number.isFinite(val) ? val : NaN;
  }

  p.preload = function () {
    table = p.loadTable(
      "cfb_box-scores_2002-2025.csv",
      "csv",
      "header"
    );
  };

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  p.draw = function () {
    p.background(255);

    const scale = 0.5;
    const offsetX = (CANVAS_SIZE - CANVAS_SIZE * scale) / 2;
    const offsetY = 80;

    p.push();
    p.translate(offsetX, offsetY);
    p.scale(scale);

    p.noStroke();
    p.fill(244, 246, 249);
    p.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE + 200);

    const margin = 120;
    const headerH = 320;
    const plotSize = 500;
    const availableH = CANVAS_SIZE - margin - headerH;
    const left = (CANVAS_SIZE - plotSize) / 2;
    const top = headerH + (availableH - plotSize) / 2;
    const right = left + plotSize;
    const bottom = top + plotSize;

    // Title and subtitle
    p.fill(20);
    p.noStroke();
    const titleX = 80;
    const titleY = 54;
    const titleLineH = 56;

    p.textAlign(p.LEFT, p.TOP);
    p.textFont("Georgia");
    p.textStyle(p.BOLD);
    p.textSize(50);
    p.text(
      "Can We Predict the Outcome\nof a College Football Game?",
      titleX,
      titleY
    );
    p.textAlign(p.LEFT, p.TOP);
    p.textFont("Helvetica");
    p.textStyle(p.NORMAL);
    p.textSize(26);
    p.text(
      "Exploring the Relationship Between Total Yardage and the Winner of the Game",
      titleX,
      titleY + titleLineH * 2 + 24
    );

    const zeroX = p.map(0, X_DOMAIN[0], X_DOMAIN[1], left, right);
    const zeroY = p.map(0, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);

    // Quadrant shading (home team perspective)
    p.noStroke();
    const greenFill = [215, 241, 223, 140];
    const redFill = [246, 210, 210, 150];

    // Home more yards & home win (x > 0, y > 0)
    p.fill(...greenFill);
    p.rect(zeroX, top, right - zeroX, zeroY - top);

    // Home fewer yards & home win (x < 0, y > 0)
    p.rect(left, top, zeroX - left, zeroY - top);

    // Home fewer yards & home loss (x < 0, y < 0)
    p.rect(left, zeroY, zeroX - left, bottom - zeroY);

    // Home more yards & home loss (x > 0, y < 0)
    p.fill(...redFill);
    p.rect(zeroX, zeroY, right - zeroX, bottom - zeroY);

    // Axes
    p.stroke(30);
    p.strokeWeight(2.5);
    p.line(left, bottom, right, bottom);
    p.line(left, top, left, bottom);

    // Zero lines
    p.stroke(110);
    p.strokeWeight(2);
    p.line(zeroX, top, zeroX, bottom);
    p.line(left, zeroY, right, zeroY);

    // Axis labels
    p.noStroke();
    p.fill(40);
    p.textAlign(p.CENTER, p.TOP);
    p.textStyle(p.BOLD);
    p.textSize(18);
    p.text("Difference in Total Yards (Home - Away)", (left + right) / 2, bottom + 16);
    p.push();
    p.translate(left - 48, (top + bottom) / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER, p.TOP);
    p.text("Difference in Total Points (Home - Away)", 0, 0);
    p.pop();
    p.textStyle(p.NORMAL);

    // Points
    p.noStroke();
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let count = 0;

    for (let i = 0; i < table.getRowCount(); i++) {
      const hy = getNumSafe(i, COL.total_yards_home);
      const ay = getNumSafe(i, COL.total_yards_away);
      const hs = getNumSafe(i, COL.score_home);
      const as = getNumSafe(i, COL.score_away);

      // Ignore rows with missing values
      if (
        !Number.isFinite(hy) ||
        !Number.isFinite(ay) ||
        !Number.isFinite(hs) ||
        !Number.isFinite(as)
      ) {
        continue;
      }

      const yardDiff = hy - ay;
      const pointDiff = hs - as;

      if (!Number.isFinite(yardDiff) || !Number.isFinite(pointDiff)) continue;

      const x = p.map(yardDiff, X_DOMAIN[0], X_DOMAIN[1], left, right);
      const y = p.map(pointDiff, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);

      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;

      const inBounds = x >= left && x <= right && y >= top && y <= bottom;
      const alpha = inBounds ? 160 : 70;

      sumX += yardDiff;
      sumY += pointDiff;
      sumXY += yardDiff * pointDiff;
      sumXX += yardDiff * yardDiff;
      count += 1;

      // Color by win/loss
      if (pointDiff > 0) p.fill(212, 175, 55, alpha);
      else p.fill(106, 13, 173, alpha);

      p.circle(x, y, 5);
    }

    // Trend line (least squares)
    if (count > 1) {
      const denom = count * sumXX - sumX * sumX;
      if (denom !== 0) {
        const slope = (count * sumXY - sumX * sumY) / denom;
        const intercept = (sumY - slope * sumX) / count;
        const x1 = X_DOMAIN[0];
        const x2 = X_DOMAIN[1];
        const y1 = slope * x1 + intercept;
        const y2 = slope * x2 + intercept;
        const px1 = p.map(x1, X_DOMAIN[0], X_DOMAIN[1], left, right);
        const py1 = p.map(y1, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);
        const px2 = p.map(x2, X_DOMAIN[0], X_DOMAIN[1], left, right);
        const py2 = p.map(y2, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);

        p.stroke(30);
        p.strokeWeight(3);
        p.line(px1, py1, px2, py2);
      }
    }

    // Legend
    const legendY = bottom + 70;
    const legendX = (left + right) / 2 - 170;
    const dotSize = 10;
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(18);
    p.fill(212, 175, 55, 180);
    p.circle(legendX, legendY, dotSize);
    p.fill(40);
    p.text("Home team won", legendX + 16, legendY);

    p.fill(106, 13, 173, 180);
    p.circle(legendX + 180, legendY, dotSize);
    p.fill(40);
    p.text("Home team lost", legendX + 196, legendY);

    p.pop();
  };

  p.windowResized = function () {
    p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };
});
