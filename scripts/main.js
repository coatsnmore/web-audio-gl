App.Synth.init();
App.Controller = App.Controller || {};

App.Controller.playSong = function () {
    App.Synth.playSong();
};

App.Controller.changeSphere = function () {
    App.Scene.changeSphere();
}

App.Scene.init();
App.Scene.animate();

