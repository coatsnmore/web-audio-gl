App.Synth = App.Synth || (function () {
    var notes = App.Notes.all;
    var controller = App.Controller;
    var context = {};
    var analyser;
    var freqAnalyser;

    var init = function () {
        createContext();
        createAnalysers();
    };

    var playSong = function () {
        var duration = 0.5,
            startTime = context.currentTime,
            song = ['G3', 'A#3/Bb3', 'D#4/Eb4', 'G3', 'A#3/Bb3', 'G#3/Ab3', 'G3'],
            // song = ['G3', 'G3', 'G3', 'G3', 'G3', 'G#3/Ab3', 'G3'],
            oscillatorType = 'sine',
            masterVolume = 0.1;


        for (var i = 0; i < song.length; i++) {
            controller.updateSpheresByNote(song[i]);
            play(song[i], startTime + duration * i, duration, oscillatorType, masterVolume);
        }
    };

    var playLaser = function () {

        var duration = 0.5,
            startTime = context.currentTime,
            song = ['A2'],
            oscillatorType = 'sawtooth',
            masterVolume = 0.1;

        for (var i = 0; i < song.length; i++) {
            play(song[i], startTime + duration * i, duration, oscillatorType, masterVolume);
        }
    };

    var createAnalysers = function () {
        analyser = context.createAnalyser();
        freqAnalyser = context.createAnalyser();
    }

    var createContext = function () {
        // var context = {};
        var ContextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext),
            buffer, thisSynth = this;
        if (ContextClass) {
            // Web Audio API is available.
            context = new ContextClass();
        } else {
            console.error('Browser does not support AudioContext, uh oh!');
        }

        // context;
    };

    var analysis = function () {
        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        return dataArray;
    }

    var analyser = function () {
        return analyser;
    }

    var play = function (note, startTime, duration, type, volumeLevel) {
        var osc1 = context.createOscillator(),
            osc2 = context.createOscillator(),
            volume = context.createGain(),
            frequency = notes[note];

        volume.gain.value = volumeLevel;

        // Set oscillator wave type
        osc1.type = type;
        osc2.type = type;

        // tune
        osc1.frequency.value = frequency;
        osc2.frequency.value = frequency - 3;

        // wire em up
        osc1.connect(analyser);
        analyser.connect(freqAnalyser);
        freqAnalyser.connect(volume);
        // osc1.connect(volume);

        osc2.connect(volume);
        volume.connect(context.destination);

        // Fade out
        volume.gain.setValueAtTime(0.1, startTime + duration - 0.25);
        volume.gain.linearRampToValueAtTime(0, startTime + duration);

        // Start oscillators
        osc1.start(startTime);
        osc2.start(startTime);

        // Stop oscillators
        osc1.stop(startTime + duration);
        osc2.stop(startTime + duration);
    };

    var drawOscilloscope = function () {
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
        const HEIGHT = 50, WIDTH = 300;
        var canvas = document.getElementById('osc-canvas'); // in your HTML this element appears as <canvas id="mycanvas"></canvas>
        var canvasCtx = canvas.getContext('2d');
        drawVisual = requestAnimationFrame(drawOscilloscope);

        var bufferLength = analyser.frequencyBinCount;
        var dataArray = analysis();
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
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

            // console.log('x, y: ' + x + ', ' + y);
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

    var drawFreqBarGraph = function () {
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
        const HEIGHT = 50, WIDTH = 300;
        var canvas = document.getElementById('bar-canvas'); // in your HTML this element appears as <canvas id="mycanvas"></canvas>
        var canvasCtx = canvas.getContext('2d');
        drawVisual = requestAnimationFrame(drawFreqBarGraph);

        freqAnalyser.fftSize = 256;
        var bufferLength = freqAnalyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        freqAnalyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    };

    return {
        playSong: playSong,
        playLaser: playLaser,
        init: init,
        analysis: analysis,
        analyser: analyser,
        drawOscilloscope: drawOscilloscope,
        drawFreqBarGraph: drawFreqBarGraph
    };
})();