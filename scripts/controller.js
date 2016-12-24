App.Controller = App.Controller || (function () {

    var synth, scene;

    var init = function () {
        synth = App.Synth;
        scene = App.Scene;
    }

    var playSong = function () {
        App.Synth.playSong();
    }

    var changeSphere = function () {
        App.Scene.changeSphere();
    }

    var updateSpheresByNote = function (note) {
        App.Scene.updateSpheresByNote(note);
    }

    return {
        init: init,
        playSong: playSong,
        changeSphere: changeSphere,
        updateSpheresByNote: updateSpheresByNote
    }
})();