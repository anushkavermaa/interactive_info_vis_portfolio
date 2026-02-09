// Example 2
registerSketch('sk5', function (p) {
  let table;

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
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(255);

    const margin = 100;
    const left = margin;
    const right = p.width - margin;
    const top = margin;
    const bottom = p.height - margin;

    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;

    p.push();
    p.translate(cx, cy);
    p.scale(0.45);
    p.translate(-cx, -cy);

    // Axes
    p.stroke(0);
    p.line(left, bottom, right, bottom);
    p.line(left, top, left, bottom);

    // Zero lines
    p.stroke(180);
    const zeroX = p.map(0, X_DOMAIN[0], X_DOMAIN[1], left, right);
    const zeroY = p.map(0, Y_DOMAIN[0], Y_DOMAIN[1], bottom, top);
    p.line(zeroX, top, zeroX, bottom);
    p.line(left, zeroY, right, zeroY);

    // Points
    p.noStroke();

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

      // Color by win/loss
      if (pointDiff > 0) p.fill(212, 175, 55, 160);
      else p.fill(106, 13, 173, 160);

      p.circle(x, y, 5);
    }

    p.pop();
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
