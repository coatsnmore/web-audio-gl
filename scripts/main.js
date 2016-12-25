// setup
App.Synth.init();
App.Scene.init();
App.Controller.init();

// kick er off
App.Scene.animate();

// TODO move oscilloscope and make performant

// canvasCtx.fillStyle = "rgb(200,0,0)"; // sets the color to fill in the rectangle with
// canvasCtx.fillRect(10, 10, 55, 50);   // draws the rectangle at position 10, 10 with a width of 55 and a height of 50



App.Synth.drawOscilloscope();
App.Synth.drawFreqBarGraph();

// ctx.clearRect();

//barcanvas