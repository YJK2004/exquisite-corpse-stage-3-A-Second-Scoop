let data;
let icecream1Button, icecream2Button, icecream3Button;
let currentIcecream = 'Icecream1';

function preload() {
  data = loadTable('IcecreamFlavour.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  icecream1Button = createButton('Icecream1');
  icecream1Button.position(20, 20);
  icecream1Button.size(110, 50);
  icecream1Button.mousePressed(() => setCurrentIcecream('Icecream1'));

  icecream2Button = createButton('Icecream2');
  icecream2Button.position(20, 80);
  icecream2Button.size(110, 50);
  icecream2Button.mousePressed(() => setCurrentIcecream('Icecream2'));

  icecream3Button = createButton('Icecream3');
  icecream3Button.position(20, 140);
  icecream3Button.size(110, 50);
  icecream3Button.mousePressed(() => setCurrentIcecream('Icecream3'));

  drawChart();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawChart();
}

function setCurrentIcecream(type) {
  currentIcecream = type;
  drawChart();
}

function drawChart() {
  background(50);
  drawIceCreamChart(currentIcecream);
}

function drawIceCreamChart(icecreamType) {
  let maxVal = 0;
  for (let i = 0; i < data.getRowCount(); i++) {
    maxVal = max(maxVal, data.getNum(i, icecreamType));
  }

  let spacing = width / (data.getRowCount() + 1);
  let coneHeight = 40;
  let coneWidth = 40;
  let scoopDiameter = 50;

  for (let i = 0; i < data.getRowCount(); i++) {
    let x = (i + 1) * spacing;
    let numScoops = data.getNum(i, icecreamType);

    for (let j = 0; j < numScoops; j++) {
      let y = height - coneHeight - scoopDiameter * (j + 1);

      if (data.getString(i, 'Flavour') === 'Vanilla') {
        fill(245, 242, 235); // Light yellow for Vanilla
      } else if (data.getString(i, 'Flavour') === 'Chocolate') {
        fill(89, 52, 38); // Brown for Chocolate
      } else if (data.getString(i, 'Flavour') === 'Strawberry') {
        fill(232, 172, 209); // Pink for Strawberry
      }

      // Draw the scoop
      noStroke();
      ellipse(x, y, 40, 41);
    }

    // Draw the cone
    noStroke();
    fill(255, 255, 150); // Light brown for the cone
    let yCone = height - coneHeight;
    triangle(x - coneWidth / 2, yCone - 40, x + coneWidth / 2, yCone - 40, x, yCone + 2);

    // Draw the flavour text
    fill(255);
    textSize(25);
    textAlign(CENTER);
    text(data.getString(i, 'Flavour'), x, height /6);
  }
}


