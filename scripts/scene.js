App.Scene = App.Scene || (function () {

    var scene, renderer, camera, sphere, sphere2;

    var init = function () {
        // Create the scene and set the scene size.
        scene = new THREE.Scene();
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        // Create a renderer and add it to the DOM.
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
        document.body.appendChild(renderer.domElement);

        // Create a camera, zoom it out from the model a bit, and add it to the scene.
        camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
        camera.position.set(0, 6, 0);
        scene.add(camera);

        // Create an event listener that resizes the renderer with the browser window.
        window.addEventListener('resize', function () {
            var WIDTH = window.innerWidth,
                HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });

        // Set the background color of the scene.
        renderer.setClearColor(0x333F47, 1);

        // Create a light, set its position, and add it to the scene.
        var light = new THREE.PointLight(0xffffff);
        light.position.set(-100, 200, 100);
        scene.add(light);

        // Load in the mesh and add it to the scene.
        // var loader = new THREE.JSONLoader();
        // loader.load("models/treehouse_logo.js", function (geometry) {
        //     var material = new THREE.MeshLambertMaterial({ color: 0x55B663 });
        //     mesh = new THREE.Mesh(geometry, material);
        //     scene.add(mesh);
        // });

        addSphere();
        addSphere2();

        // Add OrbitControls so that we can pan around with the mouse.
        controls = new THREE.OrbitControls(camera, renderer.domElement);

    }

    var updateSpheresByNote = function (note) {
        //['G3', 'A#3/Bb3', 'D#4/Eb4', 'G3', 'A#3/Bb3', 'G#3/Ab3', 'G3']
        sphere.geometry.dispose();

        var radius, segments, rings;

        if (note.includes('G')) {
            radius = 1;
            segments = 8;
            rings = 8;
        } else if (note.includes('A')) {
            radius = 2;
            segments = 8;
            rings = 8;
        } else if (note.includes('B')) {
            radius = 3;
            segments = 8;
            rings = 8;
        } else if (note.includes('C')) {
            radius = 4;
            segments = 8;
            rings = 8;
        } else if (note.includes('D')) {
            radius = 5;
            segments = 8;
            rings = 8;
        } else if (note.includes('E')) {
            radius = 6;
            segments = 8;
            rings = 8;
        } else if (note.includes('F')) {
            radius = 7;
            segments = 8;
            rings = 8;
        }

        var geometry = new THREE.SphereGeometry(
            radius,
            segments,
            rings);
        sphere.geometry = geometry;
    }

    var changeSphere = function () {
        sphere.geometry.dispose();

        var radius, segments, rings;

        if (sphere.size == 'big') {
            radius = 1;
            segments = 8;
            rings = 8;
            sphere.size = 'small';
        } else {
            radius = 3;
            segments = 8;
            rings = 8;
            sphere.size = 'big';
        }

        var geometry = new THREE.SphereGeometry(
            radius,
            segments,
            rings);
        sphere.geometry = geometry;
    }

    var addSphere = function () {
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xCC0000
                });

        // Set up the sphere vars
        const RADIUS = 2;
        const SEGMENTS = 8;
        const RINGS = 8;

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!

        var geometry = new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS);
        geometry.dynamic = true;
        geometry.verticesNeedUpdate = true;

        sphere = new THREE.Mesh(
            geometry,
            sphereMaterial);

        // Move the Sphere back in Z so we
        // can see it.
        sphere.position.z = 0;

        sphere.size = 'big';

        // Finally, add the sphere to the scene.
        scene.add(sphere);
    }

    var addSphere2 = function () {
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xffff00
                });

        // Set up the sphere vars
        const RADIUS = 2;
        const SEGMENTS = 8;
        const RINGS = 8;

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!

        var geometry = new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS);
        geometry.dynamic = true;
        geometry.verticesNeedUpdate = true;

        sphere2 = new THREE.Mesh(
            geometry,
            sphereMaterial);

        // Move the Sphere back in Z so we
        // can see it.
        sphere2.position.z = -5;
        sphere2.position.z = -5;

        // Finally, add the sphere to the scene.
        scene.add(sphere2);
    }

    var animate = function () {
        // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimationFrame(animate);

        // update scene
        console.log('analysis: ' + App.Synth.analysis());

        // Render the scene.
        renderer.render(scene, camera);
        controls.update();

    }

    return {
        init: init,
        animate: animate,
        changeSphere: changeSphere,
        updateSpheresByNote: updateSpheresByNote
    };
})();