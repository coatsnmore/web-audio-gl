// setup
App.Synth.init();
App.Scene.init();
App.Controller.init();

// kick er off
App.Scene.animate();

// TODO move oscilloscope and make performant

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
const HEIGHT = 50, WIDTH = 300;
var canvas = document.getElementById('mycanvas'); // in your HTML this element appears as <canvas id="mycanvas"></canvas>
var canvasCtx = canvas.getContext('2d');
// canvasCtx.fillStyle = "rgb(200,0,0)"; // sets the color to fill in the rectangle with
// canvasCtx.fillRect(10, 10, 55, 50);   // draws the rectangle at position 10, 10 with a width of 55 and a height of 50

function draw() {
    drawVisual = requestAnimationFrame(draw);

    var bufferLength = App.Synth.analyser().frequencyBinCount;
    var dataArray = App.Synth.analysis();
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;

        console.log('x, y: ' + x + ', ' + y);
        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
};

draw();

// ctx.clearRect();