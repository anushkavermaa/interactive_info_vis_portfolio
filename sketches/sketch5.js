// Example 2
registerSketch('sk5', function (p) {
  let table;
  const CANVAS_SIZE = 1080;

  const COL = {
    score_home: "score_home",
    score_away: "score_away",
    rank_home: "rank_home",
    rank_away: "rank_away",
  };

  const X_DOMAIN = [-60, 60];
  const Y_DOMAIN = [-30, 30];

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

  function drawArrow(x1, y1, x2, y2, size) {
    p.line(x1, y1, x2, y2);
    const angle = p.atan2(y2 - y1, x2 - x1);
    p.push();
    p.translate(x2, y2);
    p.rotate(angle);
    p.triangle(0, 0, -size, size * 0.6, -size, -size * 0.6);
    p.pop();
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
      "Exploring the Relationship Between the Rank of a Team and the Winner of the Game",
      titleX,
      titleY + titleLineH * 2 + 24
    );

    const zeroX = p.map(0, X_DOMAIN[0], X_DOMAIN[1], left, right);
    const zeroY = p.map(0, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);

    // Quadrant shading (home team perspective)
    p.noStroke();
    const greenFill = [215, 241, 223, 140];
    const redFill = [246, 210, 210, 150];

    // Top-right quadrant
    p.fill(...redFill);
    p.rect(zeroX, top, right - zeroX, zeroY - top);

    // Top-left quadrant
    p.fill(...greenFill);
    p.rect(left, top, zeroX - left, zeroY - top);

    // Bottom-left quadrant
    p.fill(...redFill);
    p.rect(left, zeroY, zeroX - left, bottom - zeroY);

    // Bottom-right quadrant
    p.fill(...greenFill);
    p.rect(zeroX, zeroY, right - zeroX, bottom - zeroY);

    // Arrow pointing to red quadrant (outside the plot)
    p.stroke(0);
    p.strokeWeight(2);
    drawArrow(right + 50, zeroY + 40, (zeroX + right) / 2, (top + zeroY) / 2, 12);
    drawArrow(left - 50, top - 20, (left + zeroX) / 2, (top + zeroY) / 2, 12);
    p.noStroke();
    p.fill(30);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(22);
    p.text(
      "The green quadrants indicate that the better-ranked team ended up winning the game",
      left - 245,
      top - 90,
      200,
      240
    );
    p.noStroke();
    p.fill(30);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(22);
    p.text(
      "The red quadrant indicates that the better-ranked home team lost the game",
      right + 25,
      zeroY - 10,
      220,
      260
    );

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
    p.text("Difference in Team Rank (Home - Away)", (left + right) / 2, bottom + 16);
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
      const hr = getNumSafe(i, COL.rank_home);
      const ar = getNumSafe(i, COL.rank_away);
      const hs = getNumSafe(i, COL.score_home);
      const as = getNumSafe(i, COL.score_away);

      // Ignore rows with missing values
      if (
        !Number.isFinite(hr) ||
        !Number.isFinite(ar) ||
        !Number.isFinite(hs) ||
        !Number.isFinite(as)
      ) {
        continue;
      }

      const rankDiff = hr - ar;
      const pointDiff = hs - as;

      if (!Number.isFinite(rankDiff) || !Number.isFinite(pointDiff)) continue;

      const x = p.map(rankDiff, X_DOMAIN[0], X_DOMAIN[1], left, right);
      const y = p.map(pointDiff, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);

      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;

      const inBounds = x >= left && x <= right && y >= top && y <= bottom;
      const alpha = inBounds ? 160 : 70;

      sumX += rankDiff;
      sumY += pointDiff;
      sumXY += rankDiff * pointDiff;
      sumXX += rankDiff * rankDiff;
      count += 1;

      // Color by win/loss
      if (pointDiff > 0) p.fill(212, 175, 55, alpha);
      else p.fill(106, 13, 173, alpha);

      p.circle(x, y, 7);
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
