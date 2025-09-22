'use strict';

var canvas;

var sketch = function(p) {
  var agents = [];
  var agentCount = 4000;
  var noiseScale = 300;
  var noiseStrength = 10;
  var overlayAlpha = 10;
  var agentAlpha = 90;
  var strokeWidth = 0.3;
  var drawMode = 1;
  var strokeColor = p.color(p.random(100),p.random(100), p.random(100), agentAlpha);

  p.setup = function() {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function() {
    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(strokeColor);
    for (var i = 0; i < agentCount; i++) {
      if (drawMode == 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
      else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
    }
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') drawMode = 1;
    if (p.key == '2') drawMode = 2;
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };
};

var myp5 = new p5(sketch);


var Agent = function() {
  this.vector = myp5.createVector(myp5.random(myp5.width), myp5.random(myp5.height));
  this.vectorOld = this.vector.copy();
  this.stepSize = myp5.random(1, 5);
  this.isOutside = false;
  this.angle;
};

Agent.prototype.update = function(strokeWidth) {
  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;
  this.isOutside = this.vector.x < 0 || this.vector.x > myp5.width || this.vector.y < 0 || this.vector.y > myp5.height;
  if (this.isOutside) {
    this.vector.set(myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
  }
  myp5.strokeWeight(strokeWidth * this.stepSize);
  myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
  this.vectorOld = this.vector.copy();
  this.isOutside = false;
};

Agent.prototype.update1 = function(noiseScale, noiseStrength, strokeWidth) {
  this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
  this.update(strokeWidth);
};

Agent.prototype.update2 = function(noiseScale, noiseStrength, strokeWidth) {
  this.angle = myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
  this.angle = (this.angle - myp5.floor(this.angle)) * noiseStrength;
  this.update(strokeWidth);
};

