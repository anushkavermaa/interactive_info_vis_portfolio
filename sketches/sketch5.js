// Example 2
registerSketch('sk5', function (p) {
  let table;

  p.preload = function () {
    table = p.loadTable('cfb_box-scores_2002-2025.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
